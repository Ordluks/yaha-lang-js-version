const Mocha = require('mocha')
const { getAllFilesPathes } = require('./_utils.js')

const includingTests = 'tests/**/*.test.ts'

const runningTests = async (mocha) =>
  new Promise((resolve) => {
    mocha.run(resolve)
  })

const test = async () => {
  process.env.TS_NODE_COMPILER_OPTIONS = '{"module": "commonjs"}'
  const mocha = new Mocha()

  const allTests = await getAllFilesPathes(includingTests)
  allTests.forEach((value) => mocha.addFile(value))

  console.log('Running tests')
  const failures = await runningTests(mocha)
  process.exitCode = failures ? 1 : 0
}

test()
