import fs from 'node:fs'
import { getMime } from '../utils.js'
import { imageSizeFromFile } from 'image-size/fromFile'

export const ICON_PATH = 'icon.png'

/**
 * Validates if the given icon is valid
 * @param filePath
 */
export async function validateIcon(filePath: string): Promise<void> {
  // Check if ICON exists
  if (!fs.existsSync(filePath)) throw `File '${ICON_PATH}' was not found.`

  // Check if ICON is an image
  if ((await getMime(filePath)) !== 'image/png')
    throw `'${ICON_PATH}' must be a PNG.`

  // Check if ICON is 256x256
  const size = await imageSizeFromFile(filePath)

  if (size.height !== 256 || size.width !== 256)
    throw `'${ICON_PATH}' must be exactly 256x256.`
}
