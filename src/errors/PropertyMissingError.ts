export class PropertyMissingError extends Error {
  constructor(propertyName: string) {
    super(`'${propertyName}' is missing.`)
  }
}
