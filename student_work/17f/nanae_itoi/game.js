/* global variable */
var character;
var minX = 0;
var timeCounter = 10800;
var background_img, bk_img, bke_img, bki_img;
var intro;
var intro_img;
var bkresult_img;
var myFont;
var dieFont;
var bullets, enemyBullets;
var goal;
var platforms;
var clouds, walls, enemies, health, fireflowers, lanps, stuff, waterballs, coins, firecars;
var people, bricks, tabacos;
var bosses;
var puzzles;
const NUM_LANPS = 2,
    NUM_CLOUDS = 2,
    NUM_WALLS = 3,
    NUM_FIRECARS = 2;

const JUMP_SPEED = SPEED * 2;
const GRAVITY = 0.4;
const cloudSpeedMin = SPEED / 2,
    cloudSpeedMax = SPEED;
const LIFE_MAX = 6;


var gameState = 0;
var progress = 1;
var currentLevel = 0;
var puzzlesCollected = [];
/* audio */
var bg_music;
var jump_sfx = [];
var Hit_sfx = [];
var pickup_sfx = [];
var obstacle_sfx = [];
var powerup_sfx = [];
var carhit_sfx = [];
var die_sfx = [];
var enter_sfx = [];

function setup() {
    // bg_music.loop();
    createCanvas(w, 360);
    fill('#ED225D');
    textFont(myFont);
    textSize(72);
    text('p5*js', 10, 50);
    stuff = new Group();
    walls = new Group();
    clouds = new Group();
    enemies = new Group();
    health = new Group();
    waterballs = new Group();
    coins = new Group();
    fireflowers = new Group();
    people = new Group();
    bricks = new Group();
    tabacos = new Group();
    lanps = new Group();
    platforms = new Group();
    bosses = new Group();
    puzzles = new Group();
    bullets = new Group();
    enemyBullets = new Group();
    
    

    background_img = loadImage("assets/background/background1.png");
    intro_img = loadImage("assets/background/intro1.png");
    bk_img = loadImage("assets/background/bk2.png");
    game_img = loadImage("assets/background/bk2.png");
    bke_img = loadImage("assets/background/intro.png");
    end_img = loadImage("assets/ending/end.png");
    bkresult_img = loadImage("assets/background/bkresult.png");


    /* character setup */
    character = createSprite(0, 20, 16, 16);
    const current_scale = 0.2;
    character.setCollider("rectangle", 0, 10, 13 / current_scale * 1.7, 32 / current_scale * 1.1, );
    const idle_anim = loadAnimation("assets/idle/stand0.png", "assets/idle/stand3.png");
    const run_anim = loadAnimation("assets/run/walk0.png", "assets/run/walk3.png");
    const jump_anim = loadAnimation("assets/jump/jump0.png", "assets/jump/jump3.png")
    const waterbear_anim = loadAnimation("assets/waterbear/waterbear0.png", "assets/waterbear/waterbear2.png");

    character.addAnimation("idle", idle_anim);
    character.addAnimation("run", run_anim);
    character.addAnimation("jump", jump_anim);
    character.addAnimation("waterbear", waterbear_anim);
    character.isJumping = true;
    character.isDoubleJumping = true;
    character.lives = 3;
    // character.coins = 0;
    character.people = 0;
    character.money = 0;
    character.scale = current_scale * 1.4;
    stuff.add(character);

    goal = createSprite(levelData[currentLevel].goalDistance, height / 2, width / 3, height / 2);
    const goal_anim = loadAnimation("assets/goals/goal0.png", "assets/goals/goal1.png");
    goal.setCollider("rectangle", 0, 10, 13 / current_scale, 32 / current_scale, );
    goal.addAnimation("goals", goal_anim);
    stuff.add(goal);

    walls = new Group();
    for (let i = 0; i < NUM_WALLS; i++) {
        const wall = createSprite(
            random(width * 2 / NUM_WALLS * i, width * 2 / NUM_WALLS * (i + 1)),
            height * 5 / 6,
            40,
            height / 4
        );
        const idle_anim = loadAnimation("assets/walls/wall00.png", "assets/walls/wall05.png");
        wall.addAnimation("assets", idle_anim);

        walls.add(wall);
        wall.scale = 0.3;
    }

    lanps = new Group();
    for (let i = 0; i < NUM_LANPS; i++) {
        const lanp = createSprite(
            random(0, width * 2),
            height * 6 / 8,
            50,
            50,
        );
        const idle_anim = loadAnimation("assets/lanps/lanp00.png", "assets/lanps/lanp02.png");
        lanp.addAnimation("assets", idle_anim);

        lanps.add(lanp);
        lanp.scale = 0.1;

    }


    clouds = new Group();
    for (let i = 0; i < NUM_CLOUDS; i++) {
        const cloud = createSprite(
            width / 2,
            20,
            16,
            16
        );
        const cloud_img = loadImage(cloud_files[floor(random(0, cloud_files.length))]);
        cloud.addImage(cloud_img);
        cloud.velocity.x = -random(cloudSpeedMin, cloudSpeedMax);
        clouds.add(cloud);
        cloud.scale = 0.05;

    }
    firecars = new Group();
    for (let i = 0; i < NUM_FIRECARS; i++) {
        const firecar = createSprite(
            width,
            height * 7 / 8,
            50,
            50,
        );
        const idle_anim = loadAnimation("assets/firecars/firecar00.png", "assets/firecars/firecar02.png");
        firecar.addAnimation("assets", idle_anim);
        firecar.velocity.x = -random(1, 3);
        firecars.add(firecar);
        firecar.scale = 0.03;
    }
    buildLevel();

    for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        menu.sprites = new Group();
        for (let j = 0; j < menu.buttons.length; j++) {
            const b = menu.buttons[j];
            const button = createSprite(b.x, b.y);
            button.addAnimation("idle", "assets/ui/button/button_0.png");
            button.addAnimation("hover", "assets/ui/button/button_1.png", "assets/ui/button/button_2.png");
            button.addAnimation("click", "assets/ui/button/button_3.png", "assets/ui/button/button_4.png");
            button.clicked = false;
            button.scale = 4;
            button.mouseActive = true;
            button.text = b.text;
            button.state = b.state;
            menu.sprites.add(button);
        }
        menu.bkgImage = loadImage(menu.bkg);
    }

}

function buildLevel() {
    var level = levelData[currentLevel];

    /* platform setup */
    const p = createSprite(0, height - 20, width * 3, 20);
    const platform_img = loadImage(level.platform);
    p.addImage("main", platform_img);
    p.immovable = true;
    platforms.add(p);

    for (let i = 0; i < level.people; i++) {
        const p = createSprite(
            i * width * 2 / level.people,
            random(height * 7 / 8, height / 2),
            200,
            40
        );
        const idle_anim = loadAnimation("assets/people/people0.png", "assets/people/people3.png");
        p.addAnimation("assets", idle_anim);
        people.add(p);
        p.scale = 0.3;

    }
    for (let i = 0; i < level.waterballs; i++) {
        const waterball = createSprite(
            i * width * 2 / level.waterballs,
            random(height * 7 / 8, height / 2),
            200,
            40
        );
        const idle_anim = loadAnimation("assets/waterballs/waterball0.png", "assets/waterballs/waterball3.png");
        waterball.addAnimation("assets", idle_anim);

        waterballs.add(waterball);
        waterball.scale = 0.3;

    }
    for (let i = 0; i < level.puzzles.length; i++) {
        const pp = createSprite(
            i * width * 2 / level.puzzles[i],
            random(height * 7 / 8, height / 2),
            200,
            40
        );
        const pp_image = loadImage(level.puzzles[i].art);
        pp.addImage(pp_image);
        pp.index = level.puzzles[i].index;
        puzzles.add(pp);


    }
    for (let i = 0; i < level.fireflowers; i++) {
        const sz = random(30, 50);
        const fireflower = createSprite(
            random(width * 2, width * 4),
            random(height * 3 / 4, height * 7 / 8),
            sz,
            sz
        );
        const idle_anim = loadAnimation("obstacles/fireflowers/fireflower00.png", "obstacles/fireflowers/fireflower05.png");
        fireflower.addAnimation("obstacles", idle_anim);
        fireflower.velocity.y = -random(level.speedMin, level.speedMax);
        fireflowers.add(fireflower);
        fireflower.scale = 0.1;
        this.looping = true;
    }
    for (let i = 0; i < level.tabacos; i++) {
        const sz = random(30, 50);
        const tabaco = createSprite(
            random(width * 2, width * 4),
            random(height * 3 / 4, height * 7 / 8),
            sz,
            sz
        );
        const idle_anim = loadAnimation("obstacles/tabacos/tabaco0.png", "obstacles/tabacos/tabaco2.png");
        tabaco.addAnimation("obstacles", idle_anim);
        tabaco.velocity.x = -random(level.speedMin, level.speedMax);
        tabacos.add(tabaco);
        tabaco.scale = 0.1;
    }
    //    for (let i = 0; i < level.bricks; i++) {
    //        const brick = createSprite(
    //            i * width * 2 / level.bricks,
    //            random(height * 7 / 8, height / 2),
    //            200,
    //            40
    //        );
    //        const idle_anim = loadAnimation("assets/walls/brick0.png", "assets/walls/brick2.png");
    //        brick.addAnimation("bricks", idle_anim);
    //        bricks.add(brick);
    //        brick.scale = 0.5;
    //    }
    for (let i = 0; i < level.coins; i++) {
        const money = createSprite(
            i * width * 2.5 / level.coins,
            random(height * 7 / 8, height / 2),
            200,
            40
        );
        const idle_anim = loadAnimation("assets/coins/coin0.png", "assets/coins/coin6.png");
        money.addAnimation("assets", idle_anim);

        coins.add(money);
        money.scale = 0.1;

    }
    for (let i = 0; i < level.enemies; i++) {
        const sz = random(30, 50);
        const enemy = createSprite(
            random(width * 2, width * 4),
            random(height * 3 / 4, height * 7 / 8),
            sz,
            sz
        );
        const idle_anim = loadAnimation("obstacles/badguy/badbear00.png", "obstacles/badguy/badbear01.png");
        enemy.addAnimation("obstacles", idle_anim);
        enemy.velocity.x = -random(level.speedMin, level.speedMax);
        enemies.add(enemy);
        enemy.scale = 0.2;
    }
    for (let i = 0; i < level.bosses; i++) {
        const sz = 10;
        const boss = createSprite(
            random(width * 2, width * 5),
            height * 1 / 2,
            sz,
            sz
        );
        boss.setCollider("rectangle", 0, 30, 100, 90);
        const idle_anim = loadAnimation("assets/bosses/b0.png", "assets/bosses/b3.png");
        boss.addAnimation("assets", idle_anim);
        boss.velocity.x = -level.speedMin * 2 / 3;
        boss.hits = 5;
        boss.scale = 1.5;
        spawnBoss(boss);
        bosses.add(boss);
    }
    for (let i = 0; i < level.health; i++) {
        const life = createSprite(
            random(0, width),
            random(height / 2, height),
            30,
            20
        );
        const idle_anim = loadAnimation("assets/health/wing.png");
        life.addAnimation("health", idle_anim);
        health.add(life);
        life.velocity.y = SPEED / 2;
        life.scale = 0.3;
    }
}

function reset() {
    character.lives = 3;
    character.velocity.y = 0;
    character.minX = 0;
    character.position.x = 0;
    character.position.y = 0;
    goal.position.x = levelData[currentLevel].goalDistance;
    camera.position.x = width / 2;
    enemies.clear();
    platforms.clear();
    health.clear();
    bosses.clear();
    puzzles.clear();
    enemyBullets.clear();
   
}

function draw() {
    if (gameState == 0) {
        menu(0); //intro();
    } else if (gameState == 1) {
        menu(1); //intructions();
        drawSprites(enemies);
    } else if (gameState == 2) {
        game();
    } else if (gameState == 3) {
        background(255);
        menu(3); //dead();
    } else if (gameState == 4) {
        background(255);
        menu(4); //result();
    } else if (gameState == 5) {
        menu(2); //NextLevel();
    } else if (gameState == 6) {
        puzzle();
    } else if (gameState == 7) {
        menu(5);
    } else if (gameState == 8) {
        menu(6);
    }
}

function menu(index) {
    camera.off();
    background(menus[index].bkgImage);
    
    fill(255);

    fill("pink");
    stroke("black");
    textSize(50);
    textAlign(CENTER);
    if (menus[index].titles) {
        for (let i = 0; i < menus[index].titles.length; i++) {
            text(menus[index].titles[i], 40, 30 + i * 60, width - 80, height);
        }
    }

    fill("blue");
    stroke("black");
    textSize(20);
    textAlign(CENTER);
    if (menus[index].subtitles) {
        for (let i = 0; i < menus[index].subtitles.length; i++) {
            text(menus[index].subtitles[i], 40, 80 + i * 40, width - 80, height);
        }
    
        
    }
    if (index == 2) {
        text("you beat level " + currentLevel, 100, 50, width / 3, height);
        fill("yellow");
        stroke("black");
        textSize(36);
    }
     
    if (index == 4) {
        text("You rescued " + character.people, width / 2 - 30, 150);
            fill("blue");
            textSize(36);
        text("people", width / 2 + 115, 150);
            fill("blue");
            textSize(36);
        text("coins = " + character.money, width / 2 - 30, 100);
            fill("blue");
            textSize(36);
        if (character.money < 10) {
            fill("blue");
            textSize(52);
            text("GOOD JOB!", width / 2 - 10, 230);
        } else if (character.money > 10 && character.money < 20) {
            fill("blue");
            stroke("white");
            strokeWeight(1);
            textSize(52);
            text("GREAT JOB!", width / 2 - 10, 230);
        } else {
            fill("red");
            stroke("white");
            strokeWeight(1);
            textSize(52);
            text("EXCELLENT!", width / 2 - 10, 230);
        }
    }
    textSize(24);
    textFont(myFont);
    textAlign(LEFT);
    for (let i = 0; i < menus[index].sprites.length; i++) {
        const button = menus[index].sprites[i];
        button.display();
        textFont(myFont);
        textAlign(CENTER);
        text(button.text, button.position.x, button.position.y);
        if (button.mouseIsPressed) {
            button.changeAnimation("click");
            button.clicked = true;
        } else if (button.mouseIsOver) {
            button.changeAnimation("hover");
            if (button.clicked) {
                button.clicked = false;
                if (gameState == 3 || gameState == 5) {
                    reset();
                    buildLevel();
                }
                gameState = button.state;
            }
        } else {
            button.changeAnimation("idle");
            button.clicked = false;
        }
    }
}

function game() {
    camera.off();
    background(bk_img);
    // platform(platforms[currentLevel]);
    camera.on();

    /* player moves character only right */
    if (keyDown(RIGHT_ARROW)) {
        character.position.x += SPEED;
        if (character.scale > 0.25) {
            // console.log(character.scale);
            character.scale -= 0.005;
        }
        if (!character.isJumping) character.changeAnimation("run");
    } else if (keyDown(LEFT_ARROW)) {
        character.position.x -= SPEED;
        if (!character.isJumping) character.changeAnimation("run");
    } else {
        if (!character.isJumping) character.changeAnimation("idle");
    }

    if (character.collide(platforms) || character.collide(bricks)) {
        character.velocity.y = 0;
        if (character.isJumping) {
            character.isJumping = false;
            Hit_sfx[floor(random(0, Hit_sfx.length))].play();
        }
    } else {
        character.velocity.y += GRAVITY;
    }

    /* jump event */
    if (keyWentDown("space")) {
        if (!character.isJumping) {
            character.velocity.y -= JUMP_SPEED;
            character.isJumping = true;
            jump_sfx[floor(random(0, jump_sfx.length))].play();
            character.changeAnimation("jump");
        }
    }

    if (keyWentDown("x")) {
        shootBullet(character.position, new p5.Vector(character.position.x + 20, character.position.y - 10), false);
    }

    for (let i = 0; i < clouds.length; i++) {
        const cloud = clouds[i];
        if (cloud.position.x + cloud.width / 2 < 0) {
            cloud.position.x = random(width, width * 2);
            cloud.position.y = random(0, height / 2);
        }
    }
    for (let i = 0; i < firecars.length; i++) {
        const firecar = firecars[i];
        if (character.collide(firecar)) {
            carhit_sfx[floor(random(0, carhit_sfx.length))].play();
        }
        if (firecar.position.x + firecar.width / 2 < 0) {
            firecar.position.x = random(width, width * 2);
            firecar.position.y = height * 7 / 8;

        } else {
            wrap(firecar, random(width * 2, width * 6));
        }
    }
    for (let i = 0; i < lanps.length; i++) {
        const lanp = lanps[i];
        if (lanp.position.x + lanp.width / 2 < 0) {
            lanp.position.x = random(width, width * 2);
            lanp.position.y = height - 20;
        } else {
            wrap(lanp, random(width * 2, width * 6));
        }
    }
    for (let i = 0; i < coins.length; i++) {
        const money = coins[i];
        if (character.overlap(money)) {
            character.money++;
            //coinCount++;
            // money.remove();
            money.position.x -= random(width * 2, width * 6);
            pickup_sfx[floor(random(0, pickup_sfx.length))].play();
        } else {
            wrap(money, random(width * 2, width * 6));
        }
    }
    for (let i = 0; i < people.length; i++) {
        const p = people[i];
        if (character.overlap(p)) {
            character.people++;
            p.position.x += random(width * 2, width * 4);
            pickup_sfx[floor(random(0, pickup_sfx.length))].play();
        } else {
            wrap(p, random(width * 2, width * 6));
        }
    }
    for (let i = 0; i < waterballs.length; i++) {
        const waterball = waterballs[i];
        if (character.overlap(waterball)) {
            character.changeAnimation("waterbear");
            waterball.position.x -= random(width, width * 2);
            powerup_sfx[floor(random(0, powerup_sfx.length))].play();
        } else {
            wrap(waterball, random(width * 2, width * 6));
        }

    }
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        if (character.overlap(enemy)) {
            character.lives--;
            //enemy.remove(); 
            enemy.position.x += random(width * 2, width * 6);
            obstacle_sfx[floor(random(0, obstacle_sfx.length))].play();
        } else {
            wrap(enemy, random(width * 2, width * 6));
        }
    }
    for (let i = 0; i < bosses.length; i++) {
        const boss = bosses[i];
        if (boss.jump) {
            if (frameCount % boss.jump.rate == 0) {
                boss.velocity.x = 0;
                boss.velocity.y = boss.jump.speed;
                boss.jump.rate += floor(random(-10, 10));
            } else if (boss.position.y > height - 20) {
                boss.velocity.y *= -1;
            } else if (boss.position.y <= boss.jump.origin) {
                boss.velocity.y = 0;
                boss.velocity.x = -2;
            }
        }
        if (boss.follow) {
            stroke(0, 255, 0);
            line(boss.position.x, boss.position.y, character.position.x, character.position.y);
            const d = dist(boss.position.x, boss.position.y, character.position.x, character.position.y);
            if (d < boss.follow.distance) {
                var dir = new p5.Vector(character.position.x, character.position.y);
                dir.sub(boss.position);
                dir.normalize();
                dir.mult(boss.follow.speed);
                boss.velocity = dir;
            } else {
                boss.velocity = boss.follow.reset;
            }
        }
        if (boss.shoot) {
            var d = dist(boss.position.x, boss.position.y, character.position.x, character.position.y);
            console.log(d,boss.shoot.distance);
            if (d < boss.shoot.distance) {
                if (frameCount % boss.shoot.rate == 0) {
                    shootBullet(boss.position, new p5.Vector(character.position.x, character.position.y), true);
                    console.log(enemyBullets);
                    
                }
            }
        }
        if (boss.movement) {
            if (frameCount % boss.movement.rate == 0) {
                boss.velocity.x = random(-boss.movement.randomness, boss.movement.randomness);
                boss.velocity.y = random(-boss.movement.randomness / 2, boss.movement.randomness);
            }
            if (boss.position.x < 0 || boss.position.x > width) {
                boss.velocity.x *= -1;
            }
            if (boss.position.y < 0 || boss.position.y > height) {
                boss.velocity.y *= -1;
            }
        }
    }
    for (let i = 0; i < tabacos.length; i++) {
        const tabaco = tabacos[i];
        if (character.overlap(tabaco)) {
            character.lives--;
            //bom.remove(); 
            tabaco.position.y += random(width * 3, width * 6);
            obstacle_sfx[floor(random(0, obstacle_sfx.length))].play();
        } else {
            wrap(tabaco, random(width * 2, width * 6));
        }
    }
    for (let i = 0; i < fireflowers.length; i++) {
        const fireflower = fireflowers[i];
        if (character.overlap(fireflower)) {
            character.lives--;
            //fireflower.remove(); 
            fireflower.position.x += random(width * 2, width * 6);
            obstacle_sfx[floor(random(0, obstacle_sfx.length))].play();

        } else {

            if (fireflower.position.y <= 0 || fireflower.position.y >= height) {
                fireflower.velocity.y *= -1;
            }

            wrap(fireflower, random(width * 2, width * 6));
        }

    }
    for (let i = 0; i < health.length; i++) {
        const life = health[i];
        if (character.overlap(life)) {
            character.lives++;
            //life.remove();  
            life.position.x += random(width * 2, width * 6);
            powerup_sfx[floor(random(0, powerup_sfx.length))].play();
        } else {
            if (life.position.y <= height / 3 || life.position.y >= height) {
                life.velocity.y *= -1;
            }

            wrap(life, random(width * 2, width * 6));
        }


    }
    /* wrapping sprites */
    for (let i = 0; i < platforms.length; i++) {
        const p = platforms[i];
        wrap(p, width);
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
        wrap(wall, random(width, width * 2.5));
    }
    for (let i = 0; i < bricks.length; i++) {
        const brick = bricks[i];
        wrap(brick, random(width, width * 3));
    }
    fireflowers.overlap(bullets, function (e, b) {
        b.remove();
        if (e.hits) {
            console.log(e.hits);
            e.hits--;
            console.log(e.hits);
            if (e.hits == 0) {
                e.remove();
            }
        } else {
            e.remove();
        }
    });
    enemies.overlap(bullets, function (e, b) {
        b.remove();
        if (e.hits) {
            console.log(e.hits);
            e.hits--;
            console.log(e.hits);
            if (e.hits == 0) {
                e.remove();
            }
        } else {
            e.remove();
        }
    });
    character.overlap(bosses, function () {
        character.lives = 0;
    });
    character.overlap(enemyBullets, function () {
        character.lives = 0;
    });

    bosses.overlap(bullets, function (e, b) {
        b.remove();
        if (e.hits) {
            console.log(e.hits);
            e.hits--;
            console.log(e.hits);
            if (e.hits == 0) {
                e.remove();
                enemyBullets.clear();
            }
        } else {
            e.remove();
            enemyBullets.clear();
        }
    });
    for (let i = 0; i < bullets.length; i++) {
        const b = bullets[i];
        b.velocity.y += GRAVITY / 4;
    }
    bullets.bounce(platforms);

    /* camera follows character */
    camera.position.x = character.position.x + width / 4;

    drawSprites(waterballs);
    drawSprites(stuff);
    drawSprites(walls);
    drawSprites(enemies);
    drawSprites(health);
    drawSprites(platforms);
    drawSprites(lanps);
    drawSprites(fireflowers);
    drawSprites(coins);
    drawSprites(firecars);
    drawSprites(people);
    drawSprites(bricks);
    drawSprites(tabacos);
    drawSprites(bosses);
    drawSprites(puzzles);
    drawSprites(bullets);
    drawSprites(enemyBullets);

    /* ui */
    camera.off();
    fill(0);
    textAlign(LEFT);
    textSize(18);
    drawSprites(clouds);
    textFont(myFont);
    //noStroke();
    stroke(0);
    strokeWeight(2);
    fill(0);
    rect(85, 7, 350, 17);

    fill("lightblue");
    strokeWeight(0);
    rect(90, 8, 100 * character.lives, 15);

    fill(0)
    text("Lives: " + character.lives, 10, 20);
    text("Money: " + character.money, 10, 40);
    text("People: " + character.people, 10, 60);
    text("timer " + floor(timeCounter / 60 / 60) + ":" + floor(timeCounter / 60) % 60, 10, 80);
    timeCounter--;
    /* detect game ending */
    if (character.lives <= 0 || timeCounter <= 0) {
        gameState = 3;
        character.velocity.y = 0;
        currentLevel = 0; // you died
    }
    puzzles.overlap(character, function () {
        puzzlesCollected.push(this.index);
        // console.log(puzzlesCollected);
        this.remove();
    });
    /* detect next level */
    if (character.overlap(goal)) {
        currentLevel++;
        gameState = 5;
    }
}

function spawnBoss(boss) {
    boss.shoot = {
        rate: 30,
        distance: 400,
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
}


function shootBullet(shooter, target, isEnemy) {
    if (isEnemy) {
        const f = createSprite(shooter.x, shooter.y, 1, 1);
        const idle_anim = 
        loadAnimation("assets/enemyfires/f0.png", "assets/enemyfires/f2.png");
        f.addAnimation("assets", idle_anim); 
        f.velocity.x = -random(1, 3);
        f.scale =0.5;
        enemyBullets.add(f);
    } else {
        const b = createSprite(shooter.x, shooter.y, 10, 10);
        var dir = new p5.Vector(shooter.x + target.x, target.y);
        dir.sub(shooter);
        dir.normalize();
        dir.mult(10);
        b.velocity = dir;

        b.friction = 0.01;
        b.life = 50;
        b.mass = 50;
        bullets.add(b);
    }
}

function wrap(obj, reset) {
    if (character.position.x - obj.position.x >= width / 4) {
        obj.position.x += reset;
    }
}
