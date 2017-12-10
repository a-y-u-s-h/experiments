let data = {
  sketch: {
    background: "#FFFFFF"
  },
  bodies: {
    n: 50,
    spacing: 10,
    base_radius: 0
  }
};

let bodies = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 1, upperLimit_i = data.bodies.n; i <= upperLimit_i; i += 1) {
    bodies.push(new Body(width * 0.5, height * 0.5, i));
  }
  noStroke();
  ellipseMode(CENTER);
  rectMode(CENTER);
}

function draw() {
  background(1);
  for (var i = bodies.length - 1, upperLimit_i = 0; i > upperLimit_i; i -= 1) {
    if (i % 2) {
      fill(255);
    } else {
      fill(0);
    }
    bodies[i].show();
    bodies[i].update();
  }
}

class Body {
  constructor(x, y, i = 1) {
    this.x = x;
    this.y = y;
    this.i = i;
    this.r = this.i * data.bodies.spacing + data.bodies.base_radius;
  }

  show() {
    push();
    rect(this.x, this.y, this.r, this.r);
    pop();
  }

  update() {
    this.x =
      100 * tan(frameCount * (data.bodies.n - this.i) * 0.0002) * sin(frameCount * (data.bodies.n - this.i) * 0.002) + width * 0.5;
    this.y =
      100 * cos(frameCount * (data.bodies.n - this.i) * 0.001) + height * 0.5;
  }
}
