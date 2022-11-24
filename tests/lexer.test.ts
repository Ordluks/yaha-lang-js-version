import assert from 'assert'
import lexer from '../src/compiler/lexer'
import { Token, TokenType } from '../src/compiler/data'

const assetTokens = (tokens: Token[]) => {
  console.log(tokens)
}

describe('Lexer', () => {
  it('should return array of tokens', () => {
    lexer('')
  })
  
  it('integer', () => {
    assetTokens(lexer('45 8 1993'))
  })
})
