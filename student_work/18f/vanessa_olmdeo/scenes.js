var scene = "intro";

function draw() {
    if (scene == "intro") {
        intro();   
    } else if (scene == "game") {
        game();
    } else if (scene == "restart") {
        restart();
    }
}

function intro() {
    background("black");
    
    fill("white");
    textAlign(CENTER, CENTER);
    textFont("Comic Sans MS");
    textSize(50);
    
    text("Jumping Cat", width/2, height/2);
    text("Press Enter to Start", width/2, height/2 + 100);
}

function restart() {
    background(endb_img);
    
    fill("white");
    textAlign(CENTER, CENTER);
    textFont("Comic Sans MS");
    textSize(50);
    
    text("GAME OVER", width/2, height/2);
    text("Enter to Start Over", width/2, height/2 + 100);
}

function died() {
    scene = "restart";
    
    // play death sound
    deathSound.play();
    
    // reset the player
    player.position.x = playerXStart;
    player.position.y = playerYStart;
    player.velocity.y = 0;
    player.livesLeft = 3;
	player.myScore = 0;
	
       bgMusic.play();
    
    // stop game music
    bgGame.stop();
    // destroy other sprites
    while (platforms.length > 0) {
        platforms[0].remove();
    }
    
    while (clouds.length > 0) {
        clouds[0].remove();
    }
    
    while (trees.length > 0) {
        trees[0].remove();
    }
    
    while (arrows.length > 0) {
        arrows[0].remove();
    }

    while (hearts.length > 0) {
        hearts[0].remove();
    }
	while (fishs.length > 0){
		fishs[0].remove();
	}
	while(myScore.length > 0){
		myScore[0].remove();
	}
}

function keyPressed() {
    // enter key
    if (keyCode == 13) {
        if (scene == "intro" || scene == "restart") {
            build();
			bgMusic.pause();
            // start game music
            bgGame.play();
            // play sound to start game
            startSound.play();
            scene = "game";
			
        }
    }
}