// 0 - intro
// 1 - game
// 2 - start over
var scene = 0;

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
	player.health = 3;

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
	while (hearts.length > 0) {
		hearts[0].remove();
	}
}

function died() {
	scene = 2;
    reset();
}
