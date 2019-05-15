/* global variable */
var character;
var ground;
var boss;
var gameOver = false;
var platform;
var Dungeon;
var columns, enemies, health, stuff;
const NUM_COLUMNS = 3,
    NUM_ENEMIES = 3,
    NUM_HEALTH = 1;
const SPEED = 5;
const JUMP_SPEED = SPEED * 2;
const GRAVITY = 0.5;
const G = 1;
const S = 2;
const enemySpeedMin = SPEED / 5,
    enemySpeedMax = SPEED;

/*
0 intro screen
1 instructions
2 game
3 ending
*/
var gameState = 0;


/* audio */

var jump_sfx = [];
const jump_files = [
	"Jump 4.wav",
];

var hit_sfx = [];
const hit_files = [
	"Hit_hurt 2.wav"
];

var powerup_sfx = [];
const powerup_files = [
	"Powerup 1.wav",
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

    for (let i = 0; i < powerup_files.length; i++) {
        const powerup_sound = loadSound(powerup_files[i]);
        powerup_sfx.push(powerup_sound);
    }
}

function setup() {
    createCanvas(640, 360);

    Dungeon = loadImage("Dungeon.png");

    stuff = new Group();
    bullets = new Group();

    /* character setup */
    character = createSprite(0, 20, 16, 16);
    character.setCollider("rectangle", -4, 0, 16, 32);
    const idle_anim = loadAnimation("Red.png");
    const run_anim = loadAnimation("Red.png", "Red2.5.png", "Red3.png");
    character.addAnimation("idle", idle_anim);
    character.addAnimation("run", run_anim);
    character.debug = false;
    character.isJumping = true;
    character.lives = 3;
    character.depth = 10;
    stuff.add(character);

    /* platform setup */
    platform = createSprite(0, height - 10, width * 2, 20);
    stuff.add(platform);
    platform.debug = false;

    columns = new Group();
    for (let i = 0; i < NUM_COLUMNS; i++) {
        //create a sprite to add to the group
        const column = createSprite(
            random(0, width), //x position
            random(height / 2, height), //y position
            50, //width
            50 //height
        );
        const colImg = loadImage("Column1.png"); //must load image
        column.addImage(colImg); //must add image to sprite
        columns.add(column); //add sprite to group of sprites
    }

    enemies = new Group();
    for (let i = 0; i < NUM_ENEMIES; i++) {
        //create a sprite to add to the group
        const enemy = createSprite(
            random(0, width), //x position
            random(height / 2, height), //y position
            50, //width
            50 //height
        );
        const eneImg = loadImage("Spikers-1.png"); //must load image
        enemy.addImage(eneImg); //must add image to sprite
        enemies.add(enemy); //add sprite to group of sprites
        enemy.velocity.x = -random(enemySpeedMin, enemySpeedMax);
        enemies.add(enemy);
    }

    health = new Group();
    for (let i = 0; i < NUM_HEALTH; i++) {
        //create a sprite to add to the group
        const life = createSprite(
            random(0, width), //x position
            random(height / 2, height), //y position
            20, //width
            20 //height
        );
        const HeaImg = loadImage("Cookie(1).png"); //must load image
        life.addImage(HeaImg); //must add image to sprite
        health.add(life); //add sprite to group of sprites
    }

    function spawnBoss() {
        boss = loadImage("Monster.gif");
        boss.shoot = {
            rate: 30,
            distance: 200,
            speed: 2
        };
        boss.follow = {
            distance: 100,
            speed: 4,
            reset: new p5.Vector(0, 0)
        };
        boss.movement = {
            rate: 200,
            randomness: 2
        };
        boss.hits = 5;
        enemies.add(boss);
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
        end();
    }
}

function intro() {
    camera.off();
    background(0);
    fill(255);
    textSize(24);
    textAlign(CENTER);
    text("Red's Dungeon", width / 2, height / 2);
    text("by Stephanie Guzman", width / 2, height / 2 + 24);
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

function end() {
    camera.off();
    background(100);
    fill(255);
    textSize(24);
    textAlign(CENTER);
    text("You Died", width / 2, height / 2);
    text("press enter to try again", width / 2, height / 2 + 48);
    if (keyWentDown("ENTER")) {
        gameState = 1;
        character.lives = 3;
    }
}

function game() {
    camera.off();
    background(Dungeon);
    camera.on();

    /* player moves character only right */
    if (keyDown(RIGHT_ARROW)) {
        character.position.x += SPEED;
        character.changeAnimation("run");
    } else {
        character.changeAnimation("idle");
    }
        if (character.position.x > character.minX) {
            character.position.x -= SPEED;
        }
        if (character.collide(platform) || character.collide(columns)) {
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
    wrap(platform, width);
    for (let i = 0; i < columns.length; i++) {
        const column = columns[i];
        wrap(column, random(width * 2, width * 4));
    }


    /* camera follows character */
    camera.position.x = character.position.x;

    drawSprites(stuff);
    drawSprites(columns);
    drawSprites(enemies);
    drawSprites(health);
    camera.off();
    fill(0);
    textAlign(LEFT);
    textSize(12);
    text("Lives: " + character.lives, 10, 20);


    /* detect game ending */
    if (character.lives <= 0) {
        gameState = 3;
        character.velocity.y = 0;
    }


    if (enemies.length <= 0 && !gameOver) {
        spawnBoss();
        gameOver = true;

    }
}ß
    function wrap(obj, reset) {
        if (character.position.x - obj.position.x >= width / 2) {
            obj.position.x += reset;
        }
    }
