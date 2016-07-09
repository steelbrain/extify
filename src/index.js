/* @flow */

import Path from 'path'
import { getExtPath, exists, existsSync } from './helpers'

async function extify(path: string, envPath: ?string = null, envExtPath: ?string = null) {
  const PATH = (envPath || process.env.PATH || '').split(Path.delimiter)
  const EXTPATH = (envExtPath || getExtPath()).split(';')

  EXTPATH.push('')

  if (Path.isAbsolute(path)) {
    for (let i = 0, length = EXTPATH.length; i < length; ++i) {
      const entry = EXTPATH[i]
      const entryPath = path + entry
      if (await exists(entryPath)) {
        return entryPath
      }
    }
    return path
  }
  for (let i = 0, length = PATH.length; i < length; i++) {
    const chunk = PATH[i]
    if (!chunk.length) {
      continue
    }

    for (let _i = 0, _length = EXTPATH.length; _i < _length; _i++) {
      const entry = EXTPATH[_i]
      const entryPath = Path.join(PATH[i], path + entry)
      if (await exists(entryPath)) {
        return entryPath
      }
    }
  }
  return path
}

function extifySync(path: string, envPath: ?string = null, envExtPath: ?string = null) {
  const PATH = (envPath || process.env.PATH || '').split(Path.delimiter)
  const EXTPATH = (envExtPath || getExtPath()).split(';')

  EXTPATH.push('')

  if (Path.isAbsolute(path)) {
    for (let i = 0, length = EXTPATH.length; i < length; ++i) {
      const entry = EXTPATH[i]
      const entryPath = path + entry
      if (existsSync(entryPath)) {
        return entryPath
      }
    }
    return path
  }
  for (let i = 0, length = PATH.length; i < length; i++) {
    const chunk = PATH[i]
    if (!chunk.length) {
      continue
    }

    for (let _i = 0, _length = EXTPATH.length; _i < _length; _i++) {
      const entry = EXTPATH[_i]
      const entryPath = Path.join(PATH[i], path + entry)
      if (existsSync(entryPath)) {
        return entryPath
      }
    }
  }
  return path
}

module.exports = extify
module.exports.sync = extifySync
