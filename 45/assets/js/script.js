let data = {
  sketch: {
    background: "#FFFFFF"
  },
  bodies: {
    n: 70,
    spacing: 20,
    base_radius: 0,
    colored: false
  }
};

let bodies = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 1, upperLimit_i = data.bodies.n; i <= upperLimit_i; i += 1) {
    bodies.push(new Body(width * 0.5, height * 0.5, i));
  }
  noStroke();
  noFill();
  ellipseMode(CENTER);
  rectMode(CENTER);
  colorMode(HSB, 100);
}

function draw() {
  background(data.sketch.background);
  for (var i = bodies.length - 1, upperLimit_i = 0; i > upperLimit_i; i -= 1) {
    if (data.bodies.colored) {
      let col = map(i, bodies.length - 1, 0, 0, 100);
      fill(
        map(i, 0, 100, 0, 100),
        map(i, 0, 100, 100, 0),
        map(i, 0, 100, 100, 0),
        map(i, 0, 100, 50, 0)
      );
    } else {
      if (i % 2) {
        fill(255);
      } else {
        fill(0);
      }
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
      100 * sin(frameCount * (data.bodies.n - this.i) * 0.002) + width * 0.5;
    // this.y =
    // 100 * cos(frameCount * (data.bodies.n - this.i) * 0.002) + height * 0.5;

  }
}

function mousePressed() {
  data.bodies.colored = !data.bodies.colored;
}
