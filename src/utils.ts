import * as fileType from 'file-type'

/**
 * Gets the MIME-type of the given file
 * @param filePath
 */
const getMime = async function (filePath: string): Promise<string | undefined> {
  const parser = new fileType.FileTypeParser()
  const result = await parser.fromFile(filePath)

  return result?.mime
}

export { getMime }
