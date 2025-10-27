export class InvalidFormatError extends Error {
  constructor(fileName: string, expectedFormat: string) {
    super(`'${fileName}' is not a valid ${expectedFormat} file.`)
  }
}
