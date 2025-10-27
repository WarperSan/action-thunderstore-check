export class InvalidMimeError extends Error {
  constructor(fileName: string, mimeExpected: string) {
    super(`'${fileName}' must be of type '${mimeExpected}'.`)
  }
}
