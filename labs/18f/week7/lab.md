---
layout: notes
title: MEA 300
week: 7
dek: Lab Notes
---

## Brackets setup

This week we discussed the [Beautify](https://github.com/brackets-beautify/brackets-beautify) plugin for brackets and reviewed general code formatting practices.  We also discussed getting rid of the annoying JSLint code error reporting by changing the *Brackets > Preferences* file.  Here's what mine looks like, to copy and paste, I basically just removed the linting setting and turned on `linting.collapsed`:

```
{
    "fonts.fontSize": "12px",
    "fonts.fontFamily": "'SourceCodePro-Medium', ＭＳ ゴシック, 'MS Gothic', monospace",
    "useTabChar": true,
    "linting.collapsed": true
}
```

## jfxr

We reviewed making and downloading sounds with [jfxr](https://jfxr.frozenfractal.com/).

## p5.sound.js

We then downloaded the [p5.sound.js](https://raw.githubusercontent.com/processing/p5.js-sound/master/lib/p5.sound.js) library and added it to the game folder.  In order to play sounds in `p5` we use this library.  We also attached it to the `index.html` file:

```
	<h1>My First Game</h1>
	<p>by Owen Roberts</p>
	
	<script src="p5.min.js"></script>
	<script src="p5.play.js"></script>
	<script src="p5.sound.js"></script>
	<script src="game.js"></script>
```

## global variables

```
const enemySpeedMin = SPEED/5, enemySpeedMax = SPEED;
const cloudSpeedMin = SPEED/2, cloudSpeedMax = SPEED;
```

During the lab we began the process of moving all of the hardcoded variables from within the `setup` and other functions to global variables at the beginning of the game program file.  This make it easier to tweak your game because all of the values are in the same place.  We also talked about making the values relative to one another to make it easier to make holistic changes.

```
const cloud_files = [
	"assets/cloud/cloud0.png", 
	"assets/cloud/cloud1.png", 
	"assets/cloud/cloud2.png", 
	"assets/cloud/cloud3.png"
];
```

I added an array of new cloud image files to demonstrate loading a random image for each cloud.

```
var jump_sfx = [];
const jump_files = [
	"assets/sfx/character/jump0.wav", "assets/sfx/character/jump1.wav", "assets/sfx/character/jump2.wav", "assets/sfx/character/jump3.wav"
];

var hit_sfx = [];
const hit_files = [
	"assets/sfx/character/hit0.wav", "assets/sfx/character/hit1.wav", "assets/sfx/character/hit2.wav"
];
```

We also have some arrays for sound fx files and arrays to hold the sound files once they get loaded.

## preload

```
function preload() {
	for (let i = 0; i < jump_files.length; i++) {
		const jump_sound = loadSound(jump_files[i]);
		jump_sfx.push(jump_sound);
	}
	
	for (let i = 0; i < hit_files.length; i++) {
		const hit_sound = loadSound(hit_files[i]);
		hit_sfx.push(hit_sound);
	}
}
```

Using the `preload` function we looped over the sound fx files and loaded them into arrays of sound files.


## setup

```
	clouds = new Group();
	for (let i = 0; i < NUM_CLOUDS; i++) {
		const cloud = createSprite(
			random(width, width * 2),
			random(0, height / 2),
			random(50, 100),
			random(20, 40)
		);
		const cloud_img = loadImage(cloud_files[floor(random(0, cloud_files.length))]);
		cloud.addImage(cloud_img);
		cloud.velocity.x = -random(cloudSpeedMin, cloudSpeedMax);
		clouds.add(cloud);
	}
```

We updated the code in the cloud setup to add random images using the `cloud_files` array and the functions `random` to choose a random index number for the array and `floor` to round that index down to a whole number.

## game

```
	if (character.collide(platform) || character.collide(walls)) {
		character.velocity.y = 0;
		if (character.isJumping) {
			character.isJumping = false;
			hit_sfx[floor(random(0, hit_sfx.length))].play();
		}
	}
```

We added and sound effect for when the character hits the ground or wall after jumping.  We already have a conditional for when the character collides either platform or walls, and we just added a line to play a random sound effect, using the same method used to choose a random image for the clouds.

```
	if (keyWentDown("x")) {
		if (!character.isJumping) {
			character.velocity.y -= JUMP_SPEED;
			character.isJumping = true;
			jump_sfx[floor(random(0, jump_sfx.length))].play();
		}
	}
```

We also added a line where the character is jumping to play a random jump sound effect.