function setup() {
	createCanvas(640, 360);
	textAlign(CENTER);
}

function draw() {
	background("white");
	drawSprites();
	text("Click to make a sprite", width/2, height/2);
}

function mouseClicked() {
	var sprite = createSprite(mouseX, mouseY, 30, 30);
	sprite.velocity.x = random(-5, 5);
	sprite.velocity.y = random(-5, 5);

}