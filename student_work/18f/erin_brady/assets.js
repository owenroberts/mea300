//player animations
var idle_sheet, idle_animation;
var run_sheet, run_animation;
var jump_sheet, jump_animation;

//flowers
var platform, platform2, platform3;
var platforms; //group
var sunflower_img, sunflower_animation;

//scenery
var cloud_img, clouds;
var grass_img;

//obstacles
var winds; //group
var wind_sheet, wind_animation;

var birds; //group
var bird_sheet, bird_animation;

//rewards
var pollen; //group
var pollen_sheet, pollen_animation;

//sounds
var deathSound, startSound;
var pollenSound;
var windSound;


//scenes
var start_sheet, start_animation, start_sprite;
var tutorial_sheet, tutorial_animation, tutorial_sprite;
var death_sheet, death_animation, death_sprite;

//background Music
var bgMusic, deathMusic;

function preload() {

    //main character
    idle_sheet = loadSpriteSheet("sprites/main-character/idle-bee.png", 80, 80, 2);
    idle_animation = loadAnimation(idle_sheet);
    idle_animation.frameDelay = 8;

    run_sheet = loadSpriteSheet("sprites/main-character/running-bee.png", 80, 80, 3);
    run_animation = loadAnimation(run_sheet);

    jump_sheet = loadSpriteSheet("sprites/main-character/jumping-bee.png", 80, 80, 3);
    jump_animation = loadAnimation(jump_sheet);


    //scenery
    sunflower_img = loadImage("sprites/scenery/sunflower-tall.png", 500, 531, 1);
    cloud_img = loadImage("sprites/scenery/cloud.png", 100, 100, 1);
    poppy_img = loadImage("sprites/scenery/flat-poppy.png", 400, 426, 1);


    //obstacles
    wind_sheet = loadSpriteSheet("sprites/obstacles/wind.png", 155, 155, 46);
    wind_animation = loadAnimation(wind_sheet);

    bird_sheet = loadSpriteSheet("sprites/obstacles/hummingbird.png", 150, 200, 2);
    bird_animation = loadAnimation(bird_sheet);

    
    //rewards
    pollen_sheet = loadSpriteSheet("sprites/rewards/pollen.png", 100, 100, 3);
    pollen_animation = loadAnimation(pollen_sheet);
    pollen_animation.frameDelay = 8;

    
    //load sounds
    deathSound = loadSound("sfx/death.wav");
    startSound = loadSound("sfx/start.wav");
    pollenSound = loadSound("sfx/pollen.wav");
    windSound = loadSound("sfx/wind.wav");
    
    
    //scenes
    start_sheet = loadSpriteSheet("sprites/scenes/start-scene.png", 640, 540, 2);
    start_animation = loadAnimation(start_sheet);
    start_animation.frameDelay = 8;
    
    tutorial_sheet = loadSpriteSheet("sprites/scenes/tutorial.png", 640, 540, 15);
    tutorial_animation = loadAnimation(tutorial_sheet);
    tutorial_animation.frameDelay = 30;
    
    death_sheet = loadSpriteSheet("sprites/scenes/death-scene.png", 640, 540, 2);
    death_animation = loadAnimation(death_sheet);
    death_animation.frameDelay = 8;
    

//loading music files
bgMusic = loadSound("sfx/bgMusic.mp3");
deathMusic = loadSound("sfx/deathMusic.mp3");

}