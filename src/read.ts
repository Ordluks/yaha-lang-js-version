import { existsSync } from 'fs'
import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { compose, partialRight } from 'ramda'

const YAHA_EXT = 'yh'
const YAHA_EXT_REGEX = new RegExp(`\.${YAHA_EXT}$`)

const checkExists = (path: string) => {
  const resolvedPath = resolve(path)
  if (!existsSync(resolvedPath)) {
    throw new Error(`File not exists - ${resolvedPath}`)
  }
  
  return path
}

const checkYahaExt = (path: string) => YAHA_EXT_REGEX.test(path) ? path : `${path}.${YAHA_EXT}`

const read = (path: string) => readFile(path, 'utf-8')

const readYahaFile = compose(read, checkYahaExt, checkExists)

export default readYahaFile
