/*
global variables
*/
var speed = 5;
var GRAVITY = 1;
var gameWidth = 640;
var gameHeight = 360;

/* tracking progress */
var progress = 0;
var progressTotal = 300;
var level = 0;
var levelCount = 2;

var slowDownCounter = 0;

//player
var player;
var jump_speed = 18;
var playerXStart = 320;
var playerYStart = 180;

// platform 
var platformXStart = playerXStart + 100;
var platformYStart = gameHeight - 100;
var numPlatforms = 3;
var platformYChange = 20;
var platformMax = gameHeight -20;
var platformSpeed = speed;

//scenery
var numBunnies = 3;
var bunnySpeed = speed * 0.05;
var bunnySizeMax = 0.5;
var bunnySizeMin = 0.2;

var numPlants = 10;
var plantSpeed = speed * 0.1;
var plantYMin = gameHeight - 20;
var plantYMax = gameHeight - 28;

// obstacles
var numFoxes = 1;
var foxYMin = 220;
var foxYMax = 230;
var foxSpeed = speed * 1.6;

// rewards
var heartXMin = gameWidth;
var heartXMax = gameWidth * 3;
var heartYMin = 150;
var heartYMax = 250;
var heartSpeed = speed;

// rabbit gravity
var rabbitXMin = gameWidth;
var rabbitXMax = gameWidth * 2;
var rabbitYMin = 50;
var rabbitYMax = 150;
var rabbitSpeed = speed / 2;
var rabbitCounter = 0;
var rabbitDuration = 200;
