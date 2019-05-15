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
var trees, tree_img;
var bushes, bush_sheet, bush_animation;

// obstacles
var arrows; // group
var arrow_sheet, arrow_animation;
var arrow_hit_sheet, arrow_hit_animation;

var rottens;
var rotten_sheet, rotten_animation;
var rotten_hit_sheet, rotten_hit_animation;

// rewards
var hearts; // group
var heart_sheet, heart_animation;
var heart_hit_sheet, heart_hit_animation;

var antiClouds; // group
var anti_sheet, anti_animation;

// sounds
var deathSound, startSound;
var heartSound;
var arrowSound;
var antiSound;
var rottenSound;

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
    "sfx/jumps/jump-3.wav"
]; // array 
var jumpSounds = []; // empty 

//bg music
var bgMusic;
var bgGame;
var sequenceAnimation;

function preload() {
    // change all sizes using the main sizes given on piskel (lower sizes)
    idle_sheet = loadSpriteSheet("sprites/main_character/main_character_idle.png", 30, 40, 5);
    idle_animation = loadAnimation(idle_sheet);

    run_sheet = loadSpriteSheet("sprites/main_character/main_character_running.png", 30, 40, 6);
    run_animation = loadAnimation(run_sheet);

    jump_sheet = loadSpriteSheet("sprites/main_character/main_character_jumping.png", 30, 40, 6);
    jump_animation = loadAnimation(jump_sheet);
    //console.log(jump_animation)
    
     float_sheet = loadSpriteSheet("sprites/main_character/main_character_anti_gravity.png", 28, 40, 6);
    float_animation = loadAnimation(float_sheet);
    float_animation.frameDelay = 10;
    
       platform_img = loadImage("sprites/scenery/start_platform.png", 96, 96, 1);
    start_platform_img = loadImage("sprites/scenery/start_platform.png", 192, 18, 1);

    cloud_sheet = loadSpriteSheet("sprites/scenery/cloud.png", 160, 160, 1);
    cloud_animation = loadAnimation(cloud_sheet);

    tree_img = loadImage("sprites/scenery/tree.png");
    
    bush_sheet = loadSpriteSheet("sprites/scenery/bush.png", 60, 45, 7);
    bush_animation = loadAnimation(bush_sheet);
    bush_animation.frameDelay = 15;
    
    arrow_sheet = loadSpriteSheet("sprites/obstacles/arrow.png", 96, 96, 2);
    arrow_animation = loadAnimation(arrow_sheet);
    
    arrow_hit_sheet = loadSpriteSheet("sprites/obstacles/arrow_hit.png", 96, 96, 6);
    arrow_hit_animation = loadAnimation(arrow_hit_sheet);
    
    rotten_sheet = loadSpriteSheet("sprites/obstacles/rotten.png", 64, 64, 4);
    rotten_animation = loadAnimation(rotten_sheet);
    
    heart_sheet = loadSpriteSheet("sprites/rewards/heart.png", 64, 64, 4);
    heart_animation = loadAnimation(heart_sheet);
    
    anti_sheet = loadSpriteSheet("sprites/rewards/anti_gravity.png", 14, 46, 2);
    anti_animation = loadAnimation(anti_sheet);
    
    heart_hit_sheet = loadSpriteSheet("sprites/rewards/heart_hit.png", 36, 34, 5);
    heart_hit_animation = loadAnimation(heart_hit_sheet);
    
    rotten_hit_sheet = loadSpriteSheet("sprites/obstacles/rotten_hit.png", 64, 64, 5);
    rotten_hit_animation = loadAnimation(rotten_hit_sheet);
    
    sequenceAnimation = loadAnimation("sprites/scenery/tutorial0001.png",           "sprites/scenery/tutorial0002.png");
    sequenceAnimation.frameDelay = 10;
    
    sequenceAnimationDead = loadAnimation("sprites/scenery/died0001.png",           "sprites/scenery/died0002.png");
    sequenceAnimationDead.frameDelay = 10;

    
    
    // load sounds 
    deathSound = loadSound("sfx/death.wav");
    startSound = loadSound("sfx/start.wav");
    heartSound = loadSound("sfx/heart.wav");
    arrowSound = loadSound("sfx/arrow.wav");
    rottenSound = loadSound("sfx/rotten.wav");
    antiSound = loadSound("sfx/anti-gravity.wav");
    
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
    
    //loading music files
    bgMusic = loadSound("music/song.wav");
    bgGame = loadSound("music/bg.wav");
}


