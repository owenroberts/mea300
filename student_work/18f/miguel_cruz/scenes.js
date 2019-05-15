var scene = "intro";
var nightmare;

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
    image(nightmare, 0, 0, 640, 360);
    textAlign(CENTER, CENTER);
    textFont("Comic Sans MS");
    textSize(50);
    
    
//    text("My First Game",0,0, width/2, height/2);
    text("Press", 10,-80,120,360);
    text("Enter", 15,-30,120,360);
    text("to", 5,-10,120,360);
    text("Start", 12,80,120,360);
}

function restart() {
    background("red");
    
    fill("black");
    textAlign(CENTER, CENTER);
    textFont("Comic Sans MS");
    textSize(50);
    
    text("You Went to Hell", width/2, height/2);
    text("Enter to Start Over", width/2, height/2 + 100);
}

function died() {
    scene = "restart";
    
     // reset progress
    progress = 0;
    platformYChange = 20;
    platformSpeed = speed;
    
    wingCounter = 0;
    fallCounter = 0;
    
    //play death sound
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
    while (platforms.length > 0) {
        platforms[0].remove();
    }
    
    while (clouds.length > 0) {
        clouds[0].remove();
    }
    
   // while (flames.length > 0) {
     //   flames[0].remove();
    //}
    
    while (bottles.length > 0) {
        bottles[0].remove();
    }
    
    while (wings.lenth > 0) {
           wings[0].remove();
    }
    
    while (souls.length > 0) {
        souls[0].remove();
    }
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
            
            // play sound to the start
            startSound.play();
            scene = "game";
        }
    }
}