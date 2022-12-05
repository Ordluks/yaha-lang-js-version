import assert from 'assert'
import { open, unlink} from 'fs/promises'
import { resolve } from 'path'
import readYahaFile, { checkExists, checkYahaExt } from '../src/read'
import { fileUnexists } from '../src/templates'

const makeTempFile = async (path: string) => {
  const file = await open(path, 'w+')
  process.on('exit', () => {
    file.close()
    unlink(path)
  })
  return file
}

describe('Check file exists function', () => {
  it('should exists', async () => {
    const fileName = 'testfile.txt'
    const testFile = await makeTempFile(fileName)
    assert.doesNotThrow(() => {
      checkExists(fileName)
    })
  })
  
  it('should not exists', () => {
    const fileName = 'unxisting file.txt'
    assert.throws(
      () => {
        checkExists(fileName)
      },
      new RegExp(fileUnexists({path: resolve(fileName)}))
    )
  })
})

describe('Check .yh extension function', () => {
  it('should not change path', () => {
    const path = 'testfile.yh'
    const newFilePath = checkYahaExt(path)
    assert.equal(newFilePath, path)
  })
  
  it('should append ".yh" to path', () => {
    const path = 'testfile'
    const newFilePath = checkYahaExt(path)
    assert.equal(newFilePath, path + '.yh')
  })
})

describe('Read function', async () => {
  it('should to read file with ".yh" extension', async () => {
    const content = 'func main() {}'
    const path = 'testprog.yh'
    const testFile = await makeTempFile(path)
    testFile.write(content)
    assert.equal(content, await readYahaFile(path))
  })
  
  it('should to read file without ".yh" extension', async () => {
    const content = 'func main() {}'
    const path = 'testprog2'
    const yhPath = path + '.yh'
    const testFile = await makeTempFile(yhPath)
    testFile.write(content)
    assert.equal(content, await readYahaFile(path))
    unlink(yhPath)
  })
})
