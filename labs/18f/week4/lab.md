---
layout: notes
title: Lab Notes
week: 5
---

Our program is getting pretty long so I'm only going to go over new stuff this week instead of recapping everything.

## global variables

```
// scenery
var clouds, cloud_sheet, cloud_animation;
var trees, tree_img;

// obstacles
var arrows; // group
var arrow_sheet, arrow_animation;
```

We added some basic groups for the clouds, trees and arrows.  The groups will let us keep track of all the sprites and later we'll use it to draw groups separately.

## preload

```
	arrow_sheet = loadSpriteSheet("sprites/obstacles/arrow.png", 32, 32, 3);
    arrow_animation = loadAnimation(arrow_sheet);
```

I added code to load the new arrow animation sprite sheet.


## groups

```
	arrows = new Group();
    // loop - structure in JavaScript that repeats code
    for (var i = 0; i < 3; i++) { // happens 3 times
        var x = random(width, width * 3);
        var y = random(150, 250);
        var arrow = createSprite(x, y);
        arrow.setCollider("rectangle", 0, 0, 20, 10);
        arrow.debug = true;
        arrow.addAnimation("default", arrow_animation);
        arrow.velocity.x = random(-2, -3);
        arrows.add(arrow);
    }
```

Starting with the new arrows, we used a *loop* to create multiple arrows without repeating the same code.  All of this code creates randomized arrows and add them to the `arrows` group so we can update them later in draw.


```
	// set up scenery
    clouds = new Group();
    for (var i = 0; i < 2; i++) {
        var x = random(0, width);
        var cloud = createSprite(x, 100);
        cloud.addAnimation("default", cloud_animation);
        cloud.velocity.x = random(-1, 1);
        clouds.add(cloud);
    }

    trees = new Group();
    for (var i = 0; i < 20; i ++) {
        var x = random(0, 640);
        var y = random(250, 300);
        var tree = createSprite(x, y);
        tree.addImage("default", tree_img);
        trees.add(tree);
    }
```

After adding a group for `arrows`, we did the same with the `clouds` and `trees` groups.

## draw

The new parts of our `draw` function include checking for the player death and updating the `clouds` and `arrows` groups.

## player death

```
	// player falls below the canvas
    if (player.position.y - player.height > height) {
        player.position.y = 20;
    }
```

If they player falls below the bottom of the canvas we reset it to start the game over.  Later we'll add some UI to tell the player they died and allow them to start again.


## obstacle collision

```
	// arrows hit player
    arrows.overlap(player, function (arrow) {
        // arrow.remove();
        arrow.position.x = random(width, width * 3);
        player.position.y = -player.height;
    });
```

The player can also die if it gets hit by the arrow.  Using the `.overlap` function we can test each arrow in the group against the player.  If there is an overlap, we use the *callback function* that is the second argument to either remove the arrow or reset it and to "kill" the player.


## wrapping sprites

```
	// wrap arrows back to the beginning 
    for (var i = 0; i < arrows.length; i++) {
        if (arrows[i].position.x < -50) {
            arrows[i].position.x = random(width, width * 3);
        }
    }
    
    // wrap clouds
    for (var i = 0; i < clouds.length; i++) {
        if (clouds[i].position.x < -100) {
            clouds[i].position.x = random(width, width * 2);
        }
    }
```

We also need to "wrap" the sprites back to the other side of the canvas if they don't hit the player.  That way we can reuse them instead of creating new ones.



