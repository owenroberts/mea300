/*
    global variables
*/
var player;
var jump_speed = 24;
var player_speed = 4;
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
    player.isJumping = false;
    player.scale = 0.5;
    // player.velocity.x = player_speed;

    // set up platform
    platforms = new Group();
    for (var i = 0; i < 4; i++) {
        var x = i * 300;
        var y = 300;
        var platform = createSprite(x, y);
        platform.debug = true;
        platform.setCollider("rectangle", 0, 0, 256, 32);
        platform.addImage("default", platform_img);
        platform.velocity.x = -1;
        platform.immovable = true;
        platform.mass = 5;
        platforms.add(platform);
    }
    

    // set up scenery
    clouds = new Group();
    for (var i = 0; i < 2; i++) {
        var x = random(0, width);
        var cloud = createSprite(x, 100);
        cloud.addAnimation("default", cloud_animation);
        cloud.velocity.x = random(-1, 1);
        clouds.add(cloud);
    }

    trees = new Group();
    for (var i = 0; i < 20; i ++) {
        var x = random(0, 640);
        var y = random(250, 300);
        var tree = createSprite(x, y);
        tree.addImage("default", tree_img);
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
        if (!i) {
            // console.log(player.position.y + player.collider.size().y / 2, platform.position.y - platform.collider.size().y / 2)
        }
        if (player.collide(platform)) {
            player.isJumping = false;
            player.changeAnimation("run");
            player.velocity.y = 0;
            player.isGrounded = true;
        }
        // wrap platforms
        if (platform.position.x < -platform.collider.size().x/2) {
            console.log('platform wrap')
            platform.position.x = width + platform.width/2;
        }
    }

    if (!player.isGrounded) {
        player.velocity.y += GRAVITY;
    }

    // character movement
    if (keyDown("space") && !player.isJumping) {
        console.log('platform wrap')
        player.changeAnimation("jump");
        player.velocity.y -= jump_speed;
        player.isJumping = true;
    }

    // arrows hit player
    arrows.overlap(player, function (arrow) {
        //        arrow.remove();
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


    // player falls below the canvas
    if (player.position.y - player.height > height) {
        player.position.y = 20;
    }

    // camera follows player
    // camera.position.x = player.position.x + 250;

    drawSprites();
}