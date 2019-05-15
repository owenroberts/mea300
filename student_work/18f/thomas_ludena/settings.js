
/*
    global variables
*/
var speed = 6;
var GRAVITY = 1;
var gameWidth = 640;
var gameHeight = 360;

var bgX = 0;

var slowDownCounter = 0;

// player
var player;
var jump_speed = speed * 3;
var playerXStart = 80;
var playerYStart = 200;

// progress
var progress = 0;
var progressTotal = 300;
var level = 0;
var levelCount = 2;
var myGamePiece;
var myObstacles = [];
var myScore;

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

var numFisherbot = 5;
var fisherbotSpeed = speed * 0.05;
var fisherbotYMin = 50;
var fisherbotYMax = 150;

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

//Canvas
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var img = new Image();
img.src = "background.jpg"




