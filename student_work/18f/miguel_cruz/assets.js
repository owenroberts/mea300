// player animations
var idle_sheet, idle_animation;
var run_sheet, run_animation;
var jump_sheet, jump_animation;
var float_sheet, float_animation;

// platform
var platforms;
var start_platform_img, platform_img;

// scenery
var clouds, cloud_sheet, cloud_animation;
var flames, flame_sheet, flame_animation;

// obstacles
var bottles; // group
var bottle_sheet, bottle_animation;
var bottle_hit_sheet, bottle_hit_animation

//rewards
var souls; // group
var soul_sheet, soul_animation;
var soul_hit_sheet, soul_hit_animation;

var wings; // group
var wings_sheet, wings_animation;

// sounds
var deathSound, startSound;
var soulSound, wingsSound; 
var bottleHitSound;
var soulHitSound;

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

// bg music
var bgMusic;
var bgGame;

function preload() {
    idle_sheet = loadSpriteSheet("sprites/main_character/freddy_idle2.png", 128, 128, 16);
    idle_animation = loadAnimation(idle_sheet);

    run_sheet = loadSpriteSheet("sprites/main_character/freddy_running2.png", 128, 128, 6);
    run_animation = loadAnimation(run_sheet);

    jump_sheet = loadSpriteSheet("sprites/main_character/freddy_jumping3.png", 48, 108, 6);
    jump_animation = loadAnimation(jump_sheet);
    
    float_sheet = loadSpriteSheet("sprites/main_character/freddy_flying.png", 128, 128, 6);
    float_animation = loadAnimation(float_sheet);
    float_animation.frameDelay = 10;

    platform_img = loadImage("sprites/scenery/platform.png");
    start_platform_img = loadImage("sprites/scenery/start_platform.png");


    flame_sheet = loadSpriteSheet("sprites/scenery/flames2.png", 640, 32, 6);
    flame_animation = loadAnimation(flame_sheet);

    bottle_sheet = loadSpriteSheet("sprites/obstacles/bottle.png", 120, 120, 3);
    bottle_animation = loadAnimation(bottle_sheet);
    
    bottle_hit_sheet = loadSpriteSheet("sprites/obstacles/flame_hit.png", 32, 32, 4);
    bottle_hit_animation = loadAnimation(bottle_hit_sheet);
    
    cloud_sheet = loadSpriteSheet("sprites/scenery/cloud2.png", 64, 64, 12);
    cloud_animation = loadAnimation(cloud_sheet);
    
    nightmare = loadImage("nightmare.jpg");
    
    // rewards
    soul_sheet = loadSpriteSheet("sprites/rewards/soul.png", 32, 32, 1);
    soul_animation = loadAnimation(soul_sheet);
    
    soul_hit_sheet = loadSpriteSheet("sprites/rewards/soul_hit.png" , 32, 64, 8);
    soul_hit_animation = loadAnimation(soul_hit_sheet);
    
     wings_sheet = loadSpriteSheet("sprites/rewards/wings.png", 32, 32, 8);
    wings_animation = loadAnimation(wings_sheet);
    
    // load sounds 
    deathSound = loadSound("sfx/death.wav");
    startSound = loadSound("sfx/start.wav");
    soulSound = loadSound("sfx/soul.wav");
    wingsSound = loadSound("sfx/wingpowerup.wav");
    bottleHitSound = loadSound("sfx/flame_hit.wav");
    soulHitSound = loadSound("sfx/soul_hit.wav");
    
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
   
    // loading music files
    bgMusic = loadSound("music/horror.mp3");
    bgGame = loadSound("music/hurry.wav");
}