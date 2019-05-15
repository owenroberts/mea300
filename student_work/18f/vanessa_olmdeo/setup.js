function setup() {
    createCanvas(720, 500);
// set up player/character
    player = createSprite(playerXStart, playerYStart);
    player.addAnimation("idle", idle_animation);
    player.addAnimation("run", run_animation);
    player.addAnimation("jump", jump_animation);
    player.isJumping = false;
    player.isGrounded = false;
    player.livesLeft = 3;
    player.scale = 0.25;
    player.myScore= 0;
	
	
    // declare groups
    platforms = new Group();
    clouds = new Group();
    trees = new Group();
    arrows = new Group();
    hearts = new Group();
	fishs = new Group();
}

function build() {

    // platform
    var startPlatform = createSprite(platformXStart, platformYStart);
    startPlatform.addImage("default", start_platform_img);
    startPlatform.velocity.x = -speed;
    startPlatform.isStartPlatform = true;
    platforms.add(startPlatform);
    
    var y = platformYStart;
    for (var i = 0; i < numPlatforms; i++) {
        var x = 512 + 256 * i;
        var platform = createSprite(x, y);
        platform.addImage("default", platform_img);
        platform.velocity.x = -speed;
        platforms.add(platform);
        
        // adjust y
        y += random(-platformYChange, platformYChange);
    }
    

    //scenery
    for (var i = 0; i < numClouds; i++) {
        var x = random(0, width);
        var y = random(cloudYMin, cloudYMax);
        var cloud = createSprite(x, y);
        cloud.addAnimation("default", cloud_animation);
        cloud.velocity.x = -random(cloudSpeed, cloudSpeed * 2);
        clouds.add(cloud);
    }

    
    for (var i = 0; i < numTrees; i ++) {
        var x = random(0, 600);
        var y = random(treeYMin, treeYMax);
        var tree = createSprite(x, y);
        tree.addImage("default", tree_img);
        tree.velocity.x = -treeSpeed - random(0, 0.1);
        trees.add(tree);
    }
	 for (var i = 0; i < numFish; i ++) {
        var x = random(0, width);
        var y = random(fishYMin, fishYMax);
        var fish = createSprite(x, y);
		 fish.setCollider("rectangle", 0, 0, 20, 10);{
			 myScore += 1;			 
		 }
        fish.addAnimation("default", fish_animation);
        fish.velocity.x = -fishSpeed - random(0, 0.1);
        fishs.add(fish);
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


