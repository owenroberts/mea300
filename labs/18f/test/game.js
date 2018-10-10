function game() {
    background("white");

    // character movement
    // loop through all platforms
    player.isGrounded = false;
    for (var i = 0; i < platforms.length; i++) {
        var platform = platforms[i];
        if (player.collide(platform)) {
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
    
    
    if (keyDown('x') && !player.isJumping) {
        player.changeAnimation("jump");
        player.velocity.y -= jump_speed;
        player.isJumping = true;
    }

    // if (keyDown(LEFT_ARROW)) {
    //     player.velocity.x -= 0.5;
    // }
    // if (keyDown(RIGHT_ARROW)) {
    //     player.velocity.x += 0.5;
    // }

    // if (player.velocity.x > 0) {
    //     player.velocity.x -= 0.1;
    // }
    // if (player.velocity.x < 0) {
    //     player.velocity.x += 0.1;
    // }

    // arrows hit player
    arrows.overlap(player, function (arrow) {
        // arrow.remove();
        arrow.position.x = random(width, width * 3);
        player.health--;
        if (player.health == 0) {
            died();
        }
        spawnHeart();
    });

    // player gets heart
    hearts.overlap(player, function (heart) {
        heart.remove();
        player.health++;
    });

    // wrap arrows back to the beginning 
    for (var i = 0; i < arrows.length; i++) {
        if (arrows[i].position.x < -50) {
            arrows[i].position.x = random(width, width * 3);
            arrows[i].position.y = random(arrowYMin, arrowYMax);
        }
    }
    
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
        died();
    }

//    camera.position.y = player.position.y;
    
    drawSprites();

    /* ui */
    textFont('Comic Sans MS');
    textSize(20);
    fill(0);
    text(`Lives: ${player.health}`, 20, 40);
}