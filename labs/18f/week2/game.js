/*
    global variables
*/
var player;
var player_speed = 10;

var idle_sheet, idle_animation;
var run_sheet, run_animation;
var jump_sheet, jump_animation;

function preload() {
    idle_sheet = loadSpriteSheet("sprites/main_character/main_character_idle.png", 128, 128, 1);
    idle_animation = loadAnimation(idle_sheet);
    
    run_sheet = loadSpriteSheet("sprites/main_character/main_character_running.png", 128, 128, 1);
    run_animation = loadAnimation(run_sheet);
    
    jump_sheet = loadSpriteSheet("sprites/main_character/main_character_jumping.png", 128, 128, 1);
    jump_animation = loadAnimation(jump_sheet);
}

function setup() {
    createCanvas(640, 360);
    
    // set up player/character
    player = createSprite(320, 180);
    player.addAnimation('idle', idle_animation);
    player.addAnimation('run', run_animation);
    player.addAnimation('jump', jump_animation);
}

function draw() {
    background("white");
    
    // jump event
    if (keyDown('space')) {
        player.changeAnimation('jump');
        player.position.y -= player_speed;
    } else if (keyDown('right')) {
        player.changeAnimation('run');
        player.position.x += player_speed;
    } else if (keyDown('left')) {
        player.changeAnimation('run');
        player.position.x -= player_speed;
    } else {
        player.changeAnimation('idle');   
    }
    
    drawSprites();
}










