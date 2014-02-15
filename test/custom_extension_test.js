
var assert = require("assert");
var concat = require("concat-stream");
var fs = require("fs");
var emblemify = require("emblemify").configure({
  extensions: ["html"]
});

var templatePath = __dirname + "/custom.html";

fs.createReadStream(templatePath)
.pipe(emblemify(templatePath))
.pipe(concat(function(data) {
  assert(
    /emblemify compiled Handlebars template/.test(data.toString()),
    "The template should be compiled"
  );
}));


