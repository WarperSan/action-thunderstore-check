export class UnmatchedRegexError extends Error {
  constructor(propertyName: string, regex: RegExp) {
    super(`'${propertyName}' must be valid for the following pattern: ${regex}`)
  }
}
