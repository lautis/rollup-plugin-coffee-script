# rollup-plugin-coffee-script
![travis-ci](https://travis-ci.org/lautis/rollup-plugin-coffee-script.svg?branch=master)

Integration between Rollup and CoffeeScript.

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
  entry: 'main.coffee',

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

rollup({
  entry: 'main.coffee',
  plugins: [
    coffee(),
    commonjs({
      extensions: ['.js', '.coffee']
    })
  ]
}).then(...)
```
