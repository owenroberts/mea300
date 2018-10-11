/*
    global variables
*/
var speed = 6;
var GRAVITY = 1;
var gameWidth = 640;
var gameHeight = 360;

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








