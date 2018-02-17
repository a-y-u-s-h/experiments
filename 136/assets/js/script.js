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
