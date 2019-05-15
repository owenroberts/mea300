/*
    global variables
*/
var myScore = 0;
var fish = 10;
var speed = 6;
var GRAVITY = 1;
var gameWidth = 640;
var gameHeight = 360;

var slowDownCounter = 0;

/* tracking progress */


// player
var player;
var jump_speed = speed * 3;
var playerXStart = 80;
var playerYStart = 200;

// platform 
var platformXStart = playerXStart + 100;
var platformYStart = gameHeight - 100;
var numPlatforms = 3;
var platformYChange = 100;

// scenery 
var numClouds = 5;
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
var heartXMin = gameWidth;
var heartXMax = gameWidth * 3;
var heartYMin = 150;
var heartYMax = 250;
var heartSpeed = speed;

var numFish = 10;
var fishXMin = gameWidth;
var fishXMax = gameWidth * 2;
var fishYMin = 150;
var fishYMax = 250;
var fishSpeed = speed;












