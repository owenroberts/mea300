/* game settings */
var player;
var speed = 6;
var jump_speed = speed * 3;
var GRAVITY = 1;

var gameWidth = 640;
var gameHeight = 360;

// platforms
var numPlatforms = 3;
var platformYStart = 300;
var platformXStart = 512;
var platformYChange = 100;
var platformSpeed = speed;

// scenery 
var numClouds = 2;
var cloudY = 100;
var cloudSpeed = speed / 12;

var numTrees = 10;
var treeYPositionMin = gameHeight - 100;
var treeYPositionMax = gameHeight - 30;
var treeSpeed = speed/8;

// obstacles 
var numArrows = 1;
var arrowDistanceMin = gameWidth;
var arrowDistanceMax = gameWidth * 3;
var arrowSpeed = speed * 3;