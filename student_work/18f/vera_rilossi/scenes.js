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
 
  animation(sequenceAnimation, width/2, height/2);
}

    

function restart() {
    animation(sequenceAnimationDead, width/2, height/2);
}

function died() {
    scene = "restart";
     //restet progress
    progress = 0;
    platformYChange = 20;
    platformSpeed = speed;
    
    // play death sound
    deathSound.play();
    
    //play bg music
    bgMusic.play();
    
    //STOP BG GAME MUSIC
    bgGame.stop();
    
    // reset the player
    player.position.x = playerXStart;
    player.position.y = playerYStart;
    player.velocity.y = 0;
    player.livesLeft = 3;
    
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
    
     while (bushes.length > 0) {
        bushes[0].remove();
    }
    
    while (arrows.length > 0) {
        arrows[0].remove();
    }
    
    while (antiClouds.lenth > 0) {
        antiClouds[0].remove();
    }

    
    while (hearts.length > 0) {
    hearts[0].remove();
}
    
    while (rottens.length > 0) {
    rottens[0].remove();
}
}


function keyPressed() {
    // enter key
    if (keyCode == 13) {
        if (scene == "intro" || scene == "restart") {
            build();
            
            
            //pause start scene background music
            bgMusic.pause();
            //start game music
            bgGame.play();
            // play sound to start game
            startSound.play();
            scene = "game";
        }
    }
}