import path from 'node:path'
import { ValidationError, ErrorCodes } from '../src/errors.js'

const { validateIcon } = await import('../src/validations/icon.js')

/**
 * Calls the method to test and returns the error
 * @param fileName
 */
async function validate(fileName: string): Promise<Error | undefined> {
  try {
    await validateIcon(
      path.join(process.cwd(), '__tests__/assets/icons'),
      fileName
    )
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(String(error))
  }

  return undefined
}

describe('Icon validations', () => {
  test('Missing Icon', async () => {
    const fileName = 'missing-valid.png'

    const result = await validate(fileName)

    expect(result).toBeInstanceOf(ValidationError)
    expect(result).toHaveProperty('code', ErrorCodes.FILE_NOT_FOUND)
  })

  test('Icon of wrong type', async () => {
    const fileName = 'wrong-type.png'

    const result = await validate(fileName)

    expect(result).toBeInstanceOf(ValidationError)
    expect(result).toHaveProperty('code', ErrorCodes.INVALID_MIME)
  })

  test('Icon too small', async () => {
    const fileName = 'small.png'

    const result = await validate(fileName)

    expect(result).toBeInstanceOf(ValidationError)
    expect(result).toHaveProperty('code', ErrorCodes.INVALID_IMAGE_SIZE)
  })

  test('Icon too large', async () => {
    const fileName = 'large.png'

    const result = await validate(fileName)

    expect(result).toBeInstanceOf(ValidationError)
    expect(result).toHaveProperty('code', ErrorCodes.INVALID_IMAGE_SIZE)
  })

  test('Valid Icon', async () => {
    const fileName = 'valid.png'

    const result = await validate(fileName)

    expect(result).toBe(undefined)
  })
})
