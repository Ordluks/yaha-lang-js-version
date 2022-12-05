import { append, drop } from 'ramda'
import { Token, TokenType } from './data'
import { unknownChar } from '../templates'

type LexicalRulesObject = Record<TokenType, string>

const lexer = (source: string): Token[] => {
  const lexicalRules: LexicalRulesObject = {
    [TokenType.EOF]: '\\n',
    [TokenType.SPACE]: '\\s+',
    [TokenType.COMMENT]: '\\/\\/.*$',
    [TokenType.FLOAT]: '[0-9]+\\.[0-9]+',
    [TokenType.INTEGER]: '[0-9]+',
    [TokenType.STRING]: '".*"',
    [TokenType.CHAR]: "'.*'",
    [TokenType.FUNC_KW]: 'func',
    [TokenType.NAME]: '[a-zA-Z_]+[a-zA-Z0-9_]+',
    [TokenType.L_BRACET]: '\\(',
    [TokenType.R_BRACET]: '\\)',
    [TokenType.L_BRACE]: '\\{',
    [TokenType.R_BRACE]: '\\}',
    [TokenType.DOT]: '\\.',
    [TokenType.COMMA]: ','
  }

  const matchToken = (pos: number, rules: [string, string][]): Token => {
    if (rules.length === 0) {
      throw unknownChar({ char: source[pos] })
    }

    const [tokenType, pattern] = rules[0]
    const regex = new RegExp('^' + pattern)
    const result = source.slice(pos).match(regex)

    if (result && result[0]) {
      return {
        type: tokenType as TokenType,
        value: result[0]
      }
    }

    return matchToken(pos, drop(1, rules))
  }

  const lexing = (pos = 0, tokens: Token[] = []): Token[] => {
    if (pos >= source.length) return tokens
    const token = matchToken(pos, Object.entries(lexicalRules))
    const tokensCopy =
      token.type[0] === '_' ? [...tokens] : append(token, tokens)
    return lexing(pos + token.value.length, tokensCopy)
  }

  return lexing()
}

export default lexer
