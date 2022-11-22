const prettier = require('prettier')
const glob = require('glob')
const { concat } = require('lodash')
const { writeFile } = require('fs/promises')
const { readFileAsText, readJSON } = require('./_utils.js')

const includeFiles = ['src/**/*.ts', 'scripts/*.js', 'webpack.config.js']

const getAllFilesPathes = (pattern) =>
  new Promise((resolve, reject) => {
    glob(pattern, (err, files) => {
      if (err) reject(err)
      resolve(files)
    })
  })

const formatAllFiles = async () => {
  const configFile = await prettier.resolveConfigFile('.prettierrc.json')
  const config = await readJSON(configFile)

  const allFiles = await includeFiles.reduce(async (acc, value) => {
    const filePathes = await getAllFilesPathes(value)
    return concat(await acc, filePathes)
  }, [])

  const formatingPromises = allFiles.map(async (value) => {
    const text = await readFileAsText(value)
    const formated = prettier.format(text, config)
    await writeFile(value, formated)
  })

  await Promise.all(formatingPromises)
  return allFiles.length
}

const format = async () => {
  try {
    const count = await formatAllFiles()
    console.log(`${count} files was formated by Prettier`)
  } catch (err) {
    console.log('Unable to format code')
  }
}

format()
