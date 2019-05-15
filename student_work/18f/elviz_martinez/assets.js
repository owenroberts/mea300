// intro animation
var IntroSprite, Intro_sheet, Intro_animation;

// outro animation
var outroSprite, outro_sheet, outro_animation;

// player animations
var idle_sheet, idle_animation;
var run_sheet, run_animation;
var jump_sheet, jump_animation;

// Antivenom animations 

var idle_sheet_a, idle_animation_a;
var run_sheet_a, run_animation_a;
var jump_sheet_a, jump_animation_a;

// Carnage animations 
var idle_sheet_c, idle_animation_c;
var run_sheet_c, run_animation_c;
var jump_sheet_c, jump_animation_c;

// Reward
var hearts; // group
var heart_sheet, heart_animation;

// platform
var platforms;
var start_platform_img, platform_img;
var platform_sheet, platform_animation;
// scenery
var FlyingRobots, FlyingRobots_sheet, FlyingRobots_animation;

// apartment
var apartment, apartment_img;

// Health 
var health,health_img; 

// obstacles
var ArmoredScientist; // group
var ArmoredScientist_sheet, ArmoredScientist_animation;

//var Labs;
//var Lab, Lab_img;

// rewards 
var potions; // group 
var potion_sheet, potion_animation;

// sounds
var deathSound, startSound;
var potionSound;

// platform jump 
var platformjumpSound;

// platform land 
var platformlandSound;

// 
var voiceSound;

// Bullets

var bulletsSound;
// ["sfx/Bullets.wav",]; 


function preload() {

    // intro
    intro_sheet = loadSpriteSheet("sprites/Intro.png", 216, 216, 17);
    intro_animation = loadAnimation(intro_sheet);

    // outro 
    outro_sheet = loadSpriteSheet("sprites/outro.png", 320, 320, 30);
    outro_animation = loadAnimation(outro_sheet);

    // character
    idle_sheet = loadSpriteSheet("sprites/venom_idle.png", 216, 216, 1);
    idle_animation = loadAnimation(idle_sheet);

    run_sheet = loadSpriteSheet("sprites/venom_run.png", 216, 216, 12);
    run_animation = loadAnimation(run_sheet);

    jump_sheet = loadSpriteSheet("sprites/venom_jump.png", 216, 216, 8);
    jump_animation = loadAnimation(jump_sheet);

    // load all antivenom animations

    idle_sheet_a = loadSpriteSheet("sprites/antivenom_idle.png", 216, 216, 1);
    idle_animation_a = loadAnimation(idle_sheet_a);

    run_sheet_a = loadSpriteSheet("sprites/antivenom_run.png", 216, 216, 12);
    run_animation_a = loadAnimation(run_sheet_a);

    jump_sheet_a = loadSpriteSheet("sprites/antivenom_jump.png", 216, 216, 10);
    jump_animation_a = loadAnimation(jump_sheet_a);

    // load all carnage animations 

    idle_sheet_c = loadSpriteSheet("sprites/carnage_idle.png", 216, 216, 1);
    idle_animation_c = loadAnimation(idle_sheet_c);

    run_sheet_c = loadSpriteSheet("sprites/carnage_run.png", 216, 216, 12);
    run_animation_c = loadAnimation(run_sheet_c);

    jump_sheet_c = loadSpriteSheet("sprites/carnage_jump.png", 216, 216, 10);
    jump_animation_c = loadAnimation(jump_sheet_c);

    // Reward 
    heart_sheet = loadSpriteSheet("sprites/rewards/heart.png", 96, 96, 20);
    heart_animation = loadAnimation(heart_sheet);
    health_img = loadImage("sprites/rewards/health.png", 36, 36, 1);

    // Lab_img = loadImage("sprites/Obstacles/Lab.png", 85, 96, 1);

    platform_sheet = loadSpriteSheet("sprites/scenery/ActualPlatform.png", 128, 24, 6);
    platform_animation = loadAnimation(platform_sheet);

    apartment_img = loadImage("sprites/scenery/apartments.png");

    FlyingRobot_sheet = loadSpriteSheet("sprites/scenery/FlyingRobot.png", 36, 36, 7);
    FlyingRobot_animation = loadAnimation(FlyingRobot_sheet);


    ArmoredScientist_sheet = loadSpriteSheet("sprites/scenery/ArmoredScientist.png", 96, 96, 5);
    ArmoredScientist_animation = loadAnimation(ArmoredScientist_sheet);

    potion_sheet = loadSpriteSheet("sprites/rewards/potion.png", 27, 32, 4);
    potion_animation = loadAnimation(potion_sheet);
    // load sounds 
    deathSound = loadSound("sfx/Death.wav");
    startSound = loadSound("sfx/Intro.wav");
    potionSound = loadSound("sfx/potion.wav");
    //platform jump 
    platformjumpSound = loadSound("sfx/jump.wav");

    // platform land 
    platformlandSound = loadSound("sfx/land.wav");

    // bullet sounds 

    bulletsSound = loadSound("sfx/Bullets.wav");
    
    // voice effect 
    
    voiceSound = loadSound ("sfx/voice.wav");
}