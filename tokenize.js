const RegExp = /([0-9]+)|(\+)|(\*)/g
const { NUMBER, PLUS, MULTIPLY } = require('./tokenTypes')
const tokenTypes = [NUMBER, PLUS, MULTIPLY]

/**token生成器 */
function* tokenizer(script) {
  while(true) {
    const result = RegExp.exec(script)
    if(!result) break
    const index = result.findIndex((item, index) => index > 0 && !!item)
    const token = {}
    token.type = tokenTypes[index - 1]
    token.value = result[0]
    yield token
  }
}

// 使用正则表达式进行tokenize
function tokenize(script) {
  let tokens = []
  for(let token of tokenizer(script)) {
    tokens.push(token)
  }

  const tokenReader = new TokenReader(tokens)
  return tokenReader
}



class TokenReader {
  constructor(tokens) {
    this.tokens = tokens
    this.pos = 0
  }

  reader() {
    if(this.pos < this.tokens.length) {
      return this.tokens[this.pos++]
    }

    return null
  }

  peek() {
    if(this.pos < this.tokens.length) {
      return this.tokens[this.pos]
    }

    return null
  }

  unread() {
    if(this.pos > 0) {
      this.pos--
    }
  }
}

exports.tokenize = tokenize