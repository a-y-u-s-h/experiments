let data = {
  sketch: {
    background: "#BC1E00"
  },
  squiggly: {
    n: 50,
    np: 50,
    separation: 18,
    amplitude: 20,
    inner_radius: 30
  }
};

let things = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES);
  noFill();
  stroke(255);
  strokeWeight(1);
  for (var i = 0, upperLimit_i = data.squiggly.n; i < upperLimit_i; i += 1) {
    things[i] = new Squiggly(width * 0.5, height * 0.5, i);
  }
}

function draw() {
  background(188, 30, 0, 100);

  for (var i = 0, upperLimit_i = data.squiggly.n; i < upperLimit_i; i += 1) {
    things[i].show();
  }

  let radius = 2 * (data.squiggly.inner_radius + data.squiggly.separation);
  push();
  noStroke();
  fill(255, 100);
  translate(width * 0.5, height * 0.5);
  ellipse(0, 0, radius, radius);
  pop();
}

class Squiggly {
  constructor(cx, cy, i = 0) {
    this.position = new p5.Vector(cx, cy);
    this.i = i + 1;
    this.rotation = 360 / data.squiggly.n * (i + 1);
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.rotation);
    beginShape();
    for (var i = 0, upperLimit_i = data.squiggly.np; i < upperLimit_i; i += 1) {
      let x = data.squiggly.inner_radius + data.squiggly.separation * i;
      let y =
        data.squiggly.amplitude *
        Math.log(i) *
        cos(frameCount * 5 + (i + 1) * data.squiggly.amplitude);
      vertex(x, y);
    }
    endShape();
    pop();
  }

}
