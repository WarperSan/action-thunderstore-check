import path from 'node:path'
import { FileNotFoundError } from '../src/errors/FileNotFoundError.js'
import { InvalidFormatError } from '../src/errors/InvalidFormatError.js'
import { PropertyMissingError } from '../src/errors/PropertyMissingError.js'
import { PropertyWrongTypeError } from '../src/errors/PropertyWrongTypeError.js'
import { UnmatchedRegexError } from '../src/errors/UnmatchedRegexError.js'
import { PropertyTooSmallError } from '../src/errors/PropertyTooSmallError.js'
import { PropertyTooLargeError } from '../src/errors/PropertyTooLargeError.js'

const { validateManifest } = await import('../src/validations/manifest.js')

/**
 * Calls the method to test and returns the error
 * @param fileName
 */
async function validate(fileName: string): Promise<Error | undefined> {
  try {
    await validateManifest(
      path.join(process.cwd(), '__tests__/assets/manifests'),
      fileName
    )
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(String(error))
  }

  return undefined
}

describe('Manifest validations', () => {
  test('Missing Manifest', async () => {
    const fileName = 'missing-valid.json'

    const result = await validate(fileName)

    expect(result).toBeInstanceOf(FileNotFoundError)
  })

  test('Invalid JSON syntax', async () => {
    const fileName = 'invalid-json-syntax.json'

    const result = await validate(fileName)
    expect(result).toBeInstanceOf(InvalidFormatError)
  })

  test('Invalid JSON format', async () => {
    const fileName = 'invalid-json-format.json'

    const result = await validate(fileName)
    expect(result).toBeInstanceOf(InvalidFormatError)
  })

  // --- NAME ---
  test('Name missing', async () => {
    const fileName = 'name/missing.json'

    const result = await validate(fileName)
    expect(result).toBeInstanceOf(PropertyMissingError)
  })

  test('Name not string', async () => {
    const fileName = 'name/not-string.json'

    const result = await validate(fileName)
    expect(result).toBeInstanceOf(PropertyWrongTypeError)
  })

  test('Name Empty', async () => {
    const fileName = 'name/empty.json'

    const result = await validate(fileName)
    expect(result).toBeInstanceOf(PropertyTooSmallError)
  })

  test('Name Too Big', async () => {
    const fileName = 'name/too-large.json'

    const result = await validate(fileName)
    expect(result).toBeInstanceOf(PropertyTooLargeError)
  })

  test("Name doesn't match regex", async () => {
    const fileName = 'name/no-match.json'

    const result = await validate(fileName)
    expect(result).toBeInstanceOf(UnmatchedRegexError)
  })

  // --- DESCRIPTION ---
  test('Description missing', async () => {
    const fileName = 'description/missing.json'

    const result = await validate(fileName)
    expect(result).toBeInstanceOf(PropertyMissingError)
  })

  test('Description not string', async () => {
    const fileName = 'description/not-string.json'

    const result = await validate(fileName)
    expect(result).toBeInstanceOf(PropertyWrongTypeError)
  })

  test('Description Too Big', async () => {
    const fileName = 'description/too-large.json'

    const result = await validate(fileName)
    expect(result).toBeInstanceOf(PropertyTooLargeError)
  })

  // --- VERSION ---
  test('Version missing', async () => {
    const fileName = 'version/missing.json'

    const result = await validate(fileName)
    expect(result).toBeInstanceOf(PropertyMissingError)
  })

  test('Version not string', async () => {
    const fileName = 'version/not-string.json'

    const result = await validate(fileName)
    expect(result).toBeInstanceOf(PropertyWrongTypeError)
  })

  test('Version too small', async () => {
    const fileName = 'version/too-small.json'

    const result = await validate(fileName)
    expect(result).toBeInstanceOf(PropertyTooSmallError)
  })

  test('Version too large', async () => {
    const fileName = 'version/too-large.json'

    const result = await validate(fileName)
    expect(result).toBeInstanceOf(PropertyTooLargeError)
  })

  test("Version doesn't match regex", async () => {
    const fileName = 'version/no-match.json'

    const result = await validate(fileName)
    expect(result).toBeInstanceOf(UnmatchedRegexError)
  })

  // --- DEPENDENCIES ---
  test('Dependencies missing', async () => {
    const fileName = 'dependencies/missing.json'

    const result = await validate(fileName)
    expect(result).toBeInstanceOf(PropertyMissingError)
  })

  test('Dependencies not array', async () => {
    const fileName = 'dependencies/not-array.json'

    const result = await validate(fileName)
    expect(result).toBeInstanceOf(PropertyWrongTypeError)
  })

  test('Dependencies wrong array', async () => {
    const fileName = 'dependencies/wrong-array.json'

    const result = await validate(fileName)
    expect(result).toBeInstanceOf(PropertyWrongTypeError)
  })

  test("Dependencies doesn't match regex", async () => {
    const fileName = 'dependencies/no-match.json'

    const result = await validate(fileName)
    expect(result).toBeInstanceOf(UnmatchedRegexError)
  })

  // --- WEBSITE ---
  test('Website missing', async () => {
    const fileName = 'website/missing.json'

    const result = await validate(fileName)
    expect(result).toBeInstanceOf(PropertyMissingError)
  })

  test('Website not string', async () => {
    const fileName = 'website/not-string.json'

    const result = await validate(fileName)
    expect(result).toBeInstanceOf(PropertyWrongTypeError)
  })

  test('Website too large', async () => {
    const fileName = 'website/too-large.json'

    const result = await validate(fileName)
    expect(result).toBeInstanceOf(PropertyTooLargeError)
  })

  test("Website doesn't match regex", async () => {
    const fileName = 'website/no-match.json'

    const result = await validate(fileName)
    expect(result).toBeInstanceOf(UnmatchedRegexError)
  })
})
