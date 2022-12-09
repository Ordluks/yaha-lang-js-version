import assert from 'assert'
import { writeFile, unlink } from 'fs/promises'
import readYahaFile from '../src/read'
import { YahaFileError } from '../src/errors'
import { invalidPath, fileUnexists } from '../src/templates'

describe('Read function', () => {
  const testRead = (filePath: string, withPath: string) => {
    it(`shoud to read file with "${withPath}"`, async () => {
      const content = 'func main() {}'
      await writeFile(filePath, content)
      assert.equal(await readYahaFile(withPath), content)
      unlink(filePath)
    })
  }
  
  it('shoud throw "invalid path" error', () => {
    const path = ''
    assert.rejects(
      () => readYahaFile(path),
      new YahaFileError(invalidPath({path}))
    )
  })
  
  it('shoud throw "file unexists" error', () => {
    const path = 'unexists.yh'
    assert.rejects(
      () => readYahaFile(path),
      new YahaFileError(fileUnexists({path}))
    )
  })
  
  testRead('testfile1.yh', 'testfile1.yh')
  testRead('testfile2.yh', 'testfile2')
})
