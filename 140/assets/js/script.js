let data = {
  sketch: {
    background: "#FFFFFF"
  },
  population: {
    rockets: 800
  },
  rocket: {
    lifespan: 100,
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
  population.run();
}

// function mouseDragged() {
//   // population = new Population(mouseX, mouseY);
//   for ( var i = 0 ; i < 20; i += 1 ) {
//     population.rockets.push(new Rocket(mouseX, mouseY));
//   }
// }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
