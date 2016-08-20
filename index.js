var coffeescript = require('coffee-script');
var createFilter = require('rollup-pluginutils').createFilter;
var objectAssign = require('object-assign');
var extname = require('path').extname;

function compileOptions(id, options, literateExtensions) {
  if (literateExtensions.indexOf(extname(id) === -1)) {
    return options;
  } else {
    return objectAssign({}, options, { literate: true });
  }
}

function sourceMap(output) {
  if (output.v3SourceMap) {
    return JSON.parse(output.v3SourceMap);
  }
}

module.exports = function coffee(options) {
  options = objectAssign({
    sourceMap: true,
    bare: true,
    extensions: ['.coffee', '.litcoffee'],
    literateExtensions: ['.litcoffee', '.md']
  }, options || {});

  var filter = createFilter(options.include, options.exclude);
  var extensions = options.extensions;
  var literateExtensions = options.literateExtensions;
  delete options.extensions;
  delete options.literateExtensions;
  delete options.include;
  delete options.exclude;

  return {
    transform: function(code, id) {
      if (!filter(id)) return null;
      if (extensions.indexOf(extname(id)) === -1) return null;

      var output = coffeescript.compile(code, compileOptions(id, options, literateExtensions));
      return {
        code: output.js,
        map: sourceMap(output)
      };
    }
  };
};
