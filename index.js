var disect = require('disect')

module.exports = function (src, rules) {
  var len = src.length
  var tokens = []
  for (var i = 0, j = 0; i < len; i=j) {
    j = disect(i, len, fn)
    if (j === 0) throw new Error('could not tokenize')
    var s = src.slice(i,j)
    var rule = getRule(s)
    if (!rule) throw new Error('no match')
    tokens.push({ type: rule.type, source: s })
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
