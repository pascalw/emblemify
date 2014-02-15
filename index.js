/*jshint node: true*/

var through = require('through');
var Handlebars = require("handlebars");
var Emblem = require('emblem');

var extensions = {
  emblem: 1
};

function emblemify(file) {
  if (!extensions[file.split(".").pop()]) return through();

  var buffer = "";

  return through(function(chunk) {
    buffer += chunk.toString();
  },
  function() {
    var js = Emblem.precompile(Handlebars, buffer);
    // Compile only with the runtime dependency.
    var compiled = "// emblemify compiled Handlebars template\n";
    compiled += "var Handlebars = require('emblemify/runtime');\n";
    compiled += "module.exports = Handlebars.template(" + js.toString() + ");\n";
    this.queue(compiled);
    this.queue(null);
  });

};

emblemify.configure = function(opts) {
  if (!opts || !opts.extensions) return emblemify;
  extensions = {};
  opts.extensions.forEach(function(ext) {
    extensions[ext] = 1;
  });
  return emblemify;
};

module.exports = emblemify;

