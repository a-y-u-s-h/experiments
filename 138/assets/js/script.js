let data = {
  sketch: {
    background: "#FFFFFF01"
  },
  population: {
    rockets: 800
  },
  rocket: {
    lifespan: 200,
    size: 4
  }
};

let population;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();
  background(255);
  angleMode(DEGREES);
  colorMode(HSB, 100);
  population = new Population();
}

function draw() {
  background(data.sketch.background);
  if (frameCount % 120 < 60) {
    if (frameCount % 15 == 0) {
      population = new Population(random(0, width), random(0, height));
    }
  } else {
    if (frameCount % 30 == 0) {
      population = new Population(random(0, width), random(0, height));
    }
  }
  population.run();
}

function mousePressed() {
  population = new Population(mouseX, mouseY);
}

function keyPressed() {}
