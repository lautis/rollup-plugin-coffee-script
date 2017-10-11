# rollup-plugin-coffee-script
[![Build Status](https://travis-ci.org/lautis/rollup-plugin-coffee-script.svg?branch=master)](https://travis-ci.org/lautis/rollup-plugin-coffee-script)

Integration between Rollup and CoffeeScript 2.

## Why?

Allow CoffeeScript code to be included in Rollup bundles without introducing an
additional build step.

## Installation

```bash
npm install --save-dev rollup-plugin-coffee-script
```

## Usage

```js
// rollup.config.js
import coffeescript from 'rollup-plugin-coffee-script';

export default {
  input: 'main.coffee',

  plugins: [
    coffeescript()
  ]
}
```

CoffeeScript plugin accepts `options.include` and `options.exclude` (each a
minimatch pattern, or array of minimatch patterns) to determine which files are
compiled by CoffeeScript. By default, all files are transpiled.

## Integration with CommonJS modules

The CoffeeScript plugin doesn't resolve requires. Instead,
use `rollup-plugin-commonjs` and add `.coffee` to extensions.

```js
import { rollup } from 'rollup';
import commonjs from 'rollup-plugin-commonjs';
import coffee from 'rollup-plugin-coffee-script';
import nodeResolve from 'rollup-plugin-node-resolve';

rollup({
  input: 'main.coffee',
  plugins: [
    coffee(),
    nodeResolve({ extensions: ['.js', '.coffee'] })
    commonjs({
      extensions: ['.js', '.coffee']
    })
  ]
}).then(...)
```
