import assert from 'assert';
import rollup from 'rollup';
import commonjs from 'rollup-plugin-commonjs';
import coffeePlugin from '..';
import coffee from 'coffee-script';
import fs from 'fs';

process.chdir(__dirname);

describe('rollup-plugin-coffeescript', function() {
  this.timeout(5000);

  it('runs code through coffeescript', () => {
    const entry = 'sample/basic/main.coffee';
    const source = fs.readFileSync(entry).toString();

    return rollup.rollup({
      entry: entry,
      plugins: [coffeePlugin()]
    }).then(function(bundle) {
      const generated = bundle.generate();
      const coffeeOutput = coffee.compile(source, { bare: true });
      assert.equal(generated.code.trim(), coffeeOutput.trim());
    });
  });

  it('works with requires when used with commonjs plugin', () => {
    const entry = 'sample/import-class/main.coffee';
    const source = fs.readFileSync(entry).toString();

    return rollup.rollup({
      entry: entry,
      plugins: [coffeePlugin(), commonjs({ extensions: ['.coffee']})]
    }).then(function(bundle) {
      const generated = bundle.generate();
      const code = generated.code;
      assert.ok(code.indexOf('class') === -1, code);
      assert.ok(code.indexOf('var A = __commonjs(') !== -1, code);
    });
  });
});
