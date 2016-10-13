var disect = require('disect')

module.exports = function tokenize (src, rules) {
  var len = src.length
  var tokens = []
  for (var i = 0, j = 0; i < len; i=j) {
    j = disect(i, len, fn)
    if (j === 0 || i === j) throw new Error('could not tokenize')
    var s = src.slice(i,j)
    var rule = getRule(s)
    if (!rule) throw new Error('no match')
    var token = { type: rule.type, source: s }
    if (rule.children) {
      var m = rule.regex.exec(s)
      token.children = []
      for (var k = 1; m && k < m.length && k-1 < rule.children.length; k++) {
        token.children.push(tokenize(m[k], rule.children[k-1]))
      }
    }
    tokens.push(token)
  }
  return tokens

  function fn (ix) {
    return getRule(src.slice(i, ix+1)) === null
  }
  function getRule (str) {
    for (var i = 0; i < rules.length; i++) {
      if (rules[i].regex.test(str)) return rules[i]
    }
    return null
  }
}
