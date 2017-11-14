---
layout: notes
title: MEA 300
week: 11
dek: Lab Notes
---

Since we didn't finish the emergent game version in class I'm going to go over some of the differences here.  I copied the progressive game version in order to use the `reset` function and some other stuff we added there, but changed the way the game updates.

## global

```
var enemySpeedMin = SPEED/5, enemySpeedMax = SPEED;
```

I changed these values to `variables` instead of `constants` because changing the enemy speed will make things more challenging.

```
var progress = 1;
```

Instead of a `currentLevel` the emergent game uses `progress` which will update as the character gets farther in the game.  `levelData` stays the same because we still need references to make the game more difficult.

## buildLevel

```
function buildLevel() {
	for (let i = 0; i < NUM_WALLS; i++) {
		const wall = createSprite(
			i * width*2/NUM_WALLS,
			random(height * 7 / 8, height/2),
			200,
			40
		);
		wall.debug = true;
		walls.add(wall);
	}
	
	for (let i = 0; i < NUM_ENEMIES; i++) {
		spawnEnemy();
	}
	
	for (let i = 0; i < NUM_HEALTH; i++) {
		const life = createSprite(
			random(0, width),
			random(height / 2, height),
			30,
			20
		);
		health.add(life);
	}
	
}
```

The `buildLevel` function is mostly the same except for the `spawnEnemy` function which will be used later in the game to spawn more enemies as the game progresses.

## draw

```
function draw() {
	if (gameState == 0) {
		intro();
	} else if (gameState == 1) {
		intructions();
	} else if (gameState == 2) {
		game();
	} else if (gameState == 3) {
		dead();
	}
}
```

`draw` is mostly the same except there's no `nextLevel` function necessary here.

## game

```
/* detect game ending */
	if (character.lives <= 0 || character.position.y - character.height > height) {
		gameState = 3;
	}
	
	/* follow progress */
	if (character.position.x > width * 2 * progress) {
		progress++;
		console.log("Next level");
		enemySpeedMin++;
		enemySpeedMax++;
		spawnEnemy();
		if (walls.length >0)
			walls.remove(walls[walls.length-1]);
		if (health.length > 0) 
			health.remove(health[health.length-1]);
	}
```

The biggest change to the game code happens at the end of the function after the game ending code.  To follow the progress we compare the `character.position.x` to the next progress milestone by multiplying the `progress` value by `width` and whatever factor you want to use to determine the length of one "level".  In this case I'm using `width * 2 * progress` meaning the character has to travel the length of two canvases to progress another level.  

Once the character passes that point, progress is increased by one, `progress++` so the character will be behind the new milestone.

Each time the character passes a milestone a few things are changed to make the game more challenging.  This could differ game to game.  For my demo, the `spawnEnemy` function adds one new enemy to the game.  I'm also increasing the speed of new enemies with `enemySpeedMin++` and `enemySpeedMax++` meaning new enemies will be faster but old enemies will stay the same.  To reset all the enemies you would need to access already existing `enemy` group.  I also remove a `wall` from the `walls` group until they are all gone, and a `life` from the `health` group.

## spawnEnemy

```
function spawnEnemy() {
	const sz = random(30, 50);
	const enemy = createSprite(
		character.position.x + random(width * 2, width * 4),
		random(height * 3 / 4, height * 7 / 8),
		sz,
		sz
	);
	enemy.velocity.x = -random(enemySpeedMin, enemySpeedMax);
	enemies.add(enemy);
}
```

I actually didn't change this code much from the version that was in `buildLevel`, I just moved it into its own function so that it could be called in `buildLevel` and later in the game.

Once change was I made the enemy spawn in relationship to the position of the character, because we've moved much farther in the level, so the `x` value in `createSprite` is `character.position.x + random(width*2, width*4)`.  Although this might not be necessary because of the `wrap` function already dealing with enemies out of position.