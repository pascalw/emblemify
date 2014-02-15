#!/bin/sh

set -eu

cd test/
npm link emblemify
node test.js
node browserify_test.js
node custom_extension_test.js

