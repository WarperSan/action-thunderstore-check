import { jest } from '@jest/globals'
import path from 'node:path'

const { validateIcon } = await import('../src/validations/icon.js')

/**
 * Calls the method to test and returns the error
 * @param fileName
 */
async function validate(fileName: string): Promise<string | undefined> {
  try {
    await validateIcon(
      path.join(process.cwd(), '__tests__/assets/icons'),
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

  test('Missing Icon', async () => {
    const fileName = 'missing-valid.png'

    const result = await validate(fileName)

    expect(result).toBe(`File '${fileName}' was not found.`)
  })

  test('Icon of wrong type', async () => {
    const fileName = 'wrong-type.png'

    const result = await validate(fileName)

    expect(result).toBe(`'${fileName}' must be a PNG.`)
  })

  test('Icon too small', async () => {
    const fileName = 'small.png'

    const result = await validate(fileName)

    expect(result).toBe(`'${fileName}' must be exactly 256x256.`)
  })

  test('Icon too large', async () => {
    const fileName = 'large.png'

    const result = await validate(fileName)

    expect(result).toBe(`'${fileName}' must be exactly 256x256.`)
  })

  test('Valid Icon', async () => {
    const fileName = 'valid.png'

    const result = await validate(fileName)

    expect(result).toBe(undefined)
  })

  // icon missing
  // icon wrong type
  // icon wrong size
  // icon valid
})
