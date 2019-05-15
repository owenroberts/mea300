function setup() {
    createCanvas(gameWidth, gameHeight);
    
    bgGame.playMode('restart');
    powerup.playMode('restart');

    //set up player/character
    player = createSprite(playerXStart, playerYStart);
    player.setCollider("rectangle", -8, -7, 32.5, 88);
    //player.debug =true
    player.addAnimation('idle', idle_animation);
    player.addAnimation('run', run_animation);
    player.addAnimation('jump', jump_animation);
    player.addAnimation("float", float_animation);
    player.isJumping = false;
    player.isGrounded = false;
    player.livesLeft = 3;
    player.scale = .85;

    //    foxes.scale = 1;


    platforms = new Group();
    bunnies = new Group();
    plants = new Group();
    foxes = new Group();
    hearts = new Group();
    rabbits = new Group();
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
    for (var i = 0; i < numBunnies; i++) {
        var x = random(0, width);
        var bunny = createSprite(x, 20);
        bunny.addAnimation("default", bunny_animation);
        bunny.velocity.x = -random(bunnySpeed, bunnySpeed * 2);
        bunnies.add(bunny);

        bunny.scale = random(bunnySizeMax, bunnySizeMin);
    }

    for (var i = 0; i < numPlants; i++) {
        var x = random(0, 640);
        var y = random(plantYMin, plantYMax);
        var plant = createSprite(x, y);
        plant.addImage("default", plant_img);
        plant.velocity.x = -plantSpeed - random(0, 0.1);
        plants.add(plant);
    }

    moon = createSprite(90, 80);
    moon.addImage("default", moon_img);

    //obstacles
    for (var i = 0; i < numFoxes; i++) {
        var x = random(width, width * 3);
        var y = random(foxYMin, foxYMax);
        var fox = createSprite(x, y);

        fox.setCollider("rectangle", 5, 0, 128, 40);
        fox.addAnimation("default", fox_animation);
        fox.addAnimation('fox', fox_animation);
        fox.addAnimation('hit', fox_hit_animation);
        fox.velocity.x = -foxSpeed - random(0, 1);
        foxes.add(fox);

        fox.scale = .6;
    }
}