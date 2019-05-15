function setup() {
    createCanvas(gameWidth, gameHeight);
    
    // start background music
    bgMusic.play();
    
    bgGame.setLoop(true);
    bgGame.playMode('restart');

    // set up player/character
    player = createSprite(playerXStart, playerYStart);
    player.setCollider("rectangle", -5, 0, 55, 115);
    player.addAnimation("idle", idle_animation);
    player.addAnimation("run", run_animation);
    player.addAnimation("jump", jump_animation);
    player.addAnimation("float", float_animation);
    player.isJumping = false;
    player.isGrounded = false;
    player.livesLeft = 3;
    player.scale = 0.5;
    
    platforms = new Group();
    clouds = new Group();
    flames = new Group();
    bottles = new Group();
    souls = new Group();
    wings = new Group();
}

function build() {

    // set up platform
    var startPlatform = createSprite(platformXStart, platformYStart);
    startPlatform.setCollider("rectangle", 0, 0, 512, 32);
    startPlatform.addImage("default", start_platform_img);
    startPlatform.velocity.x = -speed;
    startPlatform.isStartPlatform = true;
    platforms.add(startPlatform);
    
    var y = platformYStart;
    for (var i = 0; i < numPlatforms; i++) {
        var x = 512 + 256 * i;
        var platform = createSprite(x, y, 128, 32);
        platform.addImage("default", platform_img);
        platform.velocity.x = -speed;
        platforms.add(platform);
        
        // adjust y
        y += random(-platformYChange, platformYChange);
    }
    

    // set up scenery
    for (var i = 0; i < numClouds; i++) {
        var x = random(0, width);
        var y = random(cloudYMin, cloudYMax);
        var cloud = createSprite(x, y);
        cloud.addAnimation("default", cloud_animation);
        cloud.velocity.x = -random(cloudSpeed, cloudSpeed * 2);
        cloud.depth = 0;
        clouds.add(cloud);
    }

    
//    for (var i = 0; i < 1; i ++) {
//        var x = random(0, 640);
//        var y = random(flameYMin, flameYMax);
//        var flame = createSprite(width/2, y);
//        flame.addAnimation("default", flame_sheet);
////        flame.velocity.x = -flameSpeed - random(0, 0.1);
//        flames.add(flame);
//    }


    // loop - structure in JavaScript that repeats code
    for (var i = 0; i < numBottles; i++) { // happens 3 times
        var x = random(width, width * 3);
        var y = random(bottleYMin, bottleYMax);
        var bottle = createSprite(x, y);
        bottle.setCollider("rectangle", 0, 0, 20, 10);
//        bottle.debug = true;
        bottle.addAnimation("default", bottle_animation);
        bottle.velocity.x = -bottleSpeed - random(0, 1);
        bottles.add(bottle);
    }
}