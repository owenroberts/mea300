/* global variable */
var character;
var skyBackground;
var platform;
var clouds, walls, enemies, health, stuff;
const NUM_BUSHES = 8,
	NUM_CLOUDS = 2;
	NUM_WALLS = 4,
	NUM_ENEMIES = 3,
	NUM_HEALTH = 1;
const SPEED = 5;
const JUMP_SPEED = SPEED * 2;
const GRAVITY = 0.5;
var enemySpeedMin = SPEED/5, enemySpeedMax = SPEED;
const cloudSpeedMin = SPEED/2, cloudSpeedMax = SPEED;

/* gamestates
0 intro screen
1 instructions
2 game
3 dies
4 next level
*/

var gameState = 0;
var progress = 1;
var currentLevel = 0;
var levelData = {
	0: {
		walls: 4,
		enemies: 3,
		health: 2,
		speedMin: SPEED/5,
		speedMax: SPEED
	},
	1: {
		walls: 3,
		enemies: 5,
		health: 1,
		speedMin: SPEED/4,
		speedMax: SPEED * 1.5
	},
	2: {
		walls: 2,
		enemies: 9,
		health:0,
		speedMin: SPEED/2,
		speedMax: SPEED * 2
	}
};


/* graphics */
const cloud_files = [
	"assets/cloud/cloud0.png", 
	"assets/cloud/cloud1.png", 
	"assets/cloud/cloud2.png", 
	"assets/cloud/cloud3.png"
];

/* audio */
var jump_sfx = [];
const jump_files = [
	"assets/sfx/character/jump0.wav", "assets/sfx/character/jump1.wav", "assets/sfx/character/jump2.wav", "assets/sfx/character/jump3.wav"
];

var hit_sfx = [];
const hit_files = [
	"assets/sfx/character/hit0.wav", "assets/sfx/character/hit1.wav", "assets/sfx/character/hit2.wav"
];

function preload() {
	for (let i = 0; i < jump_files.length; i++) {
		const jump_sound = loadSound(jump_files[i]);
		jump_sfx.push(jump_sound);
	}
	
	for (let i = 0; i < hit_files.length; i++) {
		const hit_sound = loadSound(hit_files[i]);
		hit_sfx.push(hit_sound);
	}
}

function setup() {
	createCanvas(640, 360);

	stuff = new Group();
	walls = new Group();
	clouds = new Group();
	enemies = new Group();
	health = new Group();

	/* character setup */
	character = createSprite(0, 20, 16, 16);
	character.setCollider("rectangle", -4, 0, 16, 32);
	const idle_anim = loadAnimation("assets/idle/idle_00.png", "assets/idle/idle_09.png");
	const run_anim = loadAnimation("assets/run/run_0.png", "assets/run/run_5.png");
	character.addAnimation("idle", idle_anim);
	character.addAnimation("run", run_anim);
	character.debug = true;
	character.isJumping = true;
	character.lives = 3;
	character.minX = 0;
	stuff.add(character);
	
	const sky_img = loadImage("assets/seamless_bkg.png");
	skyBackground = createSprite(0, height/2, width, height);
	skyBackground.addImage("sky", sky_img);
	skyBackground.debug = true;

	/* platform setup */
	platform = createSprite(0, height - 10, width * 2, 20);
	stuff.add(platform);
	//platform.debug = true;

	for (let i = 0; i < NUM_BUSHES; i++) {
		createSprite(
			random(0, width),
			random(height - 20, height),
			random(10, 60),
			random(50, 100)
		);
	}
	
	for (let i = 0; i < NUM_CLOUDS; i++) {
		const cloud = createSprite(
			random(width, width * 2),
			random(0, height / 2),
			random(50, 100),
			random(20, 40)
		);
		const cloud_img = loadImage(cloud_files[floor(random(0, cloud_files.length))]);
		cloud.addImage(cloud_img);
		cloud.velocity.x = -random(cloudSpeedMin, cloudSpeedMax);
		clouds.add(cloud);
	}
	
	buildLevel();
}

function buildLevel() {
	for (let i = 0; i < NUM_WALLS; i++) {
		const wall = createSprite(
			i * width*2/NUM_WALLS,
			random(height * 7 / 8, height/2),
			200,
			40
		);
		wall.debug = true;
		walls.add(wall);
	}
	
	for (let i = 0; i < NUM_ENEMIES; i++) {
		spawnEnemy();
	}
	
	for (let i = 0; i < NUM_HEALTH; i++) {
		const life = createSprite(
			random(0, width),
			random(height / 2, height),
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
		dead();
	}
}

function intro() {
	camera.off();
	background(0);
	fill(255);
	textSize(24);
	textAlign(CENTER);
	text("my first game", width / 2, height / 2);
	text("by owen", width / 2, height / 2 + 24);
	text("press enter to start", width / 2, height / 2 + 48);
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
	text("arrow right to move", width / 2, height / 2);
	text("x to jump", width / 2, height / 2 + 24);
	text("press enter to start", width / 2, height / 2 + 48);
	if (keyWentDown("ENTER")) {
		gameState = 2;
	}
}

function dead() {
	camera.off();
	background(100);
	fill(255);
	textSize(24);
	textAlign(CENTER);
	text("you died", width / 2, height / 2);
	text("press enter to try again", width / 2, height / 2 + 48);
	if (keyWentDown("ENTER")) {
		gameState = 1;
		reset();
		buildLevel(4, 3, 2);
	}
}

function reset() {
	character.lives = 3;
	character.velocity.y = 0;
	character.minX = 0;
	character.position.x = 0;
	character.position.y = 0;
	camera.position.x = width/2;
	platform.position.x = 0;
	skyBackground.position.x = 0;
	walls.clear();
	enemies.clear();
	health.clear();
}

function game() {
	camera.off();
	background("white");
	//background(skyBackground);
	camera.on();
	skyBackground.display();
	wrap(skyBackground, width);

	for (let i = 0; i < clouds.length; i++) {
		const cloud = clouds[i];
		if (cloud.position.x + cloud.width / 2 < 0) {
			cloud.position.x = random(width, width * 2);
			cloud.position.y = random(0, height / 2);
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
	} else if(keyDown(LEFT_ARROW)) {
		if (character.minX < character.position.x - width/2) {
			character.minX = character.position.x - width/2;
		}
		if (character.position.x > character.minX) {
			character.position.x -= SPEED;
		}
	} else {
		character.changeAnimation("idle");
	}

	/* new collision for platform/ground and walls/platforms  */
	if (character.collide(platform)) {
		character.velocity.y = 0;
		if (character.isJumping) {
			character.isJumping = false;
			hit_sfx[floor(random(0, hit_sfx.length))].play();
		}

	} else {
		character.velocity.y += GRAVITY;
	}
	
	for (let i = 0; i < walls.length; i++) {
		const wall = walls[i];
		if (character.collide(wall)) {
			if (character.position.y + character.height/2 - 2 < wall.position.y - wall.height/2) {
				character.velocity.y = 0;
				if (character.isJumping) {
					character.isJumping = false;
					hit_sfx[floor(random(0, hit_sfx.length))].play();
				}
			}
		}
	}
	
	/* jump event */
	if (keyWentDown("x")) {
		if (!character.isJumping) {
			character.velocity.y -= JUMP_SPEED;
			character.isJumping = true;
			jump_sfx[floor(random(0, jump_sfx.length))].play();
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
			character.lives++;
			// life.remove(); 
			life.position.x += random(width * 2, width * 6);
		} else {
			wrap(life, random(width * 2, width * 6));
		}
	}

	/* wrapping sprites */
	//wrap(platform, width);
	if (character.position.x - platform.position.x > width/2) {
		platform.position.x += width;
	}
	for (let i = 0; i < walls.length; i++) {
		const wall = walls[i];
		wrap(wall, random(width * 2, width * 4));
	}


	/* camera follows character */
	if (character.position.x > camera.position.x) {
		camera.position.x = character.position.x /*+ width/4*/;
	}
	

	drawSprites(stuff);
	drawSprites(walls);
	drawSprites(enemies);
	drawSprites(health);

	/* ui */
	camera.off();
	drawSprites(clouds);
	
	textAlign(LEFT);
	textSize(24);
	stroke("red");
	fill(0);
	rect(10, 0, 50, 20);
	fill(255);
	text("Lives: " + character.lives, 10, 20);

	/* detect game ending */
	if (character.lives <= 0) {
		gameState = 3;
	}
	
	/* follow progress */
	if (character.position.x > width * 2 * progress) {
		progress++;
		console.log("Next level");
		spawnEnemy();
		enemySpeedMin++;
		enemySpeedMax++;
		if (walls.length >0)
			walls.remove(walls[walls.length-1]);
		if (health.length > 0) 
			health.remove(health[health.length-1]);
	}
}

function spawnEnemy() {
	const sz = random(30, 50);
	const enemy = createSprite(
		character.position.x + random(width * 2, width * 4),
		random(height * 3 / 4, height * 7 / 8),
		sz,
		sz
	);
	enemy.velocity.x = -random(enemySpeedMin, enemySpeedMax);
	enemies.add(enemy);
}

function wrap(obj, reset) {
	if (character.position.x - obj.position.x - obj.width/2 >= width / 2) {
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
