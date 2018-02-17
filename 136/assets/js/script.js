let data = {
  sketch: {
    background: "#FFFFFF"
  },
  grid: {
    scale: 10
  }
};

let grid;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noFill();
  grid = new Grid(width * 0.6, height * 0.8, data.grid.scale, width * 0.35);
}

function draw() {
  background(data.sketch.background);
  grid.run();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  grid = new Grid(width * 0.6, height * 0.8, data.grid.scale, width * 0.35);
}

function mousePressed() {
  if (mouseX < width * 0.65 && mouseX > width * 0.05 && mouseY < height * 0.9 && mouseY > 0.1 * height ) {
    background(data.sketch.background);
    grid = new Grid(width * 0.6, height * 0.8, data.grid.scale, width * 0.35);
  }
}
