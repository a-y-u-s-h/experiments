let data = {
  sketch: {
    background: "#FFFFFF"
  },
  iterative: {
    r: 50,
    tube: 100
  }
};

let collective1;
let collective2;
let collective3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(data.sketch.background);

  angleMode(DEGREES);

  collective1 = new Collective(width * 0.5, height * 0.5);
  collective2 = new Collective(width * 0.2, height * 0.5);
  collective3 = new Collective(width * 0.8, height * 0.5);
}

function draw() {
  background(255, 1);

  collective1.show();
  collective2.show();
  collective3.show();
}

class Collective {
  constructor(cx = width * 0.5, cy = height * 0.5) {
    this.cx = cx;
    this.cy = cy;
    this.donut = new Iterative(cx, cy);
    this.particles = new Iterative(cx, cy, data.iterative.r * 0.5, "abnormal");
  }

  show() {
    this.donut.update();
    this.donut.show();
  }
}

class Iterative {
  constructor(
    cx = width * 0.5,
    cy = height * 0.5,
    r = data.iterative.r,
    type = "normal"
  ) {
    this.cx = cx;
    this.cy = cy;
    this.position = new p5.Vector(cx, cy);
    this.type = type;
    this.r = r;
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    stroke(0);
    strokeWeight(1);
    beginShape();
    for (
      var angle = 0, upperLimit_angle = 360;
      angle < upperLimit_angle;
      angle += 1
    ) {
      let x = this.r * cos(angle);
      let y = this.r * sin(angle);
      if (this.type === "normal") {
        point(x, y);
      } else {
        push();
        stroke("#00AAA223")
        point(x * noise(x, y) * 0.5, y * noise(x, y) * 0.5);
        pop();
      }
    }
    endShape();
    pop();
  }

  update() {
    this.position.x =
      this.cx + data.iterative.tube * 2 * cos(frameCount * 2) * sin(frameCount * 2);
    this.position.y = this.cy + data.iterative.tube * 2 * sin(frameCount);
  }
}
