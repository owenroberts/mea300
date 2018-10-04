/* setup */
function setup() {
    createCanvas(gameWidth, gameHeight);

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
    startPlatform.velocity.x = -platformSpeed;
    startPlatform.isStartPlatform = true;
    
    platforms = new Group();
    platforms.add(startPlatform);
    
    var y = platformYStart;
    for (var i = 0; i < numPlatforms; i++) {
        var x = platformXStart + 256 * i;
        var platform = createSprite(x, y, 128, 32);
//        platform.debug = true;
        platform.addImage("default", platform_img);
        platform.velocity.x = -platformSpeed;
        platforms.add(platform);
        
        // adjust y
        y += random(-platformYChange, platformYChange);
    }
    

    // set up scenery
    clouds = new Group();
    for (var i = 0; i < numClouds; i++) {
        var x = random(0, width);
        var cloud = createSprite(x, cloudY);
        cloud.addAnimation("default", cloud_animation);
        cloud.velocity.x = random(cloudSpeed, cloudSpeed + 1);
        clouds.add(cloud);
    }

    trees = new Group();
    for (var i = 0; i < numTrees; i ++) {
        var x = random(0, 640);
        var y = random(treeYPositionMin, treeYPositionMax);
        var tree = createSprite(x, y);
        tree.addImage("default", tree_img);
        tree.velocity.x = -treeSpeed + random(-0.5, 0.5);
        trees.add(tree);
    }


    arrows = new Group();
    // loop - structure in JavaScript that repeats code
    for (var i = 0; i < numArrows; i++) { // happens 3 times
        var x = random(width, width * 3);
        var y = random(150, 250);
        var arrow = createSprite(x, y);
        arrow.setCollider("rectangle", 0, 0, 20, 10);
//        arrow.debug = true;
        arrow.addAnimation("default", arrow_animation);
        arrow.velocity.x = -arrowSpeed - random(0, 1);
        arrows.add(arrow);
    }
}