/*jshint node: true*/

var fs = require("fs");
var assert = require("assert");

var emblemify = require("emblemify");
var Handlebars = require("emblemify/runtime");

Handlebars.registerHelper("upcase", function(s) {
  return s.toUpperCase();
});

var templatePath = __dirname + "/hello.emblem";
var exported = __dirname + "/compiled.js";

try {
  fs.unlinkSync(exported);
} catch (err) { }

fs.createReadStream(templatePath)
.pipe(emblemify(templatePath))
.pipe(fs.createWriteStream(exported))
.on("close", function() {
  var template = require(exported);
  var res = template({ msg: "hi!" });
  assert.equal(res, "<h1>HI!</h1>");
  console.log("ok");
});

