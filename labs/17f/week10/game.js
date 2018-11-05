/* global variable */
var character;
var ground;
var meteors, bullets;
const G = 1;
const S = 2;

function setup() {
	console.log(windowWidth, windowHeight);
	createCanvas(640, 480);
	
	meteors = new Group();
	bullets = new Group();
	
	character = createSprite(10, height/2);
	const idle_anim = loadAnimation("assets/idle/idle_00.png", "assets/idle/idle_09.png");
	const run_anim = loadAnimation("assets/run/run_0.png", "assets/run/run_5.png");
	character.addAnimation("idle", idle_anim);
	character.addAnimation("run", run_anim);
	character.debug = true;
	character.friction = 0.05;
	character.maxSpeed = 10;
	
	ground = createSprite(width/2, height, width, 40);
	ground.immovable = true;
	ground.mass = 10;
	
	dropMeteor(random(0,width), random(-height,-height/2), random(40, 100), false);
	
}

function draw() {
	background(240);
	
	if (keyDown(RIGHT_ARROW)) {
		character.velocity.x += S;
	}
	if (keyDown(LEFT_ARROW)) {
		character.velocity.x -= S;
	}
	
	if (character.collide(ground)) {
		character.velocity.y = 0;
		character.friction = 0.1;
	} else {
		character.velocity.y += G;
		character.friction = 0.001;
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
	
	drawSprites();
}

function keyPressed() {
	if (key == "M") {
		dropMeteor(random(0,width), random(-height,-height/2), random(40, 100), false);
	}
	if (key == "Z"){
		shootBullet();
	}
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

function shootBullet() {
	const b = createSprite(character.position.x, character.position.y, 10, 10);
//	b.velocity.y = -10;
//	if (keyDown("q")) {
//		b.velocity.x = -5;
//	} else if (keyDown("e")) {
//		b.velocity.x = 5;
//	}
	
	var mousePosition = new p5.Vector(mouseX, mouseY);
	mousePosition.sub(character.position);

	b.velocity = mousePosition.div(30);
	
	b.friction = 0.01;
	b.life = 50;
	b.mass = 50;
	bullets.add(b);
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