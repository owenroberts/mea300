function game() {
    background("DarkSlateGrey");
    rectMode(CENTER);
    // image(Lab_img, 0, 0, width, height);

    // character movement

    // lopp through all platforms
    player.isGrounded = false;
    for (var i = 0; i < platforms.length; i++) {
        var platform = platforms[i];
        if (player.collide(platform)) {

            // play platform collision sound 
            if (player.isJumping) {
                platformjumpSound.play();
            }

            player.isJumping = false;
            player.changeAnimation("run" + player.isAntivenom);
            player.velocity.y = 0;
            player.isGrounded = true;
        }

        // wrap around canvas 
        if (platform.collider.right() < 0) {
            if (platform.isStartPlatform) {
                platform.remove();

            }

            platform.position.x = width + platform.width / 2;
            platform.position.y += random(-50, 50);

        }


    }

    if (!player.isGrounded) {
        player.velocity.y += GRAVITY;
    }

    if (keyDown("space") && !player.isJumping) {
        // player jump sound
        platformjumpSound.play();
        player.changeAnimation("jump" + player.isAntivenom);
        player.velocity.y -= jump_speed;
        player.isJumping = true;
    }



    // ArmoredScientist hits player
    ArmoredScientist.overlap(player, function (ArmoredScientist) {
        // ArmoredScientist sound 
        ArmoredScientist.position.x = random(width, width * 3);
        console.log(player.livesLeft);
        player.livesLeft--;
        if (player.livesLeft == 0) {
            died();

        }

        // Spawn a heart 
        var x = random(heartXMin, heartXMax);
        var y = random(heartYMin, heartYMax);
        var heart = createSprite(x, y);
        heart.addAnimation('default', heart_animation);
        heart.velocity.x = -heartSpeed;
        hearts.add(heart)

    });
    // player hits heart 

    hearts.overlap(player, function (heart) {
        heart.remove();
        player.livesLeft++;
        //        heartSound.play();



        // remove un gathered hearts 
        for (var i = 0; i < hearts.length; i++) {
            if (hearts[i].position.x < -50) {
                hearts[i].position.x = random(width, width * 3);

            }

        }


        // Spawn a potion 

        spawnPotion();

    });

    // player hits potion 

        potions.overlap(player, function (potion) {
        potion.remove();
        //        player.livesLeft++;
        player.isAntivenom = potion.skin;
        counter = duration;
        potionSound.play();
        

    });

    if (counter > 0) {
        counter--;
        if (counter == 0) {
            player.isAntivenom = "";
        }
    }
    // remove un gathered potions 

    for (var i = 0; i < potions.length; i++) {
        if (potions[i].position.x < -50) {
            potions[i].remove();
        }
    }

    // wrap ArmoredScientists back to the beginning 
    for (var i = 0; i < ArmoredScientist.length; i++) {
        if (ArmoredScientist[i].position.x < -50) {
            ArmoredScientist[i].position.x = random(width, width * 3);
        }
    }

    // wrap FlyingRobots
    for (var i = 0; i < flyingrobots.length; i++) {
        if (flyingrobots[i].position.x < -100) {
            flyingrobots[i].position.x = random(width, width * 2);
        }
    }

    // wrap obstacle
    // for (var i = 0; i < labs.length; i++) {
    // if (labs[i].position.x < -100) {
    //  labs[i].position.x = random(width, width * 2);
    //   }
    //  }


    // player falls below the canvas
    if (player.position.y - player.height > height || player.position.x < -player.width) {
        // player dies sound 
        died();

    }



    // camera.position.y = player.position.y;


    drawSprites();

    /* ui */
    
    // lives
    for (let i = 0; i < player.livesLeft; i++) {
        image(health_img, 20 + 30 * i, 20);   
    }

}