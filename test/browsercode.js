
var Handlebars = require("emblemify/runtime");

Handlebars.registerHelper("upcase", function(s) {
  return s.toUpperCase();
});

var template = require("./hello.emblem");

document.body.innerHTML = template({
    msg: "hello"
});
