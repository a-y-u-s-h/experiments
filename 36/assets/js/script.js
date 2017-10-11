let data = {
  sketch: {
    background: "#248B21"
  }
};

class Ground {
  constructor(cx, cy) {
    this.cx = cx;
    this.cy = cy;
    this.w = width * 0.9;
    this.h = height * 0.85;
    this.stripes = 21;
  }

  show() {
    push();
    translate(0, 0);
    noStroke();
    for (
      var i = 0, upperLimit_i = width / this.stripes;
      i < upperLimit_i;
      i += 1
    ) {
      if (i % 2) {
        noFill();
      } else {
        fill(0, 30);
      }
      rect(i * width / this.stripes, 0, width / this.stripes, height);
    }
    pop();
    push();
    // Setting up common styles for things below it..
    translate(this.cx, this.cy);
    rectMode(CENTER);
    ellipseMode(CENTER);
    angleMode(DEGREES);
    noFill();
    strokeWeight(8);
    stroke(255);

    // Corner arcs..
    for (var i = 0, upperLimit_i = 4; i < upperLimit_i; i += 1) {
      push();
      translate(
        this.w * Math.pow(-1, i) * 0.5,
        this.h * Math.pow(-1, Math.floor((i + 1) / 2)) * 0.5
      );
      scale(Math.pow(-1, i + 1), -1);

      if (i == 1 || i == 2) {
        scale(1, -1);
      }

      arc(0, 0, 100, 100, 0, 90);
      pop();
    }

    // Rectangle which contains everything
    rect(0, 0, this.w, this.h);

    // Center Circle
    ellipse(0, 0, this.h * 0.3, this.h * 0.3);

    // Line that separates the two halves
    line(0, this.h * 0.5, 0, -this.h * 0.5);

    // Rectangles on the side
    noFill();
    rect(-this.w * 0.465, 0, this.w * 0.07, this.h * 0.3);
    rect(-this.w * 0.425, 0, this.w * 0.15, this.h * 0.6);

    fill(0, 50);
    rect(-this.w * 0.51, 0, this.w * 0.02, this.h * 0.2);

    noFill();
    rect(this.w * 0.465, 0, this.w * 0.07, this.h * 0.3);
    rect(this.w * 0.425, 0, this.w * 0.15, this.h * 0.6);

    fill(0, 50);
    rect(this.w * 0.51, 0, this.w * 0.02, this.h * 0.2);

    pop();
  }
}

let ground;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ground = new Ground(width * 0.5, height * 0.5);
}

function draw() {
  background(data.sketch.background);
  ground.show();
}
