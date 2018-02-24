let data = {
  sketch: {
    background: "#FFFFFF",
    gravity: 9.8
  },
  spring: {
    color: "#000000",
    strokeWeight: 1,
    rest_length: window.innerHeight * 0.001,
    constant: 0.6
  },
  bob: {
    mass: 0.7,
    radius: 40,
    damping: 0.5,
    stroke: {
      check: true,
      color: "#F8303030",
      weight: 4
    },
    fill: {
      check: true,
      color: "#FF000090"
    },
    number: 20
  }
};

let systems = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);

  systems[0] = new System(width * 0.5, 100);

  for (var i = 0; i < data.bob.number; i += 1) {
    if (i > 0) {
      systems[i] = new System(
        systems[i - 1].bob.position.x,
        systems[i - 1].bob.position.y
      );
      systems[i].setHinge(systems[i - 1].bob);
    }
  }
}

function draw() {
  background(data.sketch.background);

  for (var i = data.bob.number - 1; i >= 1; i -= 1) {
    systems[i].update();
    systems[i].show();
  }

  systems[0].update();
  systems[0].show();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);

  systems[0] = new System(width * 0.5, 100);

  for (var i = 1; i < data.bob.number; i += 1) {
    systems[i] = new System(
      systems[i - 1].bob.position.x,
      systems[i - 1].bob.position.y,
      50
    );
    systems[i].setHinge(systems[i - 1].bob);
  }
}
