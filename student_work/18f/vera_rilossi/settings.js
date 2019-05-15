/*
    global variables
*/
var speed = 6;
var GRAVITY = 1;
var gameWidth = 640;
var gameHeight = 360;

//tracking progress
var progress = 0;
var progressTotal = 300;
var level = 0;
var levelCount = 2;

// player
var player;
var jump_speed = speed * 3;
var playerXStart = 100;
var playerYStart = 200;

// platform 
var platformXStart = playerXStart + 80;
var platformYStart = gameHeight - 100;
var numPlatforms = 3;
var platformYChange = 10;
var platformMax = gameHeight - 10;
var platformSpeed = speed;

// scenery 
var numClouds = 2;
var cloudSpeed = speed * 0.05;
var cloudYMin = 50;
var cloudYMax = 150;

var numTrees = 8;
var treeSpeed = speed * 0.1;
var treeYMin = gameHeight - 50;
var treeYMax = gameHeight - 25;

var numBushes = 2;
var bushSpeed = speed * 0.1;
var bushYMin = gameHeight - 25;
var bushYMax = gameHeight - 25;

// obstacles
var numArrows = 1;
var arrowYMin = 150;
var arrowYMax = 250;
var arrowSpeed = speed * 1.5;

var rottenXMin = gameWidth;
var rottenXMax = gameWidth * 3;
var rottenYMin = 160;
var rottenYMax = 250;
var rottenSpeed = speed;

// rewards
var heartXMin = gameWidth;
var heartXMax = gameWidth * 3;
var heartYMin = 150;
var heartYMax = 250;
var heartSpeed = speed;

// anti gravity
var antiXMin = gameWidth;
var antiXMax = gameWidth * 2;
var antiYMin = 50;
var antiYMax = 150;
var antiSpeed = speed / 2;
var antiCounter = 0;
var antiDuration = 90;

