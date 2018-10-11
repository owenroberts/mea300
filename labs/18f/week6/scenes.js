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
    
    // reset the player
    player.position.x = playerXStart;
    player.position.y = playerYStart;
    player.velocity.y = 0;
    
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
}

function keyPressed() {
    if (keyCode == 13) {
        if (scene == "intro" || scene == "restart") {
            build();
            scene = "game";
        }
    }
}