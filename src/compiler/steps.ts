import { capitalize } from 'lodash'
import { partialRight, pipe } from 'ramda'

export type Step<A, R> = (arg: A, err: ErrorRaiser) => R
export type ErrorRaiser = (msg: string) => never

export const combineSteps = (...steps: Step<any, any>[]) => {
  const preparedSteps = steps.map(step => {
    const raiseError: ErrorRaiser = (msg: string) => {
      console.log(`[${capitalize(step.name)}Error] - ${msg}`)
      process.exit()
    }
    
    return partialRight(step, [raiseError])
  })
  
  // @ts-ignore
  return pipe(...preparedSteps)
}
