/* global variable */
var character;
var platforms, platform;
var clouds, walls, enemies, health, stuff;
const NUM_BUSHES = 8, NUM_CLOUDS = 5, NUM_WALLS = 3, NUM_ENEMIES = 3, NUM_HEALTH = 1;
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
	character.lives = 3;
	stuff = new Group();
	stuff.add(character);
	
	platforms = new Group();
	/* platform setup */
	// let platform1 =  createSprite(0, height - 10, width, 20);
	// let platform2 =  createSprite(width, height - 10, width, 20);
	// 
	// platforms.add(platform1);
	// platforms.add(platform2);
	//platform.debug = true;

	platform = createSprite(0, height - 10, width * 2, 20);
	platforms.add(platform);

	console.log(platform.constructor);
	platform.constructor.wrap = function(dist, reset) {
		if (character.position.x - this.position.x >= dist) {
			this.position.x = reset;
		}
	}



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
		cloud.velocity.x = -random(1, 2);
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
    background("white");
	
	for (let i = 0; i < clouds.length; i++) {
		const cloud = clouds[i];
		if (cloud.position.x + cloud.width/2 < 0) {
			cloud.position.x = random(width, width * 2);
			cloud.position.y = random(0, height/2);
		}
	}
    
    /* keyboard events */
    constantMovement();
    
	if (character.collide(platforms) || character.collide(walls)) {
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
	
	//character.collide(walls);
	// console.log(enemies[0].position.x);
	for (let i = 0; i < enemies.length; i++) {
		const enemy = enemies[i];

		if (character.overlap(enemy)) {
			character.lives--;
			enemy.position.x = character.position.x + random(width, width*2);
		} else if (enemy.position.x < character.position.x - width) {
			enemy.position.x = character.position.x + random(width, width*2);
		}
	}
	
	for (let i = 0; i < health.length; i++) {
		const life = health[i];
		if (character.overlap(life)) {
			character.lives ++;
			life.remove(); 
		}
	}

	// platforms not moving dummy
	for (let i = 0; i < platforms.length; i++) {
		const p = platforms[i];
		//console.log(p.position.x, -width);
		if (p.position.x < -width) {
			p.position.x = width;
			//console.log(p.position.x);
		}
	}

	// if (character.position.x - platform.position.x >= width/2) {
	// 	platform.position.x += width;
	// }
	// platform.wrap(width/2, width);
    
    camera.position.x = character.position.x;

    // drawSprites(character);
    drawSprites(stuff);
    drawSprites(walls);
    drawSprites(enemies);
    //drawSprites(health);
    drawSprites(platforms);
    camera.off();
    //drawSprites(clouds);
	/* ui */
	text("Lives: " + character.lives, 10, 20);
}

function constantMovement() {
    if (keyDown(RIGHT_ARROW)) {
        character.position.x += SPEED;
    }
    if (keyDown(LEFT_ARROW)) {
        character.position.x -= SPEED;
    }
}
