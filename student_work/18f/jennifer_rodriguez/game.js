function game() {
    background("#3c3c4f");

    // character movement

    // loop through all platforms
    player.isGrounded = false;
    for (var i = 0; i < platforms.length; i++) {
        var platform = platforms[i];

        //sound
        if (player.collide(platform)) {

            //play platform sound
            if (player.isJumping) {
                random(platformHitSounds).play();
            }

            player.isJumping = false;
            player.changeAnimation("run");
            player.velocity.y = 0;
            player.isGrounded = true;

        }

        // wrap around canvas
        if (platform.collider.right() < 0) {
            if (platform.isStartPlatform) {
                platform.remove();
            }
            platform.position.x = width + platform.width / 2;

            var y = platform.position.y;
            y += random(-platformYChange, platformYChange);
            y = min(y, platformMax);
            platform.position.y = y;
        }
    }


    // player hits rabbit gravity cloud
    rabbits.overlap(player, function (rabbit) {
        
        rabbitCounter = rabbitDuration;
        powerup.play();
        bgGame.stop();


        // spawn a fox dying 
        var x = rabbit.position.x;
        var y = rabbit.position.y;
        var rab = createSprite(x, y);
        rab.addAnimation('hit', rabbit_hit_animation);
        rab.life = 20;
        
        rabbit.remove();
    });
    
    if (rabbitCounter > 0) {
        //        player.velocity.y = 0.1;
        rabbitCounter--;
        player.changeAnimation("float");
    } else {
        if (powerup.isPlaying()) {
            powerup.stop();
            bgGame.play();
        }
    }

    //sound
    if (!player.isGrounded) {
        player.velocity.y += GRAVITY;
    }

    if (keyDown("space") && !player.isJumping) {
        //play jump sound
        random(jumpSounds).play();
        player.changeAnimation("jump");
        player.velocity.y -= jump_speed;
        player.isJumping = true;
    }


    // foxes attacks player 
    foxes.overlap(player, function (fox) {

        random(hurtSounds).play();

        if (rabbitCounter > 0) {

            // spawn a fox dying 
            var x = fox.position.x;
            var y = fox.position.y;
            var dead = createSprite(x, y);
            dead.addAnimation('default', fox_hit_animation);
            dead.life = 20;

        } else {
            player.livesLeft--;
            if (player.livesLeft == 0) {
                died("restartFox");
            }

            // spawn a heart
            var x = random(heartXMin, heartXMax);
            var y = random(heartYMin, heartYMax);
            var heart = createSprite(x, y);
            heart.setCollider("rectangle", -5, -8, 25, 25);
            heart.addAnimation('default', heart_animation);
            heart.velocity.x = -heartSpeed;
            hearts.add(heart);
        }

        fox.position.x = random(width, width * 3);

    });

    // player hits heart
    hearts.overlap(player, function (heart) {

        //play sound
        heartSound.play();

        var x = heart.position.x;
        var y = heart.position.y;
        var heartHit = createSprite(x, y);
        heartHit.addAnimation("default", heart_hit_animation);
        heartHit.life = 40;

        heart.remove();
        player.livesLeft++;
        heartSound.play();

    });

    // remove un gathered hearts
    for (var i = 0; i < hearts.length; i++) {
        if (hearts[i].position.x < -50) {
            //            player.livesLeft++;
            hearts[i].remove();
        }
    }

    //wrap foxes
    for (var i = 0; i < foxes.length; i++) {
        if (foxes[i].position.x < -50) {
            foxes[i].position.x = random(width, width * 3);
        }
    }

    // wrap bunnies
    for (var i = 0; i < bunnies.length; i++) {
        if (bunnies[i].position.x < -100) {
            bunnies[i].position.x = random(width, width * 2);
        }
    }

    // wrap plants
    for (var i = 0; i < plants.length; i++) {
        if (plants[i].position.x < -100) {
            plants[i].position.x = random(width, width * 2);
        }
    }

    // player falls below the canvas
    if (player.position.y - player.height > height || player.position.x < -player.width) {
        died("restartFall");
    }
    /* track level  progress */

    progress += 1;
    if (progress == progressTotal) {
        progress = 0;

        // add rabbit gravity cloud
        var x = random(rabbitXMin, rabbitXMax);
        var y = random(rabbitYMin, rabbitYMax);
        var rabbit = createSprite(x, y);
        rabbit.addAnimation("default", rabbit_animation);
        rabbit.velocity.x = -rabbitSpeed;
        rabbits.add(rabbit);

    }


    //camera.position.y = player.position.y;
    drawSprites();

    // ui  
    //text("Lives: " + player.livesLeft, 10, 20);
    for (var i = 0; i < player.livesLeft; i++) {
        //        little_heart = createSprite(10, 7);
        //        little_heart.addImage("default", little_heart_img);
        image(little_heart_img, 10 + 20 * i, 20);
    }

}




if (rabbitCounter > 0) {
    text("Undestructable Rabbit", 200, 20);
    text("Right and Left arrows to move", 200, 40);
}