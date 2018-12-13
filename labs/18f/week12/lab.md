---
layout: notes
title:  Lab notes
week: 12
---

This week we learned how to use [Audiotool](https://www.audiotool.com/){:target="blank"} to create background music. We also covered getting free licensed music from [Free Music Archive](http://freemusicarchive.org/){:target="blank"} and [Wikimedia](https://commons.wikimedia.org/wiki/Category:Audio_files_of_music){:target="blank"} to use as background music.

Here's the code we used to create background music for the intro scene as well as the game scene.

## assets.js

Of course, we need to start in assets, where we will load the external media files.

```
// background music
var bgMusic;
var bgGame;
```

The `bgMusic` variable is for the intro scene music.  (Probably should have called it introMusic).  The `bgGame` is for the main game scene.

### preload()

```
// loading music files
bgMusic = loadSound("music/chopin.mp3");
bgGame = loadSound("music/bg.mp3");
```

In the `preload` function we load the files.  I used a Chopin piano piece from FMA for the intro music and a piece I crated in Audiotool for the game music.

## setup.js

Now that we have loaded the music files we can play the music.  First we have to identify the right places.

###  setup() 

```
// start background music
bgMusic.play();
```

In `setup` I want to start playing the intro background music.  This is as soon as I will be able to start an audio file.

```
bgGame.setLoop(true);
bgGame.playMode('restart');
```

I also set a couple of things for the game background music.  I want that track to loop because it's not very long.  `setLoop(true)` makes the audio file loop.

I also change the play mode to `'restart'`.  By default, the play mode is `'sustain'` which means if I play the track more than once it will play multiple instances of the sound on top of itself.  Since the player dies often, the sound will have to start over a lot, so I want to make it start again from the beginning.

## scenes.js

I need to add some lines here to manage when each background track is playing.  If you only have one background music track, you may not need to do anything here.

### died()

```
// play intro background music
bgMusic.play();

// stop game music
bgGame.stop();
```

If the player dies, I need to stop the game music and restart the background music from the intro.  It should start again where it left off.  Now that I think about it, if the player plays for a _long_ time I might need to set `bgMusic.setLoop(true);` as well.

### keyPressed()

```
function keyPressed() {
    if (keyCode == 13) {  // enter key
        if (scene == "intro" || scene == "restart") {
            build();
           
            // pause start scene background music
            bgMusic.pause();
            // start game music
            bgGame.play();
            // play sound to start game
            startSound.play();
            scene = "game";
        }
    }
}
```

The last little bit here is when the player started the game.  I need to pause the intro music,  and start the game music.  This is when the player hits enter in either the `intro` or `restart` scene.

That's it!  