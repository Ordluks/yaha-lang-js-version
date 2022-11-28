import assert from 'assert'
import { combineSteps } from '../src/compiler/steps'

describe('Compilation steps', () => {
  it('should return "foobar30"', () => {
    const foo = (arg: number) => {
      return String(arg + 5)
    }
    
    const bar = (arg: string) => {
      return 'foobar' + arg
    }
    
    const result = combineSteps(foo, bar)(25)
    assert.equal(result, 'foobar30')
  })
  
  /*it('should show test error', () => {
    const test: Step<null, void> = (arg, raiseError) => {
      raiseError('error for test')
    }
    
    combineSteps(test)(null)
  })*/
})