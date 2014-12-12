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
		var red = e.detail.red,
			green = e.detail.green,
			blue = e.detail.blue,
			br = e.detail.br;

		if(br==0)
			state = lightState.create().off().rgb(red, green, blue).brightness(br);
		else if(-1==red)
			state = lightState.create().on().effect('colorloop');	
		else				
			state = lightState.create().on().rgb(red, green, blue).brightness(br);						
		api.setLightState(2, state).done
	},
};
