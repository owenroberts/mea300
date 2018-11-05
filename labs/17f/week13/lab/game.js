/* global variable */
var character;
var ground;
var meteors, bullets, enemyBullets, enemies;
var boss;
const G = 1;
const S = 2;
var gameOver = false;

function setup() {
	console.log(windowWidth, windowHeight);
	createCanvas(640, 480);
	
	meteors = new Group();
	bullets = new Group();
	enemies = new Group();
	enemyBullets = new Group();
	
	character = createSprite(10, height/2);
	const idle_anim = loadAnimation("assets/idle/idle_00.png", "assets/idle/idle_09.png");
	const run_anim = loadAnimation("assets/run/run_0.png", "assets/run/run_5.png");
	character.addAnimation("idle", idle_anim);
	character.addAnimation("run", run_anim);
	character.debug = true;
	character.friction = 0.05;
	character.maxSpeed = 10;
	character.isJumping = false;
	
	ground = createSprite(width/2, height, width, 40);
	ground.immovable = true;
	ground.mass = 10;
	
	//dropMeteor(random(0,width), random(-height,-height/2), random(40, 100), false);
	
	/* default enemy */
	const e1 = createSprite(width, 400, 20, 20);
	e1.velocity.x = -S;
	//e1.jump = { rate: 40, speed: 5, origin: 400 }
//	e1.follow = { 
//		distance: 100,
//		speed: 1,
//		reset: new p5.Vector(-S,0) 
//	}
	enemies.add(e1);
	
	/* jumping enemy */
	const e2 = createSprite(width - 50, 400, 20, 20);
	e2.velocity.x = -S;
	e2.jump = {
		rate: 100,
		speed: 3,
		origin: 400
	}
	enemies.add(e2);
	
	/* follow enemy */
	const e3 = createSprite(width - 100, 400, 20, 20);
	e3.follow = {
		distance: 150,
		speed: 3,
		reset: new p5.Vector(0,0)
	}
	enemies.add(e3);
	
	/* shooting enemy */
	const e4 = createSprite(width - 200, 300, 20, 20);
	e4.shoot = {
		rate: 50,
		distance: 300,
		speed: 3
	}
	enemies.add(e4);
	
}

function spawnBoss() {
	boss = createSprite(width - 100, height/2, 50, 50);
	boss.shoot = {
		rate: 30,
		distance: 200,
		speed: 2
	};
	boss.follow = {
		distance: 100,
		speed: 4,
		reset: new p5.Vector(0,0)
	};
	boss.movement = {
		rate: 200,
		randomness: 2
	};
	boss.hits = 5;
	enemies.add(boss);
}

function draw() {
	background(240);
	
	if (keyDown("d")) {
		character.velocity.x += S;
	}
	if (keyDown("a")) {
		character.velocity.x -= S;
	}
	
	if (character.collide(ground)) {
		character.velocity.y = 0;
		character.friction = 0.1;
		if (character.isJumping) {
			character.isJumping = false;
		}
	} else {
		character.velocity.y += G;
		character.friction = 0.001;
	}
	
	if (keyDown("SPACE")) {
		if (!character.isJumping) {
			character.velocity.y -= S*6;
			character.isJumping = true;
		}
	}
	
	for (let i = 0; i < meteors.length; i++) {
		const m = meteors[i];
		m.velocity.y += G;
	}
	
	for (let i = 0; i < bullets.length; i++) {
		const b = bullets[i];
		b.velocity.y += G/4;
	}
	
	meteors.bounce(ground);
	meteors.displace(character);
	meteors.bounce(meteors);
	
	meteors.overlap(bullets, hitMeteor);
	bullets.bounce(ground);
	
	
	for (let i = 0; i < enemies.length; i++) {
		const enemy = enemies[i];
		if (enemy.jump) {
			if (frameCount % enemy.jump.rate == 0) {
				enemy.velocity.x = 0;
				enemy.velocity.y = enemy.jump.speed;
				enemy.jump.rate += floor(random(-10, 10));
			} else if (enemy.position.y > height - 20) {
				enemy.velocity.y *= -1;
			} else if (enemy.position.y <= enemy.jump.origin) {
				enemy.velocity.y = 0;
				enemy.velocity.x = -S;
			}
		}
		if (enemy.follow) {
			stroke(0,255,0);
			line(enemy.position.x, enemy.position.y, character.position.x, character.position.y);
			const d = dist(enemy.position.x, enemy.position.y, character.position.x, character.position.y);
			if (d < enemy.follow.distance) {
				var dir = new p5.Vector(character.position.x, character.position.y);
				dir.sub(enemy.position);
				dir.normalize();
				dir.mult(enemy.follow.speed);
				enemy.velocity = dir;
			} else {
				enemy.velocity = enemy.follow.reset;
			}
		}
		if (enemy.shoot) {
			var d = dist(enemy.position.x, enemy.position.y, character.position.x, character.position.y);
			if (d < enemy.shoot.distance) {
				if (frameCount % enemy.shoot.rate == 0) {
					shootBullet(enemy.position, new p5.Vector(character.position.x, character.position.y), true);
				}
			}
		}
		if (enemy.movement) {
			if (frameCount % enemy.movement.rate == 0) {
				enemy.velocity.x = random(-enemy.movement.randomness, enemy.movement.randomness);
				enemy.velocity.y = random(-enemy.movement.randomness/2, enemy.movement.randomness);
			}
			if (enemy.position.x < 0 || enemy.position.x > width) {
				enemy.velocity.x *= -1;
			}
			if (enemy.position.y <0 || enemy.position.y > height) {
				enemy.velocity.y *= -1;
			}
		}
	}
	
	character.overlap(enemies, function() {
		character.remove();
	});
	character.overlap(enemyBullets, function() {
		character.remove();
	});
	enemies.overlap(bullets, function(e, b) {
		b.remove();
		if (e.hits) {
			e.hits--;
			if (e.hits == 0) {
				e.remove();
			}
		} else {
			e.remove();
		}
	});
	
	drawSprites();
	
	if (enemies.length <= 0 && !gameOver) {
		spawnBoss();
		gameOver = true;
	}
}

function keyPressed() {
	if (key == "M") {
		dropMeteor(random(0,width), random(-height,-height/2), random(40, 100), false);
	}
}
function mousePressed() {
	shootBullet(character.position, new p5.Vector(mouseX, mouseY), false);
}

function dropMeteor(x, y, s, hit) {
	const meteorSize = s;
	const m = createSprite(x, y, meteorSize, meteorSize);
	m.mass = meteorSize;
	m.friction = 0.01;
	if (hit) {
		m.velocity.y = -10;
		m.velocity.x = random(-5,5);
	}
	meteors.add(m);
}

function shootBullet(shooter, target, isEnemy) {
	const b = createSprite(shooter.x, shooter.y, 10, 10);
	
	var dir = new p5.Vector(target.x, target.y);
	dir.sub(shooter);
	dir.normalize();
	dir.mult(10);
	b.velocity = dir;
	
	b.friction = 0.01;
	b.life = 50;
	b.mass = 50;
	if (isEnemy) {
		enemyBullets.add(b);
	} else {
		bullets.add(b);
	}
	
}

function hitMeteor(m, b) {
	const x = m.position.x;
	const y = m.position.y;
	const s = m.width;
	m.remove();
	b.remove();
	if (s/2 > 10) {
		dropMeteor(x, y, s/2, true);
		dropMeteor(x, y, s/2, true);
	}
}