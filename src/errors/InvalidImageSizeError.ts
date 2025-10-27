export class InvalidImageSizeError extends Error {
  constructor(fileName: string, width: number, height: number) {
    super(`'${fileName}' must be exactly ${width}x${height}.`)
  }
}
