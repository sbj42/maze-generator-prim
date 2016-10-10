var cliDemoAlgorithm = require('@sbj42/maze-generator-dev').cliDemoAlgorithm;
var process = require('process');

var algorithm = require('../src/prim');

var width = process.argv.length > 2 ? process.argv[2] : null;
var height = process.argv.length > 3 ? process.argv[3] : null;

cliDemoAlgorithm('prim', algorithm, width, height);
