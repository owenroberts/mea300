/* global variable */
var character;
var platform;
const SPEED = 5;
const JUMP_SPEED = SPEED * 2;
const GRAVITY = 0.5;

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
	platform = createSprite(width/2, height - 10, width, 20);
	//platform.debug = true;

	const NUM_BUSHES = 8;
	for (let i = 0; i < NUM_BUSHES; i++) {
		console.log(i);
		createSprite(
			random(0, width), 
			random(height-20, height), 
			random(10, 60), 
			random(50, 100)
		);
	}
	
	const NUM_CLOUDS = 5;
	for (let i = 0; i < NUM_CLOUDS; i++) {
		const cloud = createSprite(
			random(width, width * 2),
			random(0, height/2),
			random(50,100),
			random(20,40)
		);
		cloud.velocity.x = -random(0.1, 0.5);
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
    drawSprites();
}

function constantMovement() {
    if (keyDown(RIGHT_ARROW)) {
        character.position.x += SPEED;
    }
    if (keyDown(LEFT_ARROW)) {
        character.position.x -= SPEED;
    }
}
