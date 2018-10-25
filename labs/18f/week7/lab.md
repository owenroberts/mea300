---
layout: notes
title:  Lab notes
week: 7
---

This week we added audio using the [jfxr](https://jfxr.frozenfractal.com/) app.  Adding sound requires creating the sound files, downloading them and adding them to the project folder, then loading the files in *assets.js* and playing the sounds at the right points in *scenes.js* and *game.js*.  I'll review each part here.

## assets.js

### global vars

```
// sounds
var deathSound, startSound;
```

In the sounds section at the top of *assets.js* we created two variables for the single sound effects, the death sound plays the same sound whenever the character dies, and the game starting sound is always the same.

```
// platform
var platformHits = [
    "sfx/platform-hits/hit-0.wav",
    "sfx/platform-hits/hit-2.wav"
]; // array 
var platformHitSounds = []; // empty 

// jump
var jumps = [
    "sfx/jumps/jump-0.wav",
    "sfx/jumps/jump-1.wav",
    "sfx/jumps/jump-2.wav",
    "sfx/jumps/jump-3.wav",
]; // array 
var jumpSounds = []; // empty 
```

After that we have two arrays for the platform hit and jump sounds.  An array is a data format in JavaScript that holds a list of values.  For the array of sounds we actually need two arrays, one to hold the sound file paths, and an empty array to add our sounds onto once they get loaded.

### preload

```
// load sounds 
deathSound = loadSound("sfx/death.wav");
startSound = loadSound("sfx/start.wav");
```

Loading one sound is easy.  The sound variable get assigned the result of the `loadSound` function which takes the argument path to the sound.  I created a `sfx` (sound effects) folder for all the sounds.

```
// platform hits 
for (var i = 0; i < platformHits.length; i++) {
    var s = loadSound(platformHits[i]);
    platformHitSounds.push(s);
}

// jump sounds 
for (var i = 0; i < jumps.length; i++) {
    var s = loadSound(jumps[i]);
    jumpSounds.push(s);
}
```

Loading a list of sounds is a little trickier.  We need a loop to go through the array.  Each loop uses the variable `i` to count each item in the array list.  Each item then gets loaded into a variable `s` which is then added to the array of sounds with the `push` method, which just adds a value to the end of an array.

## scenes.js

There are two moments in *scenes.js* where we need to play a sound: when the player dies and when the game starts.

### died

```
// play death sound
deathSound.play();
```

In the `died()` function we play the `deathSound` using the `.play()` method.  This just plays the sound once when the player dies.

### keyPressed

```
function keyPressed() {
    // enter key
    if (keyCode == 13) {
        if (scene == "intro" || scene == "restart") {
            build();
            // play sound to start game
            startSound.play();
            scene = "game";
        }
    }
}
```

If the player hits the enter key in the `intro` or `restart` scene, the start game sound should play: `startSound.play();`.


## game.js

In the `game()` function there are a few points where the player interacts with objects in the game that should trigger a sound.

### game

```
// loop through all platforms
player.isGrounded = false;
for (var i = 0; i < platforms.length; i++) {
    var platform = platforms[i];
    if (player.collide(platform)) {
        
        // play platform collision sound
        if (player.isJumping) {
            random(platformHitSounds).play();
        }
```

The first part is when a player lands on the platform.  To make sure the player is landing and not just standing, we can check if the `player.isJumping` is true first and then play the sounds.  Since we have an array of platform hit sounds, we can play a random sound using the `random` function with the `platformHitSounds` as the parameter and then `.play()`.

```
if (keyDown("space") && !player.isJumping) {
    // play jump sound
    random(jumpSounds).play();
    player.changeAnimation("jump");
    player.velocity.y -= jump_speed;
    player.isJumping = true;
}
```

We also want to play a sound when the player jumps.  This is also an array so it uses the same pattern.