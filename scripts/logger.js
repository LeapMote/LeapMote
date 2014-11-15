var winston = require('winston');

// winston.loggers.options.transports = [
//   new (winston.transports.Console)({
//     colorize: true,
//   })
// ];

winston.setLevels({
  error: 3,
  warn: 2,
  info: 1,
  debug: 0
});

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'grey'
});

winston.cli();

var mainLogger = winston.loggers.add('main', {
  console: {
    label: 'main',
    colorize: true,
    timestamp: true
  }
});


module.exports = mainLogger;
