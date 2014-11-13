var loadPlugns = require('./pluginLoader.js');
var logger = require('./logger.js');

loadPlugns(function(err, plugins){
  if (err){
    return logger.error(err);
  }
  logger.info('plugins successfully loaded');
  logger.info('initializing plugins ...');
  plugins.forEach(function(plugin){
    logger.info('initializing %s ...', plugin.name);
    plugin.setup();
  });
});
