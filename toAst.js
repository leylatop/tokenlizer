const { ASTNode } = require('./ASTNode')
const nodeTypes = require('./nodeTypes')
const tokenTypes = require('./tokenTypes')

function toAst(tokenReader) {
  const node = new ASTNode(nodeTypes.Program)
  const child = additive(tokenReader)

  if (child !== null) {
    node.addChild(child)
  }
  return node
}

function additive(tokenReader) {
  const child1 = multiplicative(tokenReader)
  let node = child1
  let token = tokenReader.peek()

  if(child1 !== null && token !== null) {
    if(token.type === tokenTypes.PLUS) {
      token = tokenReader.reader()
      const child2 = additive(tokenReader)

      if(child2 !== null) {
        node = new ASTNode(nodeTypes.Additive)
        node.addChild(child1)
        node.addChild(child2)
      } else {
        throw new Exception("非法的加法表达式,需要右半部分")
      }
    }
  }

  return node
}

function multiplicative(tokenReader) {
  const child1 = primary(tokenReader)
  let node = child1
  let token = tokenReader.peek()

  if (child1 !== null && token !== null) {
    if (token.type === tokenTypes.MULTIPLY) {
      token = tokenReader.reader()
      const child2 = multiplicative(tokenReader)

      if (child2 !== null) {
        node = new ASTNode(nodeTypes.Multiplicative)
        node.addChild(child1)
        node.addChild(child2)
      } else {
        throw new Exception("非法的乘法表达式,需要右半部分")
      }
    }
  }
  return node
}


function primary(tokenReader) {
  let node = null
  const token = tokenReader.peek()

  if (token !== null) {
    if (token.type === tokenTypes.NUMBER) {
      node = new ASTNode(nodeTypes.Numeric, token.value)
      tokenReader.reader()
    }
  }

  return node
}
module.exports = {
  toAst
}