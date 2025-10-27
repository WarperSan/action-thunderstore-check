import * as fileType from 'file-type'

/**
 * Gets the MIME-type of the given file
 * @param filePath
 */
const getMime = async function (filePath: string): Promise<string | undefined> {
  const result = await fileType.fileTypeFromFile(filePath)

  return result?.mime
}

export { getMime }
