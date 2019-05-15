/*
    global variables
*/

var speed = 2;
var gameWidth = 640;
var gameHeight = 540;
var GRAVITY = .1;
var pollenMeter = 0;

//player
var player;
var player_speed = 30;
var playerXStart = 0;
var playerYStart = 270;
var jump_speed = 1;

var playerProgress = 0;
var newPlatformCounter = 0;
var newPlaformCount = 400;

//tracking progress
var progress = 0;
var progressTotal = 3;
var score = 0;

//levels
var level = 0;
var levelCount = 2;

//scenery
var numClouds = 3;
var cloudSpeed = -1;

//obstacles
var numWind = 2;
var windYMin = 100;
var windYMax = 340;
var windCount = 100;

var birdYMin = 10;
var birdYMax = 490;
var numBirds = 1;

//rewards
var pollenYMin = 150;
var heartYMax = 250;
var heartSpeed = speed;
