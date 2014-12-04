var hue = require("node-hue-api");

module.exports = {
  setup: function(){
    this.logger.info('setting up');
  },
  colorChanged: function(e){
    this.logger.info(JSON.stringify(e.detail));
  },
};
