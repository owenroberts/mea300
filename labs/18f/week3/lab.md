---
layout: notes
title: Lab Notes
week: 3
---

This week we added a platform for the character to stand on and some basic physics to make the character move.  We also added some random scenic elements, including foreground elements (trees or shrubs or grass) and moving background elements, clouds.

## global values

```
/* global variable */
var player;
var jump_speed = 12;
var GRAVITY = 1;
```

We added a GRAVITY constant using the all-caps naming convention.  The `jump_speed` is applied to the character on the y axis when the player presses the jump key, while the `GRAVITY` is applied every frame whenever the character is not colliding with the platform.

```
// platform
var platform;
var platform_img;
```

We added a global `var` for the platform and platform image.  This will be initialized in `setup` and then updated in `draw`.

```
// scenery
var cloud, cloud_sheet, cloud_animation;
var tree1, tree2, tree_img;
```

We also added variables for the scenery sprites and images.

```
function preload() {
	platform_img = loadImage("sprites/scenery/box.png");
    
    cloud_sheet = loadSpriteSheet("sprites/scenery/cloud.png", 64, 32, 12);
    cloud_animation = loadAnimation(cloud_sheet);
    
    tree_img = loadImage("sprites/scenery/tree.png");
}
```

The preload function loads all of the images for our new assets.

```
function setup() {
    createCanvas(640, 360);
    
	// set up player/character
    player = createSprite(320, 180);
    player.setCollider("rectangle", -5, 0, 55, 115);
    player.addAnimation("idle", idle_animation);
    player.addAnimation("run", run_animation);
    player.addAnimation("jump", jump_animation);
```

This is all the same from last week.

## boolean
```
	character.isJumping = false;
```

We added a property called `isJumping` to the character object to keep track of whether or not the character is jumping.  This is useful to prevent the player from jumping infinitely.  This introduces a new concept called a `boolean`.  A boolean is a value that can only be `true` or `false`, a *binary* value.  This is an essential aspect of logic in computer programming, a way to make decisions about what our program should be doing.


```	
	// set up platform
    platform = createSprite(320, 300);
    platform.setCollider("rectangle", 0, 0, 128, 32);
    platform.addImage("default", platform_img);
```

Here we set up our platform and added the default image.

```
 	// set up scenery
    cloud = createSprite(600, 100);
    cloud.addAnimation("default", cloud_animation);
    cloud.velocity.x = -1;
```

Then we added our cloud and included some velocity to make it move across the screen.
	
## random

```
	var x = random(0, 640);
    var y = random(250, 300);
    tree1 = createSprite(x, y);
    tree1.addImage("default", tree_img);
    
    var x = random(0, 640);
    var y = random(250, 300);
    tree2 = createSprite(x, y);
    tree2.addImage("default", tree_img);
```


We used the `random` function in both cases to assign random values x and y position of the trees.  This makes it easy to make variations to the game each time it is played

`random` takes 2 arguments, the minimum values and maximum, so `random(0,5)` will return a random values between `0` and `5`, like `2.7`.  `random(-1, 1)` will return something like `-0.93` or `0.54`.

This code looks repetitive but soon we'll learn how to make it simpler.

## jump

```    
}

function draw() {
    background("white");
    
    // character movement
    if (keyDown("space") && !player.isJumping) {
        player.changeAnimation("jump");
        player.velocity.y -= jump_speed;
        player.isJumping = true;
    }

```

We simplified our character movement this week to focus on jumping.  The character jumps when the user hits spacebar but only if it is not jumping.  This is how we use the `player.isJumping` boolean.  The `!` operator means the opposite of the value so `!player.isJumping` means the player is not jumping.  After the user presses jump, the program knows the player is jumping, so it won't let the player jump again until it collides with a platform.

To jump we apply the jump_speed to the player in the opposite direction of gravity.

## collision

```
	if (player.collide(platform)) {
        player.isJumping = false;
        player.changeAnimation("idle");
    } else {
        player.velocity.y += GRAVITY;
    }
```

In this section we combined `boolean` logic using `if` and `else` statements to decide whether or not to apply `GRAVITY` to the character.  The statement `character.collide(platform)` will be `true` if the character bounding box and platform bounding box are touching.  If that is true, we want to set the `character.velocity.y` to `0`, because we know the character is not jumping or in the air.  We also want to set the `character.isJumping` value to false, because we know the character is on the ground.  

If `character.collide(platform)` is `false`, we use the `else` statement to to apply the `GRAVITY` value to the `character.velocity.y` to make the character fall back to the platform.


```   
    drawSprites();
}

```

Don't forget to draw the sprites!

