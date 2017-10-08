let data = {
  sketch: {
    left: {
      background: "#000000"
    },
    right: {
      background: "#FFFFFF"
    }
  },
  squares: {
    fill: "#777777",
    size: 200,
    amplitude: window.innerWidth * 0.25
  }
};

class Square {
  constructor(eqx, eqy, phase, half) {
    this.eqx = eqx;
    this.eqy = eqy;
    this.phase = phase;
    this.angle = 0;
    this.half = half;
    this.amplitude = data.squares.amplitude;
    this.x = this.eqx + this.amplitude * sin(this.angle + this.phase);
  }

  show() {
    push();
    noStroke();
    ellipseMode(CENTER);
    fill(data.squares.fill);
    ellipse(this.x, this.eqy, data.squares.size, data.squares.size);
    pop();
  }

  update() {
    this.angle = lerp(this.angle, this.angle + 1, 0.8);
    if (this.half === "left") {
      this.x = this.eqx + data.squares.amplitude * sin(this.angle + this.phase);
    } else {
      this.x = this.eqx + data.squares.amplitude * sin(this.angle + this.phase);
    }
  }
}

let a, b;

function setup() {
  createCanvas(windowWidth, windowHeight);
  a = new Square(width * 0.5, height * 0.25, -90, "left");
  b = new Square(width * 0.5, height * 0.75, 90, "right");
}

function draw() {
  angleMode(DEGREES);

  noStroke();
  fill(data.sketch.left.background);
  rect(0, 0, width * 0.5, height);

  fill(data.sketch.right.background);
  rect(width * 0.5, 0, width * 0.5, height);
  a.update();
  b.update();
  a.show();
  b.show();
}
