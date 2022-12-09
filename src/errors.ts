import { capitalize } from 'lodash'

export class YahaError extends Error {}

export class YahaFileError extends YahaError {}

export class YahaCompilerError extends YahaError {
  constructor(message: string, stepName: string) {
    super(`[${capitalize(stepName)}Error] - ${message}`)
  }
}
