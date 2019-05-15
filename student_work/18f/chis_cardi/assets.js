// player animations
var idle_sheet, idle_animation;
var run_sheet, run_animation;
var jump_sheet, jump_animation;
// platform
var platforms;
var start_platform_img, platform_img;
// scenery
//var clouds, cloud_sheet, cloud_animation;
var trees, tree_img;
// obstacles
var arrows; // group
var arrow_sheet, arrow_animation;
// rewards
var hearts; // group
var heart_sheet, heart_animation;
// sounds
var deathSound, startSound;
var heartSound;
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
    idle_sheet = loadSpriteSheet("sprites/main_character/main_character_idle.png", 240, 40, 1); //24,4,1  240,40,1
    idle_animation = loadAnimation(idle_sheet);
    run_sheet = loadSpriteSheet("sprites/main_character/main_character_running.png", 144, 54, 10); //240,90,10 280,270,10
    run_animation = loadAnimation(run_sheet);
    jump_sheet = loadSpriteSheet("sprites/main_character/main_character_jumping.png", 114, 36 , 29);//19,6  190, 60,29
    jump_animation = loadAnimation(jump_sheet);
    platform_img = loadImage("sprites/scenery/platform.png");
    start_platform_img = loadImage("sprites/scenery/platform.png");
    
    
    tree_img = loadImage("sprites/scenery/tree_1.png");
    arrow_sheet = loadSpriteSheet("sprites/obstacles/missle.png", 32, 32, 3);
    arrow_animation = loadAnimation(arrow_sheet);

    heart_sheet = loadSpriteSheet("sprites/rewards/apple.png", 32, 32, 3);
    heart_animation = loadAnimation(heart_sheet);


//    // load sounds 
//    deathSound = loadSound("sfx/death.wav");
//    startSound = loadSound("sfx/start.wav");
//    heartSound = loadSound("sfx/heart.wav");
//
//    // platform hits 
//    for (var i = 0; i < platformHits.length; i++) {
//        var s = loadSound(platformHits[i]);
//        platformHitSounds.push(s);
//    }
//
//    // jump sounds 
//    for (var i = 0; i < jumps.length; i++) {
//        var s = loadSound(jumps[i]);
//        jumpSounds.push(s);
//    }
}