var hue = require("node-hue-api");

module.exports = {
  setup: function(){
    this.logger.info('setting up');
  },
  colorChanged: function(oldValue, newValue){

  },
};
