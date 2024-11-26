const nodeTypes = require('./nodeTypes')
function evaluate(node) {
  let result = 0

  switch (node.type) {
    case nodeTypes.Program:
      for (let child of node.children) {
        result = evaluate(child)
      }
      break
    case nodeTypes.Additive:
      result = evaluate(node.children[0]) + evaluate(node.children[1])
      break
    case nodeTypes.Multiplicative:
      result = evaluate(node.children[0]) * evaluate(node.children[1])
      break
    case nodeTypes.Numeric:
      result = parseFloat(node.value)
      break
  }
  return result
}

module.exports = {
  evaluate
}