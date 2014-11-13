var path = require('path');
var fs = require('fs');
var logger = require('./logger.js');

module.exports = function (cb){

  var plugins = [];
  var pluginsDirectory = path.join(__dirname, 'plugins');
  logger.info('loading plugins from %s ...', pluginsDirectory);
  fs.readdir(pluginsDirectory, function(err, content){
    if (err){
      return cb(err, null);
    }
    content.forEach(function(plugin){
      var currentDir = path.join(pluginsDirectory, plugin);
      var pjson = require(path.join(currentDir, '/package.json'));
      logger.info('loading %s ...', pjson.name);
      var plugin = require(path.join(currentDir, pjson.main));
      plugin.controls = pjson.controls || {};
      plugin.name = pjson.name;
      plugins.push(plugin);
    });
    return cb(null, plugins);
  });
}
