/* @flow */

import FS from 'fs'

export function exists(filePath: string): Promise<boolean> {
  return new Promise(function(resolve) {
    FS.stat(filePath, function(error) {
      resolve(error === null)
    })
  })
}

export function existsSync(filePath: string): boolean {
  try {
    FS.statSync(filePath)
    return true
  } catch (_) {
    return false
  }
}

export function getExtPath(): string {
  /* eslint-disable no-restricted-syntax */
  for (const key in process.env) {
    if ({}.hasOwnProperty.call(process.env, key) && key.toUpperCase() === 'EXTPATH') {
      return process.env[key] || ''
    }
  }
  return ''
}
