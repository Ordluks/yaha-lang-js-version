import { Command } from 'commander'
import pkg from '../package.json'
import readYahaFile from './read'
import yahaCompiler from './compiler'

const app = new Command()

app.name('yaha')
app.version(pkg.version)

app.argument('[path]', 'path to program file')
app.action(async (path: string) => {
  const source = await readYahaFile(path)
  yahaCompiler(source)
})

const yahaCli = (argv: string[]) => {
  app.parse(argv)
}

export default yahaCli
