import assert from 'assert'
import { combineSteps, Step } from '../src/compiler/steps'

describe('Compilation steps', () => {
  it('should return "foobar30"', () => {
    const foo: Step<number, string> = (arg) => {
      return String(arg + 5)
    }
    
    const bar: Step<string, string> = (arg) => {
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