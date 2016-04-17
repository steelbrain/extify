'use babel'

import { it } from './helpers'
import * as Helpers from '../lib/helpers'

describe('Helpers', function() {
  describe('exists', function() {
    it('returns true if file exists', async function() {
      expect(await Helpers.exists(__filename)).toBe(true)
      expect(await Helpers.exists(__dirname)).toBe(true)
    })
    it('returns false if file does not exist', async function() {
      expect(await Helpers.exists(__filename + 'a')).toBe(false)
      expect(await Helpers.exists(__dirname + 'a')).toBe(false)
    })
  })
  describe('existsSync', function() {
    it('returns true if the file exists', function() {
      expect(Helpers.existsSync(__filename)).toBe(true)
      expect(Helpers.existsSync(__dirname)).toBe(true)
    })
    it('returns false if the file does not exist', function() {
      expect(Helpers.existsSync(__filename + 'a')).toBe(false)
      expect(Helpers.existsSync(__dirname + 'a')).toBe(false)
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
