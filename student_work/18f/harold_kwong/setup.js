function setup() {
    createCanvas(gameWidth, gameHeight);
    
//      frameRate(30);
    
    
    // start background music
    bgMusic.play();
    
    bgGame.setLoop(true);
    bgGame.playMode('restart');

    // set up player/character
    player = createSprite(playerXStart, playerYStart);
    player.setCollider("rectangle", -5, 0, 55, 40);
    player.addAnimation("idle", idle_animation);
    player.addAnimation("run", run_animation);
    player.addAnimation("jump", jump_animation);
    player.isJumping = false;
    player.isGrounded = false;
    player.livesLeft = 3;
    player.scale = 0.5;
    
    // declare groups
    platforms = new Group();
    cloudys = new Group();
    trees = new Group();
    wasps = new Group();
    hot_dogs = new Group();
    fires = new Group();
}

function build() {

    // set up platform
    var startPlatform = createSprite(platformXStart, platformYStart);
    startPlatform.setCollider("rectangle", 0, 0, 512, 32);
    startPlatform.addImage("default", start_platform_img);
    startPlatform.velocity.x = -platformSpeed;
    startPlatform.isStartPlatform = true;
    platforms.add(startPlatform);
    
    var y = platformYStart;
    for (var i = 0; i < numPlatforms; i++) {
        var x = 512 + 256 * i;
        var platform = createSprite(x, y, 128, 32);
        platform.addImage("default", platform_img);
        platform.velocity.x = -platformSpeed;
        platforms.add(platform);
        
        // adjust y
        y += random(-platformYChange, platformYChange);
    }
    

    // set up scenery
    for (var i = 0; i < numCloudys; i++) {
        var x = random(0, width);
        var y = random(cloudyYMin, cloudyYMax);
        var cloudy= createSprite(x, y);
        cloudy.addAnimation("default", cloudy_animation);
        cloudy.velocity.x = -random(cloudySpeed, cloudySpeed * 2);
        cloudys.add(cloudy);
    }

    
    for (var i = 0; i < numTrees; i ++) {
        var x = random(0, 640);
        var y = random(treeYMin, treeYMax);
        var tree = createSprite(x, y);
        tree.addImage("default", tree_img);
        tree.velocity.x = -treeSpeed - random(0, 0.1);
        trees.add(tree);
    }


    // obstacles
    // loop - structure in JavaScript that repeats code
    for (var i = 0; i < numWasps; i++) { // happens 3 times
        var x = random(width, width * 3);
        var y = random(waspYMin, waspYMax);
        var wasp = createSprite(x, y);
        wasp.setCollider("rectangle", 0, 0, 20, 10);
//        wasp.debug = true;
        wasp.addAnimation("default", wasp_animation);
        wasp.velocity.x = -waspSpeed - random(0, 1);
        wasps.add(wasp);
    }
    
    
    for (var i = 0; i < numFires; i++) { // happens 3 times
        var x = random(width, width * 3);
        var y = random(fireYMin, fireYMax);
        var fire = createSprite(x, y);
        fire.setCollider("rectangle", 0, 0, 20, 10);
//        fire.debug = true;
        fire.addAnimation("default", fire_animation);
        fire.velocity.x = -fireSpeed - random(0, 1);
        fires.add(fire);
    }
}
