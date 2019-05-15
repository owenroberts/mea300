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
    background("Black");
    
    fill("white");
    textAlign(CENTER, CENTER);
    textFont("impact");
    textSize(50);
    
    animation(intro_animation, width/2, height/2);
    
    
 
    text("Press Enter to Play", width/2, height/1.6 + 100);
   
    
}

function restart() {
    background("Maroon");
    
    fill("white");
    textAlign(CENTER, CENTER);
    textFont("impact");
    textSize(50);
    
     // display single sprite 
    animation(outro_animation, width/2, height/2);
    
    text("Try Again", width/2, height/1.3);
    text("Enter to Start Over", width/2, height/1.6 + 100);

   
}
function died() {
    scene = "restart";
   
    
    
    // play death sound 
    deathSound.play();
  
    console.log(voiceSound);
     voiceSound.play(2);
    
    
    // reset the player
    player.position.x = playerXStart;
    player.position.y = playerYStart;
    player.velocity.y = 0;
    player.livesLeft = 3;
    player.isAntivenom = "";
    
    // destroy other sprites
    while (platforms.length > 0) {
        platforms[0].remove();
    }
    
    while (flyingrobots.length > 0) {
        flyingrobots[0].remove();
    }
    
  
    while (ArmoredScientist.length > 0) {
        ArmoredScientist[0].remove();
    }
    
    while (potions.length > 0) {
        potions[0].remove();
    }
    while (labs.length > 0) {
        labs[0].remove();
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
            voiceSound.stop();
        }
    }
}