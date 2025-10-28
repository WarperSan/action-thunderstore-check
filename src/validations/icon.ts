import fs from 'node:fs'
import { getMime } from '../utils.js'
import { imageSizeFromFile } from 'image-size/fromFile'
import path from 'node:path'
import { ErrorCodes, ValidationError } from '../errors.js'

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
  if (!fs.existsSync(filePath))
    throw new ValidationError(
      ErrorCodes.FILE_NOT_FOUND,
      `File '${fileName}' was not found.`
    )

  // Check if ICON is an image
  if ((await getMime(filePath)) !== 'image/png')
    throw new ValidationError(
      ErrorCodes.INVALID_MIME,
      `'${fileName}' must be a PNG.`
    )

  // Check if ICON is 256x256
  const size = await imageSizeFromFile(filePath)

  if (size.height !== 256 || size.width !== 256)
    throw new ValidationError(
      ErrorCodes.INVALID_IMAGE_SIZE,
      `'${fileName}' must be exactly 256x256.`
    )
}
