function game() {
    background("grey");
    
    animation(flame_animation, width/2, height - 16);

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
            platform.position.x = width + platform.width/2;
            
            // keep platforms above the bottom of the canvas
            var y = platform.position.y;
            y += random(-platformYChange, platformYChange);
            y = min(y, platformMax);
            platform.position.y = y;
            
        }
    }
    
    wings.overlap(player, function (wing) {
        wing.remove();
        wingCounter = wingDuration;
        
        fallCounter = fallDuration;
        wingsSound.play();
    });
    
    if (!player.isGrounded) {
        if (wingCounter > 0){
            player.velocity.y = 0.1;
            wingCounter--;
//              console.log('wing flying', wingCounter);
            player.changeAnimation("float")
            
           
            
        } else if (fallCounter > 0) {
            player.velocity.y += 0.05;
            fallCounter--;
//              console.log('wing flying', wingCounter);
            player.changeAnimation("float")
            
        } else {
            player.velocity.y += GRAVITY;
        }
    }
            
    
    if (keyDown("space") && !player.isJumping) {
        //play jump sound
        random(jumpSounds).play();
        player.changeAnimation("jump");
        player.velocity.y -= jump_speed;
        player.isJumping = true;
    }

     else if (keyDown('right')){
//        player.changeAnimation('run');
        player.position.x += 2;
    } 
    
    else if (keyDown('left')){
//        player.changeAnimation('run');
        player.position.x -= 2;
    } 
    
    else if (keyDown('up')){
        player.position.y -= 4;
    }
    
    else if (keyDown('down')){
        player.position.y += 4;
    }
    
    else {
        // player.changeAnimation('idle');
    }
    

    // bottles hit player
    bottles.overlap(player, function (bottle) {
        
        //bottle sound
        bottleHitSound.play();
        
        var x = bottle.position.x;
        var y = bottle.position.y;
        var bottleHit = createSprite(x, y);
        bottleHit.addAnimation('default', bottle_hit_animation);
        bottleHit.life = 12;
        
        bottle.position.x = random(width, width *3);
        console.log(player.livesLeft);
        player.livesLeft--;
        if (player.livesLeft ==0){
            died();
        }
        
        //spawn soul
        var x = random(soulXMin, soulXMax);
        var y = random(soulYMin, soulYMax);
        var soul = createSprite(x, y);
        soul.addAnimation('default', soul_animation);
        soul.velocity.x = -soulSpeed;
        souls.add(soul);
    });
    
    //player hits soul
    souls.overlap(player, function(soul){
        
        // player hit the soul sound and animation
        soulHitSound.play();
        
        var x = soul.position.x;
        var y = soul.position.y;
        var soulHit = createSprite(x,y);
        soulHit.addAnimation("default", soul_hit_animation);
        soulHit.life = 40;
        
        soul.remove();
        player.livesLeft++;
        soulSound.play();
        
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
    for (var i = 0; i < souls.length; i++) {
        if (souls[i].position.x < -50) {
            souls[i].remove();
        }
    }
    
    // wrap bottles back to the beginning 
    for (var i = 0; i < bottles.length; i++) {
        if (bottles[i].position.x < -50) {
            bottles[i].position.x = random(width, width * 3);
        }
    }
    
    // wrap clouds
    for (var i = 0; i < clouds.length; i++) {
        if (clouds[i].position.x < -100) {
            clouds[i].position.x = random(width, width * 2);
        }
    }
    
//    // wrap flames
//    for (var i = 0; i < flames.length; i++) {
//        if (flames[i].position.x < -100) {
//            flames[i].position.x = random(width, width * 2);
//        }
//    }

    // player falls below the canvas
    if (player.position.y - player.height > height || player.position.x < -player.width) {
        // player dies sound
        died();
    }

//    camera.position.y = player.position.y;
    
    /* tracking progress */
    progress += 1;
    if (progress == progressTotal) {
        console.log('next level');
        progress = 0;
        
        // increase platform distance
        platformYChange += 15;
        
        // speed up platforms
        platformSpeed += 0.2;
        for (var i = 0; i < platforms.length; i++) {
            platforms[i].velocity.x = -platformSpeed;
        }
        
        // add wings
        var x = random(flyXMin, flyXMax);
        var y = random(flyYMin, flyYMax);
        var wing = createSprite(x, y);
        wing.addAnimation("default", wings_animation);
        wing.velocity.x = -wingSpeed;
        wings.add(wing);
        
        level +=1;
        if(level == levelCount) {
            // add an bottle
            var x = random(width, width * 3);
            var y = random(bottleYMin, bottleYMax);
            var bottle = createSprite(x, y);
            bottle.setCollider("rectangle", 0, 0, 20, 10);
            bottle.addAnimation("default", bottle_animation);
            bottle.velocity.x = -bottleSpeed - random(0, 1);
            bottles.add(bottle);
            
            level = 0;
        }
    }
    
    drawSprites();
    
    
    /* ui */
    textSize(18);
    textFont("Comic Sans MS");
    fill('black');
    noStroke();
//    text("Lives: " + player.livesLeft, 10, 20);
    for (var i = 0; i < player.livesLeft; i++) {
        ellipse(10 + i * 12, 10, 10);
    }
    
    
    if (wingCounter  > 0){
        text("Flying Mode", 250, 20);
//        text("Use Right and Left arrows to move", 200, 40);
    }
}