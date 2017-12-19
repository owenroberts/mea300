/* global variable */
let character, platform;
let clouds, walls, enemies, health, stuff, trees;
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
const jump_files = [
	"assets/sfx/character/jump0.wav", "assets/sfx/character/jump1.wav", "assets/sfx/character/jump2.wav", "assets/sfx/character/jump3.wav"
];
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
    trees = new Group();

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
        translate(-this.width/2,-this.height/2);
        for (let x = 0; x <= this.width; x += this.space) {
            line(x, 0, 0, x);
            if (x != this.x)
                line(x, 0 + this.width, 0 + this.width, x);
        }
        pop();
    }
    stuff.add(platform);

    for (let i = 0; i < NUM_CLOUDS; i++) {
        const cloud = createSprite(
            random(width, width * 2),
            random(0, height / 2),
            random(5,100),
            random(2,4)
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
            20
        );
        health.add(life);
    }
}

function spawnEnemy() {
    const sz = random(30, 50);
    const enemy = createSprite(
        random(width * 2, width * 4),
        random(height * 3 / 4, height * 7 / 8),
        sz,
        sz
    );
    enemy.draw = function() {
        fill(0);
        rect(0,0,this.width,this.height);
    }
    enemy.debug = true; 
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
    text("arrow right to move", width / 2, height / 2);
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
    background("white");

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
            enemy.position.x += random(width * 2, width * 4);
        } else {
            wrap(enemy, random(width * 2, width * 5));
        }
    }
    for (let i = 0; i < health.length; i++) {
        const life = health[i];
        if (character.overlap(life)) {
            character.lives++;
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

    
    camera.off();
    drawSprites(clouds);

    /* ui */
    fill(0);
    textAlign(LEFT);
    textSize(12);
    text("Lives: " + character.lives, 10, 20);

    /* detect game ending */
    if (character.lives <= 0 || character.position.y > height + 100) {
        gameState = 3;
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
}

function wrap(obj, reset) {
    if (character.position.x - obj.position.x >= width / 2) {
        obj.position.x += reset;
    }
}