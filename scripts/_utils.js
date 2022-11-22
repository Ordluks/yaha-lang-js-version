const { readFile, writeFile } = require('fs/promises')
const { partialRight } = require('lodash')
const glob = require('glob')

const readFileAsText = partialRight(readFile, 'utf-8')

const readJSON = async (path) => JSON.parse(await readFileAsText(path))

const getAllFilesPathes = (pattern) =>
  new Promise((resolve, reject) => {
    glob(pattern, (err, files) => {
      if (err) reject(err)
      resolve(files)
    })
  })

module.exports = {
  readFileAsText,
  readJSON,
  getAllFilesPathes
}
