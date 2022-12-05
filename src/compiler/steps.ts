import { capitalize } from 'lodash'
import { partialRight, pipe } from 'ramda'

export const combineSteps =
  (firstStep: (arg: any) => any, ...steps: ((arg: any) => any)[]) =>
  (initial: Parameters<typeof firstStep>[0]) => {
    return [firstStep, ...steps].reduce((last, step) => {
      try {
        return step(last)
      } catch (error) {
        console.log(`[${capitalize(step.name)}Error] - ${error.message}`)
      }
    }, initial)
  }
