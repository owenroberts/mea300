var scene = "intro";

function draw() {
    if (scene == "intro") {
        intro();
    } else if (scene == "game") {
        game();
    } else if (scene == "restartFall" || scene == "restartFox") {
        restart();
    }
}

function intro() {
    background("black");

    fill("white");
    textAlign(CENTER, CENTER);
    textFont("myfont");
    textSize(30);

    text("MY FIRST GAME", width / 2, height / 2 -50);
    text("PRESS ENTER TO START GAME", width / 2, height / 2 + 50);
    text("PRESS SPACEBAR TO JUMP", width / 2, height / 2 + 100);
}

function restart() {
    background("black");

    if (scene == "restartFox") {
        image(deathfox_img, 1, 1);
    } else if (scene == "restartFall") {
        image(deathfall_img, 1, 1);
    }

    fill("white");
    textAlign(CENTER, CENTER);
    textFont("myfont");
    textSize(30);

    text("YOU DIED", width / 2, height / 2 + 50);
    text("ENTER TO START OVER", width / 2, height / 2 + 100);


}

function died(restartScene) {

    scene = restartScene; // "restarta";
    
    //reset progress
    progress = 0;
    platformYChange = 20;
    platformSpeed = speed;

    // play death sound
    deathSound.play();
    
    //play bg music again
    powerup.stop();
    
    //stop game music
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

    while (bunnies.length > 0) {
        bunnies[0].remove();
    }

    while (plants.length > 0) {
        plants[0].remove();
    }

    while (foxes.length > 0) {
        foxes[0].remove();
    }
    
    while (rabbits.length > 0){
        rabbits[0].remove();
    }
    
    while (hearts.length > 0) {
        hearts[0].remove();
    }
}

function keyPressed() {
    if (keyCode == 13) {
        if (scene == "intro" || scene == "restartFall" || scene == "restartFox") {
            build();
            
            //pause start scene background music
            powerup.pause();
            // start game music
            bgGame.play();
            scene = "game";
            //start sound
            startSound.play();
            scene = "game";
        }
    }
}