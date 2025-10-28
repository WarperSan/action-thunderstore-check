import fs from 'node:fs'
import path from 'node:path'
import { ErrorCodes, ValidationError } from '../errors.js'

/**
 * Validates if the given README is valid
 * @param directory
 * @param fileName
 */
export async function validateReadme(
  directory: string,
  fileName: string
): Promise<void> {
  const filePath = path.join(directory, fileName)
  // Check if README exists
  if (!fs.existsSync(filePath))
    throw new ValidationError(
      ErrorCodes.FILE_NOT_FOUND,
      `File '${fileName}' was not found.`
    )
}
