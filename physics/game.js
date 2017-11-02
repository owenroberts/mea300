/* global variable */
var character;
var platform;
const SPEED = 5;
const JUMP_SPEED = SPEED * 2;
const GRAVITY = 0.5;

let boulders;

function setup() {
    createCanvas(640, 640);
    
	/* character setup */
	character = createSprite(width/2, height-40, 16, 16);
    const idle_anim = loadAnimation("assets/idle/idle_00.png", "assets/idle/idle_09.png");
    const run_anim = loadAnimation("assets/run/run_0.png", "assets/run/run_5.png");
    character.addAnimation("idle", idle_anim);
    character.addAnimation("run", run_anim);
	//character.debug = true;
	character.isJumping = true;
	
	//character.friction = 0.1;
	
	/* platform setup */
	platform = createSprite(width/2, height - 10, width, 20);
	platform.immovable = true;
	platform.mass = 0.01;
	//platform.debug = true;

	boulders = new Group();
    dropBoulder();
}

function draw() {
    background("white");
    
    if (keyWentDown(RIGHT_ARROW)) {
		character.velocity.x += SPEED;
	}
	if (keyWentDown(LEFT_ARROW)) {
		character.velocity.x -= SPEED;
	}
    
	if (character.collide(platform)) {
		character.velocity.y = 0;
		character.friction = 0.05;
		if (character.isJumping) {
			character.isJumping = false;
		}
	} else {
		character.velocity.y += GRAVITY;
	}
	
	for (let i = 0; i < boulders.length; i++) {
		boulders[i].velocity.y += GRAVITY;
	}
	
	boulders.bounce(platform);
	boulders.bounce(character);
	
	if (keyWentDown("x")) {
		if (!character.isJumping) {
			character.velocity.y -= JUMP_SPEED;
			character.isJumping = true;
			character.friction = 0.01;
		}
		
	}
    
    drawSprites();
}

function dropBoulder() {
	const boulderSize = random(50,100);
	const boulder = createSprite(random(0,width), random(-height/2,0), boulderSize, boulderSize);
	boulder.mass = 1;
	boulder.friction = 0.01;
	boulders.add(boulder);
}