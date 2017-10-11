/* global variable */
var character;
var platform;
const PLATFORM_HEIGHT = 20;
var clouds, walls, enemies, health, stuff, trees;
const NUM_TREES = 8, NUM_CLOUDS = 5, NUM_WALLS = 5, NUM_ENEMIES = 10, NUM_HEALTH = 1;
const SPEED = 5;
const JUMP_SPEED = SPEED * 2;
const GRAVITY = 0.5;

var gameState = 0;
var score = 0;
/*
0 intro page
1 instructions
2 game
3 you died
*/

/* audio */
const jump_files = ["assets/sfx/jump0.wav", "assets/sfx/jump1.wav", "assets/sfx/jump2.wav"];
var jump_sfx = [];
const land_files =  ["assets/sfx/land0.wav", "assets/sfx/land1.wav", "assets/sfx/land2.wav", "assets/sfx/land3.wav"];
var land_sfx = [];

function preload() {
	for (let i = 0; i < jump_files.length; i++) {
		const jump_sound = loadSound(jump_files[i]);
		jump_sfx.push(jump_sound);
	}
	for (let i = 0; i < land_files.length; i++) {
		const land_sound = loadSound(land_files[i]);
		land_sfx.push(land_sound);
	}
}

function setup() {
    createCanvas(640, 360);
    
	/* character setup */
	character = createSprite(20, 20, 16, 16);
    const idle_anim = loadAnimation("assets/idle/idle_00.png", "assets/idle/idle_09.png");
    const run_anim = loadAnimation("assets/run/run_0.png", "assets/run/run_5.png");
    character.addAnimation("idle", idle_anim);
    character.addAnimation("run", run_anim);
	character.isJumping = true;
	character.lives = 3;
	stuff = new Group();
	//character.setCollider("circle", 0, 0, 16);
	character.setCollider("rectangle", -4, 0, 16, 32);
	stuff.add(character);
	

	platform = createSprite(0, height - PLATFORM_HEIGHT/2, width * 2, PLATFORM_HEIGHT);
	platform.name = "platform";
	stuff.add(platform);

	walls = new Group();
	for (let i = 0; i < NUM_WALLS; i++) {
		const wall = createSprite(
			random( constrain(i-1, 0, NUM_WALLS) * width/NUM_WALLS, i * width/NUM_WALLS),
			height * 7/8 - PLATFORM_HEIGHT/2, 
			40, 
			height/4 - PLATFORM_HEIGHT
		);
		walls.add(wall);
	}
	
	trees = new Group();
	for (let i = 0; i < NUM_TREES; i++	) {
		const tree = createSprite(
			random(0, width), 
			random(height-20, height), 
			random(1, 6), 
			random(5, 100)
		);
		trees.add(tree);
	}
	
	clouds = new Group();
	for (let i = 0; i < NUM_CLOUDS; i++) {
		const cloud = createSprite(
			random(0, width * 2),
			random(0, height/2),
			random(5,100),
			random(2,4)
		);
		cloud.velocity.x = -random(.1, 1);
		clouds.add(cloud);
	}
	
	enemies = new Group();
	for (let i = 0; i < NUM_ENEMIES; i++) {
		const sz = random(20,60);
		const enemy = createSprite(
			random(width * 2, width * 6),
			random(height/2, height * 7.5/8),
			sz,
			sz/2
		);
		enemy.velocity.x = -random(1, 5);
		enemies.add(enemy);
	}
	
	health = new Group();
	for (let i = 0; i < NUM_HEALTH; i++) {
		const life = createSprite(
			random(0, width),
			random(height/2, height),
			20,
			20
		);
		health.add(life);
	}



}

function draw() {
	if (gameState == 0) {
		intro();
	} else if (gameState == 1) {
		instructions();
	} else if (gameState == 2) {
		game();
	} else if (gameState == 3) {
		dead();
	}
}

function intro() {
	camera.off();
	background(100);
	fill(255);
	text("demo game", width/2, height/2);
	text("enter to start", width/2, height/2 + 20);
	if (keyWentUp("ENTER")) {
		gameState++;
	}
}

function instructions() {
	camera.off();
	background(200);
	text("arrow keys to move", width/2, height/2);
	text("x to jump", width/2, height/2 + 20);
	text("enter to start", width/2, height/2 + 40);
	if (keyWentUp("ENTER")) {
		gameState++;
	}
}
function dead() {
	camera.off();
	background(0);
	fill(255);
	text("you died", width/2, height/2);
	text("enter to try again", width/2, height/2 + 20);
	if (keyWentUp("ENTER")) {
		gameState = 1;
		character.lives = 3;
	}
}

function game() {
    background("white");
    camera.on();
	
	for (let i = 0; i < clouds.length; i++) {
		const cloud = clouds[i];
		if (cloud.position.x + cloud.width/2 < 0) {
			cloud.position.x = random(width, width * 2);
			cloud.position.y = random(0, height/2);
		}
	}

	for (let i = 0; i < trees.length; i++) {
		const tree = trees[i];
		wrap(tree, random(width, width*3));
	}
    
    /* keyboard events */
    constantMovement();
    
	if (character.collide(platform) || character.collide(walls)) {
		
		if (character.velocity.y > 0) 
			character.velocity.y = 0;
		if (character.isJumping) {
			character.isJumping = false;
			
			const i = floor(random(0, land_sfx.length))
			land_sfx[i].play();
		}
	} else {
		character.velocity.y += GRAVITY;
	}
	
	/* character jump */
	if (keyWentDown("x")) {
		if (!character.isJumping) {
			character.velocity.y -= JUMP_SPEED;
			character.isJumping = true;
			jump_sfx[floor(random(0, jump_sfx.length))].play();
		}
	}
	
	//character.collide(walls);
	// console.log(enemies[0].position.x);
	for (let i = 0; i < enemies.length; i++) {
		const enemy = enemies[i];

		if (character.overlap(enemy)) {
			character.lives--;
			enemy.position.x = character.position.x + random(width, width*2);
		} else {
			wrap(enemy, random(width * 2, width * 5));
		}
	}
	
	for (let i = 0; i < health.length; i++) {
		const life = health[i];
		if (character.overlap(life)) {
			character.lives ++;
			life.position.x += random(width, width * 2);
		} else {
			wrap(life, random(width * 2, width * 4));
		}
	}

	for (let i = 0; i < walls.length; i++) {
		wrap(walls[i], random(width * 3, width * 5));
	}


	wrap(platform, width);
    
    camera.position.x = character.position.x;

    drawSprites(stuff);
    drawSprites(walls);
  	drawSprites(enemies);
    drawSprites(health);
    drawSprites(trees);
    camera.off();
    drawSprites(clouds);
	/* ui */
	fill(0);
	text("Lives: " + character.lives, 10, 20);
	text("Score: " + score, width - 60, 20);

	if (character.lives <= 0) {
		gameState++;
		score = 0;
		character.velocity.y = 0;
	}
}

function wrap(obj, reset) {
	if (character.position.x - obj.position.x >= width/2) {
		if (obj.name == "platform")
			score++;
		obj.position.x += reset;
	}
}

function constantMovement() {
    if (keyDown(RIGHT_ARROW)) {
        character.position.x += SPEED;
        character.changeAnimation("run");
    } else  if (keyDown(LEFT_ARROW)) {
        character.position.x -= SPEED;
        character.changeAnimation("run");
    } else {
    	character.changeAnimation("idle");
    }
}
