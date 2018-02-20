let data = {
  sketch: {
    background: "#FFFFFF01"
  },
  population: {
    rockets: 800,
    lifespan: 200
  },
  rocket: {
    lifespan: 200,
    size: 3
  }
};

let population;
let drawing = true;

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
  population.run();
  if (drawing) {
    for (var i = 0; i < 40; i += 1) {
      population.rockets.push(new Rocket(mouseX, mouseY));
    }
  }
}

function keyPressed() {
  drawing = !drawing;
}

function mousePressed () {
  drawing = !drawing;
}
