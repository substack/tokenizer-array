# tokenizer-array

general purpose regex tokenizer that returns an array of tokens

This module is based on [Floby's node-tokenizer][1], but returns an array
instead of a stream.

[1]: https://github.com/Floby/node-tokenizer

# example

``` js
var tokenizer = require('tokenizer-array')
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
var src = process.argv[2]
var tokens = tokenizer(src, rules)

tokens.forEach(function (token) {
  console.log(JSON.stringify(token))
})
```

output:

```
$ node c.js 'float b=c+2;'
{"type":"identifier","source":"float"}
{"type":"whitespace","source":" "}
{"type":"identifier","source":"b"}
{"type":"operator","source":"="}
{"type":"identifier","source":"c"}
{"type":"operator","source":"+"}
{"type":"number","source":"2"}
{"type":"operator","source":";"}
```

# api

``` js
var tokenizer = require('tokenizer-array')
```

## var tokens = tokenizer(src, rules)

Return an array of `tokens` by parsing a string `src` with an array of `rules`.

Each `rule` in `rules` should have:

* `rule.regex` - a pattern to match
* `rule.type` - a string label

# install

```
npm install tokenizer-array
```

# license

BSD
