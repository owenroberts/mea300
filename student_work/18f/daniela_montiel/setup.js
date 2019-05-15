function setup() {
    createCanvas(gameWidth, gameHeight);
    
     // start background music
    bgMusic.play();
    
       bgGame.setLoop(true);
       bgGame.playMode('restart');

    // set up player/character
    player = createSprite(playerXStart, playerYStart);
    // player.setCollider("rectangle", -5, 0, 55, 115);
    player.addAnimation("idle", idle_animation);
    player.addAnimation("run", run_animation);
    player.addAnimation("jump", jump_animation);
    player.addAnimation("float", float_animation);
    player.isJumping = false;
    player.isGrounded = false;
    player.livesLeft = 3;
    player.scale = 0.5;
    // player.debug = true;
    
    // declare groups
    platforms = new Group();
    clouds = new Group();
    trees = new Group();
    arrows = new Group();
    hearts = new Group();
    antiClouds = new Group();
}

function build() {

    // set up platform
    var startPlatform = createSprite(platformXStart, platformYStart);
    // startPlatform.setCollider("rectangle", 0, 0, 512, 32);
    startPlatform.addImage("default", start_platform_img);
    startPlatform.velocity.x = -platformSpeed;
    startPlatform.isStartPlatform = true;
    platforms.add(startPlatform);
    // startPlatform.debug = true;


    var y = platformYStart;
    for (var i = 0; i < numPlatforms; i++) {
        var x = 512 + 256 * i;
        var platform = createSprite(x, y, 150, 70);
        platform.addImage("default", platform_img);
        platform.velocity.x = -platformSpeed;
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
        cloud.velocity.x = -random(cloudSpeed, cloudSpeed * 4);
        clouds.add(cloud);
    }

    
    for (var i = 0; i < numTrees; i ++) {
        var x = random(0, width * 2);
        var y = height/2;
        var tree = createSprite(x, y);
        tree.depth = 0; 
        tree.addImage("default", random(tree_imgs));
        tree.velocity.x = -treeSpeed - random(0, 0.1);
        trees.add(tree);
    }


    // obstacles
    // loop - structure in JavaScript that repeats code
    for (var i = 0; i < numArrows; i++) { // happens 3 times
        var x = random(width, width * 3);
        var y = random(arrowYMin, arrowYMax);
        var arrow = createSprite(x, y);
        arrow.setCollider("rectangle", 0, 0, 20, 10);
//        arrow.debug = true;
        arrow.addAnimation("default", arrow_animation);
        arrow.velocity.x = -arrowSpeed - random(0, 1);
        arrows.add(arrow);
    }
}












