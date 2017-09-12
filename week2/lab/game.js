/* global variable */
var character;
const speed = 5;

function setup() {
    createCanvas(640, 360);
    character = createSprite(20, 20, 64, 64);
    
    /* still images
    const idle_img = loadImage("assets/idle.png");
    character.addImage("idle", idle_img);
    const run_img = loadImage("assets/run.png");
    character.addImage("run", run_img);
    */
    
    const idle_anim = loadAnimation("assets/idle/idle_00.png", "assets/idle/idle_09.png");
    const run_anim = loadAnimation("assets/run/run_0.png", "assets/run/run_5.png");
    character.addAnimation("idle", idle_anim);
    character.addAnimation("run", run_anim);
    
}

function draw() {
    background("white");
    
    /* keyboard events */
    // slidingMovement();
    constantMovement();
    
    if (keyIsPressed) {
        character.changeAnimation("run");
    } else {
        character.changeAnimation("idle");
    }
    
    drawSprites();
}

function constantMovement() {
    if (keyDown(RIGHT_ARROW)) {
        character.position.x += speed;
    }
    if (keyDown(LEFT_ARROW)) {
        character.position.x -= speed;
    }
    if (keyDown(DOWN_ARROW)) {
        character.position.y += speed;
    }
    if (keyDown(UP_ARROW)) {
        character.position.y -= speed;
    }
}

function slidingMovement() {
    if (keyWentDown(RIGHT_ARROW)) {
        character.velocity.x += 1;
    }
    if (keyWentDown(LEFT_ARROW)) {
        character.velocity.x -= 1;
    }
    if (keyWentDown(DOWN_ARROW)) {
        character.velocity.y += 1;
    }
    if (keyWentDown(UP_ARROW)) {
        character.velocity.y -= 1;
    }
}