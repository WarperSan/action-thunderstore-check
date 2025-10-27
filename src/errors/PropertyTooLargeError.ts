export class PropertyTooLargeError extends Error {
  constructor(propertyName: string, maximumLength: number) {
    super(`'${propertyName}' must be at most ${maximumLength} characters.`)
  }
}
