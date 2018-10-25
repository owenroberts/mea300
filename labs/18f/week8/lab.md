---
layout: notes
title:  Lab notes
week: 8
---

This week we just added a health reward, so each time the player gets hit by an arrow, the game will spawn a health reward that they can pick up to restore 1 health/life.

What interesting here is that now when we add a single component there's a bit of code that we need to add across all of the game files, a slice of the whole game, so we can see how each part of the game fits into the whole of the project.

## settings.js

```
// rewards
var heartXMin = gameWidth;
var heartXMax = gameWidth * 3;
var heartYMin = 150;
var heartYMax = 250;
var heartSpeed = speed;
```

In *settings.js* we need some basic settings to determine where the heart rewards will appear and how they move.  The `XMin`, `XMax`, `YMin` and `YMax` values create ranges that determine where the heart will appear in the game when it is spawned.

The speed is set to regular game speed.  This might be changed so it should be it's own setting.

## assets.js

Each component of the game is going to have a graphic, either sprite sheet animation or image, and a sound.  We need to load those external files in *assets.js*.

```
// rewards
var hearts; // group
var heart_sheet, heart_animation;
```

There's also a global variable for the group.  I'm realizing now this isn't exactly the right place for this, but that's okay.

### preload()

```
// load sounds 
deathSound = loadSound("sfx/death.wav");
startSound = loadSound("sfx/start.wav");
heartSound = loadSound("sfx/heart.wav");
```

There's just one sound for the heart, so it's just one extra line of code.

## setup.js

### setup()

```
hearts = new Group();
```

I just need to declare `hearts` as a `new Group()` here to use later.  I'm not going to add any hearts in `build()` like I do with the platforms, scenery and obstacles, because they only get added after the game has started, if the character gets hit.


## scenes.js


### died()

```
while (hearts.length > 0) {
    hearts[0].remove();
}
```

There may not be hearts in the game when the player dies, but if there are we need to remove them, so we need to add one of these `while` loops into the `died()` function to remove any hearts still there before restarting the game.


## game.js

In `game()` we need to find the point where the player is hit by an arrow.  When that happens, we can spawn a new heart.

### game()

```
// arrows hit player
arrows.overlap(player, function (arrow) {
    // arrow sound
    arrow.position.x = random(width, width * 3);
    player.livesLeft--;
    if (player.livesLeft == 0) {
        died();
    }
    
    // spawn a heart
    var x = random(heartXMin, heartXMax); 
    var y = random(heartYMin, heartYMax);
    var heart = createSprite(x, y);
    heart.addAnimation('default', heart_animation);
    heart.velocity.x = -heartSpeed;
    hearts.add(heart);
});
```
The spawn code looks similar to the code we used to spawn the player, platforms, scenery and obstacles in the `setup()` and `build()` functions.  There's no loop because it's just one heart.  The `x` and `y` values are randomized using the range for each, and the `heart_animation` is added.  The `velocity` is set and then we add the new heart to the `hearts` group so we can update them.

Next we have to add code for when the player gets a heart.

```
// player hits heart
hearts.overlap(player, function(heart) {
    heart.remove();
    player.livesLeft++;
    heartSound.play();
});
```

This is similar to the code for the arrow hitting a player, but with a different outcome.

It a heart from the heart group overlaps with a player, we just remove the heart, add a life to `player.livesLeft` and play the heart reward sound.

We don't reset the position of the heart like we do with arrows because the player only gets one heart added per hit by an arrow.

Finally we need to remove any heart the player misses once it goes off the canvas to the left.  We could replace it in the game, but this would make things too easy for the player.  The player only gets one chance to get the heart.

```
// remove un gathered hearts
for (var i = 0; i < hearts.length; i++) {
    if (hearts[i].position.x < -50) {
        hearts[i].remove();
    }
}
```

## itch.io

This week we also looked at uploading the game to the indie game service [itch.io](https://itch.io/).  To add your game, go to itch and create a profile.  Then click the "Create new project" link on the Dashboard.

You will need to fill in some basic information for the game.

Most of them are pretty straight forward.  Here are some to look out for:

*Payments* - Choose "No Payments".  For now, we don't want to bother with adding any financial info into the account.

*Kind of Project* - Choose HTML.

*Uploads* - Your project needs to be a `.zip` file.  You can compress your game into a `.zip` file by right-clicking on the main game folder and choosing "Compress folder".  You can also go to File > Compress.  The folder you compress needs to have *index.html* in the main folder.

*Embed Options* - For now, use "Click to launch in fullscreen".  This will simplify things a bit.

All the other options are up to you.

Finally, click "Save & view page".  You have to do this at least once before publishing the game.  Once you do that you can return and choose "Public" in *Visibility & access*.  You need to do that in order to make the link visible to me and the rest of the class.  Once you do that you can submit the itch.io URL for the midterm.



