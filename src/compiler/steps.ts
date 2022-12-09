import { is } from 'ramda'
import { YahaCompilerError } from '../errors'

export const combineSteps =
  (firstStep: (arg: any) => any, ...steps: ((arg: any) => any)[]) =>
  (initial: Parameters<typeof firstStep>[0]) => {
    return [firstStep, ...steps].reduce((last, step) => {
      try {
        return step(last)
      } catch (error) {
        throw is(String, error) ? new YahaCompilerError(error, step.name) : error
      }
    }, initial)
  }
