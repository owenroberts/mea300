---
layout: notes
title: Lab Notes
week: 6
---

This was a big wee, we made a ton of changes, mostly to organize the code and make it easier to update and tweak the game mechanics and setup.  We started by separating the main parts of the game into different files.  We'll go over those files and the changes we made in them.

First off, we need to add all these new files to the script tags in *index.html*.

```
<script src="p5.min.js"></script>
<script src="p5.play.js"></script>

<!-- game files -->
<script src="settings.js"></script>
<script src="assets.js"></script>
<script src="setup.js"></script>
<script src="scenes.js"></script>
<script src="game.js"></script>
```

## settings.js

The *settings.js* file contains all the variables that are used to set up the game and create conditions for the gameplay.  It started with a few global variables from the original *game.js*.

```
/*
    global variables
*/
var player;
var speed = 6;
var jump_speed = speed * 3;
var GRAVITY = 1;
```

We added a bunch of new variables that get used mostly in the *setup.js* file to build the game.  Starting from the top here's what got added.

```
/*
    global variables
*/
var speed = 6;
var GRAVITY = 1;
var gameWidth = 640;
var gameHeight = 360;
```

We already had `speed` and `gravity` for the speed of the game and the amount of gravity applied to the player.  This adds `gameWidth` and `gameHeight`, which are used to make the game sprites position relative to the size of the canvas in case we want to update the canvas size later to make the game dimensions larger or smaller.

```
// player
var player;
var jump_speed = speed * 3;
var playerXStart = 80;
var playerYStart = 200;
```

Then we added the `playerXStart` and `playerYStart` to save the starting position of the player for when the game resets.  We're going to see a lot of variables with similar names.

```
// platform 
var platformXStart = playerXStart + 100;
var platformYStart = gameHeight - 100;
var numPlatforms = 3;
var platformYChange = 100;
```

The platform start position is set relative to the player and the game height.  We can also set the number of platforms and the relative change in height for each new platform.

```
// scenery 
var numClouds = 3;
var cloudSpeed = speed * 0.05;
var cloudYMin = 50;
var cloudYMax = 150;

var numTrees = 10;
var treeSpeed = speed * 0.1;
var treeYMin = gameHeight - 50;
var treeYMax = gameHeight - 25;
```

These variables set up the non-interactive sprites which make up the game scenery.  We can set the number of clouds and trees, the relative positions that are used to randomly generate them in `setup` and the speed at which they move across the screen.

`cloudYMin` and `cloudYMax` are used to set the range for the randomly generated coordinates, which we'll see with other sprites as well.

```
random(cloudYMin, cloudYMax)
```

```
// obstacles
var numArrows = 1;
var arrowYMin = 150;
var arrowYMax = 250;
var arrowSpeed = speed * 2;
```

Finally the obstacles.  We can set the number of arrows, the y position range and the speed.


## assets.js

Next we have *assets.js* which doesn't contain any new code.  It's just all the variables used for external assets (images or sound files) and the `preload` function, which will load them all.

```
// player animations
var idle_sheet, idle_animation;
var run_sheet, run_animation;
var jump_sheet, jump_animation;

// platform
var platforms;
var start_platform_img, platform_img;

// scenery
var clouds, cloud_sheet, cloud_animation;
var trees, tree_img;

// obstacles
var arrows; // group
var arrow_sheet, arrow_animation;

function preload() {
    idle_sheet = loadSpriteSheet("sprites/main_character/main_character_idle.png", 128, 128, 16);
    idle_animation = loadAnimation(idle_sheet);

    run_sheet = loadSpriteSheet("sprites/main_character/main_character_running.png", 128, 128, 6);
    run_animation = loadAnimation(run_sheet);

    jump_sheet = loadSpriteSheet("sprites/main_character/main_character_jumping.png", 128, 128, 30);
    jump_animation = loadAnimation(jump_sheet);

    platform_img = loadImage("sprites/scenery/platform.png");
    start_platform_img = loadImage("sprites/scenery/start_platform.png");

    cloud_sheet = loadSpriteSheet("sprites/scenery/cloud.png", 64, 32, 12);
    cloud_animation = loadAnimation(cloud_sheet);

    tree_img = loadImage("sprites/scenery/tree.png");

    arrow_sheet = loadSpriteSheet("sprites/obstacles/arrow.png", 32, 32, 3);
    arrow_animation = loadAnimation(arrow_sheet);
}
```

## setup.js

The *setup.js* file has the `setup` function which uses a lot of the variables introduced in `settings.js`.  It also has a new `build` function which does a lot of what `setup` did before so that we can reset the game if the player dies.

```
function setup() {
    createCanvas(gameWidth, gameHeight);
```

The `createCanvas` now uses the `gameWidth` and `gameHeight` from *settings.js* so the graphics and canvas can be controlled relatively.

```
	    // set up player/character
    player = createSprite(playerXStart, playerYStart);
    player.setCollider("rectangle", -5, 0, 55, 115);
    player.addAnimation("idle", idle_animation);
    player.addAnimation("run", run_animation);
    player.addAnimation("jump", jump_animation);
    player.isJumping = false;
    player.isGrounded = false;
    player.scale = 0.5;
    
    platforms = new Group();
    clouds = new Group();
    trees = new Group();
    arrows = new Group();
}
```

Player setup is the same, one new thing here is that the groups are all declared in one place so that they can be used multiple times.

The loops used to build each group are in the `build` function so they can be used more than once.  `setup` can only be called once at the beginning of the program.

```
function build() {

    // set up platform
    var startPlatform = createSprite(platformXStart, platformYStart);
    startPlatform.setCollider("rectangle", 0, 0, 512, 32);
    startPlatform.addImage("default", start_platform_img);
    startPlatform.velocity.x = -speed;
    startPlatform.isStartPlatform = true;
    platforms.add(startPlatform);
```

The first platform uses the `platformXStart` and `platformYStart` and is otherwise the same.

```    
    var y = platformYStart;
    for (var i = 0; i < numPlatforms; i++) {
        var x = 512 + 256 * i;
        var platform = createSprite(x, y, 128, 32);
        platform.addImage("default", platform_img);
        platform.velocity.x = -speed;
        platforms.add(platform);
        
        // adjust y
        y += random(-platformYChange, platformYChange);
    }
```

The other platforms now use *settings.js* variables to set the randomized `y` value.


```
    // set up scenery
    for (var i = 0; i < numClouds; i++) {
        var x = random(0, width);
        var y = random(cloudYMin, cloudYMax);
        var cloud = createSprite(x, y);
        cloud.addAnimation("default", cloud_animation);
        cloud.velocity.x = -random(cloudSpeed, cloudSpeed * 2);
        clouds.add(cloud);
    }

    
    for (var i = 0; i < numTrees; i ++) {
        var x = random(0, 640);
        var y = random(treeYMin, treeYMax);
        var tree = createSprite(x, y);
        tree.addImage("default", tree_img);
        tree.velocity.x = -treeSpeed - random(0, 0.1);
        trees.add(tree);
    }
```

The scenery also uses variables from *settings.js*.  


```
    // loop - structure in JavaScript that repeats code
    for (var i = 0; i < numArrows; i++) { // happens 3 times
        var x = random(width, width * 3);
        var y = random(arrowYMin, arrowYMax);
        var arrow = createSprite(x, y);
        arrow.setCollider("rectangle", 0, 0, 20, 10);
//        arrow.debug = true;
        arrow.addAnimation("default", arrow_animation);
        arrow.velocity.x = -arrowSpeed - random(0, 1);
        arrows.add(arrow);
    }
}
```

Finally setting up the obstacles uses *settings.js* variables.

## scenes.js

*scenes.js* is where we added the most new code.  This file handles what scene is rendered for the player.  We added a intro scene and restart scene.  The main scene is the `game` scene.

```
var scene = "intro";

function draw() {
    if (scene == "intro") {
        intro();   
    } else if (scene == "game") {
        game();
    } else if (scene == "restart") {
        restart();
    }
}
```

We use a string variable `scene` to keep track of which scene it is.  Then we use the `draw` function to tell `p5` which scene to draw.  Each scene is rendered with a function matching the string name of the scene.

```
function intro() {
    background("black");
    
    // text styling
    fill("white");
    textAlign(CENTER, CENTER);
    textFont("Comic Sans MS");
    textSize(50);
    
    // title 
    text("My First Game", width/2, height/2);
     // instructions
    text("Press Enter to Start", width/2, height/2 + 100);
}
```

The `intro` scene is the first scene a player will see.  We use some `p5` `text` to give instructions to the player.

```
function restart() {
    background("black");
    
    fill("white");
    textAlign(CENTER, CENTER);
    textFont("Comic Sans MS");
    textSize(50);
    
    text("You Died :(", width/2, height/2);
    text("Enter to Start Over", width/2, height/2 + 100);
}
```

The `restart` scene is almost identical to the `intro` scene.  When the player dies we go here and the player can start over.

```
function died() {
    scene = "restart";
```

The `died` function is trigger whenever the player goes off the canvas or gets hit by an arrow.  It is used to set the scene to `"restart"`.

```    
    // reset the player
    player.position.x = playerXStart;
    player.position.y = playerYStart;
    player.velocity.y = 0;
    
```

We also reset the player by setting the position back to the start position and setting the `y` velocity to `0`.


```
    // destroy other sprites
    while (platforms.length > 0) {
        platforms[0].remove();
    }
    
    while (clouds.length > 0) {
        clouds[0].remove();
    }
    
    while (trees.length > 0) {
        trees[0].remove();
    }
    
    while (arrows.length > 0) {
        arrows[0].remove();
    }
}
```

Finally we destroy all the sprites that were created when the game started so we can start from scratch.

Any sprites that are not part of a group can be removed by just called `.remove()` on the sprite itself like `platform.remove()` or `enemy.remove()`.

```
function keyPressed() {
	// enter key
    if (keyCode == 13) {
        if (scene == "intro" || scene == "restart") {
            build();
            scene = "game";
        }
    }
}
```

The last part of this file is a `keyPressed` event listener so that the game can be started when the user hits `Enter`.  

First we check to make sure the Enter key was pressed with the conditional statment: `if (keyCode == 13) { }`.  The character code for the Enter key is `13`.

Then if the `scene` is either `intro` or `restart` we want to start the game, so we call the `build()` function to create all of the sprites and then change the `scene` to `"game"`.

## game.js

Our last file.  This is mostly what used to be the `draw` function but the name has been changed to `game`.

```
function game() {
    background("white");

    // character movement
    
    // loop through all platforms
    player.isGrounded = false;
    for (var i = 0; i < platforms.length; i++) {
        var platform = platforms[i];
        if (player.collide(platform)) {
            player.isJumping = false;
            player.changeAnimation("run");
            player.velocity.y = 0;
            player.isGrounded = true;
        }
        
        // wrap around canvas
        if (platform.collider.right() < 0) {
            if (platform.isStartPlatform) {
                platform.remove();
            }
            platform.position.x = width + platform.width/2;
            platform.position.y += random(-50, 50);
        }
    }
    
    if (!player.isGrounded) {
        player.velocity.y += GRAVITY;
    }
    
    
    if (keyDown("space") && !player.isJumping) {
        player.changeAnimation("jump");
        player.velocity.y -= jump_speed;
        player.isJumping = true;
    }
```

Most of it is the same.

```
    // arrows hit player
    arrows.overlap(player, function (arrow) {
        died();
    });
```

The first big change is here.  If the arrow hits the player, we call the `died` function to go to the `restart` scene.

```
 	// wrap arrows back to the beginning 
    for (var i = 0; i < arrows.length; i++) {
        if (arrows[i].position.x < -50) {
            arrows[i].position.x = random(width, width * 3);
        }
    }
    
    // wrap clouds
    for (var i = 0; i < clouds.length; i++) {
        if (clouds[i].position.x < -100) {
            clouds[i].position.x = random(width, width * 2);
        }
    }
    
    // wrap trees
    for (var i = 0; i < trees.length; i++) {
        if (trees[i].position.x < -100) {
            trees[i].position.x = random(width, width * 2);
        }
    }

    // player falls below the canvas
    if (player.position.y - player.height > height || player.position.x < -player.width) {
        died();
    }
```

Same here, if the player goes off the canvas area we call the `died` function.  Much easier than resetting the player and everything else in both places.

```
    drawSprites();
}
```

And that's it!  It may be challenging to get all of these changes implemented in your project so give yourself time before the Midterm and come to me if you have any difficulties.