import assert from 'assert'
import { combineSteps } from '../src/compiler/steps'
import lexer from '../src/compiler/lexer'
import { Token, TokenType } from '../src/compiler/data'
import { unknownChar } from '../src/templates'

describe('Lexer', () => {
  const testRule = (source: string, tokenType: TokenType, assertValue = true) => {
    it(`testing ${tokenType} rule`, () => {
      const result = lexer(source)[0]
      assert.equal(result.type, tokenType)
      if (assertValue) assert.equal(result.value, source)
    })
  }
  
  it('should return array', () => {
    const expected: Token[] = [
      {
        type: TokenType.INTEGER,
        value: '1'
      },
      {
        type: TokenType.INTEGER,
        value: '2'
      },
      {
        type: TokenType.INTEGER,
        value: '3'
      }
    ]
    assert.deepEqual(lexer('1 2 3'), expected)
  })
  
  it ('should show error', () => {
    const char = '∆'
    assert.throws(
      () => {lexer(char)},
      new RegExp(unknownChar({ char }))
    )
  })
  
  testRule('\n', TokenType.EOF)
  testRule('47.343', TokenType.FLOAT)
  testRule('15', TokenType.INTEGER)
  testRule('"привет"', TokenType.STRING)
  testRule("'char'", TokenType.CHAR)
  testRule('func', TokenType.FUNC_KW)
  testRule('varName', TokenType.NAME)
  testRule('_var_name_', TokenType.NAME)
  testRule('varname5', TokenType.NAME)
  testRule('(', TokenType.L_BRACET)
  testRule(')', TokenType.R_BRACET)
  testRule('{', TokenType.L_BRACE)
  testRule('}', TokenType.R_BRACE)
  testRule('.', TokenType.DOT)
  testRule(',', TokenType.COMMA)
})
