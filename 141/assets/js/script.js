let data = {
  sketch: {
    background: "#FFFFFF90"
  },
  population: {
    rockets: 600
  },
  rocket: {
    lifespan: 100,
    size: 4,
    maxforce: 0.3,
  },
  target: {
    fill: {
      check: true,
      color: "#000000"
    },
    stroke: {
      check: false,
      weight: 2,
      color: "#00E4FF"
    }
  }
};

let population;
let target;
let barrier;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();
  background(255);
  angleMode(DEGREES);
  colorMode(HSB, 100);
  target = new Target(width * 0.5, height * 0.1);
  population = new Population(width * 0.5, height * 0.95);
  barrier = new Barrier(width * 0.5, height * 0.5, width * 0.2, height * 0.02);
}

function draw() {
  background(data.sketch.background);
  barrier.show();
  target.show();
  population.run(target, barrier);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  target = new Target(width * 0.5, height * 0.1);
  population = new Population(width * 0.5, height * 0.95);
  barrier = new Barrier(width * 0.5, height * 0.5, width * 0.2, height * 0.02);
  background(255);
}
