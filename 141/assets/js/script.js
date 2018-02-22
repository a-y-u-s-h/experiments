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
  },
  target: {
    fill: {
      check: true,
      color: "#111111"
    },
    stroke: {
      check: true,
      weight: 2,
      color: "#000000"
    }
  }
};

let population;
let target;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();
  background(255);
  angleMode(DEGREES);
  colorMode(HSB, 100);
  target = new p5.Vector(width * 0.5, height * 0.1);
  population = new Population();
}

function draw() {
  background(data.sketch.background);
  population.run();

  push();
  translate(target.x, target.y);
  ellipse(0, 0, 20, 20);
  pop();
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
