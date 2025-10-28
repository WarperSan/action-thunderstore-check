import * as core from '@actions/core'
import * as fs from 'node:fs'
import path from 'node:path'
import AdmZip from 'adm-zip'
import { getMime } from './utils.js'
import { validateIcon } from './validations/icon.js'
import { validateReadme } from './validations/readme.js'
import validateManifest from './validations/manifest.js'

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
    const zip = new AdmZip(packagePath)
    zip.extractAllTo(destinationPath, true)

    // Validate icon
    await validateIcon(destinationPath, 'icon.png')
    await validateReadme(destinationPath, 'README.md')
    await validateManifest(destinationPath, 'manifest.json')
  } catch (error) {
    let message: string = 'Unexpected error occurred.'

    if (error instanceof Error) message = error.message

    core.setFailed(message)
  } finally {
    if (fs.existsSync(destinationPath))
      fs.rmSync(destinationPath, { recursive: true })
  }
}
