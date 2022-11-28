import assert from 'assert'
import { combineSteps } from '../src/compiler/steps'
import lexer from '../src/compiler/lexer'
import { Token, TokenType } from '../src/compiler/data'

const assetTokens = (tokens: Token[]) => {
  console.log(tokens)
}

describe('Lexer', () => {
  it('should return array of tokens', () => {
    lexer('')
  })
  
  it ('should throw error', () => {
    try {
      lexer('∆')
      assert.fail()
    } catch (error) {
      console.log(error.message)
      assert.ok(true)
    }
  })
  
  it('integer', () => {
    assetTokens(lexer('45 8 1993'))
  })
})
