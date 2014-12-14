var path = require('path');
var fs = require('fs');
var winston = require('winston');
var logger = require('./logger.js');

module.exports = function(pluginsDirectory, cb) {

  var plugins = [];
  logger.info('loading plugins from %s ...', pluginsDirectory);
  fs.readdir(pluginsDirectory, function(err, content) {
    if (err) {
      return cb(err, null);
    }
    content.forEach(function(pluginDirectory) {
      var currentDir = path.join(pluginsDirectory, pluginDirectory);
      var pjsonPath = path.join(currentDir, '/package.json');
      if (!fs.existsSync(pjsonPath)) {
        logger.warn('ignore %s because of missing package.json', pluginDirectory);
        return;
      }
      var pjson = require(pjsonPath);
      logger.info('loading %s ...', pjson.name);
      var pluginPath = path.join(currentDir, pjson.main);
      if (!fs.existsSync(pluginPath)) {
        logger.warn('could not load %s', pluginPath);
        return;
      }
      var plugin = require(pluginPath);
      plugin.controls = pjson.controls || {};
      plugin.name = pjson.name || pluginDirectory;
      plugin.logger = winston.loggers.add(plugin.name, {
        console: {
          label: pjson.name,
          colorize: true,
          timestamp: true
        }
      });
      plugins.push(plugin);
    });
    return cb(null, plugins);
  });
}
