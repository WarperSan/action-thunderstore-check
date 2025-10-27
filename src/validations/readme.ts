import fs from 'node:fs'

export const README_PATH = 'README.md'

/**
 * Validates if the given README is valid
 * @param filePath
 */
export async function validateReadme(filePath: string): Promise<void> {
  // Check if README exists
  if (!fs.existsSync(filePath)) throw `File '${README_PATH}' was not found.`
}
