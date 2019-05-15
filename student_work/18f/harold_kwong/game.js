function game() {
    background("darkred");

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
            platform.position.x = width + platform.width/5;
            
            // keep platforms above the bottom of the canvas
            var y = platform.position.y;
            y += random(-platformYChange, platformYChange);
            y = min(y, platformMax);
            platform.position.y = y;
        }
    }
    
    if (!player.isGrounded) {
        player.velocity.y += GRAVITY;
    }
    
    
    if (keyDown("space") && !player.isJumping) {
        // play jump sound
        random(jumpSounds).play();
        player.changeAnimation("jump");
        player.velocity.y -= jump_speed;
        player.isJumping = true;
    }

    // wasps hit player
    wasps.overlap(player, function (wasp) {
        
         waspHitSound.play();
        
        var x = wasp.position.x;
        var y = wasp.position.y;
        var waspHit = createSprite(x, y);
        waspHit.addAnimation('default', wasp_hit_animation);
        waspHit.life = 12;
        
        wasp.position.x = random(width, width * 3);
        player.livesLeft--;
        if (player.livesLeft == 0) {
            died();
        }
        
        // spawn a hot_dog
        var x = random(hot_dogXMin, hot_dogXMax); 
        var y = random(hot_dogYMin, hot_dogYMax);
        var hot_dog = createSprite(x, y);
        hot_dog.addAnimation('default', hot_dog_animation);
        hot_dog.velocity.x = -hot_dogSpeed;
        hot_dogs.add(hot_dog);
    });
    
    // player hits hot_dog
    hot_dogs.overlap(player, function(hot_dog) {
        
        // play sound and hit animation
        hot_dogHitSound.play();
        
        var x = hot_dog.position.x;
        var y = hot_dog.position.y;
        var hot_dogHit = createSprite(x, y);
        hot_dogHit.addAnimation("default", hot_dog_hit_animation);
        hot_dogHit.life = 40;
        
        hot_dog.remove();
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
    
    // remove un gathered hot_dogs
    for (var i = 0; i < hot_dogs.length; i++) {
        if (hot_dogs[i].position.x < -50) {
            hot_dogs[i].remove();
        }
    }

    // wrap wasps back to the beginning 
    for (var i = 0; i < wasps.length; i++) {
        if (wasps[i].position.x < -50) {
            wasps[i].position.x = random(width, width * 3);
        }
    }
    
    // play a sound when wasp appears on screen ???
    
    
    
    
    // fires hit player
    fires.overlap(player, function (fire) {
        // fire sound
        fire.position.x = random(width, width * 3);
        player.livesLeft--;
        if (player.livesLeft == 0) {
            died();
        }
        
        // spawn a hot_dog
        var x = random(hot_dogXMin, hot_dogXMax); 
        var y = random(hot_dogYMin, hot_dogYMax);
        var hot_dog = createSprite(x, y);
        hot_dog.addAnimation('default', hot_dog_animation);
        hot_dog.velocity.x = -hot_dogSpeed;
        hot_dogs.add(hot_dog);
    });
    
    // player hits hot_dog
    hot_dogs.overlap(player, function(hot_dog) {
        hot_dog.remove();
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
    
    // remove un gathered hot_dogs
    for (var i = 0; i < hot_dogs.length; i++) {
        if (hot_dogs[i].position.x < -50) {
            hot_dogs[i].remove();
        }
    }

    // wrap fires back to the beginning 
    for (var i = 0; i < fires.length; i++) {
        if (fires[i].position.x < -50) {
            fires[i].position.x = random(width, width * 3);
        }
    }
    
    // play a sound when fire appears on screen ???
    
    
    
    
    
    // wrap cloudys
    for (var i = 0; i < cloudys.length; i++) {
        if (cloudys[i].position.x < -100) {
            cloudys[i].position.x = random(width, width * 2);
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
    
    /* track level progress */
    progress += 1;
    if (progress == progressTotal) {
        console.log("next level");
        progress = 0;
        
        // increase platform y distance
        platformYChange += 20;
        
        // speed up platforms
        platformSpeed += 0.2;
        for (var i = 0; i < platforms.length; i++) {
            platforms[i].velocity.x = -platformSpeed;
        }
        
        
        level += 1;
        if (level == levelCount) {
            // add a wasp
            var x = random(width, width * 3);
            var y = random(waspYMin, waspYMax);
            var wasp = createSprite(x, y);
            wasp.setCollider("rectangle", 0, 0, 20, 10);
            wasp.addAnimation("default", wasp_animation);
            wasp.velocity.x = -waspSpeed - random(0, 1);
            wasps.add(wasp);
            
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
}
