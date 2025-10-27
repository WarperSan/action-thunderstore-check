import fs from 'node:fs'
import path from 'node:path'

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
  if (!(propertyName in json)) throw `'${propertyName}' is missing.`

  const value = json[propertyName] as string | undefined

  if (typeof value !== 'string') throw `'${propertyName}' must be a string.`

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
    throw `'${propertyName}' must be at least ${min} characters.`
  if (value.length > max)
    throw `'${propertyName}' must be at most ${max} characters.`
}

function matchRegex(value: string, propertyName: string, regex: RegExp): void {
  if (!regex.test(value))
    throw `'${propertyName}' must be valid for the following pattern: ${regex}`
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
  if (!fs.existsSync(filePath)) throw `File '${filePath}' was not found.`

  // Check if MANIFEST is valid JSON
  let json: { [key: string]: string | number | object | null } | undefined

  try {
    json = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch (_) {
    json = undefined
  }

  if (json === undefined) throw `'${filePath}' is not a valid JSON file.`

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
  if (!(DEPENDENCIES_PATH in json)) throw `'${DEPENDENCIES_PATH}' is missing.`

  const dependencies = json[DEPENDENCIES_PATH] as Array<unknown> | undefined

  if (!(dependencies instanceof Array))
    throw `'${DEPENDENCIES_PATH}' must be an array.`

  for (const dependency of dependencies) {
    if (typeof dependency !== 'string')
      throw `'${DEPENDENCIES_PATH}' must only contain strings.`

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
