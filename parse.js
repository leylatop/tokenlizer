const { tokenize } = require('./tokenize')
const { toAst } = require('./toAst')

function parse(script) {
  const tokenReader = tokenize(script)
  const ast = toAst(tokenReader)
  return ast
}

module.exports = {
  parse
}
