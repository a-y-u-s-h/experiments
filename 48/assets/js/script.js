let data = {
  sketch: {
    background: "#FFFFFF"
  },
  bodies: {
    n: 100,
    spacing: 20,
    base_radius: 0,
    colored: false,
    shape: {
      n: 3,
      r: 100,
      circular: true
    }
  }
};

let bodies = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 1, upperLimit_i = data.bodies.n; i <= upperLimit_i; i += 1) {
    bodies.push(new Body(width * 0.5, height * 0.5, i));
  }
  noFill();
  ellipseMode(CENTER);
  rectMode(CENTER);
  colorMode(HSB, 100);
  angleMode(DEGREES);
}

function draw() {
  background(data.sketch.background);
  for (var i = bodies.length - 1, upperLimit_i = 0; i > upperLimit_i; i -= 1) {
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
    if (!data.bodies.shape.circular) {
      beginShape();
      for (
        var angle = 0, upperLimit_angle = 360;
        angle < upperLimit_angle;
        angle += 360 / data.bodies.shape.n
      ) {
        let x = this.r * cos(angle);
        let y = this.r * sin(angle);
        vertex(x, y);
      }
      endShape();
    } else {
      ellipse(0, 0, this.r, this.r);
    }
    pop();
  }

  update() {
    this.x =
      -100 * cos(frameCount * (data.bodies.n - this.i) * 0.05) + width * 0.5;
  }
}

function mousePressed() {
  data.bodies.colored = !data.bodies.colored;
}
