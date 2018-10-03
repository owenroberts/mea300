/*
    global variables
*/
var player;
var jump_speed = 15;
var game_speed = 6;
var GRAVITY = 1;

// player animations
var idle_sheet, idle_animation;
var run_sheet, run_animation;
var jump_sheet, jump_animation;

// platform
var platforms;
var platform_img;

// scenery
var clouds, cloud_sheet, cloud_animation;
var trees, tree_img;

// obstacles
var arrows; // group
var arrow_sheet, arrow_animation;

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

    arrow_sheet = loadSpriteSheet("sprites/obstacles/arrow.png", 32, 32, 3);
    arrow_animation = loadAnimation(arrow_sheet);
}

function setup() {
    createCanvas(640, 360);

    // frameRate(5);
    // frameRate(30);

    // camera
    // camera.position.y = height / 2;

    // set up player/character
    player = createSprite(80, 20);
    player.debug = true;
    player.setCollider("rectangle", -5, 0, 55, 115);
    player.addAnimation("idle", idle_animation);
    player.addAnimation("run", run_animation);
    player.addAnimation("jump", jump_animation);
    player.isJumping = true;
    player.scale = 0.5;
    // player.velocity.x = player_speed;

    platforms = new Group();

    // start platform
    var startPlatform = createSprite(width/2, 300, width, 100);
    startPlatform.debug = true;
    startPlatform.velocity.x = -game_speed;
    startPlatform.isStartPlatform = true;
    platforms.add(startPlatform);

    var y = 300;
    for (var i = 0; i < 3; i++) {
        var x = width + (i+1) * 256;
        
        var platform = createSprite(x, y, 128, 32);
        platform.debug = true;
        platform.setCollider("rectangle", 0, 0, 128, 32);
        // platform.addImage("default", platform_img);
        platform.velocity.x = -game_speed;
        platforms.add(platform);

        y += random(-50, 50);
    }

    // set up scenery
    clouds = new Group();
    for (var i = 0; i < 2; i++) {
        var x = random(0, width);
        var cloud = createSprite(x, 100);
        cloud.addAnimation("default", cloud_animation);
        cloud.velocity.x = -random(1, 2);
        clouds.add(cloud);
    }

    trees = new Group();
    for (var i = 0; i < 20; i ++) {
        var x = random(0, 640);
        var y = random(250, 300);
        var tree = createSprite(x, y);
        tree.addImage("default", tree_img);
        tree.velocity.x = -game_speed/4 + random(-0.5, 0.5);
        trees.add(tree);
    }

    arrows = new Group();
    // loop - structure in JavaScript that repeats code
    for (var i = 0; i < 3; i++) { // happens 3 times
        var x = random(width, width * 3);
        var y = random(150, 250);
        var arrow = createSprite(x, y);
        arrow.setCollider("rectangle", 0, 0, 20, 10);
        arrow.debug = true;
        arrow.addAnimation("default", arrow_animation);
        arrow.velocity.x = random(-2, -3);
        // arrows.add(arrow);
    }
}

function draw() {
    background("white");

    player.isGrounded = false;
    // platforms
    for (var i = 0; i < platforms.length; i++) {
        var platform = platforms[i];
        if (player.collide(platform)) {
            player.isJumping = false;
            player.changeAnimation("run");
            player.velocity.y = 0;
            player.isGrounded = true;
        }
        // wrap platforms
        if (platform.collider.right() < 0) {
            if (platform.isStartPlatform) {
                platform.remove();
            }
            platform.position.x = width + platform.width/2;
            platform.position.y += random(-50, 50);
        }
    }

    if (player.isJumping) {
        player.velocity.y += GRAVITY;
    }

    // character movement
    if (keyDown("space") && !player.isJumping) {
        player.changeAnimation("jump");
        player.velocity.y -= jump_speed;
        player.isJumping = true;
    }

    // arrows hit player
    arrows.overlap(player, function (arrow) {
        arrow.position.x = random(width, width * 3);
        player.position.y = -player.height;
    });

    // wrap arrows back to the beginning 
    for (var i = 0; i < arrows.length; i++) {
        if (arrows[i].position.x < -50) {
            arrows[i].position.x = random(width, width * 3);
        }
    }
    
    // wrap clouds
    for (var i = 0; i < clouds.length; i++) {
        if (clouds[i].position.x < -100) {
            clouds[i].position.x = random(width, width * 2);
        }
    }
     // wrap clouds
    for (var i = 0; i < trees.length; i++) {
        if (trees[i].position.x < -100) {
            trees[i].position.x = random(width, width * 2);
        }
    }


    // player falls below the canvas
    if (player.collider.top() > height || player.collider.right() < 0) {
        player.position.x = 60;
        player.position.y = 20;
    }

    // camera follows player
    // camera.position.y = player.position.y;

    drawSprites();
}