/*
    global variables
*/
var speed = 6;
var GRAVITY = 1;
var gameWidth = 640;
var gameHeight = 360;

// tracking progress
var progress = 0;
var progressTotal = 200;
var level = 0;
var levelCount = 2;

var slowDownCounter = 0;

// player
var player;
var jump_speed = speed * 3;
var playerXStart = 80;
var playerYStart = 200;

// platform 
var platformXStart = playerXStart + 80;
var platformYStart = gameHeight - 90;
var numPlatforms = 3;
var platformYChange = 100;
var platformMax = gameHeight - 20
var platformSpeed = speed;

// scenery 
var numClouds = 3;
var cloudSpeed = speed * 0.05;
var cloudYMin = 10;
var cloudYMax = 35;

var numFlames = 4;
var flameSpeed = speed * 0.01;
var flameYMin = gameHeight - 12;
var flameYMax = gameHeight - 12;

// obstacles
var numBottles = 1;
var bottleYMin = 150;
var bottleYMax = 250;
var bottleSpeed = speed * 2;

//rewards
var soulXMin = gameWidth;
var soulXMax = gameWidth * 3;
var soulYMin = 150;
var soulYMax = 250;
var soulSpeed = speed;

// wings
var flyXMin = gameWidth;
var flyXMax = gameWidth * 2;
var flyYMin = 50;
var flyYMax = 150;
var wingSpeed = speed / 2;
var wingCounter = 0;
var fallCounter = 0;
var fallDuration = 80;
var wingDuration = 100;