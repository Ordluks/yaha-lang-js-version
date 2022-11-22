const { partial } = require('lodash')
const { createBundle } = require('./_webpack.js')

const build = partial(createBundle, 'production')
build()
