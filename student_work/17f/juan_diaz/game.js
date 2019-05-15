var character;
var skybackground;
var reward;
var trees;
var clouds;
var platforms;
var obstacle;
var backgrounds;
var max_lives = 10;
var floor;
var health;
var birds;
var level;
var walk;
var jump;
var bg;
var Tables;
var fireball;
var spaceship;
var shootBullet;
var floor;
var shot;
var meteors, bullets, enemyBullets, enemies;
var boss;
const G = 1;
const S = 2;
var gameOver = false;
var clouds, walls, health, background;

const NUM_blade = 5;
const NUM_BUSHES = 15,
	NUM_CLOUDS = 20,
	NUM_WALLS = 15,
	NUM_ENEMIES = 15,
	NUM_HEALTH = 20;
const SPEED = 5;
const JUMP_SPEED = SPEED * 3;
const GRAVITY = 0.4;
const cloudSpeedMin = SPEED / 2,
	cloudSpeedMax = SPEED;
var fireballSpeedMin = SPEED / 10,
	fireballSpeedMax = SPEED;
var RewardSpeedMin = SPEED / 2,
	RewardSpeedMax = SPEED;
const obstacleSpeedMin = SPEED / 10,
	obstacleSpeedMax = SPEED;


/* ui */
// var button;
/* menu
0 intro screen
1 instructions
2 player dies
3 next level
*/
var menus = [
	{
		titles: [


			"Death valley by Juan oh yeah its about that time again ;0"
		],
		buttons: [
			{
				text: "Play Game",
				state: 2
			},
			{
				text: "Instructions",
				state: 1
			}
		]
	},
	{
		titles: [
			"instructions",
			"press SPACEBAR to jump",
			"front keys to move forward ->",
			"stay alive if you can its easy!",
			"Get to the spaceship to progress!",
			
		],
		buttons: [
			{
				text: "Ready?",
				state: 2
			}
		]
	},
	{
		titles: [
			"you beat level 1 lucky you!"
		],
		buttons: [
			{
				text: "start level 2!",
				state: 2
			}
		]
	},
	{
		titles: [
			"You died im sad "
		],
		buttons: [
			{
				text: "Dont give up now,Try again!",
				state: 2
			}
		]
	}
];

/*
0 intro screen
1 instructions
2 game
3 ending
*/

var gameState = 0;
var progress = 1;
var currentLevel = 0;
var levelData = {
	0: {
		walls: 4,
		Birds: 20,
		fireballs: 10,
		health: 5,
		speedMin: SPEED / 5,
		speedMax: SPEED
	},
	1: {
		walls: 3,
		Birds: 20,
		fireballs: 10,
		health: 3,
		speedMin: SPEED / 4,
		speedMax: SPEED * 1.5
	},
	2: {
		walls: 10,
		Birds: 30,
		fireballs: 30,
		health: 5,
		speedMin: SPEED / 2,
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

const wall_files = [
	"assets/obstacle/wall0.png",
	"assets/obstacle/wall1.png",
	"assets/obstacle/wall2.png",
	"assets/obstacle/wall3.png",
];

const tree_files = [
	"assets/tree/tree0.png",
	"assets/tree/tree1.png",
	"assets/tree/tree2.png",
	"assets/tree/tree3.png",
];

const obstacle_files = [
	"assets/obstacle/obstacle0.png",
	"assets/obstacle/obstacle1.png",
	"assets/obstacle/obstacle2.png",
	"assets/obstacle/obstacle3.png",
];


const health_files = [
	"assets/health/health0.png",
	"assets/health/health1.png",
	"assets/health/health2.png",
	"assets/health/health3.png",
];
const Bird_files = [
	"assets/Bird/Bird0.png",
	"assets/Bird/Bird1.png",
	"assets/Bird/Bird2.png",
	"assets/Bird/Bird3.png",
];
const Table_files = [
	"assets/Table/table0.png",
	"assets/Table/table1.png",
	"assets/Table/table2.png",
	"assets/Table/table3.png",
];

const fireball_files = [
	"assets/fireball/Fireball0.png",
	"assets/fireball/Fireball1.png",
	"assets/fireball/Fireball2.png",
	"assets/fireball/Fireball3.png",
];
const Reward_files = [
	"assets/Rewards/Reward0.png",
    "assets/Rewards/Reward1.png",
	"assets/Rewards/Reward2.png",
	"assets/Rewards/Reward3.png",
];


const floor_files = [
	"assets/Table/table6.png",
    "assets/Table/table6.png",
	"assets/Table/table6.png",
	"assets/Table/table6.png",
];


const boss_files = [
	"assets/Bird/boss.png",
    "assets/Bird/boss.png",
	"assets/Bird/boss.png",
	"assets/Bird/boss.png",
];

const shoot_files = [
	"assets/shoot/fire0.png",
   "assets/shoot/fire1.png",
	"assets/shoot/fire2.png",
	"assets/shoot/fire3.png",
];



var jump_sfx = [];
const jump_files = [
 	"assets/sfx/jump4.mp3", "assets/sfx/jump1.wav", "assets/sfx/jump2.wav", "assets/sfx/jump3.wav"
];

var hit_sfx = [];
const hit_files = [
	"assets/sfx/hit0.wav", "assets/sfx/hit1.wav", "assets/sfx/hit2.wav"
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

	createCanvas(800, 400);
	bg = loadImage("assets/background/background.jpg");
	bgIntro = loadImage("assets/background/background.jpg");
	stuff = new Group();
	walls = new Group();
	clouds = new Group();
	birds = new Group();
	health = new Group();
	Rewards = new Group();
	obstacle = new Group();
	Tables = new Group();
	shots = new Group();
	bosss = new Group();
	
	camera.on();



	stuff = new Group();
	character = createSprite(20, 20, 16, 16);

	character.setCollider("rectangle", 0, 0, 16, 32);
	const idle_anim = loadAnimation("assets/idle/idle_1.png", "assets/idle/idle_09.png");
	const run_anim = loadAnimation("assets/run/run_0.png", "assets/run/run_5.png");
	const Fireball_anim = loadAnimation("assets/Fireball/Fireball0.png", "assets/Fireball/Fireball1.png");
	const Fire_anim = loadAnimation("assets/Fire/fireball2.png", "assets/Fire/fireball3.png");

	character.addAnimation("idle", idle_anim);
	character.addAnimation("run", run_anim);
	/*character.debug = true;*/
	character.isJumping = true;
	character.lives = 10;
	stuff.add(character);



	platform = createSprite(width / 2 - 60, height - 20);
	const platform1 = loadImage("assets/Table/table6.png");
	platform.addImage("platform", platform1);
	stuff.add(platform)
	/*platform.debug = true;*/



	spaceship = createSprite(width * 3, height / 2, width / 3, height / 2);
	const spaceship1 = loadImage("assets/spaceship1/SpaceShip5.png");
	spaceship.addImage("spaceship1", spaceship1);
	stuff.add(spaceship);
	spaceship.setCollider("rectangle", 5, 20, 60, 200);
	/*spaceship.debug = true;*/


	obstacles = new Group();
	for (let i = 0; i < NUM_ENEMIES; i++) {
		const obstacle = createSprite(
			random(i * width / NUM_ENEMIES, (i + 1) * width / NUM_ENEMIES),
			random(15, width),
			height * 15,
			0,
			height / 10
		);
		const obstacle_img = loadImage(obstacle_files[floor(random(0, obstacle_files.length))]);
		obstacle.velocity.x = -random(obstacleSpeedMin, obstacleSpeedMax);
		obstacle.addImage(obstacle_img);
		obstacles.add(obstacle);
		obstacle.setCollider("rectangle", -3, 2, 70, 55);
		/*obstacle.debug = true;*/
	}


	fireballs = new Group();
	for (let i = 0; i < NUM_ENEMIES; i++) {
		const fireball = createSprite(
			random(i * width / NUM_ENEMIES, (i + 1) * width / NUM_ENEMIES),
			random(5, width),
			height * 30 / 6,
			3,
			height / 3
		);
		const fireball_img = loadImage(fireball_files[floor(random(0, fireball_files.length))]);
		fireball.velocity.x = -random(fireballSpeedMin, fireballSpeedMax);
		fireball.addImage(fireball_img);
		fireballs.add(fireball);
		fireball.setCollider("rectangle", -2, 5, 70, 55);
		/*fireball.debug = true;*/
	}

	for (let i = 0; i < NUM_ENEMIES; i++) {
		const bird = createSprite(
			random(i * width / NUM_ENEMIES, (i + 1) * width / NUM_ENEMIES),
			random(15, width),
			height * 10,
			10,
			height / 5
		);
		const Bird_img = loadImage(Bird_files[floor(random(0, Bird_files.length))]);
		bird.velocity.x = -random(0.0, 1);
		bird.addImage(Bird_img);
		bird.setCollider("rectangle", -4, 40, 30, 45);
		birds.add(bird);
		/*bird.debug = true;*/
	}
	Rewards = new Group();
	for (let i = 0; i < NUM_ENEMIES; i++) {
		const Reward = createSprite(
			random(i * width / NUM_ENEMIES, (i + 1) * width / NUM_ENEMIES),
			random(5, width),
			height * 8 / 6,
			0,
			height / 0
		);
		const Reward_img = loadImage(Reward_files[floor(random(0, Reward_files.length))]);
		Reward.velocity.x = -random(0.0, 1);
		Reward.addImage(Reward_img);
		Rewards.add(Reward);
		Reward.setCollider("rectangle", 5, 5, 40, 40);
		/*Reward.debug = true;*/
	}





	Tables = new Group();
	for (let i = 0; i < NUM_WALLS; i++) {
		const Table = createSprite(
			random(i * width / NUM_WALLS, (i + 1) * width / NUM_WALLS),
			random(5, width),
			height * 6 / 4,
			10,
			height / 10
		);
		const Table_img = loadImage(Table_files[floor(random(0, Table_files.length))]);
		Table.addImage(Table_img);
		Tables.add(Table);
		Table.setCollider("rectangle", -3, 4, 125, 18);
		/*Tables.debug = true;*/
	}
	
	
		bosss = new Group();
	for (let i = 0; i < NUM_ENEMIES; i++) {
		const boss = createSprite(
			random(i * width / NUM_WALLS, (i + 1) * width / NUM_WALLS),
			random(5, width),
			height * 6 / 4,
			10,
			height / 10
		);
		const boss_img = loadImage(boss_files[floor(random(0, boss_files.length))]);
		boss.addImage(boss_img);
		bosss.add(boss);
		boss.setCollider("rectangle", -3, 4, 125, 18);
		/*bosss.debug = true;*/
	}

		/*shoots = new Group();
	for (let i = 0; i < NUM_ENEMIES; i++) {
		const shoot = createSprite(
			random(i * width / NUM_WALLS, (i + 1) * width / NUM_WALLS),
			random(5, width),
			height * 6 / 4,
			10,
			height / 10
		);
		const shoot_img = loadImage(shoot_files[floor(random(0,shoot.length))]);
		shoot.addImage(shoot_img);
		shoot.add(shoot);
	;
		
	}*/


	walls = new Group();
	for (let i = 0; i < NUM_WALLS; i++) {
		const wall = createSprite(
			random(i * width / NUM_WALLS, (i + 1) * width / NUM_WALLS),
			height * 7 / 8,
			40,
			height / 4
		);
		const wall_img = loadImage(wall_files[floor(random(0, wall_files.length))]);
		wall.addImage(wall_img);
		walls.add(wall);


	}

	trees = new Group();
	for (let i = 0; i < NUM_BUSHES; i++) {
		const tree = createSprite(
			random(i * width / NUM_BUSHES, (i + 1) * width / NUM_BUSHES),
			height * 7 / 8,
			40,
			height / 4
		);
		const tree_img = loadImage(tree_files[floor(random(0, tree_files.length))]);
		tree.addImage(tree_img);
		trees.add(tree);
	}




	healths = new Group();
	for (let i = 0; i < NUM_HEALTH; i++) {
		const life = createSprite(
			random(5, width),
			height * 8 / 6,
			0,
			height / 0
		);
		const health_img = loadImage(health_files[floor(random(0, health_files.length))]);
		life.addImage(health_img);
		health.add(life);
		/*health.debug = true;*/
	}





	clouds = new Group();
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
		/*cloud.debug = true;*/
	}
	
	
	



	buildLevel();

	for (let i = 0; i < menus.length; i++) {
		const menu = menus[i];
		menu.sprites = new Group();
		for (let j = 0; j < menu.buttons.length; j++) {
			const b = menu.buttons[j];
			const button = createSprite(440, 120 + j * 120);
			button.addAnimation("idle", "assets/ui/botton_0.png");
			button.addAnimation("hover", "assets/ui/botton_1.png", "assets/ui/botton_2.png");
			button.addAnimation("click", "assets/ui/botton_3.png", "assets/ui/botton_4.png");
			button.clicked = false;
			button.mouseActive = true;
			button.text = b.text;
			button.state = b.state;
			menu.sprites.add(button);


		}
	}
	
	bosss = createSprite(width - 100, height / 2, 50, 50);
	const boss = loadImage("assets/Bird/boss.png");
	bosss.addImage("boss", boss);
	bosss.shoot = {
		rate: 30,
		distance: 200,
		speed: 2
	};
	bosss.follow = {
		distance: 100,
		speed: 4,
		reset: new p5.Vector(0, 0)
	};
	bosss.movement = {
		rate: 200,
		randomness: 2
	};
	bosss.hits = 5;
}




function draw() {
	background(bg);

	if (gameState == 0) {
		menu(0); //intro();
	} else if (gameState == 1) {
		menu(1); //intructions();
	} else if (gameState == 2) {
		game();

	} else if (gameState == 3) {
		menu(3); //dead();
	} else if (gameState == 4) {
		menu(2); // nextLevel();
	}
}




function buildLevel() {
	var level = levelData[currentLevel];
	for (let i = 0; i < level.walls; i++) {
		const wall = createSprite(
			i * width * 2 / level.walls,
			random(height * 4 / 8, height / 2),
			100,
			40
		);
		wall.debug = true;

	}







	for (let i = 0; i < level.rewards; i++) {
		const reward = createSprite(
			random(0, width),
			random(height / 2, height),
			30,
			20
		);
		rewards.add(reward);
	}



}


function menu(index) {
	camera.off();
	background(51);
	fill(255);
	textSize(24);
	textFont("Raleway");
	textAlign(LEFT);
	for (let i = 0; i < menus[index].titles.length; i++) {
		text(menus[index].titles[i], 40, 40 + i * 60, width / 3, height);
	}

	for (let i = 0; i < menus[index].sprites.length; i++) {
		const button = menus[index].sprites[i];
		button.display();
		textFont("Raleway");
		textAlign(CENTER);
		text(button.text, button.position.x, button.position.y);
		if (button.mouseIsPressed) {
			button.changeAnimation("click");
			button.clicked = true;
		} else if (button.mouseIsOver) {
			button.changeAnimation("hover");
			if (button.clicked) {
				gameState = button.state;
				if (index == 2 || index == 3) {
					reset();
					buildLevel();
				}
			}
		} else {
			button.changeAnimation("idle");
			button.clicked = false;
		}
	}

}

function dead() {
	camera.off();
	background(100);
	fill(255);
	textSize(24);
	textAlign(CENTER);
	text("you died", width / 2, height / 2);
	text("Your score is : " + floor(character.position.x / 100), width / 2, 150);
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
	camera.position.x = width / 2;
	platform.position.x = 0;
	spaceship.position.x = width * 5;

}

function game() {
	camera.off();
	background(bg);
	bgIntro = loadImage("assets/background/background.jpg");
	camera.on();


	for (let i = 0; i < clouds.length; i++) {
		const cloud = clouds[i];
		if (cloud.position.x + cloud.width / 2 < 0) {
			cloud.position.x = random(width, width * 2);
			cloud.position.y = random(0, height / 2);
		}
	}



	for (let i = 0; i < walls.length; i++) {
		const wall = clouds[i];
		if (wall.position.x + wall.width / 2 < 0) {
			wall.position.x = random(width, width * 2);
			wall.position.y = random(0, height / 2);
		}
	}

	for (let i = 0; i < birds.length; i++) {
		const bird = birds[i];

		if (character.overlap(bird)) {
			character.lives--;
			bird.remove();
			hit_sfx[2].play();
		} else {
			if (bird.position.x + bird.width / 3 < 0) {
				bird.position.x = random(width, width * 2);
				bird.position.y = random(4, height / 2);
			}
		}
	}

	for (let i = 0; i < obstacles.length; i++) {
		const obstacle = obstacles[i];
		if (character.overlap(obstacle)) {
			character.lives--;
			obstacle.remove();
			hit_sfx[2].play();
		}
	}




	for (let i = 0; i < fireballs.length; i++) {
		const fireball = fireballs[i];
		if (fireball.position.x + fireball.width / 2 < 0) {
			fireball.position.x = random(width, width * 2);
			fireball.position.y = random(0, height / 2);
		}
	}


	if (keyDown(RIGHT_ARROW)) {
		character.position.x += SPEED;
		character.changeAnimation("run");
	} else {
		character.changeAnimation("idle");
	}


	if (character.collide(platform) || character.collide(Tables)) {
		character.velocity.y = 0;
		if (character.isJumping) {
			character.isJumping = false;
		}
		if (character.position.x - platform.position.x >= 40) {
			platform.position.x += width;

			if (character.collide(fireballs)) {

			}


		}

	} else {
		character.velocity.y += GRAVITY;
	}

	if (keyWentDown("space")) {

		if (!character.isJumping) {
			character.velocity.y -= JUMP_SPEED;
			character.isJumping = true;
		}
	}


	for (let i = 0; i < health.length; i++) {
		const life = health[i];
		if (character.overlap(life)) {
			character.lives++;
			life.remove();
			hit_sfx[0].play();
		} else {
			wrap(life, random(width * 2, width * 4));
		}
	}

	if (character.lives > max_lives) {
		character.lives = max_lives;
	}

	for (let i = 0; i < fireballs.length; i++) {
		const fireball = fireballs[i];
		if (character.overlap(fireball)) {
			character.lives--;
			fireball.remove();
			hit_sfx[2].play();
		} else {
			wrap(fireball, random(width * 2, width * 4));
		}

	}
	for (let i = 0; i < Rewards.length; i++) {
		const life = Rewards[i];
		if (character.overlap(life)) {
			character.lives++;
			life.remove();
			hit_sfx[1].play();
		}
	}

	wrap(platform, width);
	for (let i = 0; i < walls.length; i++) {
		const wall = walls[i];
		wrap(wall, random(width * 2, width * 4));
	}

	for (let i = 0; i < trees.length; i++) {
		const tree = trees[i];
		wrap(tree, random(width * 2, width * 4));
	}

	for (let i = 0; i < Tables.length; i++) {
		const Table = Tables[i];
		wrap(Table, random(width * 2, width * 4));
	}

	for (let i = 0; i < clouds.length; i++) {
		const cloud = clouds[i];
		wrap(cloud, random(width * 2, width * 4));
	}

	for (let i = 0; i < fireballs.length; i++) {
		const fireball = fireballs[i];
		wrap(fireball, random(width * 2, width * 4));
	}

	for (let i = 0; i < Rewards.length; i++) {
		const Reward = Rewards[i];
		wrap(Reward, random(width * 2, width * 4));
	}

	for (let i = 0; i < obstacles.length; i++) {
		const obstacle = obstacles[i];
		wrap(obstacle, random(width * 2, width * 4));
	}

	camera.position.x = character.position.x;

	if (character.lives <= 0 || character.position.y - character.height > height) {
		gameState = 3;
	}

	/* follow progress */
	if (character.position.x > width * 2 * progress) {
		progress++;
		console.log("Next level");
		if (walls.length > 5)
			walls.remove(walls[walls.length - 1]);
		if (health.length > 5)
			health.remove(health[health.length - 1]);
		if (birds.length > 5)
			birds.remove(birds[birds.length - 1]);

	}

	if (currentLevel == 2) {

		if (bosss.jump) {
			if (frameCount % bosss.jump.rate == 0) {
				boss.velocity.x = 0;
				boss.velocity.y = boss.jump.speed;
				boss.jump.rate += floor(random(-10, 10));
			} else if (boss.position.y > height - 20) {
				boss.velocity.y *= -1;
			} else if (bosss.position.y <= boss.jump.origin) {
				boss.velocity.y = 0;
				boss.velocity.x = -S;
			}
		}
		if (bosss.follow) {
			const d = dist(bosss.position.x, bosss.position.y, character.position.x, character.position.y);
			if (d < bosss.follow.distance) {
				var dir = new p5.Vector(character.position.x, character.position.y);
				dir.sub(bosss.position);
				dir.normalize();
				dir.mult(bosss.follow.speed);
				bosss.velocity = dir;
			} else {
				bosss.velocity = bosss.follow.reset;
			}
		}
		if (bosss.shoot) {
			var d = dist(bosss.position.x, bosss.position.y, character.position.x, character.position.y);
			if (d < bosss.shoot.distance) {
				if (frameCount % bosss.shoot.rate == 0) {
					shoot(bosss.position, new p5.Vector(character.position.x, character.position.y), false);
				}
			}
		}
		if (bosss.movement) {
			if (frameCount % bosss.movement.rate == 0) {
				bosss.velocity.x = random(-bosss.movement.randomness, bosss.movement.randomness);
				bosss.velocity.y = random(-bosss.movement.randomness / 2, bosss.movement.randomness);
			}
			if (bosss.position.x < 0 || bosss.position.x > width) {
				bosss.velocity.x *= -1;
			}
			if (bosss.position.y < 0 || bosss.position.y > height) {
				bosss.velocity.y *= -1;
			}
		}
		function mousePressed() {
	(character.position, new p5.Vector(mouseX, mouseY),true);
}




		bosss.display();
	}
	drawSprites(stuff);
	drawSprites(walls);
	drawSprites(birds);
	drawSprites(Tables);
	drawSprites(fireballs);
	drawSprites(trees);
	drawSprites(Rewards);
	drawSprites(obstacles);
	drawSprites(clouds);
	drawSprites(healths);
	drawSprite(shootBullet);
	
	/*drawSprite(shots);*/
	
	


	/* ui */
	camera.off();
	drawSprites(clouds);
	fill(0);
	textAlign(LEFT);
	textSize(12);
	text("Lives: " + character.lives, 10, 20);


	rect(90, 8, 260 * character.lives / max_lives, 15);

	fill(255);
	textAlign(LEFT);
	textSize(12);
	text("lives: ", 60, 20);
	text(character.lives + "/" + max_lives, 180, 20);
	text("Distances made: " + floor(character.position.x / 100), 500, 20);
	textSize(30);
	strokeWeight(4);


	/* detect game ending */
	if (character.lives <= 0) {
		gameState = 3;
	}

	/* detect next level */
	if (character.overlap(spaceship)) {
		if (currentLevel < 2) {
			currentLevel++;
			gameState = 4;
		} else {
			spawnBosss();
		}
	}
}




function wrap(obj, reset) {
	if (character.position.x - obj.position.x >= width / 2) {
		obj.position.x += reset;
	}
}



document.addEventListener("keydown", function (event) {

	if (event.which == 32) {

		event.preventDefault();

	}

});
