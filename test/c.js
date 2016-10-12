var test = require('tape')
var tokenizer = require('../')
var rules = [
  { regex: /^\/\*([^*]|\*(?!\/))*\*\/$/, type: 'area comment' },
  { regex: /^\/\*([^*]|\*(?!\/))*\*?$/, type: 'area comment continue' },
  { regex: /^\/\/[^\n]*$/, type: 'line comment' },
  { regex: /^"([^"\n]|\\")*"?$/, type: 'quote' },
  { regex: /^'(\\?[^'\n]|\\')'?$/, type: 'char' },
  { regex: /^'[^']*$/, type: 'char continue' },
  { regex: /^#(\S*)$/, type: 'directive' },
  { regex: /^\($/, type: 'open paren' },
  { regex: /^\)$/, type: 'close paren' },
  { regex: /^\[$/, type: 'open square' },
  { regex: /^\]$/, type: 'close square' },
  { regex: /^{$/, type: 'open curly' },
  { regex: /^}$/, type: 'close curly' },
  { regex: /^([-<>~!%^&*\/+=?|.,:;]|->|<<|>>|\*\*|\|\||&&|--|\+\+|[-+*|&%\/=]=)$/,
      type: 'operator' },
  { regex: /^([_A-Za-z]\w*)$/, type: 'identifier' },
  { regex: /^[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/, type: 'number' },
  { regex: /^(\s+)$/, type: 'whitespace' },
  { regex: /^\\\n?$/, type: 'line continue' }
]
var expected = [
  { "type": "identifier", "source": "float" },
  { "type": "whitespace", "source": " " },
  { "type": "identifier", "source": "b" },
  { "type": "operator", "source": "=" },
  { "type": "identifier", "source": "c" },
  { "type": "operator", "source": "+" },
  { "type": "number", "source": "2" },
  { "type": "operator", "source": ";" }
]

test('c', function (t) {
  var src = 'float b=c+2;'
  var tokens = tokenizer(src, rules)
  t.deepEqual(tokens, expected)
  t.end()
})
