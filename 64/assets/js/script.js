let data = {
  sketch: {
    background: "#FFFFFF"
  },
  pattern: {
    points: {
      number: 1200,
      size: 90
    },
    phi: {
      n_pow: 1,
      angle: 137.5
    },
    r: {
      n_pow: 0.5,
      c: 20
    }
  }
};

let p;

function setup() {
  createCanvas(windowWidth, windowHeight);
  p = new Pattern(width * 0.5, height * 0.5);
  colorMode(HSB, 100);
  angleMode(DEGREES);
  ellipseMode(CENTER);
  stroke(0);
  strokeWeight(1);
}

function draw() {
  background(255, 20);
  p.show();
}

class Pattern {
  constructor(cx, cy) {
    this.origin = new p5.Vector(cx, cy);
  }

  show() {
    push();
    translate(this.origin.x, this.origin.y);
    beginShape();
    for (
      var i = 0, upperLimit_i = data.pattern.points.number;
      i < upperLimit_i;
      i += 1
    ) {
      let r = data.pattern.r.c * Math.pow(i, data.pattern.r.n_pow);
      let phi = data.pattern.phi.angle * Math.pow(i, data.pattern.phi.n_pow) + frameCount * 0.1;
      let x = r * cos(phi) * i * 0.001;
      let y = r * sin(phi) * i * 0.001;
      fill(
        map(r, -(width + height) * 0.25, 0.25 * (width + height), -15, 15 - 5 * sin(frameCount * i * 0.001)),
        100,
        100
      );
      ellipse(x, y, data.pattern.points.size*  i * 0.001, data.pattern.points.size * i * 0.001);
    }
    endShape();
    pop();
  }
}
