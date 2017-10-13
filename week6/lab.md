---
layout: page
title: MEA 300
week: 6
dek: Lab Notes
---

This week we added the camera and scenes.

## global variables 

```
var clouds, walls, enemies, health, stuff;
```

We added a `stuff` variables to make a group for anything that isn't in one.  We need this because we will be rendering different groups of sprites at different times now.

```
/*
0 intro screen
1 instructions
2 game
3 ending
*/
var gameState = 0;
```

The variable `gameState` keeps track of what scene the game is in.  The comment before `gameState` indicates which number matches which scene.  We'll use this later to direct the program to different scenes.

## setup

```
	stuff = new Group();
	...
	stuff.add(character);
```

Add the `character` to the `stuff` group.

```
	platform = createSprite(0, height - 10, width * 2, 20);
	stuff.add(platform);
```

We changed the `platform` so it could be wrapped around the canvas as the `character` progresses across the screen.  It used to be `createSprite(width/2, height - 10, width, 20)` but once we started using camera this stops working.

Also add the `platform` to `stuff`.  The `platform` and `character` are the only single sprites in the game that aren't part of other groups.

## draw, scenes

```
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
```

The `draw` function looks a lot different.  Previously the whole game scene was written in draw, but now we have a few different scenes, so `draw` is just reading the `gameState` and then calling a function for each different scene in the game.

## intro

```
function intro() {
	camera.off();
	background(0);
	fill(255);
	textSize(24);
	textAlign(CENTER);
	text("my first game", width/2, height/2);
	text("by owen", width/2, height/2 + 24);
	text("press enter to start", width/2, height/2 + 48);
	if (keyWentDown("ENTER")) {
		gameState = 1;
	}
}
```

The first scene in the game is the `intro`.  Start with `camera.off()` because we don't want the scene moving with the camera.  The rest is some text with the title of the game, and instructions how to start.  The `if (keyWentDown("ENTER"))` detects when the user presses the enter key to advance to the next scene.

## instructions

```
function intructions() {
	camera.off();
	background(100);
	fill(255);
	textSize(24);
	textAlign(CENTER);
	text("arrow right to move", width/2, height/2);
	text("x to jump", width/2, height/2 + 24);
	text("press enter to start", width/2, height/2 + 48);
	if (keyWentDown("ENTER")) {
		gameState = 2;
	}
}
```

The `instructions` function is almost exactly the same as `intro` with some different text explaining the controls for the game.  This could probably actually be the same function with different arguments, but everyone may have different things they want to do here.

## end

```
function end() {
	camera.off();
	background(100);
	fill(255);
	textSize(24);
	textAlign(CENTER);
	text("you died", width/2, height/2);
	text("press enter to try again", width/2, height/2 + 48);
	if (keyWentDown("ENTER")) {
		gameState = 1;
		character.lives = 3;
	}
}
```

The `end` function is the last scene for when the character dies.  I put it here after `instructions` because again its basically the same as `intro` and `instructions`.  There are other things that could be done here to make the ending more interesting.

## game

```
function game() {
	camera.on();
```

Our `game` function is basically the old `draw` function renamed.  It's what is run most of the timer the user is playing.  We start this function by turning the camera on with `camera.on()`.  The camera let's us move across the canvas instead of staying in the beginning area.

```
	character.position.x += SPEED;
```

We got rid of the `constantMovement` controls for the character to make the game into a true endless runner.  There are other options here but this is a very simple one.

## enemies, health

```
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
```

There a couple of changes to the enemy loop.  We're no longer removing enemies when the player collides with them but resetting them to further along in the game: `enemy.position.x += random(width * 2, width * 6);`.  This means that they will reappear later.

If the enemy goes off the left side of the screen without hitting the player, we need to bring it back using our new `wrap` function which is defined later.

```
	for (let i = 0; i < health.length; i++) {
		const life = health[i];
		if (character.overlap(life)) {
			character.lives ++;
			// life.remove(); 
			life.position.x += random(width * 2, width * 6);
		} else {
			wrap(life, random(width * 2, width * 6));
		}
	}
```

Same updates for the health/life rewards.

## platform, walls

```
	wrap(platform, width);
```

We're also wrapping the `platform` so that it will appear to continue forever.  We're basically just moving the `platform` forward in the scene whenever the player goes past a certain point.  Because we also have to do this with so many other objects in the scene, we created a wrap platform that takes an object and the distance that we want to move it forward to repeat the action.  The `platform` has a static value, `width` because it needs to be consistent.  The other objects, `enemies`, `life` and `walls` have randomized values so they move unpredictably.

```
	for (let i = 0; i < walls.length; i++) {
		const wall = walls[i];
		wrap(wall, random(width*2, width*4));
	}
```

We also need to wrap the walls.

## camera

```
	camera.position.x = character.position.x;
```

After calculating all of the physics in the game, we know where the character is going to be, so before we draw everything, we move the camera to the position of the character so that the scene follows the character movement.

```
	drawSprites(stuff);
	drawSprites(walls);
	drawSprites(enemies);
	drawSprites(health);
```

With the camera still on, we draw everything in the scene that should move as the character moves.  This is anything the character will interact with (usually).

```
	camera.off();
	drawSprites(clouds);
	fill(0);
	textAlign(LEFT);
	textSize(12);
	text("Lives: " + character.lives, 10, 20);
```

Then we turn the camera off to draw things like the `clouds` which don't interact with the character and the UI (User Interface) which should stay static the whole time.

## death

```
	/* detect game ending */
	if (character.lives <= 0) {
		gameState = 3;
		character.velocity.y = 0;
	}
```

After all this, we need to make sure the character is still alive before drawing the next frame.  WE can check the number in `character.lives`.  If it's `0` or less, it's time to start over.  Set the `gameState` to `3`, the `end` scene, and turn off the `character.velocity` on the `y` axis so he doesn't float into the sky or sink into the ground while we're not watching.

In the `end` scene, when the user hits `ENTER` the game will go back to the beginning and the `character.lives` is set back to `3`.

## wrap function

```
function wrap(obj, reset) {
	if (character.position.x - obj.position.x >= width/2) {
		obj.position.x += reset;
	}
}
```

We added this new `wrap` function to reset objects in the scene as the character passes them by.  It takes an argument for the `obj`, so it can work with any sprite, then determines if the character has passed the sprite for long enough that it's off screen (in this case `width/2`) and then resets it's x position to whatever value is in the `reset` argument.  You might want to also change the y value, so you could update this function for your own game.