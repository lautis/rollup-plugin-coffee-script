var coffeescript = require('coffee-script');
var createFilter = require('rollup-pluginutils').createFilter;
var objectAssign = require('object-assign');

module.exports = function coffee(options) {
  options = objectAssign({}, options || {}, { sourceMap: true, bare: true });

  var filter = createFilter(options.include, options.exclude);
  delete options.include;
  delete options.exclude;

  return {
    transform: function(code, id) {
      if (!filter(id)) return null;

      var output = coffeescript.compile(code, options);

      return {
        code: output.js,
        map: output.sourceMap
      };
    }
  };
};
