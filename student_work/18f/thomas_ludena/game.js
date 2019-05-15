
function game() {
//    background(bg);
    image(bg, bgX, 0);
    bgX--;
   

    // character movement
    
    // loop through all platforms
    player.isGrounded = false;
    for (var i = 0; i < platforms.length; i++) {
        var platform = platforms[i];
        if (player.collide(platform)) {
            
            // play platform collision sound
            if (player.isJumping) {
               platformHitSound.play();
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
            platform.position.y += random(-50, 50);
        }
    }
    
    if (!player.isGrounded) {
        player.velocity.y += GRAVITY;
    }
    
    
    if (keyDown("space") && !player.isJumping) {
        // play jump sound
       jumpSound.play();
        player.changeAnimation("jump");
        player.velocity.y -= jump_speed;
        player.isJumping = true;
    }

    // arrows hit player
    arrows.overlap(player, function (arrow) {
        // arrow sound
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
    hearts.overlap(player, function(heart) {
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
            arrows[i].position.y = random(arrowYMin, arrowYMax);
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



    // player falls below the canvas
   
//        player.position.y = 20;
      
  

//    camera.position.y = player.position.y;
    
    
