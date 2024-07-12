import { parse as p } from './ast/Parser';

export * from './syntaxImports'

const EXP_SYNTAX_CACHE = {}

const parse = function (exp) {
  let syntax = EXP_SYNTAX_CACHE[exp]
  if (!syntax) {
    syntax = p(exp)
    EXP_SYNTAX_CACHE[exp] = syntax
  }
  return syntax
}

const print = function (syntax, printer) {
  const ctx = syntax.getContext()
  ctx.setPrinter(printer)
  return syntax.toString()
}
const visit = function (syntax, visitor) {
  const ctx = syntax.getContext()
  ctx.setVisitor(visitor)
  return syntax.visit()
}

export { parse, print, visit };
