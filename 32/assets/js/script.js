let data = {
  sketch: {
    background: "#FFFFFF"
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(data.sketch.background);
}

let x = 0,
  y = 0;

let size = 10;

function draw() {
  translate(width / 2, height / 2);
  if (random(1) < 0.5) {
    line(x, y, x + size, y);
    y += size;
  }
  if (random(1) < 0.5) {
    line(x, y, x - size, y);
    y += -size;
  }
  if (random(1) < 0.5) {
    line(x, y, x, y + size);
    x += -size;
  }
  if (random(1) < 0.5) {
    line(x, y, x, y - size);
    x += size;
  }
  if (x >= width * 0.5 || x <= -width * 0.5) {
    x = 0;
  }

  if (y >= height * 0.5 || y <= -height * 0.5) {
    y = 0;
  }
}
