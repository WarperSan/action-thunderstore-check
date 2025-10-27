import * as core from '@actions/core'
import * as fs from 'node:fs'
import path from 'node:path'
import * as unzipper from 'unzipper'
import { getMime } from './utils.js'
import { ICON_PATH, validateIcon } from './validations/icon.js'
import { README_PATH, validateReadme } from './validations/readme.js'
import { MANIFEST_PATH, validateManifest } from './validations/manifest.js'

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
    if ((await getMime(packagePath)) !== 'application/zip') {
      core.setFailed('File defined by input must be a ZIP file.')
      return
    }

    // Unzip file
    const directory = await unzipper.Open.file(packagePath)
    await directory.extract({ path: destinationPath })

    // Validate icon
    const iconPath = path.join(destinationPath, ICON_PATH)
    await validateIcon(iconPath)

    // Validate README
    const readmePath = path.join(destinationPath, README_PATH)
    await validateReadme(readmePath)

    // Validate manifest
    const manifestPath = path.join(destinationPath, MANIFEST_PATH)
    await validateManifest(manifestPath)

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
