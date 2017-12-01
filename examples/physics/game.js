/* global variable */
var character;
let things;
var platform;
let bullets;
const SPEED = 1;
const JUMP_SPEED = SPEED * 10;
const GRAVITY = 0.5;

let boulders;
let enemies;

function setup() {
    createCanvas(640, 320);
    
    things = new Group();
    bullets = new Group();
	enemies = new Group();
    
	/* character setup */
	character = createSprite(width/2, 50, 16, 16);
    const idle_anim = loadAnimation("assets/idle/idle_00.png", "assets/idle/idle_09.png");
    const run_anim = loadAnimation("assets/run/run_0.png", "assets/run/run_5.png");
    character.addAnimation("idle", idle_anim);
    character.addAnimation("run", run_anim);
	character.debug = true;
	character.isJumping = true;
    character.maxSpeed = 10;
    character.mass = 0.5;
	
	//character.friction = 0.1;
	
	/* platform setup */
	platform = createSprite(width/2, height - 10, width, 20);
	platform.immovable = true;
	platform.mass = 1;
	//platform.debug = true;

	boulders = new Group();
   // dropBoulder();
	
	/* moving enemy */
	let e1 = createSprite(width, height * 3/4, 20, 20);
	e1.jump = 100;
	e1.velocity.x = -2;
	enemies.add(e1);
	
	/* attacking enemy */
	let e2 = createSprite(width/2 + 100, height/2, 20, 20);
	e2.attackDistance = 150;
	enemies.add(e2);
	
	/* shooting enemy */
	let e3 = createSprite(width/2 + 200, height/2, 20, 20);
	e3.shootDistance = 300;
	e3.shootRate = 50;
	enemies.add(e3);
	
	/* random movement */
	let e4 = createSprite(width/2 - 100, height/2, 50, 50);
	e4.randomMoveRate = 100;
	e4.randomMove = 2;
	e4.hits = 5;
	enemies.add(e4);
}

function draw() {
    background("white");
    
    if (keyDown("d")) {
        if (!character.isJumping) 
            character.velocity.x += SPEED;
	}
	if (keyDown("a")) {
        if (!character.isJumping)
            character.velocity.x -= SPEED;
	}
        
	if (character.collide(platform)) {
		character.velocity.y -= GRAVITY;
		character.friction = 0.05;
		if (character.isJumping) {
			character.isJumping = false;
		}
	} else {
		
	}
    character.velocity.y += GRAVITY;
	
	for (let i = 0; i < boulders.length; i++) {
		boulders[i].velocity.y += GRAVITY;
	}

    boulders.bounce(platform);
    //boulders.bounce(character);
    character.bounce(boulders);
   // bullets.bounce(boulders);
    bullets.collide(boulders, shotBoulder);
	bullets.collide(enemies, function(bullet, obj) {
		if (obj.hits) {
			obj.hits--;
			if (obj.hits == 0) {
				obj.remove();
			}
		} else {
			obj.remove();
		}
		bullet.remove();
	});
	bullets.collide(character);
	
	for (let i = 0; i < enemies.length; i++) {
		const enemy = enemies[i];
		stroke(0,255,0);
		line(enemy.position.x, enemy.position.y, character.position.x, character.position.y);
		if (enemy.overlap(character)) {
			character.remove();
		}
		if (enemy.jump) {
			if (frameCount % enemy.jump == 0) {
				enemy.velocity.y = 2;
				enemy.velocity.x = 0;
			}else if (enemy.position.y > height - 20) {
				enemy.velocity.y = -2;
			} else if (enemy.position.y <= height * 3/4) {
				enemy.velocity.y = 0;
				enemy.velocity.x = -2;
			}
		}
		if (enemy.attackDistance) {
			const d = dist(enemy.position.x, enemy.position.y, character.position.x, character.position.y);
			if (d < enemy.attackDistance) {
				const dir = new p5.Vector(character.position.x, character.position.y);
				dir.sub(enemy.position);
				dir.normalize();
				dir.mult(2);
				enemy.velocity = dir;
			} else {
				enemy.velocity = new p5.Vector(0,0);
			}
		}
		
		if (enemy.shootDistance) {
			const d = dist(enemy.position.x, enemy.position.y, character.position.x, character.position.y);
			if (d < enemy.shootDistance) {
				if (frameCount % enemy.shootRate == 0) {
					shootBullet(enemy.position, character.position);
				}
			}
		}
		if (enemy.randomMoveRate) {
			if (frameCount % enemy.randomMoveRate == 0) {
				enemy.velocity.x = random(-enemy.randomMove, enemy.randomMove);
				enemy.velocity.y = random(-enemy.randomMove, enemy.randomMove);
			}
			if (enemy.position.x > width || enemy.position.x < 0) {
				enemy.velocity.x *= -1;
			}
			if (enemy.position.y > height || enemy.position.y < 0) {
				enemy.velocity.y *= -1;
			}
		}
	}
	
	if (keyWentDown("SPACE")) {
		if (!character.isJumping) {
			character.velocity.y -= JUMP_SPEED;
			character.isJumping = true;
			character.friction = 0.01;
		}
	}
    
    drawSprites();
}

function mousePressed() {
	shootBullet(character.position, new p5.Vector(mouseX, mouseY));
}

function shotBoulder(a, b) {
    console.log(a.position);
    console.log(b.position);
}

function shootBullet(shooter, target) {
    const bullet = createSprite(shooter.x, shooter.y, 10, 10);
    bullet.mass = 2;
    bullet.friction = 0.01;
    const mousePos = new p5.Vector(target.x, target.y);
    mousePos.sub(bullet.position);
    bullet.velocity = mousePos.mult(0.05);
    bullet.life = 30;
    bullets.add(bullet);
}

function dropBoulder() {
	const boulderSize = random(50,100);
	const boulder = createSprite(random(0,width), random(-height/2,0), boulderSize, boulderSize);
	boulder.mass = 1;
	boulder.friction = 0.01;
	boulders.add(boulder);
}