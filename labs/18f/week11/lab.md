---
layout: notes
title:  Lab notes
week: 11
---

This week we added a progress counter to the game to add more obstacles and make the game more difficult as the player advances.

## settings.js: progress variables

```
var progress = 0;
var progressTotal = 300;
```

The `progress` variable tracks the players progress.  The `progressTotal` is the default number for when a new level occurs.  When the progress gets to 300, or `progressTotal`, we make the game a little harder.

```
var level = 0;
var levelCount = 2;
```

In class we also added the `level` variable to track how many levels and then the `levelCount` to reset the levels.  This is sort of like a secondary progress tracker.


## game.js

We need to add some logic in *game.js* to change settings when the player reaches a new level.

This is added to the bottom of the file, right before `drawSprites();`.

```
progress += 1;
```

For every frame, add 1 to `progress`.

```
if (progress == progressTotal) {
	console.log('next level');
	progress = 0;
}
```

When the `progress` reaches the `progressTotal` we are at the "next level".  We can reset the `progress` back to `0` and start counting again.

We also add some code to make the game harder.  Everything else is inside this if statement.

```
platformYChange += 20;
```

One way of making the game harder is to increase the amount of vertical distance between newly added platforms.  This is still set randomly, but this increases the range to add more variance.

```
platformSpeed += 0.2;
for (var i = 0; i < platforms.length; i++) {
	platforms[i].velocity.x = -platformSpeed;
}
```

Another way the game gets harder is the platforms move faster.  We increase the `platformsSpeed` variable but we also need to loop over current platforms and update their speed.


```
level += 1;
if (level == levelCount) {
	// add an arrow

	level = 0;
}
```

This recreates the same logic as the progress, but for another level.  This means it happens every 2 times the `progress` reaches the `progressTotal` or whatever the `levelCount` variable is set to.

```
// add an arrow
var x = random(width, width * 3);
var y = random(arrowYMin, arrowYMax);
var arrow = createSprite(x, y);
arrow.setCollider("rectangle", 0, 0, 20, 10);
arrow.addAnimation("default", arrow_animation);
arrow.velocity.x = -arrowSpeed - random(0, 1);
arrows.add(arrow);
```

This is the same code to add an arrow as used in the `build()` function when the game starts.  This adds another arrow to make the game more difficult.

## scenes.js: reset

### died()

```
progress = 0;
platformYChange = 20;
platformSpeed = speed;
```

Finally, we have to reset the progress when the player dies.  In the `died()` function we set progress back to `0`, set the `platformYChange` back to its original value of `20`, (yes this should be a *settings.js* variable) and set the `platformSpeed` back to the original `speed` variable.





























