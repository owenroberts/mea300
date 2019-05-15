var idle_sheet, idle_animation;
var run_sheet, run_animation;
var jump_sheet, jump_animation;

// platform
var platforms;
var start_platform_img, platform_img;

// scenery
var clouds, cloud_sheet, cloud_animation;
var fisherbot_img, cloud_animation

// obstacles
var arrows; // group
var arrow_sheet, arrow_animation;

// rewards
var hearts; // group
var heart_sheet, heart_animation;

// sounds
var deathSound, startSound;
var heartSound;

var bg; 

// platform
var platformHits = [
    "sfx/platform-hits/hit-0.wav",
    "sfx/platform-hits/hit-2.wav"
]; // array 
var platformHitSounds = []; // empty 

// jump
var jumps = [
    "sfx/jumps/jump-0.wav",
    "sfx/jumps/jump-1.wav",
    "sfx/jumps/jump-2.wav",
    "sfx/jumps/jump-3.wav",
]; // array 
var jumpSounds = []; // empty 

function preload() {
 
    
    bg = loadImage ("background.jpg");
    
    powerstation_sheet = loadSpriteSheet("sprites/scenery/powerstation.png", 66, 66, 12);
    cloud_animation = loadAnimation(powerstation_sheet);
    
    //fisherbot_sheet = loadImage("sprites/scenery/fisherbot.png", 12, 12, 12); cloud_animation = loadAnimation(fisherbot_sheet)
    
    idle_sheet = loadSpriteSheet("sprites/main_character/main_character_idle.png", 77, 77, 18);
    idle_animation = loadAnimation(idle_sheet);

    run_sheet = loadSpriteSheet("sprites/main_character/main_character_running.png", 66, 66, 12);
    run_animation = loadAnimation(run_sheet);

    jump_sheet = loadSpriteSheet("sprites/main_character/main_character_jumping.png", 66, 66, 8);
    jump_animation = loadAnimation(jump_sheet);

    platform_img = loadImage("sprites/scenery/platform.png");
    start_platform_img = loadImage("sprites/scenery/start_platform.png");

    

    
    
    arrow_sheet = loadSpriteSheet("sprites/obstacles/squidbot.png", 66, 66, 3);
    arrow_animation = loadAnimation(arrow_sheet);

    battery_sheet = loadSpriteSheet("sprites/rewards/battery.png", 66, 66, 3);
    heart_animation = loadAnimation(battery_sheet);


    // load sounds 
    deathSound = loadSound("sfx/death.wav");
    startSound = loadSound("sfx/start.wav");
    heartSound = loadSound("sfx/heart.wav");
    platformHitSound = loadSound("sfx/platformhits.wav");
    jumpSound = loadSound("sfx/jump.wav");

  // loading music files
    bgMusic = loadSound("music/chopin.mp3");
    bgGame = loadSound("music/bg.mp3");
}