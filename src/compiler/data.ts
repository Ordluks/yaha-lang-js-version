export enum TokenType {
  SPACE = '_space',
  INTEGER = 'integer'
}

export interface Token {
  type: TokenType
  value: string
}
