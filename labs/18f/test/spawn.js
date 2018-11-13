function spawnHeart() {
	var x = heartXStart;
	var y = random(heartYMin, heartYMax);
	var heart = createSprite(x, y, 32, 32);
	heart.velocity.x = -heartSpeed;
	hearts.add(heart);
}

function spawnArrow() {
	var x = random(width, width * 3);
	var y = random(arrowYMin, arrowYMax);
	var arrow = createSprite(x, y, 32, 32);
	arrow.addAnimation('default', arrow_animation);
	arrow.velocity.x = -arrowSpeed;
	arrows.add(arrow);
}