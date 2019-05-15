var scene = "intro";

function draw() {
    if (scene == "intro") {
        intro("titlescreen.jpg")
        ;   
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
    textSize(20);
    
    text("MINKY", width/2, height/4);
    text("Press Enter to Start", width/2, height/2 + 100);
    text("You are Minky, one of the plushies made in this factory", width/2, height/2 + 10);
    text("It has been shut down and you must now escape the ", width/2, height/2 + 30);
    text("bots sent to destroy the remaining toys", width/2, height/2 + 50);
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
    
    // play death sound
    deathSound.play();
    
    // reset the player
    player.position.x = playerXStart;
    player.position.y = playerYStart;
    player.velocity.y = 0;
    player.livesLeft = 3;
    
    bgX = 0;
    
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
}

function keyPressed() {
    // enter key
    if (keyCode == 13) {
        if (scene == "intro" || scene == "restart") {
            build();
            // play sound to start game
            startSound.play();
            scene = "game";
        }
    }
}