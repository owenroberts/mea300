/*
    global variables
*/
var player;
var jump_speed = 12;
var GRAVITY = 1;

// player animations
var idle_sheet, idle_animation;
var run_sheet, run_animation;
var jump_sheet, jump_animation;

// platform
var platform;
var platform_img;

// scenery
var cloud, cloud_sheet, cloud_animation;
var tree1, tree2, tree_img;

function preload() {
    idle_sheet = loadSpriteSheet("sprites/main_character/main_character_idle.png", 128, 128, 16);
    idle_animation = loadAnimation(idle_sheet);
    
    run_sheet = loadSpriteSheet("sprites/main_character/main_character_running.png", 128, 128, 6);
    run_animation = loadAnimation(run_sheet);
    
    jump_sheet = loadSpriteSheet("sprites/main_character/main_character_jumping.png", 128, 128, 30);
    jump_animation = loadAnimation(jump_sheet);
    
    platform_img = loadImage("sprites/scenery/box.png");
    
    cloud_sheet = loadSpriteSheet("sprites/scenery/cloud.png", 64, 32, 12);
    cloud_animation = loadAnimation(cloud_sheet);
    
    tree_img = loadImage("sprites/scenery/tree.png");
}

function setup() {
    createCanvas(640, 360);
    
    // set up player/character
    player = createSprite(320, 180);
//    player.debug = true;
    player.setCollider("rectangle", -5, 0, 55, 115);
    player.addAnimation("idle", idle_animation);
    player.addAnimation("run", run_animation);
    player.addAnimation("jump", jump_animation);
    player.isJumping = false;
    
    // set up platform
    platform = createSprite(320, 300);
//    platform.debug = true;
    platform.setCollider("rectangle", 0, 0, 32, 32);
    platform.addImage("default", platform_img);
    
    // set up scenery
    cloud = createSprite(600, 100);
    cloud.addAnimation("default", cloud_animation);
    cloud.velocity.x = -1;
    
    var x = random(0, 640);
    var y = random(250, 300);
    tree1 = createSprite(x, y);
    tree1.addImage("default", tree_img);
    
    var x = random(0, 640);
    var y = random(250, 300);
    tree2 = createSprite(x, y);
    tree2.addImage("default", tree_img);
}

function draw() {
    background("white");
    
    // character movement
    if (keyDown("space") && !player.isJumping) {
        player.changeAnimation("jump");
        player.velocity.y -= jump_speed;
        player.isJumping = true;
    }
    
    if (player.collide(platform)) {
        player.isJumping = false;
        player.changeAnimation("idle");
    } else {
        player.velocity.y += GRAVITY;
    }
   
    
    drawSprites();
}










