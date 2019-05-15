//char animation
var idle_sheet, idle_animation;
var run_sheet, run_animation;
var jump_sheet, jump_animation;


//platform
var platforms;
var start_platform_img, platform_img;

//scene
var clouds, cloud_sheet, cloud_animation;
var trees, tree_img;

//obs
var arrows;
var arrow_sheet, arrow_animation;

var hearts;
var heart_sheet, heart_animation;

var fishs;
var fish_sheet, fish_animation;

var deathSound, startSound;
var heartSound;

var jumps = [ "sfx/jump.wav" ];
var jumpSounds = [];

var platformHits = [ "sfx/platform-hits.wav" ];
var platformHitSounds = []; // empty 
var jumpSounds = []; // empty

// bg music
var bgMusic;
var bgGame;


function preload() {
    
    idle_sheet = loadSpriteSheet("sprites/main_character/main_character_idle.png", 512, 512, 16);
    idle_animation = loadAnimation(idle_sheet);
    
    run_sheet = loadSpriteSheet("sprites/main_character/main_character_running.png", 300, 300, 6);
    run_animation = loadAnimation(run_sheet);
    
    jump_sheet = loadSpriteSheet("sprites/main_character/main_character_jumping.png", 300, 300, 12);
    jump_animation = loadAnimation(jump_sheet);
    
    platform_img = loadImage("sprites/scenery/platform.png");
    start_platform_img = loadImage("sprites/scenery/start_platform.png");
    
    cloud_sheet = loadSpriteSheet("sprites/scenery/cloud.png", 100, 100, 1);
    cloud_animation = loadAnimation(cloud_sheet);
    
    tree_img = loadImage("sprites/scenery/tree.png");
    arrow_sheet = loadSpriteSheet("sprites/obstacles/arrow.png", 32, 32, 3);
    
    arrow_animation = loadAnimation(arrow_sheet);
    
    heart_sheet= loadSpriteSheet("sprites/rewards/heart.png", 32, 32, 2);
    heart_animation = loadAnimation(heart_sheet);
   
	fish_sheet= loadSpriteSheet("sprites/rewards/fish.png", 32, 32, 3);
    fish_animation = loadAnimation(fish_sheet);
	 
	back_img = loadImage("sprites/scenery/back.png");
	endb_img = loadImage("sprites/scenery/endb.png");
	
   
    // load sounds 
    deathSound = loadSound("sfx/death.wav");
    heartSound = loadSound("sfx/heart.wav");
    startSound = loadSound("sfx/start.wav");
    
	
	
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
	   bgMusic = loadSound("music/tired.mp3");
    bgGame = loadSound("music/ga.mp3");
    
}


    