import { append, drop } from 'ramda'
import { Token, TokenType } from './data'
import { Step } from '.steps'

type LexicalRulesObject = Record<TokenType, string>

const lexicalRules: LexicalRulesObject = {
  [TokenType.SPACE]: '\\s+',
  [TokenType.INTEGER]: '[0-9]+'
}

const lexer: Step<string, Token[]> = (source, raiseError) => {
  const matchToken = (pos: number, rules: [string, string][]): Token => {
    if (rules.length === 0) {
      raiseError(`unknown character ${source[pos]}`)
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
    const tokensCopy = token.type[0] === '_' ? [...tokens] : append(token, tokens)
    return lexing(pos + token.value.length, tokensCopy)
  }
  
  return lexing()
}

export default lexer
