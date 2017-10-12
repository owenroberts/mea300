---
layout: page
title: MEA 300
week: 5
dek: Lab Notes
---

Our program is getting pretty long so I'm only going to go over new stuff this week instead of recapping everything.

## global variables

```
var clouds, walls, enemies, health;
```

We added some basic groups for the clouds, walls, enemies and health.  The groups will let us keep track of all the sprites and later we'll use it to draw groups separately.

```
const NUM_BUSHES = 8, NUM_CLOUDS = 5, NUM_WALLS = 3, NUM_ENEMIES = 3, NUM_HEALTH = 1;
```

## setup, character lives

```
	character.lives = 3;
```

We added a new property to the character, `lives`, which will let us keep track of how many lives the character has.

## sprites

We also moved all of our NUM_ variables into the same line at the top of the program.  This will make editing/tweaking the game easier later and is better organization.

```
	clouds = new Group();
	for (let i = 0; i < NUM_CLOUDS; i++) {
		const cloud = createSprite(
			random(width, width * 2),
			random(0, height/2),
			random(50,100),
			random(20,40)
		);
		cloud.velocity.x = -random(5, 10);
		clouds.add(cloud);
	}
```

The clouds are basically the same, except we initialized our `clouds` group and then added each `cloud` to the group in our for loop.


```
	walls = new Group();
	for (let i = 0; i < NUM_WALLS; i++) {
		const wall = createSprite(
			random(32, width), 
			height * 7/8, 
			40, 
			height/4
		);
		walls.add(wall);
	}

	enemies = new Group();
	for (let i = 0; i < NUM_ENEMIES; i++) {
		const sz = random(30,50);
		const enemy = createSprite(
			random(width * 2, width * 4),
			random(height * 3/4, height * 7/8),
			sz,
			sz
		);
		enemy.velocity.x = -random(1, 5);
		enemies.add(enemy);
	}
	
	health = new Group();
	for (let i = 0; i < NUM_HEALTH; i++) {
		const life = createSprite(
			random(0, width),
			random(height/2, height),
			30,
			20
		);
		health.add(life);
	}
```

We then added walls, enemies and health pickups with basically the same code, just tweaking where they appear in the screen.  using `createSprite(x,y,w,h)` we randomized certain values and kept other uniform.  For walls, `x` was `random(32, width)`, meaning they could appear anywhere from the left side, after where the character is set to the right side of the canvas.  The `y` is `height * 7/8` so they are all the same height and take up the bottom 1/8 of the canvas.  We used similar arguments for the other sprites to make them appear in different parts of the screen.

## draw, wall collision

```
	if (character.collide(platform) || character.collide(walls)) {
		character.velocity.y = 0;
		if (character.isJumping) {
			character.isJumping = false;
		}
		
	} else {
		character.velocity.y += GRAVITY;
	}
```

We added `character.collide(walls)` as an `||` or `OR` condition to the conditional for the character colliding with the platform, so if the character collides with a wall he will also stop applying gravity.  This needs to be adjusted a bit but it's okay for now.

## enemy collision

```
	for (let i = 0; i < enemies.length; i++) {
		const enemy = enemies[i];
		if (character.overlap(enemy)) {
			character.lives--;
			enemy.remove();
		}
	}
```

Here we're checking for the character colliding with enemies, one enemy at a time.  This `for loop` looks the same as the one that we used to create enemies in `setup`.  In this case instead of `collide` we want to detect if the character is overlapping with an enemy using `overlap`.  If `true` we remove the enemy and take a life away from the player.  We'll update this later to move the enemy back into play.


## health collision

```
	for (let i = 0; i < health.length; i++) {
		const life = health[i];
		if (character.overlap(life)) {
			character.lives ++;
			life.remove(); 
		}
	}
```

The health collision is basically the same as enemy, except instead of removing a life we add one.

## ui

```
	drawSprites();
	
	/* ui */
	text("Lives: " + character.lives, 10, 20);
```

In the last bit, we added a `p5` `text` function to display the number of lives the character has left.  This happens after `drawSprites`, so the changing position of the `camera` which we will add next week doesn't effect the UI.  This is also a good way to organize the UI in it's own area.