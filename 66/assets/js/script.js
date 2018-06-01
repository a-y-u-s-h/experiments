let data = {
  sketch: {
    background: "#000000",
    G: 6.67408 * Math.pow(10, 0)
  },
  particle: {
    number: 200,
    mass: 1,
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
    mass: 10,
    size: 10,
    stroke: {
      check: false,
      color: "#000000",
      weight: 3
    },
    fill: {
      check: true,
      color: "#DE3030"
    }
  }
};

let attractor1;
let attractor2;
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  attractor1 = new Attractor(width * 0.35, height * 0.5);
  attractor2 = new Attractor(width * 0.65, height * 0.5);

  angleMode(DEGREES);
  colorMode(HSB, 100);

  for (
    var i = 0, upperLimit_i = data.particle.number;
    i < upperLimit_i;
    i += 1
  ) {
    let theta = 360 / data.particle.number * i;
    let x = width * 0.5 + width * 0.23 * cos(theta);
    let y = height * 0.5 + width * 0.23 * sin(theta);
    particles.push(new Particle(x, y));
  }
  background(0);
}

function draw() {
  colorMode(HSB, 100);
  background(0, 20);

  particles.forEach(particle => {
    particle.clearForce();
    particle.attracted(attractor1);
    particle.attracted(attractor2);
    particle.update();
    particle.edges();
    particle.show();
  });

  attractor1.show();
  attractor2.show();
}
