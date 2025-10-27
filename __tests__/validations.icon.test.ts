import path from 'node:path'
import { FileNotFoundError } from '../src/errors/FileNotFoundError.js'
import { InvalidMimeError } from '../src/errors/InvalidMimeError.js'
import { InvalidImageSizeError } from '../src/errors/InvalidImageSizeError.js'

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

    expect(result).toBeInstanceOf(FileNotFoundError)
  })

  test('Icon of wrong type', async () => {
    const fileName = 'wrong-type.png'

    const result = await validate(fileName)

    expect(result).toBeInstanceOf(InvalidMimeError)
  })

  test('Icon too small', async () => {
    const fileName = 'small.png'

    const result = await validate(fileName)

    expect(result).toBeInstanceOf(InvalidImageSizeError)
  })

  test('Icon too large', async () => {
    const fileName = 'large.png'

    const result = await validate(fileName)

    expect(result).toBeInstanceOf(InvalidImageSizeError)
  })

  test('Valid Icon', async () => {
    const fileName = 'valid.png'

    const result = await validate(fileName)

    expect(result).toBe(undefined)
  })
})
