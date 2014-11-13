var fs = require('fs');
var path = require('path');
var winston = require('winston');
var pluginLoader = require('pluginLoader');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
  ],
  levels: {
    error: 3,
    warn: 2,
    info: 1,
    debug: 0
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'grey'
  }
})
