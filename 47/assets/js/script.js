let data = {
  sketch: {
    background: "#FFFFFF"
  },
  bodies: {
    n: 50,
    spacing: 20,
    base_radius: 0,
    colored: false,
    shape: {
      n: 6,
      r: 100
    }
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
  angleMode(DEGREES);
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
    translate(this.x, this.y);
    // scale(1 + 0.4 * sin(frameCount), 1 + 0.4 * sin(frameCount));
    beginShape();
    for (
      var angle = 0, upperLimit_angle = 360;
      angle < upperLimit_angle;
      angle += 360 / data.bodies.shape.n
    ) {
      let x = this.r * cos(angle);
      let y =  this.r * sin(angle);
      vertex(x, y);
    }
    endShape();
    pop();
  }

  update() {
    // if (this.i % 2) {
      this.x =
        100 * sin(frameCount * (data.bodies.n - this.i) * 0.1) + width * 0.5;
      this.y =
        -100 * cos(frameCount * (data.bodies.n - this.i) * 0.1) + height * 0.5;
    // } else {
      // this.x =
        // 100 * cos(frameCount * (data.bodies.n - this.i) * 0.1) + width * 0.5;
      // this.y =
        // -100 * sin(frameCount * (data.bodies.n - this.i) * 0.1) +
        // height * 0.5;
    // }
  }
}

function mousePressed() {
  data.bodies.colored = !data.bodies.colored;
}
