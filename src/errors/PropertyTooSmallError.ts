export class PropertyTooSmallError extends Error {
  constructor(propertyName: string, minimumLength: number) {
    super(`'${propertyName}' must be at least ${minimumLength} characters.`)
  }
}
