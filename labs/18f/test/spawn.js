function spawnHeart() {
	var x = heartXStart;
	var y = random(heartYMin, heartYMax);
	var heart = createSprite(x, y, 32, 32);
	heart.velocity.x = -heartSpeed;
	hearts.add(heart);
}