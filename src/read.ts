import { existsSync } from 'fs'
import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { compose, partialRight } from 'ramda'
import { fileUnexists } from './templates'

const YAHA_EXT = 'yh'
const YAHA_EXT_REGEX = new RegExp(`\.${YAHA_EXT}$`)


export const checkYahaExt = (path: string) =>
  YAHA_EXT_REGEX.test(path) ? path : `${path}.${YAHA_EXT}`

export const checkExists = (path: string) => {
  const resolvedPath = resolve(path)
  if (!existsSync(resolvedPath)) {
    throw fileUnexists({ path: resolvedPath })
  }

  return resolvedPath
}

const read = (path: string) => readFile(path, 'utf-8')

const readYahaFile = compose(read, checkExists, checkYahaExt)

export default readYahaFile
