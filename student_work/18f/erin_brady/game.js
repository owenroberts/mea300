function game() {

    background("#91bbff");


    //character movement
    if (keyDown('up')) {
        player.changeAnimation('jump');
        player.position.y -= 2;
        player.position.x += 2;

    } else if (keyDown('down')) {
        player.changeAnimation('jump');
        player.position.y += 2;
        player.position.x += 2;

    } else {
        player.changeAnimation('run');
        player.position.x += 2;
    }


    if (player.velocity.x > 0) {
        platform.velocity.x = -2;
        platform3.velocity.x = -2;
    }
    if (player.velocity.x < 0) {
        platform.velocity.x = 2;
        platform3.velocity.x = 2;
    }


    //wrap flowers
    newPlatformCounter++;
    if (newPlatformCounter == newPlaformCount) {
        newPlatformCounter = 0;


        var platform;
        if (random(1) > 0.5) {
            platform = createSprite(player.position.x + random(width + 50 / 2, width + 50), 390);
            platform.addImage("default", sunflower_img);
        } else {

            platform = createSprite(player.position.x + random(width + 50 / 2, width + 50), 470);
            platform.addImage("default", poppy_img);
        }
        platforms.add(platform);
    }


    //wrap clouds
    for (var i = 0; i < clouds.length; i++) {
        if (clouds[i].position.x < player.position.x - 350) {
            clouds[i].position.x = player.position.x + random(width, width * 2);
        }
    }


    //wrap winds
    for (var i = 0; i < winds.length; i++) {
        if (winds[i].position.x < player.position.x - 300) {
            winds[i].position.x = player.position.x + random(width, width * 4);
        }
    }

    //winds push player
    winds.displace(player);
    winds.overlap(player, function (wind) {
        if (!windSound.isPlaying()) {
            windSound.play();
        }
        wind.count--;
        if (wind.count <= 0) {
            wind.remove();
        }

    });


    //birds kill player
    birds.overlap(player, function (bird) {
        died();
    });

    //wrap birds
    for (var i = 0; i < birds.length; i++) {
        if (birds[i].position.x < player.position.x - 350) {
            birds[i].position.x = player.position.x + random(width, width * 4);
            birds[i].position.y = random(birdYMin, birdYMax);
        }
    }

    //wrap pollen
    for (var i = 0; i < pollen.length; i++) {
        if (pollen[i].position.x < player.position.x - 350) {
            pollen[i].position.x = player.position.x + random(width, width);
        }
    }

    //player collects pollen
    pollen.overlap(player, function (pollin) {
        pollin.position.x = player.position.x + random(width, width);
        pollenSound.play();
        progress += 1;
        score += 1;
    });

    //game progess
    if (progress == progressTotal) {
        console.log('next level');
        progress = 0;

        level += 1;
        if (level == levelCount) {
            var x = random(width, width * 2);
            var y = random(birdYMin, birdYMax);
            bird = createSprite(x, y);
            bird.setCollider("rectangle", -40, 10, 50, 50);
            bird.velocity.x = -3.25;
            //bird.velocity.y = .5;
            birds.add(bird);
            bird.addAnimation("default", bird_animation);

            level = 0;
        }


    }


    //camera movement
    camera.position.x = player.position.x;
    drawSprites(platforms);
    drawSprites(clouds);
    drawSprites(birds);
    drawSprites(pollen);
    drawSprites(winds);
    player.display();

    camera.off();

    //pollen meter
    text(score, 10, 30);
    textSize(40);
    textFont('courier');
    fill('gold');
    textStyle(BOLD);
}
