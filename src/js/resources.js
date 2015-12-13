function loadImage(path) {
  var img = new Image();
  img.src = path;
  return img;
}

var logoImg = loadImage('res/logo.png');
var scrollBgImg = loadImage('res/menuScroll.png');
var keyAImg = loadImage('res/keyA.png');
var keyZImg = loadImage('res/keyZ.png');
var plusImg = loadImage('res/plus.png');

var fullBarImg = loadImage('res/fullbar.png');
var emptyBarImg = loadImage('res/emptybar.png');
var capacityBarImg = loadImage('res/capacitybar.png');
var characterImg = loadImage('res/character.png');
var backgroundImg = loadImage('res/background.png');
var wcImg = loadImage('res/wc.png');
var droppedPlateImg = loadImage('res/dropped.png');
var chickenImg = loadImage('res/chicken.png');
var burgerImg = loadImage('res/burger.png');
var brocolliImg = loadImage('res/brocolli.png');

var wakuwakuSnd = new Audio('res/wakuwaku.ogg');
var readySnd = new Audio('res/ready.ogg');
