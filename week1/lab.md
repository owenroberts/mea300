---
layout: notes
title: MEA 300
week: 1
dek: Lab Notes
---

We covered a lot this week in the lab so I want to review what we talked about here for future references and review.

## Project setup
We started by setting up a basic HTML/CSS webpage to be a container for the game.  This semester we're making web based games because the browser is going to do a lot of the work for in terms of rendering the application and using canvas graphics.

First we made a new folder on the Desktop called *myfirstgame/*, which, of course, can be named whatever you prefer.

We also downloaded the `p5.js` and `p5.play` libraries and added them to the folder with `index.html` and `style.css`.

The HTML and CSS pages we made a extremely simple.

Here's the [HTML page](https://github.com/owenroberts/mea300/blob/master/week1/lab/index.html) and the [CSS](https://github.com/owenroberts/mea300/blob/master/week1/lab/style.css).


## setup()

We started with the two main functions in any p5 based JavaScript program: `setup` & `draw`




```
function setup() {
	// code goes here
}
```
Let's look at this line by line, because there's a lot happening.

```
function setup() {
```
This is a typical function *declaration* starting with the keyword `function`.

`setup` is the name of the function.  It could be anything.  The writers of p5 chose the name "setup" because it describes what the function does: it sets up the program.

Every function name has parentheses at the end: `()`, that's how we, and the computer, know it's a function.

The function block starts with the open curly bracket: `{`.  All of the statements of code that we want to run go in between that open curly bracket and the closed curly bracket at the end.

Every p5 sketch starts this way. The setup function is used to setup our drawing and initialize some basics. It runs once when our program starts.

A function is simply a series of commands or actions we want the program to take. Functions have names so we can call them. When we call a function, the program runs the lines of code contained inside.


```
function setup() {
	createCanvas(640, 360);
}
```

For now the only code we need in `setup` is `createCanvas`, creates a new `&lt;canvas&gt;` element on the HTML page where our drawing code will be rendered.

The two numbers, `(640, 360)` in parentheses are *arguments*.  Some functions, like `createCanvas` take arguments, which have an effect on the way the function behaves.  In this case, the numbers determines the `width` and `height` of our drawing in pixel dimensions.


## draw()

```
function draw() {
	background("white");
	drawSprites();
}
```

The `draw` function is where all of our drawing code and game logic will go. This function runs over and over again for as long as the program is open. So all of that code is being executed about 60 times a second, or however fast your browser is running.

The `background` function just paints the background of the canvas whatever color is written as the argument.

`drawSprites` is a p5.play function that draws all the existing sprites in the game.  Without this we wouldn't see any sprites, ever, so don't forget to put that in there!

## mouseClicked()

```
function mouseClicked() {
	var sprite = createSprite(mouseX, mouseY, 30, 30);
	sprite.velocity.x = random(-5, 5);
	sprite.velocity.y = random(-5, 5);
}
```

For the first lab, the main part of our program is here in `mouseClicked`, which is a function that is tied to an *event* or a user input.  In this case the event is a mouse click, which is technically when a a user presses the mouse button down and releases it, which is really two separate events (or three if you move the mouse).

Inside the function is what we want to happen when the mouse is clicked.

First we create a new sprite using the `var sprite`.  `var` stands for variable, which is basically a way to save some information on the computer and give it a name to use it later, sort of like a function, but it's not necessarily a series of commands.

The p5.play `createSprite` function takes four arguments: the x position, y position, width and height of the sprite we want to create.

Once we make a new sprite, to see it move we give it some random velocity.

`sprite.velocity.x` is basic JavaScript object notation.  The sprite is an object that has a property called `velocity`, which is also an object with two properties called `x` and `y`, which describe the speed over time on the x and y axes.

We want to give each a random value so we can use the p5 function `random`, which takes a number range, and returns a random number in between that range.  More on random in a few weeks, it's super useful for making games.





