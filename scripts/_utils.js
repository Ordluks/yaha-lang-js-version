const { readFile, writeFile } = require('fs/promises')
const { partialRight } = require('lodash')

const readFileAsText = partialRight(readFile, 'utf-8')

const readJSON = async (path) => JSON.parse(await readFileAsText(path))

module.exports = {
  readFileAsText,
  readJSON
}
