function game() {
    background(back_img);

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
            platform.position.y += random(-50, 50);
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
        
    });

    // remove un gathered hearts
    for (var i = 0; i < hearts.length; i++) {
        if (hearts[i].position.x < -50) {
            hearts[i].remove();
        }
    }
	
	//points
	
	
	fishs.overlap(player, function (fish) {
		fish.position.x = random (width, width * 2);
			fish.remove();
		
   });
	
	 for (var i = 0; i < fishs.length; i++) {
        if (fishs[i].position.x < -50) {
            fishs[i].remove();
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
	
	text('myScore:' + Math.floor (myScore), 20, 30);
	 for (var i = 0; i < player.myScore; i++) {
	 }
       
// 
}

