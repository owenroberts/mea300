function setup() {
	createCanvas(640, 360);
}

function draw() {
	background("white");
	drawSprites();
	text("Click to make a sprite", 100, 100);
}

function mouseClicked() {
	var sprite = createSprite(320, 180, 20, 20);
	sprite.velocity.x = random(-10, 10);
	sprite.velocity.y = random(-10, 10);
}