/* global variable */
var character;
let things;
var platform;
let bullets;
const SPEED = 1;
const JUMP_SPEED = SPEED * 10;
const GRAVITY = 0.5;

let boulders;

function setup() {
    createCanvas(640, 320);
    
    things = new Group();
    bullets = new Group();
    
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
    dropBoulder();
}

function draw() {
    background("white");
    
    if (keyDown(RIGHT_ARROW)) {
        if (!character.isJumping) 
            character.velocity.x += SPEED;
	}
	if (keyDown(LEFT_ARROW)) {
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
	
	if (keyWentDown("x")) {
		if (!character.isJumping) {
			character.velocity.y -= JUMP_SPEED;
			character.isJumping = true;
			character.friction = 0.01;
		}
	}
    
    drawSprites();
}

function keyPressed() {
    if (key == "Z") {
        shootBullet();
    }
}

function shotBoulder(a, b) {
    console.log(a.position);
    console.log(b.position);
}

function shootBullet() {
    const bullet = createSprite(character.position.x, character.position.y, 20, 20);
    bullet.mass = 2;
    bullet.friction = 0.01;
    const mousePos = new p5.Vector(mouseX, mouseY);
    console.log(mousePos);
    mousePos.sub(bullet.position);
    console.log(mousePos);
    bullet.velocity = mousePos.mult(0.05);
    console.log(bullet.velocity);
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