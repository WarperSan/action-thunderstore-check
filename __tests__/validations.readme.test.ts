import { jest } from '@jest/globals'
import path from 'node:path'
import { FileNotFoundError } from '../src/errors/FileNotFoundError.js'

const { validateReadme } = await import('../src/validations/readme.js')

/**
 * Calls the method to test and returns the error
 * @param fileName
 */
async function validate(fileName: string): Promise<Error | undefined> {
  try {
    await validateReadme(
      path.join(process.cwd(), '__tests__/assets/readmes'),
      fileName
    )
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(String(error))
  }

  return undefined
}

describe('README validations', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('Missing README', async () => {
    const fileName = 'missing-readme.md'

    const result = await validate(fileName)

    expect(result).toBeInstanceOf(FileNotFoundError)
  })

  test('Valid README', async () => {
    const fileName = 'valid.md'

    const result = await validate(fileName)

    expect(result).toBe(undefined)
  })
})
