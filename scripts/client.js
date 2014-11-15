var FilterClass = require("./filter");

var f = new FilterClass.Filter();


f.onHandPresent(function(data) { console.log("HAND ON"); });
f.onHandAbsent(function(data) { console.log("HAND OFF"); });
//f.onHandPosition(function(data) { console.log(data); });
f.onClick(function(data) { console.log("CLICK"); });
f.onSwipeLeft(function(data) { console.log("SWIPE left"); });
f.onSwipeRight(function(data) { console.log("SWIPE right"); });

console.log("Client here");
