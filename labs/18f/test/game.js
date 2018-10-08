function draw() {
    if (scene == 0) {
        intro();
    } else if (scene == 1) {
        game();
    } else if (scene == 2) {
        restart();
    }
}

function intro() {
	background(0);
    textAlign(CENTER, CENTER);
    textSize(50);
    textFont("Comic Sans MS");
    fill(255);
    text("game by owen", width/2, 100);
    text("enter to start", width/2, 200);
}

function restart() {
	background(0);
    textAlign(CENTER, CENTER);
    textSize(50);
    textFont("Comic Sans MS");
    fill(255);
    text("you died", width/2, 100);
    text("enter to start over", width/2, 200);
}

function keyPressed() {
    if (keyCode == 13) {
        if (scene == 0 || scene == 2) {
        	build();
            scene = 1;
        }
    }
}

function reset() {
	
	player.position.y = 20;
	player.position.x = 80;
	player.velocity.y = 0;

	while (clouds.length > 0) {
		clouds[0].remove();
	}
	while (trees.length > 0) {
		trees[0].remove();
	}
	while (platforms.length > 0) {
		platforms[0].remove();
	}
	while (arrows.length > 0) {
		arrows[0].remove();
	}
}

function died() {
	scene = 2;
    reset();
}

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
    
    
    if (keyDown("space") && !player.isJumping) {
        player.changeAnimation("jump");
        player.velocity.y -= jump_speed;
        player.isJumping = true;
    }

    // arrows hit player
    arrows.overlap(player, function (arrow) {
        // arrow.remove();
        arrow.position.x = random(width, width * 3);
        console.log('dies again');
        died();
    });

    // wrap arrows back to the beginning 
    for (var i = 0; i < arrows.length; i++) {
        if (arrows[i].position.x < -50) {
            arrows[i].position.x = random(width, width * 3);
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
    	console.log('dies again');
//        player.position.y = 20;
        died();
    }

//    camera.position.y = player.position.y;
    
    drawSprites();
}