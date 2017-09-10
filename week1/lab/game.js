function setup() {
	createCanvas(640, 360);
}

function draw() {
	background("white");
	drawSprites();
}

function mouseClicked() {
	var sprite = createSprite(mouseX, mouseY, 30, 30);
	sprite.velocity.x = random(-5, 5);
	sprite.velocity.y = random(-5, 5);
}