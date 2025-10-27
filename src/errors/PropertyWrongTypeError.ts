export class PropertyWrongTypeError extends Error {
  constructor(propertyName: string, expectedType: string) {
    super(`'${propertyName}' must be of type ${expectedType}.`)
  }
}
