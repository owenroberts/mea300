/*
    global variables
*/
var player;
var speed = 6;
var jump_speed = speed * 3;
var GRAVITY = 1;


// player animations
var idle_sheet, idle_animation;
var run_sheet, run_animation;
var jump_sheet, jump_animation;

// platform
var platforms;
var start_platform_img, platform_img;

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

    platform_img = loadImage("sprites/scenery/platform.png");
    start_platform_img = loadImage("sprites/scenery/start_platform.png");

    cloud_sheet = loadSpriteSheet("sprites/scenery/cloud.png", 64, 32, 12);
    cloud_animation = loadAnimation(cloud_sheet);

    tree_img = loadImage("sprites/scenery/tree.png");

    arrow_sheet = loadSpriteSheet("sprites/obstacles/arrow.png", 32, 32, 3);
    arrow_animation = loadAnimation(arrow_sheet);
}

function setup() {
    createCanvas(640, 360);

    // set up player/character
    player = createSprite(80, 20);
    player.setCollider("rectangle", -5, 0, 55, 115);
    player.addAnimation("idle", idle_animation);
    player.addAnimation("run", run_animation);
    player.addAnimation("jump", jump_animation);
    player.isJumping = false;
    player.isGrounded = false;
    player.scale = 0.5;
//    player.velocity.x = 5;

    // set up platform
    var startPlatform = createSprite(80, 300);
//    startPlatform.debug = true;
    startPlatform.setCollider("rectangle", 0, 0, 512, 32);
    startPlatform.addImage("default", start_platform_img);
    startPlatform.velocity.x = -speed;
    startPlatform.isStartPlatform = true;
    
    platforms = new Group();
    platforms.add(startPlatform);
    
    var y = 300;
    for (var i = 0; i < 3; i++) {
        var x = 512 + 256 * i;
        var platform = createSprite(x, y, 128, 32);
//        platform.debug = true;
        platform.addImage("default", platform_img);
        platform.velocity.x = -speed;
        platforms.add(platform);
        
        // adjust y
        y += random(-100, 100);
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
        tree.velocity.x = -speed/8 + random(-0.5, 0.5);
        trees.add(tree);
    }


    arrows = new Group();
    // loop - structure in JavaScript that repeats code
    for (var i = 0; i < 3; i++) { // happens 3 times
        var x = random(width, width * 3);
        var y = random(150, 250);
        var arrow = createSprite(x, y);
        arrow.setCollider("rectangle", 0, 0, 20, 10);
//        arrow.debug = true;
        arrow.addAnimation("default", arrow_animation);
        arrow.velocity.x = -speed * 1.5 - random(0, 1);
        arrows.add(arrow);
    }
}

function draw() {
    background("white");

    // character movement
    
    // loop through all platforms
    player.isGrounded = false;
    for (var i = 0; i < platforms.length; i++) {
        var platform = platforms[i];
        if (player.collide(platform)) {
            player.isJumping = false;
            player.changeAnimation("run");
            player.velocity.y = 0;
            player.isGrounded = true;
        }
        
        // wrap around canvas
        if (platform.collider.right() < 0) {
            if (platform.isStartPlatform) {
                platform.remove();
            }
            platform.position.x = width + platform.width/2;
            platform.position.y += random(-50, 50);
        }
    }
    
    if (!player.isGrounded) {
        player.velocity.y += GRAVITY;
    }
    
    
    if (keyDown("space") && !player.isJumping) {
        player.changeAnimation("jump");
        player.velocity.y -= jump_speed;
        player.isJumping = true;
    }

    
    

    // arrows hit player
    arrows.overlap(player, function (arrow) {
        // arrow.remove();
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
    
    // wrap trees
    for (var i = 0; i < trees.length; i++) {
        if (trees[i].position.x < -100) {
            trees[i].position.x = random(width, width * 2);
        }
    }


    // player falls below the canvas
    if (player.position.y - player.height > height || player.position.x < -player.width) {
//        player.position.y = 20;
        noLoop();
        text("PLAYER DIED", width/2, height/2);
    }

//    camera.position.y = player.position.y;
    
    drawSprites();
}