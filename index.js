const { parse } = require('./parse')
const { evaluate } = require('./evaluate')

const sourceCode = '6+1-3*4/2'
const ast = parse(sourceCode)
console.log(JSON.stringify(ast, null, 2))


const result = evaluate(ast)

console.log(result) // 14
