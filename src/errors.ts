enum ErrorCodes {
  /**
   * Used when a file is missing
   */
  FILE_NOT_FOUND = 'FILE_NOT_FOUND',

  /**
   * Used when a file is of the wrong format
   */
  FILE_WRONG_FORMAT = 'FILE_WRONG_FORMAT',

  /**
   * Used when a different MIME what expected
   */
  INVALID_MIME = 'INVALID_MIME',

  /**
   * Used when an image has the wrong dimensions
   */
  INVALID_IMAGE_SIZE = 'INVALID_IMAGE_SIZE',

  /**
   * Used when a RegExp does not find any match
   */
  NO_REGEX_MATCH = 'NO_REGEX_MATCH',

  /**
   * Used when a property is missing
   */
  PROPERTY_MISSING = 'PROPERTY_MISSING',

  /**
   * Used when a property is of the wrong type
   */
  PROPERTY_WRONG_TYPE = 'PROPERTY_WRONG_TYPE',

  /**
   * Used when a text doesn't meet the minimum length
   */
  TEXT_TOO_SMALL = 'TEXT_TOO_SMALL',

  /**
   * Used when a text doesn't meet the maximum length
   */
  TEXT_TOO_BIG = 'TEXT_TOO_BIG'
}

class ValidationError extends Error {
  code: ErrorCodes

  constructor(code: ErrorCodes, message: string) {
    super(message)
    this.code = code
  }
}

export { ErrorCodes, ValidationError }
