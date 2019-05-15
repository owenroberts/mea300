// player animations
var idle_sheet, idle_animation;
var run_sheet, run_animation;
var jump_sheet, jump_animation;

// platform
var platforms;
var start_platform_img, platform_img;

// scenery
var cloudys, cloudy_sheet, cloudy_animation;
var trees, tree_img;

// obstacles
var wasps; // group
var wasp_sheet, wasp_animation;
var wasp_hit_sheet, wasp_hit_animation;
var fires; // group
var fire_sheet, fire_animation;

// rewards
var hot_dogs; // group
var hot_dog_sheet, hot_dog_animation;
var hot_dog_hit_sheet, hot_dog_hit_animation;

// sounds
var deathSound, startSound;
var heartSound;
var waspHitSound;
var hot_dogHitSound;

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
    idle_sheet = loadSpriteSheet("sprites/main_character/main_protagonist_idle.png", 128, 128, 8);
    idle_animation = loadAnimation(idle_sheet);

    run_sheet = loadSpriteSheet("sprites/main_character/main_protagonist_running.png", 128, 128, 6);
    run_animation = loadAnimation(run_sheet);

    jump_sheet = loadSpriteSheet("sprites/main_character/main_protagonist_jump.png", 128, 128, 30);
    jump_animation = loadAnimation(jump_sheet);

    platform_img = loadImage("sprites/scenery/platform.png");
    start_platform_img = loadImage("sprites/scenery/start_platform.png");

    cloudy_sheet = loadSpriteSheet("sprites/scenery/cloudy.png", 180, 180, 8);
    cloudy_animation = loadAnimation(cloudy_sheet);

    tree_img = loadImage("sprites/scenery/tree.png");

    wasp_sheet = loadSpriteSheet("sprites/obstacles/wasp.png", 128, 128, 6);
    wasp_animation = loadAnimation(wasp_sheet);
    
    wasp_hit_sheet = loadSpriteSheet("sprites/obstacles/wasp_hit.png", 128, 128, 5);
    wasp_hit_animation = loadAnimation(wasp_hit_sheet);
    
    // rewards
    hot_dog_sheet = loadSpriteSheet("sprites/rewards/hot_dog.png", 180, 180, 3);
    hot_dog_animation = loadAnimation(hot_dog_sheet);
    
    hot_dog_hit_sheet = loadSpriteSheet("sprites/rewards/hot_dog_hit.png", 180, 180, 9);
    hot_dog_hit_animation = loadAnimation(hot_dog_hit_sheet);
    
    fire_sheet = loadSpriteSheet("sprites/obstacles/fire.png", 180, 180, 6);
    fire_animation = loadAnimation(fire_sheet);
    
    // load sounds 
    deadSound = loadSound("sfx/dead.wav");
    startSound = loadSound("sfx/start.wav");
    heartSound = loadSound("sfx/heart.wav");
    waspHitSound = loadSound("sfx/wasp_hit.wav");
    hot_dogHitSound = loadSound("sfx/hot_dog_hit.wav");
    
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
    bgMusic = loadSound("music/chopin.mp3");
    bgGame = loadSound("music/bg.mp3");
    
}
