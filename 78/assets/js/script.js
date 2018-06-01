function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 100);
  rectMode(CENTER);
  strokeWeight(3);
}

function draw() {
  background(map(mouseX + mouseY, 0, width + height, 0, 100), 100, 100);
}
