---
layout: notes
title:  Lab notes
week: 13
---

In this lab I added a new graphic and sound to appear when the character gets hit by the arrow and when the character collects a heart.  In video games these details make the game immersive.  We need every action, event and collision in the game to be represented visually and with audio for the player.  Right now, if the character gets hit by an arrow we only because the player loses a life and the arrow disappears.  This isn't enough.  We need to play a sound and use a graphic to represent the collision between player and obstacle or reward.

To do this I created an animation and sound for the arrow hitting the player as well as the player getting a heart.

## assets.js

```
// obstacles
var arrows; // group
var arrow_sheet, arrow_animation;
var arrow_hit_sheet, arrow_hit_animation;

// rewards
var hearts; // group
var heart_sheet, heart_animation;
var heart_hit_sheet, heart_hit_animation;
```

For both the obstacle (arrow) and reward (heart) I added new variables for the animation sprite sheet.

```
// sounds
var arrowHitSound;
var heartHitSound;
```

For each sound a new variable as well.

### preload()

