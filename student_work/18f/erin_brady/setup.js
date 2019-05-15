function setup() {

    createCanvas(gameWidth, gameHeight);
//start background music
    bgMusic.play();
    bgMusic.setLoop(true);
    bgMusic.playMode('restart');


    //create groups
    clouds = new Group();
    birds = new Group();
    pollen = new Group();
    winds = new Group();
    platforms = new Group();

    //set up player character (bee)
    player = createSprite(playerXStart, playerYStart);
    
    player.setCollider("rectangle", 0, -1, 50, 50);
    player.addAnimation('idle', idle_animation);
    player.addAnimation('run', run_animation);
    player.addAnimation('jump', jump_animation);

    //scenes
    death_sprite = createSprite(width / 2, height / 2);
    death_sprite.addAnimation("default", death_animation);

    tutorial_sprite = createSprite(width / 2, height / 2);
    tutorial_sprite.addAnimation("default", tutorial_animation);

    start_sprite = createSprite(width / 2, height / 2);
    start_sprite.addAnimation("default", start_animation);

}

function build() {


    //wind (obstacle)

    for (var i = 0; i < numWind; i++) {
        var x = random(width, width);
        var y = random(windYMin, windYMax);
        var wind = createSprite(x, y);
        wind.setCollider("rectangle", 20, 0, 100, 50);
        //    wind.debug = true;
        wind.velocity.x = random(-1, -3);
        wind.count = windCount;
        winds.add(wind);
        wind.addAnimation("default", wind_animation);
    }

    //loop platforms


    //sunflower (platform)
   var platform = createSprite(50, 390);
    platform.addImage("default", sunflower_img);
    platforms.add(platform);
    //poppy (platform3)
   var  platform3 = createSprite(500, 470);
    platform3.addImage("default", poppy_img);
    platforms.add(platform3);



    //cloud (background)

    for (var i = 0; i < numClouds; i++) {
        var x = random(0, width * 3);
        var y = random(0, 200);

        cloud = createSprite(x, 80);
        cloud.addImage('default', cloud_img);
        cloud.velocity.x = cloudSpeed;
        clouds.add(cloud);
    }


    //hummingbird (obstacle)

    for (var i = 0; i < numBirds; i++) {
        var x = random(width, width * 2);
        var y = random(birdYMin, birdYMax);
        bird = createSprite(x, y);
        bird.setCollider("rectangle", -40, 10, 50, 50);
        bird.velocity.x = -3.25;
        //bird.velocity.y = .5;
        birds.add(bird);
        bird.addAnimation("default", bird_animation);
    }


    //pollen

    for (var i = 0; i < 3; i++) {
        var x = random(width / 3, width);
        var y = random(75, 500);
        var pollin = createSprite(x, y);
        pollin.setCollider("rectangle", 0, 0, 50, 50)
        //      pollin.debug = true;
        pollen.add(pollin);
        pollin.addAnimation("default", pollen_animation);
    }

    //put player in front of all other sprites
    player.depth = allSprites[allSprites.length - 1].depth + 1;

}
