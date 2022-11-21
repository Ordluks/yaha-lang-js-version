const prettier = require("prettier")
const glob = require("glob")
const { concat } = require('lodash')
const { readFile, writeFile } = require('fs/promises')

const includeFiles = [
  'src/**/*.ts',
  'webpack.config.js'
]

const getAllFilesPathes = pattern => new Promise((resolve, reject) => {
  glob(pattern, (err, files) => {
    if (err) reject(err)
    resolve(files)
  })
})

const formatAllFiles = async () => {
  const configFile = await prettier.resolveConfigFile('.prettierrc.json')
  const config = JSON.parse(await readFile(configFile, 'utf-8'))
  
  const allFiles = await includeFiles.reduce(async (acc, value) => {
    const filePathes = await getAllFilesPathes(value)
    return concat(await acc, filePathes)
  }, [])
  
  const formatingPromises = allFiles.map(async (value) => {
    const text = await readFile(value, 'utf-8')
    const formated = prettier.format(text, config)
    writeFile(value, formated)
  })
  
  await Promise.all(formatingPromises)
  console.log(`${allFiles.length} files was formated by Prettier`)
}

formatAllFiles()
