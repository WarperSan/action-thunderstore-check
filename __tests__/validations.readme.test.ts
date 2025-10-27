import { jest } from '@jest/globals'
import path from 'node:path'

const { validateReadme } = await import('../src/validations/readme.js')

/**
 * Calls the method to test and returns the error
 * @param fileName
 */
async function validate(fileName: string): Promise<string | undefined> {
  try {
    await validateReadme(
      path.join(process.cwd(), '__tests__/assets/readmes'),
      fileName
    )
  } catch (error) {
    if (error instanceof Error) return error.message
    else if (typeof error === 'string') return error
    return 'Unhandled error'
  }

  return undefined
}

describe('Icon validations', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('Missing README', async () => {
    const fileName = 'missing-readme.md'

    const result = await validate(fileName)

    expect(result).toBe(`File '${fileName}' was not found.`)
  })

  test('Valid README', async () => {
    const fileName = 'valid.md'

    const result = await validate(fileName)

    expect(result).toBe(undefined)
  })
})
