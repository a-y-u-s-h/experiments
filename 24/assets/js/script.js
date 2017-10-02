let max_distance;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  max_distance = dist(0, 0, width, height);
}

function draw() {
  background(
    map(mouseX, 0, width, 0, 100),
    map(mouseY, 0, height, 0, 100),
    map(mouseX + mouseY, 0, width + height, 0, 100)
  );
  colorMode(HSL);

  for (let i = 0; i <= width + 20; i += 20) {
    for (let j = 0; j <= height + 20; j += 20) {
      let size = dist(mouseX, mouseY, i, j);
      size = size / max_distance * 66;
      fill(0);
      ellipse(i, j, size, size);
    }
  }
}
