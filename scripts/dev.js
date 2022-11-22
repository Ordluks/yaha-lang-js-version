const { partial } = require('lodash')
const prompts = require('prompts')
const { fork } = require('child_process')
const { createBundle } = require('./_webpack.js')

const createDevBundle = partial(createBundle, 'development')

const dev = async () => {
  const success = await createDevBundle()
  if (success) {
    const { argv } = await prompts({
      type: 'text',
      name: 'argv',
      message: 'Enter execution args'
    })
    console.log('Execute code')
    fork('./dist/bundle.js', argv.split(/\s+/))
  }
}

dev()
