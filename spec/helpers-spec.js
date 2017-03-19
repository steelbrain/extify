'use babel'

import { it } from 'jasmine-fix'
import * as Helpers from '../lib/helpers'

describe('Helpers', function() {
  const myDir = __dirname
  const myFile = __filename

  describe('exists', function() {
    it('returns true if file exists', async function() {
      expect(await Helpers.exists(myFile)).toBe(true)
      expect(await Helpers.exists(myDir)).toBe(true)
    })
    it('returns false if file does not exist', async function() {
      expect(await Helpers.exists(myFile + 'a')).toBe(false)
      expect(await Helpers.exists(myDir + 'a')).toBe(false)
    })
  })
  describe('existsSync', function() {
    it('returns true if the file exists', function() {
      expect(Helpers.existsSync(myFile)).toBe(true)
      expect(Helpers.existsSync(myDir)).toBe(true)
    })
    it('returns false if the file does not exist', function() {
      expect(Helpers.existsSync(myFile + 'a')).toBe(false)
      expect(Helpers.existsSync(myDir + 'a')).toBe(false)
    })
  })
  describe('getExtPath', function() {
    it('returns EXTPATH even in stupid case mixes', function() {
      expect(Helpers.getExtPath()).toBe('')
      process.env.extPath = '.exe'
      expect(Helpers.getExtPath()).toBe('.exe')
      delete process.env.extPath
      process.env.EXTPath = '.rar'
      expect(Helpers.getExtPath()).toBe('.rar')
      delete process.env.EXTPath
    })
  })
})
