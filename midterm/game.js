/* global variable */
var character;
var lives = 3;
var platform;
const SPEED = 5;
const JUMP_SPEED = SPEED * 2;
const GRAVITY = 0.5;
var clouds, enemies, health;

function setup() {
    createCanvas(640, 360);
    
	/* character setup */
	character = createSprite(20, 20, 16, 16);
    const idle_anim = loadAnimation("assets/idle/idle_00.png", "assets/idle/idle_09.png");
    const run_anim = loadAnimation("assets/run/run_0.png", "assets/run/run_5.png");
    character.addAnimation("idle", idle_anim);
    character.addAnimation("run", run_anim);
	//character.debug = true;
	character.isJumping = true;
	
	/* platform setup */
	platform = createSprite(0, height - 10, width, 20);
	//platform.debug = true;

	const NUM_BUSHES = 8;
	for (let i = 0; i < NUM_BUSHES; i++) {
		createSprite(
			random(0, width), 
			random(height-20, height), 
			random(10, 60), 
			random(50, 100)
		);
	}
	
	const NUM_CLOUDS = 5;
	clouds = new Group();
	for (let i = 0; i < NUM_CLOUDS; i++) {
		const cloud = createSprite(
			random(0, width * 2),
			random(0, height/2),
			random(50,100),
			random(20,40)
		);
		cloud.velocity.x = -random(0.1, 0.5);
		clouds.add(cloud);
	}
	
	const NUM_ENEMIES = 3;
	enemies = new Group();
	for (let i = 0; i < NUM_ENEMIES; i++) {
		const enemy = createSprite(
			random(width, width * 2),
			random(height - 120, height - 20),
			random(20, 40),
			random(50, 100)
		);
		enemy.velocity.x = -random(0.5, 1);
		enemies.add(enemy);
	}

	const NUM_HEALTH = 1;
	health = new Group();
	for (let i = 0; i < NUM_HEALTH; i++) {
		const h = createSprite(
			random(0, width),
			random(height - 120, height - 20),
			random(30),
			random(30)
		);
		health.add(h);
	}
    
}

function draw() {
    background("white");
    
    /* keyboard events */
    constantMovement();
    
	if (character.collide(platform)) {
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

	for (let i = 0; i < clouds.length; i++) {
		if (clouds[i].position.x + clouds[i].width/2 < 0) {
			clouds[i].position.x = random(width, width*2);
		}
	}

	for (let i = 0; i < enemies.length; i++) {
		if (enemies[i].position.x + enemies[i].width/2 < 0) {
			enemies[i].position.x = random(width, width * 2);
		}
		if (character.overlap(enemies[i])) {
			enemies[i].position.x = random(width, width * 2);
			lives--;
		}
	}

	for (let i = 0; i < health.length; i++) {
		if (character.overlap(health[i])) {
			health[i].position.x = random(0, width);
			lives++;
		}
	}

	if (!keyIsPressed) {
		character.changeAnimation("idle");
	}

	camera.position.x = character.position.x;

    drawSprites();

    camera.off();
    text("Lives: " + lives, 10, 20);
}

function constantMovement() {
    if (keyDown(RIGHT_ARROW)) {
        character.position.x += SPEED;
        character.changeAnimation("run");
    }
    if (keyDown(LEFT_ARROW)) {
        character.position.x -= SPEED;
        character.changeAnimation("run");
    }
}
