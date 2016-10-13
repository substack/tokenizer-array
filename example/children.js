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
var src = process.argv[2]
var tokens = tokenizer(src, rules)

tokens.forEach(function (token) {
  console.log(JSON.stringify(token))
})
