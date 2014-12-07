var hue = require("node-hue-api"),
HueApi = hue.HueApi,
lightState = hue.lightState;

var displayResult = function(result) {
	console.log(JSON.stringify(result, null, 2));
};

var host = "192.168.1.99",
username = "1ce4f66515af39672026123122691893",
api = new HueApi(host, username),
state;

module.exports = {
	setup: function(){
		this.logger.info('setting up');
	},
	colorChanged: function(e){
		this.logger.info('New HUE : '+e.detail.red+','+e.detail.green+','+e.detail.blue+','+e.detail.br);
		state = lightState.create().on().rgb(e.detail.red, e.detail.green, e.detail.blue).brightness(e.detail.br);
		api.setLightState(2, state)
		.then(displayResult)
		.done();
	},
};
