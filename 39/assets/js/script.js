let data = {
  sketch: {
    background: "#248B21"
  }
};

let ground;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ground = new Ground(width * 0.5, height * 0.5);
}

function draw() {
  background(data.sketch.background);
  ground.show();
}
