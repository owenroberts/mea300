---
layout: notes
title: MEA 300
week: 3
dek: Lab Notes
---

This week we added a platform for the character to stand on and some basic physics to make the character move.  We also added some random scenic elements, including foreground elements (trees or shrubs or grass) and moving background elements, clouds.  We didn't quite finish everything on the run down, so we should probably plan not to do quite as much each week.

## global values

```
/* global variable */
var character;
var platform;
```

We started with adding a global `var` for the platform.  This will be initialized in `setup` and then updated in `draw`.

```
const SPEED = 5;
const JUMP_SPEED = SPEED * 2;
const GRAVITY = 0.5;
```

We also added some constants using the all-caps naming convention.  The `JUMP_SPEED` is applied to the character on the y axis when the player presses the jump key, while the `GRAVITY` is applied every frame whenever the character is not colliding with the platform.

```
function setup() {
    createCanvas(640, 360);
    
	/* character setup */
	character = createSprite(20, 20, 16, 16);
    const idle_anim = loadAnimation("assets/idle/idle_00.png", "assets/idle/idle_09.png");
    const run_anim = loadAnimation("assets/run/run_0.png", "assets/run/run_5.png");
    character.addAnimation("idle", idle_anim);
    character.addAnimation("run", run_anim);
	//character.debug = true;
```

## boolean

This is all the same from last week.

```
	character.isJumping = true;
```

We added a property called `isJumping` to the character object to keep track of whether or not the character is jumping.  This is useful to prevent the player from jumping infinitely.  This introduces a new concept called a `boolean`.  A boolean is a value that can only be `true` or `false`, a *binary* value.  This is an essential aspect of logic in computer programming, a way to make decisions about what our program should be doing.

## width and height

```	
	/* platform setup */
	platform = createSprite(width/2, height - 10, width, 20);
	//platform.debug = true;
```

Here we set up our platform.  To do this we talked about some aspects of the `p5 canvas`, the default `width` and `height` values and positioning of sprites in `p5.play`.  

`width` and `height` always give us the pixel number of width and height set by the `createCanvas()` function.  So if we write `createCanvas(640, 360)`, `width` will be 640 and `height` will be 360.  If you start with `createCanvas(200, 100)`, `width` will be 200 and `height` will be 100.


## loop

```
	const NUM_BUSHES = 8;
	for (let i = 0; i < NUM_BUSHES; i++) {
		console.log(i);
		createSprite(
			random(0, width), 
			random(height-20, height), 
			random(10, 60), 
			random(50, 100)
		);
	}
```

In this section of `setup` we used a `for loop` to create a series of randomly placed bushes or trees in the foreground of the scene.  A *loop* is another new concept.  Loops are used to do the same set of actions multiple times.  We set the number of bushes we want with the `const` value `NUM_BUSHES`.  A for loop uses three statements to set the condition for running the code multiple times.  We start with `let i = 0;` which is the initial condition and sets the variable `i` to count the number of bushes.  Next we set the end condition: `i < NUM_BUSHES`.  As long as this is `true` the loop will continue.  When `i` reaches a value that is not less than `NUM_BUSHES`, set to 8, it will stop (that value is 8, because 8 is not less than 8).  The last condition is the change or increment statement: `i++`.  This is how we change `i` after each loop so that we count from `0` to `8`.  *Note*, we start counting with `0` in programming.
	
## random

```
	const NUM_CLOUDS = 5;
	for (let i = 0; i < NUM_CLOUDS; i++) {
		const cloud = createSprite(
			random(width, width * 2),
			random(0, height/2),
			random(50,100),
			random(20,40)
		);
		cloud.velocity.x = -random(0.1, 0.5);
	}
```

We repeated the loop process to create clouds.  However, with the clouds, we saved the sprites using the `const cloud` for each one, because we need a reference in order to set the `cloud.velocity.x` in the next line, to set random velocities.

We used the `random` function in both cases to assign random values to the position and speed of the bushes and clouds.  This is easier than writing out the set values for each and make the game change with each load.  `random` takes 2 arguments, the minimum values and maximum, so `random(0,5)` will return a random values between `0` and `5`, like `2.7`.  `random(-1, 1)` will return something like `-0.93` or `0.54`.  

```    
}

function draw() {
    background("white");
    
    /* keyboard events */
    constantMovement();
```

This is the same as Week 2.

## collision

```
    
	if (character.collide(platform)) {
		character.velocity.y = 0;
		if (character.isJumping) {
			character.isJumping = false;
		}
	} else {
		character.velocity.y += GRAVITY;
	}
```

In this section we combined `boolean` logic using `if` and `else` statements to decide whether or not to apply `GRAVITY` to the character.  The statement `character.collide(platform)` will be `true` if the character bounding box and platform bounding box are touching.  If that is true, we want to set the `character.velocity.y` to `0`, because we know the character is not jumping or in the air.  We also want to set the `character.isJumping` value to false, because we know the character is on the ground.  If `character.collide(platform)` is `false`, we use the `else` statement to to apply the `GRAVITY` value to the `character.velocity.y` to make the character fall back to the platform.

## jump

```	
	if (keyWentDown("x")) {
		if (!character.isJumping) {
			character.velocity.y -= JUMP_SPEED;
			character.isJumping = true;
		}
		
	}
```

Here we make the character jump by detecting when the player presses the `"x"` key with the `keyWentDown()` event listener.  If the character is not jumping, represented by `!character.isJumping` where the `!` indicates the opposite of the `boolean` value, than we apply `JUMP_SPEED` to the `character.velocity.y` in the negative or up direction.  We also set the `character.isJumping = true` so that we know the character is the in the air and prevent more jumping.
	
```
    
    drawSprites();
}

function constantMovement() {
    if (keyDown(RIGHT_ARROW)) {
        character.position.x += SPEED;
    }
    if (keyDown(LEFT_ARROW)) {
        character.position.x -= SPEED;
    }
}

```

Nothing new down here ;)


<!-- 
 run down
 
- creating a simple platform
- detecting a collision
- the oppsite of true
- jump velocity
- jumping states

- random shrubs
- random clouds
- random()

 -->