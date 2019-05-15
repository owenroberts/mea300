var canvas = document.getElementById('viewport'),
context = canvas.getContext('2d');

make_base();

function make_base()
{
  base_image = new Image();
  base_image.src = 'background.jpg';
  base_image.onload = function(){
    context.drawImage(background.jpg, 0, 0);
  }
}
function startGame() {
  myGamePiece = new component(30, 30, "red", 10, 160);
  myScore = new component("30px", "Consolas", "black", 280, 40, "text");
  myGameArea.start();
}

////
function setup() {
 
    createCanvas(gameWidth, gameHeight);
    

     var background = new Image("background.jpg");
background.src = "background.jpg";

    
    // set up player/character
    player = createSprite(playerXStart, playerYStart);
//    player.setCollider("rectangle", -5, 0, 55, 115);
    player.addAnimation("idle", idle_animation);
    player.addAnimation("run", run_animation);
    player.addAnimation("jump", jump_animation);
    player.isJumping = false;
    player.isGrounded = false;
    player.livesLeft = 3;
    player.scale = 0.5;
//    player.debug = true 
    
    
    // declare groups
    platforms = new Group();
    clouds = new Group();
    trees = new Group();
    arrows = new Group();
    hearts = new Group();
}

function build() {

    // set up platform - Single images
    var startPlatform = createSprite(platformXStart, platformYStart);
    startPlatform.setCollider("rectangle", 0, 0, 512, 32);
    startPlatform.addImage("default", start_platform_img);
    startPlatform.velocity.x = -speed;
    startPlatform.isStartPlatform = true;
    platforms.add(startPlatform);
    
    var y = platformYStart;
    for (var i = 0; i < numPlatforms; i++) {
        var x = 512 + 256 * i;
        var platform = createSprite(x, y);
        platform.addImage("default", platform_img);
        platform.setCollider("rectangle", 0, 0, 220, 55);
        platform.velocity.x = -speed;
//        platform.debug = true;
        platforms.add(platform);
        
        // adjust y
        y += random(-platformYChange, platformYChange);
    }
    

    // set up scenery - Looping Animation
    for (var i = 0; i < numClouds; i++) {
        var x = random(0, width);
        var y = random(cloudYMin, cloudYMax);
        var cloud = createSprite(x, y);
        
        cloud.addAnimation("default", cloud_animation);
        cloud.velocity.x = -random(cloudSpeed, cloudSpeed * 2);
        cloud.depth = -1;
        clouds.add(cloud);
    }

    
    // obstacles
    // loop - structure in JavaScript that repeats code
    for (var i = 0; i < numArrows; i++) { // happens 3 times
        var x = random(width, width * 3);
        var y = random(arrowYMin, arrowYMax);
        var arrow = createSprite(x, y);
        arrow.setCollider("rectangle", 0, 0, 20, 10);
        
        arrow.addAnimation("default", arrow_animation);
        arrow.velocity.x = -arrowSpeed - random(0, 1);
        arrows.add(arrow);
    }
}












