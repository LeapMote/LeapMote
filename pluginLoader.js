module.exports = function (cb){

  var plugins = [];
  var pluginsDirectory = path.join(__dirname, 'plugins');
  logger.info('loading plugins ...');
  fs.readdir(pluginsDirectory, function(err, content){
    if (err){
      return cb(err, null);
    }
    content.forEach(function(plugin){
      var currentDir = path.join(pluginsDirectory, plugin);
      var pjson = require(path.join(currentDir, '/package.json'));
      logger.info('loading %s ...', pjson.name);
      plugins.push(require(path.join(currentDir, pjson.main)));
    });
    return cb(null, plugins);
  });
}
