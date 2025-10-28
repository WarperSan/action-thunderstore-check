import { jest } from '@jest/globals'
import * as core from '../__fixtures__/core.js'
import path from 'node:path'

jest.unstable_mockModule('@actions/core', () => core)

const { run } = await import('../src/main.js')

describe('main.ts', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('No input', async () => {
    await run()

    expect(core.setFailed).toHaveBeenCalledWith(
      'File defined by input was not found.'
    )
  })

  test('Input file not found', async () => {
    core.getInput.mockReturnValueOnce(
      path.join(process.cwd(), '__tests__/assets/main/missing.zip')
    )

    await run()

    expect(core.setFailed).toHaveBeenCalledWith(
      'File defined by input was not found.'
    )
  })

  test('Input file to a non-zip (extension)', async () => {
    core.getInput.mockReturnValueOnce(
      path.join(process.cwd(), '__tests__/assets/main/not-zip-extension.png')
    )

    await run()

    expect(core.setFailed).toHaveBeenCalledWith(
      'File defined by input must be a ZIP file.'
    )
  })

  test('Input file to a non-zip (header)', async () => {
    core.getInput.mockReturnValueOnce(
      path.join(process.cwd(), '__tests__/assets/main/not-zip-header.zip')
    )

    await run()

    expect(core.setFailed).toHaveBeenCalledWith(
      'File defined by input must be a ZIP file.'
    )
  })

  test('Invalid', async () => {
    core.getInput.mockReturnValueOnce(
      path.join(process.cwd(), '__tests__/assets/main/invalid.zip')
    )

    await run()

    expect(core.setFailed).toHaveBeenCalled()
  })

  test('Valid', async () => {
    core.getInput.mockReturnValueOnce(
      path.join(process.cwd(), '__tests__/assets/main/valid.zip')
    )

    await run()

    expect(core.setFailed).not.toHaveBeenCalled()
  })
})
