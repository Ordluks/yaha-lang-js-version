import { combineSteps } from './steps'
import lexer from './lexer'

const yahaCompiler = combineSteps(lexer)

export default yahaCompiler
