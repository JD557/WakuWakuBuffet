function get2dContext() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  return ctx;
}

const btn1 = 65; // A
const btn2 = 90; // Z

var btn1Pressed = false;
var btn2Pressed = false;

function baseKeyHandler(e) {
    if (e.keyCode == btn1) {
      btn1Pressed = e.type == 'keydown';
    }
    else if (e.keyCode == btn2) {
      btn2Pressed = e.type == 'keydown';
    }
}

var btn1Callback = function() {console.log("btn1");};
var btn2Callback = function() {console.log("btn2");};
var btn12Callback = function() {console.log("both");};

onkeyup = function(e) {
  e = e || event;
  baseKeyHandler(e);
}

onkeydown = function(e) {
  e = e || event;
  if (!(e.keyCode == btn1 && btn1Pressed) && !(e.keyCode == btn2 && btn2Pressed)) { // Ignore key repeat
    baseKeyHandler(e);
    if (btn1Pressed && btn2Pressed) {
      btn12Callback();
   }
    else {
      if (e.keyCode == btn1) {btn1Callback();}
    else if (e.keyCode == btn2) {btn2Callback();}
    }
  }
}
