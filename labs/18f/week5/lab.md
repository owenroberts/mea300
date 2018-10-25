---
layout: notes
title: Lab Notes
week: 5
---

We made a pretty significant update this week by adding the game speed and moving all of our sprites to make the game appear somewhat functional!  Let's take a look at how we did it.

## global vars

```
var speed = 6;
var jump_speed = speed * 3;
```

First we created a global `speed` variable for the default game speed.  Then we set the player `jump_speed` according the game `speed`.

We didn't add any new assets so we'll skip the `preload` section.

## setup

```
var startPlatform = createSprite(80, 300);
startPlatform.setCollider("rectangle", 0, 0, 512, 32);
startPlatform.addImage("default", start_platform_img);
startPlatform.velocity.x = -speed;
startPlatform.isStartPlatform = true;

platforms = new Group();
platforms.add(startPlatform);
```

In the last version we had only one platform.  Now we're going to have a few platforms that move past the player so the player can jump on them.  One platform is special, the `startPlatform`.  It's a bit longer so the player has a second to figure out what's going on before they have to interact.  I don't want this platform to repeat so I tagged it with a *boolean*, `startPlatform.isStartPlatform = true;`. That will come back later.

```
var y = 300;
for (var i = 0; i < 3; i++) {
    var x = 512 + 256 * i;
    var platform = createSprite(x, y, 128, 32);
    platform.addImage("default", platform_img);
    platform.velocity.x = -speed;
    platforms.add(platform);
    
    // adjust y
    y += random(-100, 100);
}
```

Then we create the rest of the platforms.  We want to vary the platform, but it can't be totally random, because that will make the game impossible sometimes.  So instead of new random numbers, we can start with a baseline and then add to it as each platform is created.

## draw

```
// loop through all platforms
player.isGrounded = false;
for (var i = 0; i < platforms.length; i++) {
    var platform = platforms[i];
    if (player.collide(platform)) {
        player.isJumping = false;
        player.changeAnimation("run");
        player.velocity.y = 0;
        player.isGrounded = true;
    }
    
    // wrap around canvas
    if (platform.collider.right() < 0) {
        if (platform.isStartPlatform) {
            platform.remove();
        }
        platform.position.x = width + platform.width/2;
        platform.position.y += random(-50, 50);
    }
}

if (!player.isGrounded) {
    player.velocity.y += GRAVITY;
}
```

With our new platform group we had to revamp our platform collision code.  We also added a new property to the player, `player.isGrounded` because we need to check if the player is hitting multiple different platforms in each frame.

We start with the assumption that `player.isGrounded` is false.  Then loop over the platforms, and if the player collides with any platform, then `isGrounded` becomes true.

When the player collides with a platform we also change the animation to `"run"` because things are moving now.  Then we reset the `player.velocity.y` to `0` and set  `player.isJumping` to false.

Then we wrap the platforms to the other side of the canvas once they leave the left side.  We also check, if the platform `isStartPlatform` we remove it because we only need it at the beginning.

Finally, if the player is not grounded, `!player.isGrounded`, we apply gravity.

```
if (keyDown("space") && !player.isJumping) {
    player.changeAnimation("jump");
    player.velocity.y -= jump_speed;
    player.isJumping = true;
}
```

Our jump code goes after that.

## death

```
// player falls below the canvas
if (player.position.y - player.height > height || player.position.x < -player.width) {
    noLoop();
    text("PLAYER DIED", width/2, height/2);
}
```

Our last new bit.  If the player goes below the canvas height or off the canvas left, we "kill" the player by ending the game with `noLoop()` and writing "PLAYER DIED" on the screen.

We'll replace this with a more sophisticated restart scene next week.




