/*
    global variables
*/
var speed = 6;
var GRAVITY = 1;
var gameWidth = 640;
var gameHeight = 360;

/* tracking progress */
var progress = 0;
var progressTotal = 300;
var level = 0;
var levelCount = 2;

var slowDownCounter = 0;

// player
var player;
var jump_speed = speed * 3;
var playerXStart = 80;
var playerYStart = 200;

// platform 
var platformXStart = playerXStart + 100;
var platformYStart = gameHeight - 100;
var numPlatforms = 3;
var platformYChange = 20;
var platformMax = gameHeight - 20;
var platformSpeed = speed;

// scenery 
var numClouds = 3;
var cloudSpeed = speed * 0.05;
var cloudYMin = 50;
var cloudYMax = 150;

var numTrees = 10;
var treeSpeed = speed * 0.1;
var treeYMin = gameHeight - 50;
var treeYMax = gameHeight - 25;

// obstacles
var numArrows = 1;
var arrowYMin = 150;
var arrowYMax = 250;
var arrowSpeed = speed * 2;

// rewards

// heart
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























