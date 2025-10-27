import fs from 'node:fs'
import path from 'node:path'
import { FileNotFoundError } from '../errors/FileNotFoundError.js'
import { InvalidFormatError } from '../errors/InvalidFormatError.js'
import { PropertyMissingError } from '../errors/PropertyMissingError.js'
import { PropertyWrongTypeError } from '../errors/PropertyWrongTypeError.js'
import { UnmatchedRegexError } from '../errors/UnmatchedRegexError.js'
import { PropertyTooSmallError } from '../errors/PropertyTooSmallError.js'
import { PropertyTooLargeError } from '../errors/PropertyTooLargeError.js'

const NAME_PATH = 'name'
const DESCRIPTION_PATH = 'description'
const VERSION_NUMBER_PATH = 'version_number'
const DEPENDENCIES_PATH = 'dependencies'
const WEBSITE_URL_PATH = 'website_url'

const NAME_REGEX = '[a-zA-Z0-9_]+'
const VERSION_REGEX = '[0-9]+.[0-9]+.[0-9]+'

/**
 * Gets the string value for the given property
 * @param json
 * @param propertyName
 */
function getString(
  json: { [key: string]: unknown },
  propertyName: string
): string {
  if (!(propertyName in json)) throw new PropertyMissingError(propertyName)

  const value = json[propertyName] as string | undefined

  if (typeof value !== 'string')
    throw new PropertyWrongTypeError(propertyName, 'string')

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
  if (value.length < min) throw new PropertyTooSmallError(propertyName, min)
  if (value.length > max) throw new PropertyTooLargeError(propertyName, max)
}

function matchRegex(value: string, propertyName: string, regex: RegExp): void {
  if (!regex.test(value)) throw new UnmatchedRegexError(propertyName, regex)
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
  if (!fs.existsSync(filePath)) throw new FileNotFoundError(fileName)

  // Check if MANIFEST is valid JSON
  let json: { [key: string]: string | number | object | null } | undefined

  try {
    json = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch (_) {
    json = undefined
  }

  if (json === undefined || json instanceof Array)
    throw new InvalidFormatError(fileName, 'JSON')

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
  if (!(DEPENDENCIES_PATH in json))
    throw new PropertyMissingError(DEPENDENCIES_PATH)

  const dependencies = json[DEPENDENCIES_PATH] as Array<unknown> | undefined

  if (!(dependencies instanceof Array))
    throw new PropertyWrongTypeError(DEPENDENCIES_PATH, 'array')

  for (const dependency of dependencies) {
    if (typeof dependency !== 'string')
      throw new PropertyWrongTypeError(DEPENDENCIES_PATH, 'array<string>')

    matchRegex(
      dependency,
      DEPENDENCIES_PATH,
      new RegExp(`^.*?-${NAME_REGEX}-${VERSION_REGEX}$`)
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
