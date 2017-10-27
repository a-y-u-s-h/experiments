function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
}

var x = 0;
function draw() {
  rectMode(CENTER);
  fill(
    map(mouseX, 0, windowWidth, 255, 0),
    map(mouseY, 0, windowHeight, 255, 0),
    map(
      Math.pow(mouseX, 2) + Math.pow(mouseY, 2),
      0,
      Math.pow(windowWidth, 2) + Math.pow(windowHeight, 2),
      255,
      0
    )
  );
  translate(mouseX, mouseY);
  rotate(x);
  rect(
    0,
    0,
    map(mouseX, 0, windowWidth, 40, 400),
    map(mouseY, 0, windowHeight, 40, 400)
  );
  x = lerp(x, x + 1, 0.2);
}
