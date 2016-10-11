/* eslint-env node */
var webDemoAlgorithm = require('@sbj42/maze-generator-dev').webDemoAlgorithm;
var path = require('path');

webDemoAlgorithm('prim', path.join(__dirname, '../src/prim.js'), path.resolve('webdemo'));
