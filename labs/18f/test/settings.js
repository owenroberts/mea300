/* game settings */
var player;
var speed = 6;
var jump_speed = speed * 3;
var GRAVITY = 1;

/* levels */
var counter = 0;
var nextLevel = 100;

var gameWidth = 640;
var gameHeight = 360;

// platforms
var numPlatforms = 3;
var platformYStart = 250;
var platformXStart = 640;
var platformYChange = 10;
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
var arrowYMin = 150;
var arrowYMax = 250;

// rewards
var heartXStart = gameWidth;
var heartYMin = 100;
var heartYMax = 200;
var heartSpeed = speed * 0.5;