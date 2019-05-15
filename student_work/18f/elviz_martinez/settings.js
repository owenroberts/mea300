/*
    global variables
*/
var speed = 6;
var GRAVITY = 1;
var gameWidth = 640;
var gameHeight = 360;

var counter = 0;
var duration = 200;

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

// Apartment
var ApartmentXStart = playerXStart + 100;
var ApartmentYStart = gameHeight - 100;
var numApartments = 3;
var ApartmentYChange = 100;
// scenery 
var numflyingrobot = 12;
var FlyingRobotSpeed = speed * 0.04;
var FlyingRobotYMin = 50;
var FlyingRobotYMax = 150;


// obstacles
var numArmoredScientist = 1;
var ArmoredScientistYMin = 150;
var ArmoredScientistYMax = 250;
var ArmoredScientistSpeed = speed * 2;

// var numlab = 1;
// var LabSpeed = speed * 0.1;
// var LabYMin = gameHeight - 250;
// var LabYMax = gameHeight - 225;

// Rewards
 var potionXMin = gameWidth;
 var potionXMax = gameWidth * 3;
 var potionYMin = 150;
 var potionYMax = 250;
 var  potionSpeed = speed/4;

 var heartXMin = gameWidth; 
 var heartXMax = gameWidth * 3;
 var heartYMin = 150; 
 var heartYMax = 250;
 var heartSpeed = speed; 