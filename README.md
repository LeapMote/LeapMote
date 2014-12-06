leapRemoteProject
=================
1. installation
$ npm install node-hue-api

2. find bridge
var hue = require("node-hue-api");
var displayBridges = function(bridge) {
    console.log("Hue Bridges Found: " + JSON.stringify(bridge));
};
// --------------------------
// Using a promise
hue.locateBridges().then(displayBridges).done();
// --------------------------
// Using a callback
hue.locateBridges(function(err, result) {
    if (err) throw err;
    displayBridges(result);
});

3. create user
var HueApi = require("node-hue-api").HueApi;
var hostname = "192.168.1.99",
    newUserName = null // You can provide your own username value, but it is normally easier to leave it to the Bridge to create it
    userDescription = "device description goes here";
var displayUserResult = function(result) {
    console.log("Created user: " + JSON.stringify(result));
};
var displayError = function(err) {
    console.log(err);
};
var hue = new HueApi();
// --------------------------
// Using a promise
hue.registerUser(hostname, newUserName, userDescription)
    .then(displayUserResult)
    .fail(displayError)
    .done();
// --------------------------
// Using a callback (with default description and auto generated username)
hue.createUser(hostname, null, null, function(err, user) {
    if (err) throw err;
    displayUserResult(user);
});

4. it's alive
