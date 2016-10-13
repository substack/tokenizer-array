var test = require('tape')
var tokenizer = require('../')
var rules = [
  { type: 'string', regex: /^"([^"]*)"?$/, children: [ [
    { type: 'word', regex: /^\w+$/ },
    { type: 'whitespace', regex: /^\s+$/ },
    { type: 'variable', regex: /^\$\w*$/ }
  ] ] },
  { type: 'identifier', regex: /^\w+$/ },
  { type: 'whitespace', regex: /^\s+$/ },
  { type: 'operator', regex: /^[-+=*\/.();]$/ },
]
var expected = [
  { type: 'identifier', source: 'x' },
  { type: 'operator', source: '=' },
  { type: 'string', source: '"hello $xyz world"', children: [ [
    { type: 'word', source: 'hello' },
    { type: 'whitespace', source: ' ' },
    { type: 'variable', source: '$xyz' },
    { type: 'whitespace', source: ' ' },
    { type: 'word', source: 'world' }
  ] ] }
]

test('children', function (t) {
  var src = 'x="hello $xyz world"'
  var tokens = tokenizer(src, rules)
  t.deepEqual(tokens, expected)
  t.end()
})
