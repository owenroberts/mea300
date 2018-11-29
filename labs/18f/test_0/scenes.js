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
    
    text("My First Game", width/2, height/2);
    text("Press Enter to Start", width/2, height/2 + 100);
}

function restart() {
    background("black");
    
    fill("white");
    textAlign(CENTER, CENTER);
    textFont("Comic Sans MS");
    textSize(50);
    
    text("You Died :(", width/2, height/2);
    text("Enter to Start Over", width/2, height/2 + 100);
}

function died() {
    scene = "restart";
    
    // reset progress
    progress = 0;
    platformYChange = 20;
    platformSpeed = speed;
    
    // play death sound
    deathSound.play();
    
    // play bg music again
    bgMusic.play();
    
    // stop game music
    bgGame.stop();
    
    // reset the player
    player.position.x = playerXStart;
    player.position.y = playerYStart;
    player.velocity.y = 0;
    player.livesLeft = 3;
    
    // destroy other sprites
    platforms.removeSprites();
    clouds.removeSprites();
    trees.removeSprites();
    arrows.removeSprites();
    antiClouds.removeSprites();
    hearts.removeSprites();
}

function keyPressed() {
    // enter key
    if (keyCode == 13) {
        if (scene == "intro" || scene == "restart") {
            build();
           
            // pause start scene background music
            bgMusic.pause();
            // start game music
            bgGame.play();
            // play sound to start game
            startSound.play();
            scene = "game";
        }
    }
}