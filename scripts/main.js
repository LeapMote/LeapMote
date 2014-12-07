var loadPlugins = require('./pluginLoader.js');
var logger = require('./logger.js');
var FilterClass = require("./filter");
var path = require('path');

module.exports = function main(cb) {
  var pluginsDirectory = path.join(__dirname, '..', 'plugins');

  loadPlugins(pluginsDirectory, function(err, plugins) {
    if (err) {
      return logger.error(err);
    }
    logger.info('plugins successfully loaded');
    logger.info('initializing plugins ...');
    plugins.forEach(function(plugin) {
      logger.info('initializing %s ...', plugin.name);
      if (plugin.setup) {
        plugin.setup();
      }
    });
    if (cb)
      cb(plugins);
  });

  var f = new FilterClass.Filter();
  var pointer = window.document.getElementById('pointer');

  f.onHandPresent(function(data) {
    placePatate(data.X, data.Y);
    pointer.style.display = 'block';
  });
  f.onHandAbsent(function(data) {
    pointer.style.display = 'none';
  });
  f.onHandPosition(function(data) {
    placePatate(data.X, data.Y);
  });
  f.onClick(function() {
    click();
  });
  f.onSwipeLeft(function() {
    swipeLeft();
  });
  f.onSwipeRight(function() {
    swipeRight();
  });

  function placePatate(X, Y) {
    posX = window.innerWidth * X - (pointer.offsetWidth) / 2;
    posY = window.innerHeight * Y - (pointer.offsetHeight) / 2;
    pointer.style.top = posY + 'px';
    pointer.style.left = posX + 'px';
  }

  function click() {
    pointer.classList.add('click');
    console.log('click');
    // pointer.style.background='#ffaaaa';
    window.setTimeout(function() {
      pointer.classList.remove('click');
      // pointer.style.background = '#FF0000';
    }, 200);
  }

  function swipeLeft() {
    window.document.body.style.background = '#aaaaff';
    window.setTimeout(function() {
      window.document.body.style.background = 'white';
    }, 200);
    var leftEvent = new window.CustomEvent('left', {});
    window.dispatchEvent(leftEvent);
  }

  function swipeRight() {
    window.document.body.style.background = '#aaffaa';
    window.setTimeout(function() {
      window.document.body.style.background = 'white';
    }, 200);
    var rightEvent = new window.CustomEvent('right', {});
    window.dispatchEvent(rightEvent);
  }
}
