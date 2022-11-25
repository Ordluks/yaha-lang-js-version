import { combineSteps } from './steps'
import lexer from './lexer'

const compiler = combineSteps(lexer)

export default compiler
