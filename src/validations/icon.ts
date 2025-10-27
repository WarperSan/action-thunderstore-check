import fs from 'node:fs'
import { getMime } from '../utils.js'
import { imageSizeFromFile } from 'image-size/fromFile'
import path from 'node:path'
import { FileNotFoundError } from '../errors/FileNotFoundError.js'
import { InvalidMimeError } from '../errors/InvalidMimeError.js'
import { InvalidImageSizeError } from '../errors/InvalidImageSizeError.js'

/**
 * Validates if the given icon is valid
 * @param directory
 * @param fileName
 */
export async function validateIcon(
  directory: string,
  fileName: string
): Promise<void> {
  const filePath = path.join(directory, fileName)

  // Check if ICON exists
  if (!fs.existsSync(filePath)) throw new FileNotFoundError(fileName)

  // Check if ICON is an image
  if ((await getMime(filePath)) !== 'image/png')
    throw new InvalidMimeError(fileName, 'image/png')

  // Check if ICON is 256x256
  const size = await imageSizeFromFile(filePath)

  if (size.height !== 256 || size.width !== 256)
    throw new InvalidImageSizeError(fileName, 256, 256)
}
