import fs from 'node:fs'
import path from 'node:path'
import { ErrorCodes, ValidationError } from '../errors.js'

const NAME_PATH = 'name'
const DESCRIPTION_PATH = 'description'
const VERSION_NUMBER_PATH = 'version_number'
const DEPENDENCIES_PATH = 'dependencies'
const WEBSITE_URL_PATH = 'website_url'

const NAME_REGEX = '[a-zA-Z 0-9_]+'
const VERSION_REGEX = '[0-9]+.[0-9]+.[0-9]+'

// --- ASSERTS ---

function assertIn(obj: { [key: string]: unknown }, key: string): void {
  if (key in obj) return

  throw new ValidationError(ErrorCodes.PROPERTY_MISSING, `'${key}' is missing.`)
}

type PrimitiveConstructor =
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor

function assertType<T>(
  value: unknown,
  propertyName: string,
  type: PrimitiveConstructor | (new () => T)
): asserts value is T {
  switch (type) {
    case String:
      if (typeof value === 'string') return
      break
    default:
      if (value instanceof type) return
  }

  throw new ValidationError(
    ErrorCodes.PROPERTY_WRONG_TYPE,
    `'${propertyName}' must be of type ${typeof type}.`
  )
}

// --- UTILS ---

/**
 * Gets the string value for the given property
 * @param json
 * @param propertyName
 */
function getString(
  json: { [key: string]: unknown },
  propertyName: string
): string {
  assertIn(json, propertyName)

  const value = json[propertyName] as string | undefined

  assertType(value, propertyName, String)

  return value
}

/**
 * Checks if the given value's length is between the min and the max inclusively
 * @param value
 * @param propertyName
 * @param min
 * @param max
 */
function lengthBetween(
  value: string,
  propertyName: string,
  min: number,
  max: number
): void {
  if (value.length < min)
    throw new ValidationError(
      ErrorCodes.TEXT_TOO_SMALL,
      `'${propertyName}' must be at least ${min} characters.`
    )
  if (value.length > max)
    throw new ValidationError(
      ErrorCodes.TEXT_TOO_BIG,
      `'${propertyName}' must be at most ${max} characters.`
    )
}

function matchRegex(value: string, propertyName: string, regex: RegExp): void {
  if (!regex.test(value))
    throw new ValidationError(
      ErrorCodes.NO_REGEX_MATCH,
      `'${propertyName}' must be valid for the following pattern: ${regex}`
    )
}

/**
 * Validates if the given manifest is valid
 * @param directory
 * @param fileName
 */
export async function validateManifest(
  directory: string,
  fileName: string
): Promise<void> {
  const filePath = path.join(directory, fileName)

  // Check if MANIFEST exists
  if (!fs.existsSync(filePath))
    throw new ValidationError(
      ErrorCodes.FILE_NOT_FOUND,
      `File '${fileName}' was not found.`
    )

  // Check if MANIFEST is valid JSON
  let json: { [key: string]: string | number | object | null } | undefined

  try {
    json = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch (_) {
    json = undefined
  }

  if (json === undefined || json instanceof Array)
    throw new ValidationError(
      ErrorCodes.FILE_WRONG_FORMAT,
      `'${fileName}' is not a valid JSON object file.`
    )

  // Check 'name'
  const name = getString(json, NAME_PATH)

  lengthBetween(name, NAME_PATH, 1, 128)
  matchRegex(name, NAME_PATH, new RegExp(`^${NAME_REGEX}$`))

  // Check 'description'
  const description = getString(json, DESCRIPTION_PATH)

  lengthBetween(description, DESCRIPTION_PATH, 0, 250)

  // Check 'version_number'
  const version = getString(json, VERSION_NUMBER_PATH)

  lengthBetween(version, VERSION_NUMBER_PATH, 5, 16)
  matchRegex(version, VERSION_NUMBER_PATH, new RegExp(`^${VERSION_REGEX}$`))

  // Check 'dependencies'
  assertIn(json, DEPENDENCIES_PATH)

  const dependencies = json[DEPENDENCIES_PATH] as Array<unknown> | undefined

  assertType(dependencies, DEPENDENCIES_PATH, Array)

  for (const dependency of dependencies) {
    assertType(dependency, DEPENDENCIES_PATH, String)

    matchRegex(
      dependency.toString(),
      DEPENDENCIES_PATH,
      new RegExp(`^(?!_)[a-zA-Z0-9_]+(?<!_)-${NAME_REGEX}-${VERSION_REGEX}$`)
    )
  }

  // Check 'website_url'
  const websiteURL = getString(json, WEBSITE_URL_PATH)

  lengthBetween(websiteURL, WEBSITE_URL_PATH, 0, 1024)

  if (websiteURL.length > 0)
    matchRegex(
      websiteURL,
      WEBSITE_URL_PATH,
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{2,}$/
    )
}

export default validateManifest
