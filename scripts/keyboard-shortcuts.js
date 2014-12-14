var gui = global.window.nwDispatcher.requireNwGui();

module.exports = function(){
  var leftOption = {
    key : "Left",
    active : function() {
      var leftEvent = new window.CustomEvent('left', {});
      window.dispatchEvent(leftEvent);
    },
    failed : function(msg) {
      console.log(msg);
    }
  };
  var leftShortcut = new gui.Shortcut(leftOption);

  var rightOption = {
    key : "Right",
    active : function() {
      var rightEvent = new window.CustomEvent('right', {});
      window.dispatchEvent(rightEvent);
    },
    failed : function(msg) {
      console.log(msg);
    }
  };
  var rightShortcut = new gui.Shortcut(rightOption);


  gui.App.registerGlobalHotKey(leftShortcut);
  gui.App.registerGlobalHotKey(rightShortcut);
};
