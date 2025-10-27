import fs from 'node:fs'

export const MANIFEST_PATH = 'manifest.json'

/**
 * Validates if the given manifest is valid
 * @param filePath
 */
export async function validateManifest(filePath: string): Promise<void> {
  // Check if MANIFEST exists
  if (!fs.existsSync(filePath)) throw `File '${MANIFEST_PATH}' was not found.`

  // Check if MANIFEST is valid JSON
  // Check if MANIFEST has 'name'
  // Check if 'name' length is between 1 and 128
  // Check if 'name' matches the REGEX
  // Check if MANIFEST has 'description'
  // Check if 'description' is between 0 and 250
  // Check if MANIFEST has 'version_number'
  // Check if 'version_number' length is between 5 and 16
  // Check if 'version_number' matches the REGEX
  // Check if MANIFEST has 'dependencies'
  // Check if 'dependencies' is an array
  // Check if 'dependencies' only contains strings
  // Check if 'dependencies' only contains values that match the REGEX
  // Check if MANIFEST has 'website_url'
  // Check if 'website_url' length is between 0 and 1024
  // Check if 'website_url' matches the REGEX (if not empty)
}
