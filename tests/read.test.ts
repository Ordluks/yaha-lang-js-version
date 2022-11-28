import assert from 'assert'
import { writeFile, unlink } from 'fs/promises'
import readYahaFile from '../src/read'

const createTestFile = async (text: string) => {
  const fileName = 'testfile.yh'
  await writeFile(fileName, text, 'utf-8')
  return fileName
}

describe('Read function', () => {
  it('should to read file', async () => {
    const content = 'func main() {}'
    const testFile = await createTestFile(content)
    assert.equal(content, await readYahaFile(testFile))
    await unlink(testFile)
  })
})