import * as core from '@actions/core'
import * as fs from 'node:fs'
import { checkMime } from './utils.js'

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    // Check if input is given
    const packagePath = core.getInput('package-path', { required: true })

    // Check if package exists
    if (!fs.existsSync(packagePath)) {
      core.setFailed('File defined by input was not found.')
      return
    }

    // Check if file is ZIP
    if (!(await checkMime(packagePath, 'application/zip'))) {
      core.setFailed("The file at '' must be a ZIP file.")
      return
    }

    core.warning('Package valid')

    // Unzip file

    // Check if ICON exists
    // Check if ICON is an image
    // Check if ICON is 256x256

    // Check if README exists

    // Check if MANIFEST exists
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
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
