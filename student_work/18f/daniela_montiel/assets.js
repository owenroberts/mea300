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
var trees;
var tree_files = [
"sprites/scenery/tree.png",
    "sprites/scenery/tree_1.png",
    "sprites/scenery/tree_2.png",
    "sprites/scenery/tree_3.png"
];
var tree_imgs = []; // empty

// obstacles
var arrows; // group
var arrow_sheet, arrow_animation;
var arrow_hit_sheet, arrow_hit_animation;

// rewards
var hearts; // group
var heart_sheet, heart_animation;

var antiClouds; // group
var anti_sheet, anti_animation;

// sounds
var deathSound, startSound;
var heartSound, antiSound;
var arrowHitSound;

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
    idle_sheet = loadSpriteSheet("sprites/main_character/main_character_idle.png", 89, 87, 1);
    idle_animation = loadAnimation(idle_sheet);

  run_sheet = loadSpriteSheet("sprites/main_character/main_character_running.png", 49, 64, 2);
    run_animation = loadAnimation(run_sheet);

    jump_sheet = loadSpriteSheet("sprites/main_character/main_character_jumping.png", 98, 95, 2);
    jump_animation = loadAnimation(jump_sheet);

    float_sheet = loadSpriteSheet("sprites/main_character/main_character_anti_gravity.png", );
    float_animation = loadAnimation(float_sheet);
    float_animation.frameDelay = 10;

    platform_img = loadImage("sprites/scenery/platform.png");
    start_platform_img = loadImage("sprites/scenery/starting_platform.png");

    cloud_sheet = loadSpriteSheet("sprites/scenery/cloud.png", 96, 96, 1);
    cloud_animation = loadAnimation(cloud_sheet);


    for (var i = 0; i < tree_files.length; i++) {
        var f = tree_files[i];
        var tree_img = loadImage(f);
        tree_imgs.push(tree_img);
    }


    arrow_sheet = loadSpriteSheet("sprites/obstacles/arrow.png", 94, 94, 4);
    arrow_animation = loadAnimation(arrow_sheet);

    arrow_hit_sheet = loadSpriteSheet("sprites/obstacles/arrow_hit.png", 87, 87, 5);
    arrow_hit_animation = loadAnimation(arrow_hit_sheet)

    // rewards 
    heart_sheet = loadSpriteSheet("sprites/rewards/heart.png", 35, 35, 1);
    heart_animation = loadAnimation(heart_sheet);

    anti_sheet = loadSpriteSheet("sprites/rewards/anti_gravity.png", 89, 87, 1);
    anti_animation = loadAnimation(anti_sheet);


        // load sounds 
    deathSound = loadSound("sfx/death.wav");
    startSound = loadSound("sfx/start.wav");
    heartSound = loadSound("sfx/heart.wav");
    antiSound = loadSound("sfx/anti-gravity.wav");
    //    
        // platform hits 
    for (var i = 0; i < platformHits.length; i++){
       var s = loadSound(platformHits[i]);
        platformHitSounds.push(s);
    }
    
    // jump sounds 
    for (var i = 0; i < jumps.length; i++) {
        var s = loadSound(jumps[i]);
         jumpSounds.push(s);
    }
     
    // loading music files
    bgMusic = loadSound("music/chopin.wav");
    bgGame = loadSound("music/bg.mp3");

}
