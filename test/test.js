var assert = require('assert');
var rollup = require('rollup');
var commonjs = require('rollup-plugin-commonjs');
var coffeePlugin = require('..');
var coffee = require('coffee-script');
var fs = require('fs');

process.chdir(__dirname);

describe('rollup-plugin-coffeescript', function() {
  this.timeout(5000);

  it('runs code through coffeescript', function() {
    var entry = 'sample/basic/main.coffee';
    var source = fs.readFileSync(entry).toString();

    return rollup.rollup({
      entry: entry,
      plugins: [coffeePlugin()]
    }).then(function(bundle) {
      var generated = bundle.generate();
      var coffeeOutput = coffee.compile(source, { bare: true });
      assert.equal(generated.code.trim(), coffeeOutput.trim());
    });
  });

  it('works with requires when used with commonjs plugin', function() {
    var entry = 'sample/import-class/main.coffee';
    var source = fs.readFileSync(entry).toString();

    return rollup.rollup({
      entry: entry,
      plugins: [coffeePlugin(), commonjs({ extensions: ['.coffee']})]
    }).then(function(bundle) {
      var generated = bundle.generate();
      var code = generated.code;
      assert.ok(code.indexOf('class') === -1, code);
      assert.ok(code.indexOf('var A = __commonjs(') !== -1, code);
    });
  });
});
