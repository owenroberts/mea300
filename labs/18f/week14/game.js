function game() {
    background("white");

    // character movement

    // loop through all platforms
    player.isGrounded = false;
    for (var i = 0; i < platforms.length; i++) {
        var platform = platforms[i];
        if (player.collide(platform)) {

            // play platform collision sound
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

            // keep platforms above the bottom of the canvas
            var y = platform.position.y;
            y += random(-platformYChange, platformYChange);
            y = min(y, platformMax);
            platform.position.y = y;
        }
    }

    // player hits anti gravity cloud
    antiClouds.overlap(player, function (antiCloud) {
        antiCloud.remove();
        antiCounter = antiDuration;
        antiSound.play();
    });
    
    if (!player.isGrounded) {
        if (antiCounter > 0) {
            player.velocity.y = 0.1;
            antiCounter--;
//            console.log('anti gravity', antiCounter);
            player.changeAnimation("float");
            
            if (keyDown('right')) {
                player.position.x += speed;   
            }
            if (keyDown('left')) {
                player.position.x -= speed;
            }
            
        } else {
            player.velocity.y += GRAVITY;
        }
    }


    if (keyDown("space") && !player.isJumping) {
        // play jump sound
        random(jumpSounds).play();
        player.changeAnimation("jump");
        player.velocity.y -= jump_speed;
        player.isJumping = true;
    }



    // arrows hit player
    arrows.overlap(player, function (arrow) {
        
        arrowHitSound.play();
        
        var x = arrow.position.x;
        var y = arrow.position.y;
        var arrowHit = createSprite(x, y);
        arrowHit.addAnimation('default', arrow_hit_animation);
        arrowHit.life = 12;
        
        arrow.position.x = random(width, width * 3);
        player.livesLeft--;
        if (player.livesLeft == 0) {
            died();
        }

        // spawn a heart
        var x = random(heartXMin, heartXMax);
        var y = random(heartYMin, heartYMax);
        var heart = createSprite(x, y);
        heart.addAnimation('default', heart_animation);
        heart.velocity.x = -heartSpeed;
        hearts.add(heart);
    });

    // player hits heart
    hearts.overlap(player, function (heart) {
        
        // play sound and hit animation
        heartHitSound.play();
        
        var x = heart.position.x;
        var y = heart.position.y;
        var heartHit = createSprite(x, y);
        heartHit.addAnimation("default", heart_hit_animation);
        heartHit.life = 40;
        
        
        heart.remove();
        player.livesLeft++;
        heartSound.play();

        /* timed reward */
        /*  set a counter */
        // slowDownCounter = 60;
        /* change whatever the reward does */

    });

    

    /* counter code */
    //    if (slowDownCounter > 0) {
    //        slowDownCounter--;
    //    } else if (slowDownCounter == 0) {
    /* reset the reward */
    //    }

    // remove un gathered hearts
    for (var i = 0; i < hearts.length; i++) {
        if (hearts[i].position.x < -50) {
            hearts[i].remove();
        }
    }

    // wrap arrows back to the beginning 
    for (var i = 0; i < arrows.length; i++) {
        if (arrows[i].position.x < -50) {
            arrows[i].position.x = random(width, width * 3);
        }
    }

    // play a sound when arrow appears on screen ???

    // wrap clouds
    for (var i = 0; i < clouds.length; i++) {
        if (clouds[i].position.x < -100) {
            clouds[i].position.x = random(width, width * 2);
        }
    }

    // wrap trees
    for (var i = 0; i < trees.length; i++) {
        if (trees[i].position.x < -100) {
            trees[i].position.x = random(width, width * 2);
        }
    }

    // player falls below the canvas
    if (player.position.y - player.height > height || player.position.x < -player.width) {
        // player dies sound 
        died();
    }

    //    camera.position.y = player.position.y;

    /* track level  progress */
    progress += 1;
    if (progress == progressTotal) {
        console.log('next level');
        progress = 0;

        // increase platform y distance
        platformYChange += 20;

        // speed up platforms
        platformSpeed += 0.2;
        for (var i = 0; i < platforms.length; i++) {
            platforms[i].velocity.x = -platformSpeed;
        }

        // add anti gravity cloud
        var x = random(antiXMin, antiXMax);
        var y = random(antiYMin, antiYMax);
        var antiCloud = createSprite(x, y);
        antiCloud.addAnimation("default", anti_animation);
        antiCloud.velocity.x = -antiSpeed;
        antiClouds.add(antiCloud);

        level += 1;
        if (level == levelCount) {
            // add an arrow 
            var x = random(width, width * 3);
            var y = random(arrowYMin, arrowYMax);
            var arrow = createSprite(x, y);
            arrow.setCollider("rectangle", 0, 0, 20, 10);
            arrow.addAnimation("default", arrow_animation);
            arrow.velocity.x = -arrowSpeed - random(0, 1);
            arrows.add(arrow);

            level = 0;
        }

    }

    drawSprites();

    /* ui */
    textSize(16);
    textFont("Comic Sans MS");
    fill('red');
    noStroke();
    //    text("Lives: " + player.livesLeft, 10, 20);
    for (var i = 0; i < player.livesLeft; i++) {
        ellipse(10 + i * 12, 10, 10);
    }
    

    if (antiCounter > 0) {
        text("Anti Gravity Mode", 200, 20);
        text("Right and Left arrows to move", 200, 40);
    }
    
}









