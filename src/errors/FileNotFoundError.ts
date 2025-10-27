export class FileNotFoundError extends Error {
  constructor(fileName: string) {
    super(`File '${fileName}' was not found.`)
  }
}
