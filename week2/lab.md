---
layout: notes
title: MEA 300
week: 2
dek: Lab Notes
---

This week we added a main character into the game and gave it some controls with the keyboard.  We covered a bunch of new topics including variables/data storage, object methods, defined functions, logic and events.  Here I'll walk through the code we wrote and talk more in depth about some of these concepts.

## variables

```
/* global variable */
var character;
const speed = 5;
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

## setup & loading images/animation

```
function setup() {
    createCanvas(640, 360);
    character = createSprite(20, 20, 32, 32);
```

We've seen all of this before, but notice that `createSprite` is being assigned to the character variable.  We initialized the character globally and then assigned it a sprite in `setup`.  The sprite is created at x: 20, y: 20, width: 32, height:32.  This is because the art we made was 32x32 pixels.

```
	const idle_img = loadImage("assets/idle.png");
	character.addImage("idle", idle_img);
	const run_img = loadImage("assets/run.png");
	character.addImage("run", run_img);
```

In this part we're loading the images we created and adding them to the character.  The `character.addImage` method takes two arguments, first is the *label* for the image, which we can use to switch to that image later on interaction, and second is the image data.  A `method` is the same thing as a function but is associated with a specific object.

```
    const idle_anim = loadAnimation("assets/idle/idle_00.png", "assets/idle/idle_09.png");
    const run_anim = loadAnimation("assets/run/run_0.png", "assets/run/run_5.png");
    character.addAnimation("idle", idle_anim);
    character.addAnimation("run", run_anim);
    
}
```

We also treid adding animation.  The `loadAnimation` function has different ways of working, but in this case we add two arguments, the path to the first image in the animation and the path to the last image.  If the images are numbered correctly `p5.play` will figure out the images in between.

`addAnimation` works the same way as `addImage`, it uses a label and the variable with the animation data as arguments.

## draw & events

```
function draw() {
    background("white");
    
    /* keyboard events */
    // slidingMovement();
    constantMovement();
```

We've seen the `draw` function before as well.  `background("white");` is new and it's relatively obvious how it works.  It paints the background of the `canvas` white.  `background` is a `p5` function that can take HTML color values, HTML hex values, or numerical values, 0-255 for grayscale, and 3 arguments for RGB.  Check out the [background](https://p5js.org/reference/#/p5/background) documentation here.

Then we have our keyboard events section, which we divided into two separate functions. Looking back, we probably should have just stuck with constant movement and saved sliding movement for the physics lab, but that's okay.  We have `slidingMovement` commented out because we weren't using it, but didn't want to delete it.  We are calling `constantMovement()` to call the function which is defined later.



```
    if (keyIsPressed) {
        character.changeAnimation("run");
    } else {
        character.changeAnimation("idle");
    }
```

Here's an `if` statement!  This was our first look at logic.  An `if` statement is used to execute a block of code if a condition is met, or a different block of code if it's not.  In this case the condition is whether the user is pressing a key (any key at all, we'll get more specific later).  If that condition is true, then we change the character visual state to be running.  If it's not we make the character visual state idle.

`keyIsPressed` is a `p5` system variable.  It is `true` if the user is holding down a key (any key) and `false` if the user is not holding a key.  This is a `boolean` value.  Boolean values are always either `true` or `false` and allow the developer to make decisions about how the program should behave based on user input and other conditions.

```   
    drawSprites();
}
```

The end of our program is the same as last week, we use the `drawSprites` function to draw all of the sprites in the game.

## movement functions

```
function constantMovement() {
    if (keyDown(RIGHT_ARROW)) {
        character.position.x += speed;
    }
    if (keyDown(LEFT_ARROW)) {
        character.position.x -= speed;
    }
    if (keyDown(DOWN_ARROW)) {
        character.position.y += speed;
    }
    if (keyDown(UP_ARROW)) {
        character.position.y -= speed;
    }
}
```

We defined this `constantMovement` function all on our own.  It uses a series of conditional (if) statements to move the character based on the user input.  If the user is pressing any of the four directional keys, this function will change the characters position, incrementing `character.position` by the `speed` on the `x` or `y` axis depending on the key direction.

`keyDown` is a `p5.play` function that takes a key value as an argument and returns `true` or `false` if the key is currently being held down.

`character.position.x` is an expression of the x position of the character sprite in JavaScript object notation.  The `character` has a bunch of properties and methods because it is an object.  One property is `position`, which itself is an object known as a `vector`.  The `position` has two properties, `x` and `y`, that are number values.

The `+=` and `-=` operators are also new.  This is short hand for `x = x + speed`, or adding a value to the existing value of a number.  This is something that happens a lot in programming, so they created a shortcut for it.

```
function slidingMovement() {
    if (keyWentDown(RIGHT_ARROW)) {
        character.velocity.x += 1;
    }
    if (keyWentDown(LEFT_ARROW)) {
        character.velocity.x -= 1;
    }
    if (keyWentDown(DOWN_ARROW)) {
        character.velocity.y += 1;
    }
    if (keyWentDown(UP_ARROW)) {
        character.velocity.y -= 1;
    }
}
```

The `slidingMovement` function works similarly to the `constantMovement` function but instead of changing the character's position it changed the `velocity`.  Like `position`, `velocity` is a `vector` but it describes the rate of change of the position on the `x` and `y` access.  So, for each frame, if the `velocity.x` is equal to `1`, the `position.x` with increase by `1`.  The sprite has it's own internal function that updates the position based on the velocity.