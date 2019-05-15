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
var platformYChange = 30;
var platformMax = gameHeight - 20;
var platformSpeed = speed;

// scenery 
var numCloudys = 3;
var cloudySpeed = speed * 0.05;
var cloudyYMin = 50;
var cloudyYMax = 150;

var numTrees = 10;
var treeSpeed = speed * 0.1;
var treeYMin = gameHeight - 50;
var treeYMax = gameHeight - 25;

// obstacles
var numWasps = 1;
var waspYMin = 150;
var waspYMax = 250;
var waspSpeed = speed * 2;
var numFires = 1;
var fireYMin = 150;
var fireYMax = 250;
var fireSpeed = speed * 2;

// rewards
var hot_dogXMin = gameWidth;
var hot_dogXMax = gameWidth * 3;
var hot_dogYMin = 150;
var hot_dogYMax = 250;
var hot_dogSpeed = speed;


