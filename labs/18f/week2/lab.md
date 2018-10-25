---
layout: notes
title: Lab Notes
week: 2
---

This week we added a main character into the game and gave it some controls with the keyboard.  We covered a bunch of new topics including variables/data storage, object methods, defined functions, logic and events.  Here I'll walk through the code we wrote and talk more in depth about some of these concepts.

## variables

```
/* global variable */
var player;
var player_speed = 10;
```

The first line is a `comment`, which as we discussed is actually not part of the program.  It's a message that the computer ignore but is useful to remind ourselves what the code is doing or for other developers to read.  There's two ways to make comments in JavaScript:

```
// Double forward slash for a single line comment
/*
    slash-asterisk
    asterisk-slash
    for multi line
*/
```

Next is a variable declaration for the main character.  The `character` needs to be available to both the `setup` and `draw` functions, as well as other functions in our program, so it needs to be in the global scope (this is what the comment is telling us).  Global variables usually go at the top of a program.  We use `var`, short for *variable*, for a variable that will be assigned later or modified.

Then we created a speed value for our character using the `const` declaration.  `const` means that the value isn't going to change.  Right now our character can only move at one speed, but if we were to change the speed by making the character slower or faster, we would have to change this to `var` or `let`.  (Side note: technically, we should be using `let` instead of `var` here, but I'm still getting used to it...)

## preload & loading images/animation

```
var idle_sheet, idle_animation;
var run_sheet, run_animation;
var jump_sheet, jump_animation;

function preload() {
    idle_sheet = loadSpriteSheet("sprites/main_character/main_character_idle.png", 128, 128, 16);
    idle_animation = loadAnimation(idle_sheet);
    
    run_sheet = loadSpriteSheet("sprites/main_character/main_character_running.png", 128, 128, 6);
    run_animation = loadAnimation(run_sheet);
    
    jump_sheet = loadSpriteSheet("sprites/main_character/main_character_jumping.png", 128, 128, 30);
    jump_animation = loadAnimation(jump_sheet);
}
```

To add the character animations, we need to create global variables to load the sprite sheets and then create animations out of them, which get assigned to the character in `setup`.  The `preload` function is used to load external assets before using them in the game.

The `loadSpriteSheet` function needs the location of the sprite sheet image, then the width and height of one sprite (128 x 128) and the number of frames: 16 for the idle animation, 6 for walking and 30 for jumping.


```
function setup() {
    createCanvas(640, 360);
    
    // set up player/character
    player = createSprite(320, 180);
    player.addAnimation('idle', idle_animation);
    player.addAnimation('run', run_animation);
    player.addAnimation('jump', jump_animation);
}
```

Notice that `createSprite` is being assigned to the `player` variable.  We initialized the character globally and then assigned it a sprite in `setup`.  The sprite is created at x: 320, y: 180.  


`setup` also adds the animations using the `addAnimation` method with a label and the variable for each animation.


## draw & events

```
function draw() {
    background("white");
```

`background("white");` is new and it's relatively obvious how it works.  It paints the background of the `canvas` white.  `background` is a `p5` function that can take HTML color values, HTML hex values, or numerical values, 0-255 for grayscale, and 3 arguments for RGB.  Check out the [background](https://p5js.org/reference/#/p5/background) documentation here.


```
    // jump event
    if (keyDown('space')) {
        player.changeAnimation('jump');
        player.position.y -= player_speed;
    } else if (keyDown('right')) {
        player.changeAnimation('run');
        player.position.x += player_speed;
    } else if (keyDown('left')) {
        player.changeAnimation('run');
        player.position.x -= player_speed;
    } else {
        player.changeAnimation('idle');   
    }
```

Here's an `if` statement!  This was our first look at logic.  An `if` statement is used to execute a block of code if a condition is met, or a different block of code if it's not.  In this case the condition is whether the user is pressing a key (any key at all, we'll get more specific later).  If that condition is true, then we change the character visual state to be running.  If it's not we make the character visual state idle.

`keyDown` is a `p5` function.  It is `true` if the user is holding down a key that matches the argument inside the `keyDown` function and `false` if the user is not holding a key.  This is a `boolean` value.  Boolean values are always either `true` or `false` and allow the developer to make decisions about how the program should behave based on user input and other conditions.


`character.position.x` is an expression of the x position of the character sprite in JavaScript object notation.  The `character` has a bunch of properties and methods because it is an object.  One property is `position`, which itself is an object known as a `vector`.  The `position` has two properties, `x` and `y`, that are number values.


The `+=` and `-=` operators are also new.  This is short hand for `x = x + speed`, or adding a value to the existing value of a number.  This is something that happens a lot in programming, so they created a shortcut for it.

```   
    drawSprites();
}
```

The end of our program is the same as last week, we use the `drawSprites` function to draw all of the sprites in the game.
