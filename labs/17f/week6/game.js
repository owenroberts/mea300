/* global variable */
var character;
var platform;
var clouds, walls, enemies, health, stuff;
const NUM_BUSHES = 8, NUM_CLOUDS = 2, NUM_WALLS = 3, NUM_ENEMIES = 3, NUM_HEALTH = 1;
const SPEED = 5;
const JUMP_SPEED = SPEED * 2;
const GRAVITY = 0.5;

/*
0 intro screen
1 instructions
2 game
3 ending
*/
var gameState = 0;

function setup() {
	createCanvas(640, 360);
	
	stuff = new Group();
	
	/* character setup */
	character = createSprite(0, 20, 16, 16);
	const idle_anim = loadAnimation("assets/idle/idle_00.png", "assets/idle/idle_09.png");
	const run_anim = loadAnimation("assets/run/run_0.png", "assets/run/run_5.png");
	character.addAnimation("idle", idle_anim);
	character.addAnimation("run", run_anim);
	//character.debug = true;
	character.isJumping = true;
	character.lives = 3;
	stuff.add(character);
	
	/* platform setup */
	platform = createSprite(0, height - 10, width * 2, 20);
	stuff.add(platform);
	platform.debug = true;

	walls = new Group();
	for (let i = 0; i < NUM_WALLS; i++) {
		const wall = createSprite(
			random(32, width), 
			height * 7/8, 
			40, 
			height/4
		);
		walls.add(wall);
	}
	
	for (let i = 0; i < NUM_BUSHES; i++	) {
		createSprite(
			random(0, width), 
			random(height-20, height), 
			random(10, 60), 
			random(50, 100)
		);
	}
	
	clouds = new Group();
	for (let i = 0; i < NUM_CLOUDS; i++) {
		const cloud = createSprite(
			random(width, width * 2),
			random(0, height/2),
			random(50,100),
			random(20,40)
		);
		cloud.velocity.x = -random(5, 10);
		clouds.add(cloud);
	}
	
	enemies = new Group();
	for (let i = 0; i < NUM_ENEMIES; i++) {
		const sz = random(30,50);
		const enemy = createSprite(
			random(width * 2, width * 4),
			random(height * 3/4, height * 7/8),
			sz,
			sz
		);
		enemy.velocity.x = -random(1, 5);
		enemies.add(enemy);
	}
	
	health = new Group();
	for (let i = 0; i < NUM_HEALTH; i++) {
		const life = createSprite(
			random(0, width),
			random(height/2, height),
			30,
			20
		);
		health.add(life);
	}
    
}

function draw() {
	if (gameState == 0) {
		intro();
	} else if (gameState == 1) {
		intructions();
	} else if (gameState == 2) {
		game();
	} else if (gameState == 3) {
		end();
	}
}

function intro() {
	camera.off();
	background(0);
	fill(255);
	textSize(24);
	textAlign(CENTER);
	text("my first game", width/2, height/2);
	text("by owen", width/2, height/2 + 24);
	text("press enter to start", width/2, height/2 + 48);
	if (keyWentDown("ENTER")) {
		gameState = 1;
	}
}

function intructions() {
	camera.off();
	background(100);
	fill(255);
	textSize(24);
	textAlign(CENTER);
	text("arrow right to move", width/2, height/2);
	text("x to jump", width/2, height/2 + 24);
	text("press enter to start", width/2, height/2 + 48);
	if (keyWentDown("ENTER")) {
		gameState = 2;
	}
}

function end() {
	camera.off();
	background(100);
	fill(255);
	textSize(24);
	textAlign(CENTER);
	text("you died", width/2, height/2);
	text("press enter to try again", width/2, height/2 + 48);
	if (keyWentDown("ENTER")) {
		gameState = 1;
		character.lives = 3;
	}
}

function game() {
	camera.on();
	background("white");
	
	for (let i = 0; i < clouds.length; i++) {
		const cloud = clouds[i];
		if (cloud.position.x + cloud.width/2 < 0) {
			cloud.position.x = random(width, width * 2);
			cloud.position.y = random(0, height/2);
		}
	}
	
	/* keyboard events */
	// constantMovement();
	/* true endless runner */
	// character.position.x += SPEED;
	/* player moves character only right */
	if (keyDown(RIGHT_ARROW)) {
		character.position.x += SPEED;
		character.changeAnimation("run");
	} else {
		character.changeAnimation("idle");
	}
	
	if (character.collide(platform) || character.collide(walls)) {
		character.velocity.y = 0;
		if (character.isJumping) {
			character.isJumping = false;
		}
		
	} else {
		character.velocity.y += GRAVITY;
	}
	
	if (keyWentDown("x")) {
		if (!character.isJumping) {
			character.velocity.y -= JUMP_SPEED;
			character.isJumping = true;
		}
	}
	
	for (let i = 0; i < enemies.length; i++) {
		const enemy = enemies[i];
		if (character.overlap(enemy)) {
			character.lives--;
			// enemy.remove();
			enemy.position.x += random(width * 2, width * 6);
		} else {
			wrap(enemy, random(width * 2, width * 6));
		}
	}
	
	for (let i = 0; i < health.length; i++) {
		const life = health[i];
		if (character.overlap(life)) {
			character.lives ++;
			// life.remove(); 
			life.position.x += random(width * 2, width * 6);
		} else {
			wrap(life, random(width * 2, width * 6));
		}
	}
	
	/* wrapping sprites */
	wrap(platform, width);
	for (let i = 0; i < walls.length; i++) {
		const wall = walls[i];
		wrap(wall, random(width*2, width*4));
	}
	
	
	/* camera follows character */
	camera.position.x = character.position.x;
	
	drawSprites(stuff);
	drawSprites(walls);
	drawSprites(enemies);
	drawSprites(health);
	
	/* ui */
	camera.off();
	drawSprites(clouds);
	fill(0);
	textAlign(LEFT);
	textSize(12);
	text("Lives: " + character.lives, 10, 20);
	
	/* detect game ending */
	if (character.lives <= 0) {
		gameState = 3;
		character.velocity.y = 0;
	}
}

function wrap(obj, reset) {
	if (character.position.x - obj.position.x >= width/2) {
		obj.position.x += reset;
	}
}

function constantMovement() {
	if (keyDown(RIGHT_ARROW)) {
		character.position.x += SPEED;
	}
	if (keyDown(LEFT_ARROW)) {
		character.position.x -= SPEED;
	}
}
