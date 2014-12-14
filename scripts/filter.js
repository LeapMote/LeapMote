var events = require('events');
var Leap = require('leapjs');
var logger = require('./logger.js');

var Filter = function() {
  filter = this;
  logger.info("Filter init");
  this.e = new events.EventEmitter();

  // Leap part

  var controller = new Leap.Controller({
    enableGestures: true,
    frameEventName: 'deviceFrame'
  })

  controller.loop(function(frame) {
    analyze(frame);

  });

  this.handPresent = false;
  this.lastSwipe = 0;
  this.lastClick = 0;

  this.lastHandEnter = 0;

}


Filter.prototype.onHandPresent = function(callback) {
  this.e.on("eventHandPresent", callback);
}

Filter.prototype.onHandAbsent = function(callback) {
  this.e.on("eventHandAbsent", callback);
}

Filter.prototype.onHandPosition = function(callback) {
  this.e.on("eventHandPosition", callback);
}

Filter.prototype.onClick = function(callback) {
  this.e.on("eventClick", callback);
}

Filter.prototype.onSwipeLeft = function(callback) {
  this.e.on("eventSwipeLeft", callback);
}

Filter.prototype.onSwipeRight = function(callback) {
  this.e.on("eventSwipeRight", callback);
}

function analyze(frame) {

  analyzeHand(frame.data.hands[0]);

  for (i = 0; i < frame.data.gestures.length; i++) {
    analyzeGesture(frame.data.gestures[i]);
  }
}

function analyzeHand(data) {

  if (data != undefined) {

    var XabsMax = 120; // Raise this to augment the physical detection limit
    var YabsMax = 80;
    var Ymin = 130; // Raw value the Leap cannot detect below

    raw = data.stabilizedPalmPosition
    X = (raw[0] + XabsMax) / (2 * XabsMax)
    if (X < 0) X = 0
    if (X > 1) X = 1

    Y = (-raw[1] + YabsMax) / (2 * YabsMax)
    Y = (2 * YabsMax - (raw[1]) + Ymin) / (2 * YabsMax)
    if (Y < 0) Y = 0
    if (Y > 1) Y = 1

    posObj = {
      X: Math.round(X * 1000) / 1000,
      Y: Math.round(Y * 1000) / 1000,
    }

    if (!filter.handPresent) {
      filter.e.emit("eventHandPresent", posObj);
      filter.handPresent = true;
      filter.lastHandEnter = Date.now();
    } else {
      filter.e.emit("eventHandPosition", posObj);
    }

  } else {
    if (filter.handPresent) {
      filter.e.emit("eventHandAbsent");
      filter.handPresent = false;
    }
  }
}

function analyzeGesture(gesture) {

  var debounceSwipe = 700;
  var debounceClick = 500;

  if (gesture.type == 'swipe' && gesture.state == 'start') {
    if (Date.now() - filter.lastSwipe < debounceSwipe) {
      return;
    }
    directionX = gesture.direction[0]
    if (directionX > 0.85) {
      filter.e.emit("eventSwipeRight");
    } else if (directionX < -0.85) {
      filter.e.emit("eventSwipeLeft");
    }
    filter.lastSwipe = Date.now();
  } else if (gesture.type == 'keyTap') {
    if (Date.now() - filter.lastClick < debounceClick || Date.now() - filter.lastSwipe < debounceClick || Date.now() - filter.lastHandEnter < debounceClick) {
      return;
    }
    filter.lastClick = Date.now();
    filter.e.emit("eventClick");
  }
}

module.exports.Filter = Filter;
