
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

// Set light state to 'on' with warm white value of 500 and brightness set to 100%
var red = 0,
	green = 0,
	blue = 255,
	br = 100;

state = lightState.create().on().rgb(red, green, blue).brightness(br);
//state = lightState.create().on().effect('colorloop');


// --------------------------
// Using a promise
api.setLightState(2, state)
    .then(displayResult)
    .done();

// --------------------------
/* Using a callback
api.setLightState(2, state, function(err, lights) {
    if (err) throw err;
    displayResult(lights);
});*/
