import { existsSync } from 'fs'
import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { compose } from 'ramda'
import { invalidPath, fileUnexists } from './templates'
import { YahaFileError } from './errors'

export const YAHA_EXT = 'yh'
export const YAHA_EXT_REGEX = new RegExp(`\.${YAHA_EXT}$`)

const readYahaFile = async (path: string) => {
  if (!(/.+/.test(path))) throw new YahaFileError(invalidPath({path}))
  
  const programPath = YAHA_EXT_REGEX.test(path) ? path : `${path}.${YAHA_EXT}`
  if (!existsSync(programPath)) throw new YahaFileError(fileUnexists({programPath}))
  
  return readFile(programPath, 'utf-8')
}

export default readYahaFile
