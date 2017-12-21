/* global variable */
let character, platform;
let clouds, walls, enemies, health, stuff, trees, shards;
const NUM_BUSHES = 8,
	NUM_CLOUDS = 2,
	NUM_WALLS = 3,
	NUM_ENEMIES = 3,
	NUM_HEALTH = 2;
const SPEED = 5;
const JUMP_SPEED = SPEED * 2;
const GRAVITY = 0.5;
let enemySpeedMin = SPEED / 5,
	enemySpeedMax = SPEED;
let cloudSpeedMin = SPEED / 2,
	cloudSpeedMax = SPEED;

let progress = 1;
let score = 0;

let bkgFrames = 0;
let bkgMusic;

/*
0 intro screen
1 instructions
2 game
3 ending
*/
var gameState = 0;

/* graphics */
const cloud_files = [
	"assets/cloud/cloud0.png",
	"assets/cloud/cloud1.png",
	"assets/cloud/cloud2.png",
	"assets/cloud/cloud3.png"
];

/* audio */

let jump_sfx = [];
let hit_sfx = [];
let life_sfx = [];
let ex_sfx = [];
const jump_files = [
	"assets/sfx/character/jump0.wav", "assets/sfx/character/jump1.wav", "assets/sfx/character/jump2.wav", "assets/sfx/character/jump3.wav"
];
const hit_files = [
	"assets/sfx/character/hit0.wav", "assets/sfx/character/hit1.wav", "assets/sfx/character/hit2.wav"
];
const life_files = [
	"assets/sfx/life/life0.wav", "assets/sfx/life/life1.wav", "assets/sfx/life/life2.wav"
];
const ex_files = [
	"assets/sfx/explosion/ex0.wav", "assets/sfx/explosion/ex1.wav", "assets/sfx/explosion/ex2.wav"
];

function preload() {
	bkgMusic = loadSound("assets/test.mp3");
	bkgMusic.setVolume(0.25);
	for (let i = 0; i < jump_files.length; i++) {
		const jump_sound = loadSound(jump_files[i]);
		jump_sfx.push(jump_sound);
	}

	for (let i = 0; i < hit_files.length; i++) {
		const hit_sound = loadSound(hit_files[i]);
		hit_sfx.push(hit_sound);
	}

	for (let i = 0; i < life_files.length; i++) {
		life_sfx.push(loadSound(life_files[i]));
	}

	for (let i = 0; i < ex_files.length; i++) {
		ex_sfx.push(loadSound(ex_files[i]));
	}
}

function setup() {
	createCanvas(640, 360);
	bkgMusic.loop();

	stuff = new Group();
	walls = new Group();
	clouds = new Group();
	enemies = new Group();
	health = new Group();
	trees = new Group();
	shards = new Group();

	/* character setup */
	character = createSprite(0, 20, 16, 16);
	character.setCollider("rectangle", -4, 0, 16, 32);
	const idle_anim = loadAnimation("assets/idle/idle_00.png", "assets/idle/idle_09.png");
	const run_anim = loadAnimation("assets/run/run_0.png", "assets/run/run_5.png");
	character.addAnimation("idle", idle_anim);
	character.addAnimation("run", run_anim);
	character.isJumping = true;
	character.lives = 3;
	stuff.add(character);

	/* platform setup */
	platform = createSprite(0, height - 10, width * 2, 20);
	platform.rate = floor(random(6,10))
	platform.space = floor(random(4,8));
	platform.color = color(random(0,50), random(150,255), random(100,200));
	//platform.debug = true;
	platform.draw = function() {
		if (frameCount % this.rate == 0) {
			this.space = floor(random(4,8));
		}
		stroke(this.color);
		push();
		// translate(-this.width/2,-this.height/2); // regular
		// for (let x = 0; x <= this.width; x += this.space) {
		translate(0,-this.height/2);
		for (let x = -this.width/2; x <= this.width/2; x += this.space) { // triangle
			line(x, 0, 0, x);
			if (x != this.x)
				line(x, 0 + this.width, 0 + this.width, x);
		}
		pop();
	}
	platform.depth = -1;
	stuff.add(platform);

	for (let i = 0; i < NUM_CLOUDS; i++) {
		const cloud = createSprite(
			random(width, width * 2),
			random(0, height / 2),
			random(30,60),
			random(10,30)
		);
		cloud.rate = floor(random(5,20))
		cloud.space = floor(random(2,3));
		cloud.color = color(random(100,200), random(100,200), random(200,255));
		cloud.offsets = [
			{x: 0, y: 0},
			{x: random(-10, 10), 	y: random(-10, 5)},
			{x: random(-5, 10), 	y: random(-10, 5)},
			{x: random(-10, 10), 	y: random(-10, 5)}
		];
		//platform.debug = true;
		cloud.draw = function() {
			if (frameCount % this.rate == 0) {
				this.space = floor(random(4,8));
			}
			stroke(this.color);
			push();

			translate(-this.width/2, -this.height/2); // regular
			
			const side = this.width > this.height ? this.width : this.height;
			const otherSide = this.width < this.height ? this.width : this.height;
			const orient = this.width > this.height ? "landscape" : "portrait";
			stroke(this.color);
			
			for (let i = 0; i < 4; i++) {
				push();
				translate(this.offsets[i].x, this.offsets[i].y);
				for (let x = 0; x < side; x += otherSide) {
					for (let y = 0; y < otherSide; y += this.space) {
						if (orient == "portrait") {
							line(y, x, 0, x+y);
							if (y != this.y) line(y, x + otherSide, otherSide, y + x);
						} else {
							line(x, y, x+y, 0);
							if (y != this.y) line(x + otherSide, y, x + y, otherSide);
						}
					}
				}
				pop();
			}
			pop();
		}


		cloud.velocity.x = -random(cloudSpeedMin, cloudSpeedMax);
		clouds.add(cloud);
	}

	buildLevel();
}

function buildLevel() {
	for (let i = 0; i < NUM_WALLS; i++) {
		const wall = createSprite(
			random(i * width / NUM_WALLS, (i + 1) * width / NUM_WALLS),
			height * 7 / 8,
			40,
			height / 4
		);
		wall.rate = floor(random(6,10))
		wall.space = floor(random(4,8));
		wall.color = color(random(50,150), random(50,100), random(200,255));
	  //  wall.debug = true;
		wall.draw = function() {
			if (frameCount % this.rate == 0) {
				this.space = floor(random(4,8));
			}
			stroke(this.color);
			push();
			translate(-this.width/2,-this.height/2);
			for (let x = 0; x <= this.width; x += this.space) {
				line(x, 0, 0, x);
				if (x != this.x)
					line(x, 0 + this.width, 0 + this.width, x);
			}
			translate(0,this.height/2);
			for (let x = 0; x <= this.width; x += this.space) {
				line(x, 0, 0, x);
				if (x != this.x)
					line(x, 0 + this.width, 0 + this.width, x);
			}
			pop();
		}
		walls.add(wall);
	}
	for (let i = 0; i < NUM_BUSHES; i++) {
		const tree = createSprite(
			random(0, width), 
			random(height-20, height), 
			random(10, 20), 
			random(5, 100)
		);
		tree.rate = floor(random(6,10))
		tree.space = floor(random(4,8));
		tree.color = color(random(255), random(255), random(255));
	 //   tree.debug = true;
		tree.draw = function() {
			if (frameCount % this.rate == 0) {
				this.space = floor(random(4,8));
			}
			stroke(this.color);
			push();
			// weird broken one 
			translate(-this.width/2,-this.height/2);
			for (let y = 0; y <= this.height; y += this.height/this.width) {
				for (let x = 0; x <= this.width; x += this.space) {
					line(x, y, 0, y + x);
					if (x != this.x)
						line(x, 0 + this.width, 0 + this.width, x);
				}
			}
			pop();
		}
		trees.add(tree);
	}

	for (let i = 0; i < NUM_ENEMIES; i++) {
		spawnEnemy();
	}
	for (let i = 0; i < NUM_HEALTH; i++) {
		const life = createSprite(
			random(0, width),
			random(height / 2, height * 3/4),
			20,
			5
		);

		life.rate = floor(random(5,20))
		life.space = floor(random(2,3));
		life.color = color(random(200,255), random(0,100), random(100,255));
		life.sizer = 0;
		life.sizeUpdate = 0.05;
		life.draw = function() {
			if (frameCount % this.rate == 0) {
				this.space = floor(random(4,8));
			}
			this.sizer += this.sizeUpdate;
			if (this.sizer <= 0 || this.sizer >= 2) {
				this.sizeUpdate *= -1;
			}
			stroke(this.color);
			push();

			translate(-this.width/2, -this.height/2); // regular
			
			let side = this.width > this.height ? this.width : this.height;
			let otherSide = this.width < this.height ? this.width : this.height;
			const orient = this.width > this.height ? "landscape" : "portrait";
			stroke(this.color);

			side += this.sizer;
			otherSide += this.sizer;

			for (let x = 0; x < side; x += otherSide) {
				for (let y = 0; y < otherSide; y += this.space) {
					if (orient == "portrait") {
						line(y, x, 0, x+y);
						if (y != this.y) line(y, x + otherSide, otherSide, y + x);
					} else {
						line(x, y, x+y, 0);
						if (y != this.y) line(x + otherSide, y, x + y, otherSide);
					}
				}
			}
			translate(side * 5/8, -otherSide * 1.5);
			rotate(HALF_PI);
			//translate(this.width/2, this.height/2);

			for (let x = 0; x < side; x += otherSide) {
				for (let y = 0; y < otherSide; y += this.space) {
					if (orient == "portrait") {
						line(y, x, 0, x+y);
						if (y != this.y) line(y, x + otherSide, otherSide, y + x);
					} else {
						line(x, y, x+y, 0);
						if (y != this.y) line(x + otherSide, y, x + y, otherSide);
					}
				}
			}



			pop();
		}
		health.add(life);
	}
}

function spawnEnemy() {
	const sz = random(20, 50);
	const enemy = createSprite(
		random(width * 2, width * 4),
		random(height * 3 / 4, height * 7 / 8),
		sz,
		sz
	);
	enemy.rate = floor(random(5,20))
	enemy.space = floor(random(2,3));
	enemy.color = 0;
	enemy.draw = function() {
		if (frameCount % this.rate == 0) {
			this.space = floor(random(4,8));
		}
		stroke(this.color);
		push();
		rotate(frameCount/5);
		translate(-this.width/2, -this.height/2); // regular
		
		
		let side = this.width > this.height ? this.width : this.height;
		let otherSide = this.width < this.height ? this.width : this.height;
		const orient = this.width > this.height ? "landscape" : "portrait";
		stroke(this.color);

		for (let x = 0; x < side; x += otherSide) {
			for (let y = 0; y < otherSide; y += this.space) {
				if (orient == "portrait") {
					line(y, x, 0, x+y);
					if (y != this.y) line(y, x + otherSide, otherSide, y + x);
				} else {
					line(x, y, x+y, 0);
					if (y != this.y) line(x + otherSide, y, x + y, otherSide);
				}
			}
		}
		pop();
	}
	//enemy.debug = true;
	enemy.velocity.x = -random(enemySpeedMin, enemySpeedMax);
	enemies.add(enemy);
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
	text("left + right arrows to move", width / 2, height / 2);
	text("x to jump", width / 2, height / 2 + 24);
	text("press enter to start", width / 2, height / 2 + 48);
	if (keyWentDown("ENTER")) {
		gameState = 2;
	}
}

function end() {
	camera.off();
	background(100);
	fill(255);
	text("you died", width / 2, height / 2);
	text("press enter to try again", width / 2, height / 2 + 48);
	if (keyWentDown("ENTER")) {
		gameState = 1;
		character.lives = 3;
	}
}

function game() {
	camera.on();
	if (bkgFrames > 0) bkgFrames--;
	else background("white");

	for (let i = 0; i < clouds.length; i++) {
		const cloud = clouds[i];
		if (cloud.position.x + cloud.width / 2 < 0) {
			cloud.position.x = random(width, width * 2);
			cloud.position.y = random(0, height / 2);
		}
	}

	for (let i = 0; i < trees.length; i++) {
		const tree = trees[i];
		wrap(tree, random(width, width*3));
	}

	/* keyboard events */
	if (keyDown(RIGHT_ARROW)) {
		character.position.x += SPEED;
		character.changeAnimation("run");
	} else if (keyDown(LEFT_ARROW)) {
		character.position.x -= SPEED;
		character.changeAnimation("run");
	} else {
		character.changeAnimation("idle");
	}

	if (character.collide(platform) || character.collide(walls)) {
		character.velocity.y = 0;
		if (character.isJumping) {
			character.isJumping = false;
			hit_sfx[floor(random(0, hit_sfx.length))].play();
		}
	} else {
		character.velocity.y += GRAVITY;
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
			bkgFrames = 50;
			ex_sfx[floor(random(0, ex_sfx.length))].play();
			for (let h = 0; h < 3; h++) {
				const sz = random(10, 20);
				const b = createSprite(enemy.position.x, enemy.position.y, sz, sz);
				b.rate = floor(random(5,20))
				b.space = floor(random(2,3));
				b.color = 0;
				b.draw = function() {
					if (frameCount % this.rate == 0) {
						this.space = floor(random(4,8));
					}
					stroke(this.color);
					push();
					rotate(frameCount/5);
					translate(-this.width/2, -this.height/2); // regular
					
					let side = this.width > this.height ? this.width : this.height;
					let otherSide = this.width < this.height ? this.width : this.height;
					const orient = this.width > this.height ? "landscape" : "portrait";
					stroke(this.color);

					for (let x = 0; x < side; x += otherSide) {
						for (let y = 0; y < otherSide; y += this.space) {
							if (orient == "portrait") {
								line(y, x, 0, x+y);
								if (y != this.y) line(y, x + otherSide, otherSide, y + x);
							} else {
								line(x, y, x+y, 0);
								if (y != this.y) line(x + otherSide, y, x + y, otherSide);
							}
						}
					}
					pop();
				}
				b.velocity.x = random(-enemySpeedMin*2, enemySpeedMax*2);
				b.velocity.y = random(-enemySpeedMin*2, enemySpeedMax*2);
				b.life = 20;
				shards.add(b);
			}

			enemy.position.x += random(width * 2, width * 4);
		} else {
			wrap(enemy, random(width * 2, width * 5));
		}
	}
	for (let i = 0; i < health.length; i++) {
		const life = health[i];
		if (character.overlap(life)) {
			character.lives++;
			life_sfx[floor(random(0, life_sfx.length))].play();
			life.position.x += random(width * 2, width * 6);
			life.position.y = random(height / 2, height * 3 / 4);
		} else {
			wrap(life, random(width * 2, width * 6));
		}
	}

	/* wrapping sprites */
	for (let i = 0; i < walls.length; i++) {
		const wall = walls[i];
		wrap(wall, random(width * 2, width * 4));
	}
	 wrap(platform, width);


	/* camera follows character */
	camera.position.x = character.position.x;

	drawSprites(stuff);
	drawSprites(walls);
	drawSprites(enemies);
	drawSprites(health);
	drawSprites(trees);
	drawSprites(shards);

	
	camera.off();
	drawSprites(clouds);

	/* ui */
	fill(0);
	textAlign(LEFT);
	textSize(12);
	text("Lives: " + character.lives, 10, 20);
	text("Score: " + (score * 10), width - 80, 20);

	/* detect game ending */
	if (character.lives <= 0 || character.position.y > height + 100) {
		gameState = 3;
		score = 0;
		character.velocity.y = 0;
		character.position.x = 0;
		character.position.y = 20;
		platform.position.x = 0;
		enemies.clear();
		health.clear();
		walls.clear();
		trees.clear();
		enemySpeedMin = SPEED / 5;
		enemySpeedMax = SPEED;
		buildLevel();
	}

	/* follow progress */
	if (character.position.x > width * 5 * progress) {
		progress++;
		enemySpeedMin++;
		enemySpeedMax++;
		spawnEnemy();
//		if (walls.length > 0)
//			walls.remove(walls[walls.length-1]);
		if (health.length > 0) 
			health.remove(health[health.length-1]);
	}

	if (character.position.x > width * score) {
		score++;
	}
}

function wrap(obj, reset) {
	if (character.position.x - obj.position.x >= width / 2) {
		obj.position.x += reset;
	}
}