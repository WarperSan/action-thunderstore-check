import * as core from '@actions/core'
import * as fs from 'node:fs'
import { checkMime } from './utils.js'
import path from 'node:path'
import * as unzipper from 'unzipper'

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  const destinationPath = path.join(process.cwd(), 'unzipped')

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

    // Unzip file
    const directory = await unzipper.Open.file(packagePath)
    await directory.extract({ path: destinationPath })

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

    core.warning('Package valid')
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
    else if (typeof error === 'string') core.setFailed(error)
    else core.setFailed('Unhandled error occurred.')
  } finally {
    if (fs.existsSync(destinationPath))
      fs.rmSync(destinationPath, { recursive: true })
  }
}
