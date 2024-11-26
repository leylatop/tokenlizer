class ASTNode {
  constructor(type, value) {
    this.type = type
    if(value) this.value = value
  }

  addChild(child) {
    if(!this.children) this.children = []
    this.children.push(child)
  }
}

module.exports = {
  ASTNode
}