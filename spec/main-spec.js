'use babel'

/* @flow */

import { it } from 'jasmine-fix'
import extify from '../'

describe('Extify', function() {
  it('works if the path provided exists on the FS', async function() {
    expect(await extify(__filename)).toBe(__filename)
  })
  it('tries to append ext in front if path is absolute', async function() {
    expect(await extify(__filename.slice(0, -3), '', '.rar;.js')).toBe(__filename)
  })
  it('tries to find the file if path is not absolute', async function() {
    expect(await extify('main-spec', __dirname, '.js')).toBe(__filename)
  })
})
