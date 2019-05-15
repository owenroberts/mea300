function setup() {
    createCanvas(gameWidth, gameHeight);
    
    //start bg music in first scene
    bgMusic.play();
    
    //LOOP
    bgGame.setLoop(true);
    bgGame.playMode("restart");

    // set up player/character
    player = createSprite(playerXStart, playerYStart);
//    player.setCollider("rectangle", -5, 0, 80, 80);
    player.addAnimation("idle", idle_animation);
    player.addAnimation("run", run_animation);
    player.addAnimation("jump", jump_animation);
    player.addAnimation("float", float_animation);
    player.isJumping = false;
    player.isGrounded = false;
    player.livesLeft = 3;
    player.scale = 1.4;
    
    //declare groups
    arrows = new Group();
    platforms = new Group();
    clouds = new Group();
    trees = new Group();
    bushes = new Group();
    hearts = new Group();
    rottens = new Group();
    antiClouds = new Group();
    
    //player.debug = true;
    
    //frameRate(10);
}

function build() {

    // set up scenery
    for (var i = 0; i < numClouds; i++) {
        var x = random(0, width);
        var y = random(cloudYMin, cloudYMax);
        var cloud = createSprite(x, y);
        cloud.addAnimation("default", cloud_animation);
        cloud.velocity.x = -random(cloudSpeed, cloudSpeed * 2);
        clouds.add(cloud);
    }

    
    for (var i = 0; i < numTrees; i ++) {
        var x = random(0, 640);
        var y = random(treeYMin, treeYMax);
        var tree = createSprite(x, y);
        tree.addImage("default", tree_img);
        tree.velocity.x = -treeSpeed - random(0, 0.1);
        trees.add(tree);
    }
    
      for (var i = 0; i < numBushes; i ++) {
        var x = random(0, 640);
        var y = random(bushYMin, bushYMax);
        var bush = createSprite(x, y);
        bush.addAnimation("default", bush_animation);
        bush.velocity.x = -bushSpeed - random(0, 0.1);
        bushes.add(bush);
    }

    
    
    // set up platform CHANGE SPEED
    var startPlatform = createSprite(platformXStart, platformYStart);
    startPlatform.setCollider("rectangle", 0, 0, 192, 20);
    startPlatform.addImage("default", start_platform_img);
    startPlatform.velocity.x = -platformSpeed;
    startPlatform.isStartPlatform = true;
    platforms.add(startPlatform);
    
    var y = platformYStart;
    for (var i = 0; i < numPlatforms; i++) {
        var x = 512 + 256 * i;
        var platform = createSprite(x, y);
        platform.setCollider("rectangle", 0, 0, 192, 20)
        platform.addImage("default", platform_img);
        platform.velocity.x = -platformSpeed;
        platforms.add(platform);
        
        //startPlatform.debug = true;
        //platform.debug = true;
        
        // adjust y
        y += random(-platformYChange, platformYChange);
    }

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