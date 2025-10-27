import { fileTypeFromFile } from 'file-type'

/**
 * Checks if the given file has the expected mime
 * @param filePath
 * @param expectedMime
 */
const checkMime = async function (
  filePath: string,
  expectedMime: string
): Promise<boolean> {
  const result = await fileTypeFromFile(filePath)

  if (result === undefined) return false

  return result.mime === expectedMime
}

export { checkMime }
