let data = {
  sketch: {
    background: "#000000",
    G: 6.67408 * Math.pow(10, -1)
  },
  particle: {
    number: 600,
    mass: 2,
    size: 3,
    stroke: {
      check: false,
      color: "#000000",
      weight: 3
    },
    fill: {
      check: true,
      color: "#FFFFFF"
    }
  },
  attractor: {
    number: 0,
    mass: 2,
    size: 10,
    stroke: {
      check: false,
      color: "#000000",
      weight: 3
    },
    fill: {
      check: true,
      color: "#46AFBF"
    }
  }
};

let particles = [];
let attractors = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 100);
  rectMode(CENTER);
  strokeWeight(3);

  for (var i = 0, upperLimit_i = 600; i < upperLimit_i; i += 1) {
    particles.push(new Particle(random(width), random(height)));
  }

  attractors.push(new Attractor(width * 0.5, height * 0.5));
  background(data.sketch.background);
}

function draw() {
  background(0, 50);

  particles.forEach(particle => {
    particle.clearForce();
    attractors.forEach(attractor => {
      particle.attracted(attractor);
    });
    particle.update();
    particle.show();
  });

  attractors.forEach(attractor => {
    attractor.show();
  });
}

function mousePressed() {
  attractors.push(new Attractor(mouseX, mouseY));
}
