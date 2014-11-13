var winston = require('winston');

module.exports = new (winston.Logger)({
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
});
