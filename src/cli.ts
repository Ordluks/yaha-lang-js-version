import { Command } from 'commander'
import { is } from 'ramda'
import pkg from '../package.json'
import { pathArgDescription, internalError } from './templates'
import { YahaError } from './errors'
import readYahaFile from './read'
import yahaCompiler from './compiler'

const app = new Command()

app.name('yaha')
app.version(pkg.version)

app.argument('[path]', pathArgDescription())
app.action(async (path: string) => {
  try {
    const source = await readYahaFile(path)
    yahaCompiler(source)
  } catch (error) {
    if (is(YahaError, error)) {
      console.log(error.message)
      process.exit(1)
    }
    console.log(internalError())
  }
})

const yahaCli = (argv: string[]) => {
  app.parse(argv)
}

export default yahaCli
