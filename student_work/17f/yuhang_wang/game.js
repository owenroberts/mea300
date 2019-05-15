/* global variable */
var character;
var platform;
var bg, introBG, intrucBG, deadBG;
var backgrounds = [];
var cave;
var Lifeimg;
var clouds, health, walls, enemies, enemyBullets, bullets, stuff;
var hurtSound, pickupSound, bgm, QueenkirasBGM, selectSound, CharShoot; 
const SPEED = 7;
const NUM_BUSHES = 10, NUM_CLOUDS = 3; /*NUM_WALLS = 2, NUM_ENEMIES = 4, NUM_HEALTH = 2;*/
const JUMP_SPEED = SPEED * 2;
const GRAVITY = 0.7;

/*
0 intro screen
1 instructions
2 game
3 dies
4 next level
*/
var gameState = 0;
var currentlevel = 0;
var levelData = {
    0: {
        walls: 2,
        enemies: 2,
        health: 3,
        speedMin: SPEED/4,
        speedMax: SPEED
    },
    1: {
        walls: 2,
        enemies: 5,
        health: 2,
        speedMin: SPEED/4,
        speedMax: SPEED * 2
    },
    2: {
        walls:1,
        enemies: 10,
        health: 1,
        speedMin: SPEED/2,
        speedMax: SPEED * 2
    }
};

/* Graphics */
const cloud_files = [
    "assets/cloud/cloud0.png",
    "assets/cloud/cloud1.png",
    "assets/cloud/cloud2.png",
];


const caveImage = [
    "assets/cave.png"
]


const pf = [
    "assets/pf.png"  
];

const platform2_file = [
    "assets/platform2/platform0.png",
    "assets/platform2/platform1.png",
    "assets/platform2/platform2.png",
];


/* audio */
var jump_sfx = [];
const jump_files = [
    "assets/sfx/character/jump.wav"
];





function preload() {
    for (let i =0; i < jump_files.length; i++) {
        const jump_sound = loadSound(jump_files[i]);
        jump_sfx.push(jump_sound);
    }

    hurtSound = loadSound("assets/sfx/character/hurt.wav");
    CharShoot = loadSound("assets/sfx/characterShoot.wav");
    pickupSound = loadSound("assets/sfx/character/pickup.wav");
    //bgm = loadSound("assets/bgm.mp3");
    QueenkirasBGM = loadSound("assets/Queenkiras - GreenCity.mp3");
    selectSound = loadSound("assets/sfx/select.wav");
    Lifeimg = loadImage("assets/Life.png");
}



function setup() {
    bg = loadImage("assets/bg.png");
    introBG = loadImage("assets/introBG.png");
    intrucBG = loadImage("assets/intrucBG.png");
    deadBG = loadImage("assets/dead.png");
    backgrounds[1] = loadImage("assets/nextLevel1.png"); // level 1 background
    backgrounds[2] = loadImage("assets/nextLevel2.png"); // level 2 background
    backgrounds[3] = loadImage("assets/ending.png"); // ending background
    createCanvas(900, 360);
    //bgm.loop();
    QueenkirasBGM.loop();
    
    stuff = new Group();
    walls = new Group();
    clouds = new Group();
    enemies = new Group();
    enemyBullets = new Group();
    health = new Group();
    bullets = new Group();
    
    /* character setup ,anim, need to change idle_ # */
    character = createSprite(0, 100, 140, 205);
    character.setCollider("rectangle", 4, 0, 32, 55);
    const idleRight_anim = loadAnimation("assets/character stuff/idleRight/idleR_00.png", "assets/character stuff/idleRight/idleR_11.png");
    const idleLeft_anim = loadAnimation("assets/character stuff/idleLeft/idleL_00.png", "assets/character stuff/idleLeft/idleL_11.png");
    const runRight_anim = loadAnimation("assets/character stuff/runRight/runR_00.png", "assets/character stuff/runRight/runR_05.png");
    const runLeft_anim = loadAnimation("assets/character stuff/runLeft/runL_00.png", "assets/character stuff/runLeft/runL_05.png");
    const jump_anim = loadAnimation("assets/character stuff/jump/jump_00.png", "assets/character stuff/jump/jump_01.png");
    const running_attck_anim = loadAnimation("assets/character stuff/runningattack/runningattack00.png", "assets/character stuff/runningattack/runningattack05.png");
    const idle_attack_anim = loadAnimation("assets/character stuff/idleattack/idleattack00.png", "assets/character stuff/idleattack/idleattack11.png");
    character.addAnimation("idleRight", idleRight_anim);
    character.addAnimation("idleLeft", idleLeft_anim);
    character.addAnimation("runRight", runRight_anim);
    character.addAnimation("runLeft", runLeft_anim);
    character.addAnimation("jump", jump_anim);
    character.addAnimation("runningshoot", running_attck_anim);
    character.addAnimation("idleshoot", idle_attack_anim);
    //character.debug = true;
    character.isJumping = true;
    character.lives = 1;
    stuff.add(character);
    
    /* platform */
    platform = createSprite(0, height - 1, width * 4, 30);
    stuff.add(platform);
    const pf_img = loadImage(pf);
    platform.addImage(pf_img);
    //platform.debug = true;
    
    
    cave = createSprite(width*20, height/1.35, width/5, height/4);
    stuff.add(cave);
    const cave_img = loadImage(caveImage);
    cave.addImage(cave_img);
    
    for (let i = 0; i < NUM_BUSHES; i++) {
        createSprite(
            random(0, width),
            random(height-20, height), 
            random(10, 60), 
            random(50, 100)
        );
    }
    
    for (let i = 0; i < NUM_CLOUDS; i++) {
        const cloud = createSprite(
            random(width, width * 2),
            random(0, height/4), 
            random(50, 100), 
            random(20, 40)
    );
        const cloud_img = loadImage(cloud_files[floor(random(0, cloud_files.length))]);
        cloud.addImage(cloud_img);
        cloud.velocity.x = -random(1, 5);
        clouds.add(cloud);
    }
    
    buildLevel();
}

function buildLevel () {
    var level = levelData[currentlevel];
    
    for (let i = 0; i < level.walls; i++) {
        const wall = createSprite(
            i * width*2/level.walls,
            random(height/1.5, height/1.7),
            random(50, 300),
            200,
            40
        );
        const wall_img = loadImage(platform2_file[floor(random(0, platform2_file.length))]);
        wall.addImage(wall_img);
        walls.add(wall);
    }
    
    
    for (let i = 0; i < level.enemies; i ++){
        //const sz = random(30,50);
        var x =random(width * 1.5, width *4);
        //console.log(x);
        
        /* skyenemy */
        const e1 = createSprite(
            x,
            height*0.2,
            40,
            40
        );
             e1.follow = {
                distance: 800,
                speed: 6,
                reset: new p5.Vector(0, 0)
            }
        
        e1.setCollider("rectangle", 4, 0, 52, 55);
        const skyenemy_anim = loadAnimation("assets/enemies/skyenemy/enemy1.png", "assets/enemies/skyenemy/enemy16.png");
        e1.addAnimation("enemy", skyenemy_anim);
        e1.velocity.x = -6;
        enemies.add(e1);
        //e1.debug = true;
        
        
        /* treant */
        const e2 = createSprite(
            platform.position.x,
            platform.position.y - 55,
            40,
            40
        
        );
    
             e2.shoot = {
                  rate: 100,
		          distance: 800,
		          speed: 3
               }
        e2.setCollider("rectangle", 4, 0, 32, 55);
        const treant_anim = loadAnimation("assets/enemies/treant/treant00.png", "assets/enemies/treant/treant06.png");
        e2.addAnimation("enemy", treant_anim);
        enemies.add(e2);
        //e2.debug = true;
        
        }



    
    
    for (let i = 0; i < level.health; i++) {
        const life = createSprite(
            random(width, width/2),
            height/2.5,
            30,
            20
        );
        const health_anim = loadAnimation("assets/character stuff/health/health01.png", "assets/character stuff/health/health08.png");
        life.addAnimation("life", health_anim);
        health.add(life)
    }
    
}

function shootBullet(shooter, target, isEnemy) {
    let bullet_img;
	if (isEnemy) bullet_img = loadImage("assets/enemies/fire.png") 
    else bullet_img = loadImage("assets/character stuff/bullet.png");
    const b = createSprite(shooter.x, shooter.y, 10, 10);
    b.addImage(bullet_img);
    var dir = new p5.Vector(target.x, target.y);
	dir.sub(shooter);
	dir.normalize();
	dir.mult(15);
	b.velocity = dir;
	
	b.friction = 0.01;
	b.life = 100;
	b.mass = 50;
	if (isEnemy) {
		enemyBullets.add(b);
	} else {
		bullets.add(b);
	}
	
}


function draw() {
    if (gameState == 0) {
            intro();
    } else if (gameState == 1) {
            intructions();
    } else if (gameState == 2) {
            game();
    } else if (gameState == 3){
            dead();
    } else if (gameState == 4) {
            nextLevel();
    }
}


function intro() {
        camera.off();
        background(introBG);
        fill("white");
        textSize(24);
        text("This time will be harder!", width/1.5, height/6);
        textSize(12);
        fill("gray");
        text("PRESS ENTER TO CONTINUE ->", width/1.33, height/1.01);
        if (keyWentDown("ENTER")) {
            gameState = 1;
            selectSound.play();
        }
}


function intructions() {
        camera.off();
        background(intrucBG);
        textSize(10);
        fill("gray");
        text("PRESS ENTER TO CONTINUE ->", width/1.26, height/1.001);

        if (keyWentDown("ENTER")) {
            gameState = 2;
            selectSound.play();
        }
}


function dead() {
        camera.off();
        background(deadBG);
        fill("white");
        textSize(24);
        text("YOU REACHED LEVEL " + currentlevel, width/2, height/3.5);
        //textSize(12);
        //text("PRESS ENTER TO TRY AGAIN", width/1.25, height/1.01);
        if (keyWentDown("ENTER")) {
            gameState = 1;
            selectSound.play();
            reset();
            buildLevel(4, 3, 2);
        }
}


function nextLevel() {
        camera.off();
        background(backgrounds[currentlevel]);
        fill("white");
        //textSize(12);
        //text("PRESS ENTER TO BEGIN " + (currentlevel + 1), width/1.25, height/1.01);
        if (keyWentDown("ENTER")) {
            gameState = 1;
            selectSound.play();
            reset();
            buildLevel(3, 10, 1);
        }
}


function reset() {
    character.lives = 5;
    character.velocity.y = 0;
    character.minX = 0;
    character.position.x = 0;
    character.position.y = 0;
    camera.position.x = width/2;
    platform.position.x = 0;
    //bg.position.x = 0;
    cave.position.x = width*25;
    walls.clear();
    enemies.clear();
    health.clear();
    
    
}


function game() {
    camera.off();
    background(bg);
    camera.on();
    
    
        if (character.position.y > height) {
            gameState = 3;
            character.velocity.y = 0;
            character.position.y = 10;
        }
    
    for (let i = 0; i < clouds.length; i++) {
        const cloud = clouds[i];
            if (cloud.position.x + cloud.width/2 < 0) {
                    cloud.position.x = random(width, width * 2);
                    cloud.position.y = random(0, height/4);
            
        }
    }
    
    
    /* player moves character only right */
    if (keyDown("d")) {
        character.position.x += SPEED;
        character.changeAnimation("runRight");
    } else if (keyDown("a")) {
        character.position.x -= SPEED;
        character.changeAnimation("runLeft");
    } else {
        character.changeAnimation("idleRight");
    }
        
    
  
    /* new collision for platform/ground and walls/platforms  */
    if (character.collide(platform)) {
        character.velocity.y = 0;
        if (character.isJumping) {
            character.isJumping = false;
        }

    } else {
        character.velocity.y += GRAVITY;
    }

    for (let i = 0; i < walls.length; i++) {
        const wall = walls[i];
        if (character.collide(wall)) {
            if (character.collider.bottom() <= wall.collider.top()) {
                character.velocity.y = 0;
                if (character.isJumping) {
                    character.isJumping = false;
                }
            }
        }
    }

    
	
    /* jump */
	if (keyWentDown("w")) {
		if (!character.isJumping) {
			character.velocity.y -= JUMP_SPEED;
			character.isJumping = true;
            jump_sfx[floor(random(0, jump_sfx.length))].play();
		}
	}
    
    
    /* attack */
    if (keyWentDown("j")) {
        shootBullet(character.position, new p5.Vector(character.position.x + 10, character.position.y))
        CharShoot.play();
        if (keyDown("d")) {
            character.changeAnimation("runningshoot");
        } else if (keyDown("w")) {
            character.changeAnimation("idleshoot");
        } else {
            character.changeAnimation("idleshoot");
        }
    }
    
	
	for (let i = 0; i < enemies.length; i++) {
		const enemy = enemies[i];
        if (enemy.follow) {
			const d = dist(enemy.position.x, enemy.position.y, character.position.x, character.position.y);
			if (d < enemy.follow.distance) {
				var dir = new p5.Vector(character.position.x, character.position.y);
				dir.sub(enemy.position);
				dir.normalize();
				dir.mult(enemy.follow.speed);
				enemy.velocity = dir;
                //Animation here// 
			} else {
				enemy.velocity = enemy.follow.reset;
                //animation here//
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

        
		if (character.overlap(enemy)) {
			character.lives --;
			//enemy.remove();
            hurtSound.play();
			enemy.position.x += random(width * 2, width * 6);
		} else {
			wrap(enemy, random(width * 2, width * 6));
		}
    }
        
        enemies.overlap(bullets, function(e, b){
            b.remove();
            e.position.x += random(width * 2, width * 6);
        });
        
   
    
        enemyBullets.overlap(character, function(e){
            e.remove();
            character.lives -= 2;
            hurtSound.play();
        });
	
	
	for (let i = 0; i < health.length; i++) {
		const life = health[i];
		if (character.overlap(life)) {
			character.lives ++;
            pickupSound.play();
			// life.remove(); 
			life.position.x += random(width * 2, width * 6);
		} else {
			wrap(life, random(width * 2, width * 6));
		}
	}
	
	/* wrapping sprites */
	wrap(platform, width);
    
    if (character.position.x - platform.position.x >= width/8) {
        platform.position.x += width;
    } 
    
    
	for (let i = 0; i < walls.length; i++) {
		const wall = walls[i];
		wrap(wall, random(width*2, width*1.2));
	}
	
	
	/* camera follows character */
	camera.position.x = character.position.x + width/4 + width/8;
	
	drawSprites(stuff);
	drawSprites(walls);
	drawSprites(enemies);
	drawSprites(health);
    drawSprites(enemyBullets);
    drawSprites(bullets);
	
	/* ui */
	camera.off();
	drawSprites(clouds);
	fill(0);
	textAlign(LEFT);
	textSize(18);
    image(Lifeimg, 10, 10, 40, 40)
	text("x" + character.lives, 60, 40);
    textSize(12);
    text("CURRENT LEVEL: " + currentlevel, 10, 65);
	
	/* detect game ending */
	if (character.lives <= 0) {
		gameState = 3;
	}
    
    
    /* detect game level */
    if (character.overlap(cave)) {
        currentlevel++;
        gameState = 4;
    }
}


function wrap(obj, reset) {
	if (character.position.x - obj.position.x >= width/2) {
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





