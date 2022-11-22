const webpack = require('webpack')
const { resolve } = require('path')

const webpackCompile = (config) =>
  new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) reject(err)
      resolve(stats)
    })
  })

const createBundle = async (mode) => {
  const isDev = mode === 'development'
  console.log(`Building ${isDev ? 'fast ' : ''}application bundle...`)

  const config = require(resolve('webpack.config.js'))
  config.mode = mode

  const stats = await webpackCompile(config)

  console.log(
    stats.toString({
      assets: true,
      errors: true,
      warnings: true
    })
  )

  return !(stats.hasErrors() || stats.hasWarnings())
}

module.exports = {
  createBundle
}
