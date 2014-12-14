var logger = require('./logger.js');
var FilterClass = require("./filter");
var fs = require('fs');
var keyboardShortcuts = require('./keyboard-shortcuts');

module.exports = function main(cb) {
	
	var plugins = [];
	var currentPlugin=0;
	
	var files = fs.readdirSync("plugins");
	
	files.forEach(function(file) {
		
		plugin = {
			name:file.split(".")[0],
			data:String(fs.readFileSync("plugins/"+file)),
		}
		plugins.push(plugin);
	});

  cb(plugins);
  
  loadPlugin(currentPlugin);
  
  function loadPlugin() {
	  for (i=0; i<plugins.length; i++) {
		  $('#plugin_'+plugins[i].name).hide();
	  }
	  $('#plugin_'+plugins[currentPlugin].name).show();
	  window.plugin = window.plugins['plugin_'+plugins[currentPlugin].name];
	  $('#title').html(window.plugin.title);
  }
  
  var gui = global.window.nwDispatcher.requireNwGui();

  var leftOption = {
    key : "Left",
    active : function() {
     swipeLeft();
    },
    failed : function(msg) {
      console.log(msg);
    }
  };
  var leftShortcut = new gui.Shortcut(leftOption);

  var rightOption = {
    key : "Right",
    active : function() {
      swipeRight();
    },
    failed : function(msg) {
      console.log(msg);
    }
  };
  var rightShortcut = new gui.Shortcut(rightOption);


  gui.App.registerGlobalHotKey(leftShortcut);
  gui.App.registerGlobalHotKey(rightShortcut);


  var f = new FilterClass.Filter();
  var pointer = window.document.getElementById('pointer');
  var pointerX;
  var pointerY;

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
	pointerX=window.innerWidth*X;
	pointerY=window.innerHeight*Y;
    posX = window.innerWidth * X - (pointer.offsetWidth) / 2;
    posY = window.innerHeight * Y - (pointer.offsetHeight) / 2;
    pointer.style.top = posY + 'px';
    pointer.style.left = posX + 'px';
  }

  function click() {
    pointer.classList.add('click');
    window.setTimeout(function() {
      pointer.classList.remove('click');
    }, 200);
    
    
    var res = [];

    var ele = window.document.elementFromPoint(pointerX,pointerY);
    while(ele && ele.tagName != "BODY" && ele.tagName != "HTML"){
        res.push(ele);
        ele.style.displayPrevious=ele.style.display;
        ele.style.display = "none";
        ele = window.document.elementFromPoint(pointerX,pointerY);
    }

    for(var i = 0; i < res.length; i++){
        res[i].style.display = res[i].style.displayPrevious;
    }
    
    if (res[1])
    res[1].click();
    
  }

  function swipeLeft() {
    if (currentPlugin > 0) {
		currentPlugin--;
		loadPlugin();
	}
  }

  function swipeRight() {
    if (currentPlugin < plugins.length-1) {
		currentPlugin++;
		loadPlugin();
	}
  }
  
}
