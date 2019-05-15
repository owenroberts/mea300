// player animation
var idle_sheet, idle_animation;
var run_sheet, run_animation;
var jump_sheet, jump_animation;
var float_sheet, float_animation;

// platform
var platforms;
var start_platform_img, platform_img;

//scenery
var bunnies, bunny_sheet, bunny_animation;
var plant, plant_img;
var moon, moon_img;
var mountain, mountain_img;

//obstacles
var foxes; //group
var fox_sheet, fox_animation;
var fox_hit_sheet, fox_hit_animation;

// rewards
var little_heart, little_heart_img;
var hearts; // group
var heart_sheet, heart_animation;
var heart_hit_sheet, heart_hit_animation;

var rabbits; //group
var rabbit_sheet, rabbit_animation;
var rabbit_hit_sheet, rabbit_hit_animation;

// sounds
var deathSound, startSound;
var heartSound, rabbitSound;
var foxHitSound;
var deathfox;
var deathfall;

// platform
var platformHits = [
    "sfx/platform-hits/hit1.wav",
    "sfx/platform-hits/hit3.wav"
]; // array 
var platformHitSounds = []; // empty 

// hurt
var hurt = [
    "sfx/hit/hurt1.wav",
    "sfx/hit/hurt2.wav",
]; // array 
var hurtSounds = []; // empty 

// jump
var jumps = [
    "sfx/jumps/jump1.wav",
    "sfx/jumps/jump2.wav",
]; // array 
var jumpSounds = []; // empty 

var powerup;
var bgGame;

/* font */
var myFont;

function preload() {

    idle_sheet = loadSpriteSheet("sprites/main_character/main_character_idle.png", 128, 128, 9);
    idle_animation = loadAnimation(idle_sheet);

    run_sheet = loadSpriteSheet("sprites/main_character/main_character_runnning.png", 128, 128, 8);
    run_animation = loadAnimation(run_sheet);

    jump_sheet = loadSpriteSheet("sprites/main_character/main_character_jumping.png", 128, 128, 9);
    jump_animation = loadAnimation(jump_sheet);

    float_sheet = loadSpriteSheet("sprites/main_character/main_character_br.png", 128, 128, 8);
    float_animation = loadAnimation(float_sheet);

    platform_img = loadImage("sprites/scenery/platform.png");
    start_platform_img = loadImage("sprites/scenery/start_platform.png");

    moon_img = loadImage("sprites/scenery/moon.png");

    plant_img = loadImage("sprites/scenery/plant.png");

    bunny_sheet = loadSpriteSheet("sprites/scenery/bunny.png", 100, 91, 6);
    bunny_animation = loadAnimation(bunny_sheet);

    fox_sheet = loadSpriteSheet("sprites/obstacles/fox.png", 127, 61, 12);
    fox_animation = loadAnimation(fox_sheet);

    fox_hit_sheet = loadSpriteSheet("sprites/obstacles/fox_hit.png", 123, 54, 8);
    fox_hit_animation = loadAnimation(fox_hit_sheet);

    deathfox_img = loadImage("death/fox.png");

    deathfall_img = loadImage("death/fall.png");

    //rewards
    little_heart_img = loadImage("sprites/rewards/little_heart.png");

    heart_sheet = loadSpriteSheet("sprites/rewards/heart.png", 30, 25, 5);
    heart_animation = loadAnimation(heart_sheet);

    heart_hit_sheet = loadSpriteSheet("sprites/rewards/heart_hit.png", 19, 9, 10);
    heart_hit_animation = loadAnimation(heart_hit_sheet);

    rabbit_sheet = loadSpriteSheet("sprites/rewards/rabbit.png", 46, 58, 16)
    rabbit_animation = loadAnimation(rabbit_sheet);

    rabbit_hit_sheet = loadSpriteSheet("sprites/rewards/rabbit_hit.png", 46, 58, 9)
    rabbit_hit_animation = loadAnimation(rabbit_hit_sheet);

    // load sounds 
    deathSound = loadSound("sfx/death.wav");
    startSound = loadSound("sfx/start.wav");
    heartSound = loadSound("sfx/heart.wav");
    rabbitSound = loadSound("sfx/rabbit.wav");
    foxHitSound = loadSound("sfx/fox_hit.wav");
    heartHitSound = loadSound("sfx/heart_hit.wav");

    // platform hits 
    for (var i = 0; i < platformHits.length; i++) {
        var s = loadSound(platformHits[i]);
        platformHitSounds.push(s);
    }

    // jump sounds 
    for (var i = 0; i < jumps.length; i++) {
        var s = loadSound(jumps[i]);
        jumpSounds.push(s);
    }

    // hit sounds 
    for (var i = 0; i < hurt.length; i++) {
        var s = loadSound(hurt[i]);
        hurtSounds.push(s);
    }

    // loading music files
    powerup = loadSound("music/power_up.wav");
    bgGame = loadSound("music/bg.wav");
}