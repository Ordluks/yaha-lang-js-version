export enum TokenType {
  SPACE = '_space',
  COMMENT = '_comment',
  EOF = 'eof',
  FLOAT = 'float',
  INTEGER = 'integer',
  STRING = 'string',
  CHAR = 'char',
  FUNC_KW = 'func_kw',
  NAME = 'name',
  L_BRACET = 'l_bracet',
  R_BRACET = 'r_bracet',
  L_BRACE = 'l_brace',
  R_BRACE = 'r_brace',
  DOT = 'dot',
  COMMA = 'comma'
}

export interface Token {
  type: TokenType
  value: string
}
