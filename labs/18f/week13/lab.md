---
layout: notes
title:  Lab notes
week: 13
---

In this lab I added a new reward for the character to offset the challenges added in the previous progression lab.  Since my game involves a lot of jumping, I added an anti gravity cloud, which lets the character float around after it's collected.

In actual gameplay, this reward didn't actually help too much.  It actually basically guarantees death.  That's okay!  It was partly just an experiment.  The same code could be used to effectively give the character a higher jump, a period of invincibility or other rewards.

Since the anti-gravity cloud is implemented across all phases of the game, I have to update a bunch of stuff in almost every file.

## settings.js

I had a bunch of new variables to add in settings to determine where the anti-gravity cloud is spawned and how long the power up lasts.

```
// anti gravity cloud
var antiXMin = gameWidth;
var antiXMax = gameWidth * 2;
var antiYMin = 50;
var antiYMax = 150;
var antiSpeed = speed / 2;
var antiCounter = 0;
var antiDuration = 90;
```

`antiXMin` and `antiXMax` determine the range for where the anti gravity cloud is spawned on the x axis.  Likewise, `antiYMin` and `antiYMax` determine the range for the y axis.

`antiSpeed` is the speed the anti gravity cloud moves toward the player.

`antiCounter` and `antiDuration` are used to set the amount of time the player gets the anti gravity power up.  `antiDuration` is how long it will last in terms of number of frames.  The `antiCounter` is used to count down the frames after the player gets the power up.

## assets.js

I created an animation for the anti-gravity cloud, as well as a sound to play when the user gets to the cloud.  There is also a new player animation to use when the player is floating without the normal gravity.

```
// player animations
var idle_sheet, idle_animation;
var run_sheet, run_animation;
var jump_sheet, jump_animation;
var float_sheet, float_animation; // new float animation

// rewards

var antiClouds; // group
var anti_sheet, anti_animation;

// sounds
var deathSound, startSound;
var heartSound, antiSound;
```

I start with an `antiClouds` group for the anti-gravity cloud sprites, and the `anti_sheet` and `anti_animation` for the graphics.  Then I added `antiSound` for the sound.  Not the best names, but I was just making this up at the time.

### preload()

```
// player animation
float_sheet = loadSpriteSheet("sprites/main_character/main_character_anti_gravity.png", 128, 128, 5);
float_animation = loadAnimation(float_sheet);
float_animation.frameDelay = 10;
```

The `float_animation` has a new parameter, `frameDelay`, which slows the animation down.  This makes sense with the floating.

```
anti_sheet = loadSpriteSheet("sprites/rewards/anti_gravity.png", 32, 32, 8);
anti_animation = loadAnimation(anti_sheet);

antiSound = loadSound("sfx/anti-gravity.wav");
```

This was mostly copy and paste from previous assets and updating names.  Just loading the sound file and the sprite sheet.

## setup.js

Here I just need to initialize the group.  My anti-gravity clouds are going to be spawned in game, so I don't need to build them in the `build` function.

### setup()

```
// declare groups
antiClouds = new Group();
```

## scenes.js

Okay, something I realized while reading documentation: I thought we had to use these `while` loops to clear all the sprites because `group.clear()` removes the sprites from group but they still exist on their own.  I realized there's a different method, `group.removeSprites()` which does that.  Oops! Good reminder to read documentation.

### died()

Now instead of this:

```
// destroy other sprites
while (platforms.length > 0) {
	platforms[0].remove();
}
```

We can just do this:

```
platforms.removeSprites();
```

All of the groups together:

```
// destroy other sprites
platforms.removeSprites();    
clouds.removeSprites();    
trees.removeSprites();    
arrows.removeSprites();    
hearts.removeSprites();
antiClouds.removeSprites();  
```

## game.js

Now we need to add the new logic for the anti gravity cloud.  Depending on what your powerup does you may not need some of the code but the counter should be useful in all cases.

### game()

```
antiClouds.overlap(player, function (antiCloud) {
    antiCloud.remove();
    antiSound.play();
    antiCounter = antiDuration;
});
```

This code goes right after we detect the player collision with the platforms and before the player jumping code.  If the player is not going to have gravity this is where we can deal with it.

If you're doing another type of power up it might not need to go here, but it would probably be safe.

First I remove the anti gravity cloud graphic.  I also play the sound effect for the anti-gravity cloud.  Then I use `antiCounter = antiDuration` to set the power up count down.  `antiDuration` is set to `90` so it will count down for 90 frames, 89, 88, 87, until it gets back to `0` and then the power up will "wear off".

```
if (!player.isGrounded) {
	if (antiCounter > 0) {
		player.velocity.y = 0.1;
		antiCounter--;
		player.changeAnimation("float");
	} else {
		player.velocity.y += GRAVITY;
	}
}
```

Here's where the power up is applied.  If the player is not grounded (we're assuming here because the player has to jump to get to the cloud) then it tests to see if the `antiCounter` is above zero.  This will only be the case if we hit a cloud and `antiCounter` is set to `antiDuration`.  If that is the case then we apply the power up.  If not then we apply gravity regularly.

While the counter above `0` we change the velocity to `0.1` and it's just `=` not `+=` so it won't accumulate.  This creates the visual impression of floating.  Then we subtract `1` from the `antiCounter`.  This keeps going until we count all the way down to `0`, at which point the effect won't be applied anymore.  

We also change the player animation to the new `"float"` animation.

```
if (keyDown('right')) {
	player.position.x += speed;   
}
if (keyDown('left')) {
	player.position.x -= speed;
}
```

I also added the ability to move the player left and right while they are floating.  That goes inside the `if (antiCounter > 0)` statement. 

```
/* ui */

if (antiCounter > 0) {
	text("Anti Gravity Mode", 200, 20);
	text("Right and Left arrows to move", 200, 40);
}
```

Last part, I added some UI to the bottom of the function.  In case the user doesn't notice change in gravity, this is a message to show that anti-gravity mode is activated.  It could also display the countdown or change the graphics, but this was a quick way to indicate anti-gravity mode.
