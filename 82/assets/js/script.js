let data = {
  sketch: {
    background: "#000000"
  },
  thing: {
    circle: {
      r: 300,
      fill: {
        check: true,
        color: "#FFFFFF"
      },
      stroke: {
        check: true,
        color: "#000000",
        weight: 1
      }
    },
    triangle: {
      fill: {
        check: true,
        color: "#E57D7D34"
      },
      stroke: {
        check: true,
        color: "#000000",
        weight: 1
      }
    }
  }
};

let thing;

function setup() {
  createCanvas(windowWidth, windowHeight);

  thing = new Thing(width * 0.5, height * 0.5);
  rectMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  background(255);

  thing.update();
  thing.show();
}

function mousePressed() {
  thing.reset();
}

class Thing {
  constructor(cx = width * 0.5, cy = height * 0.5) {
    this.position = new p5.Vector(cx, cy);
    this.A = p5.Vector.random2D();
    this.B = p5.Vector.random2D();
    this.C = p5.Vector.random2D();

    this.A.mult(data.thing.circle.r);
    this.B.mult(data.thing.circle.r);
    this.C.mult(data.thing.circle.r);

    this.angle = 0;
    this.delta = this.area();
  }

  show() {
    push();
    translate(this.position.x, this.position.y);

    // Circle
    push();
    if (data.thing.circle.stroke.check) {
      stroke(data.thing.circle.stroke.color);
      strokeWeight(data.thing.circle.stroke.weight);
    } else {
      noStroke();
    }

    if (data.thing.circle.fill.check) {
      fill(data.thing.circle.fill.color);
    } else {
      noFill();
    }
    ellipse(0, 0, data.thing.circle.r * 2, data.thing.circle.r * 2);
    pop();

    // Triangle
    push();
    if (data.thing.triangle.stroke.check) {
      stroke(data.thing.triangle.stroke.color);
      strokeWeight(data.thing.triangle.stroke.weight);
    } else {
      noStroke();
    }

    if (data.thing.triangle.fill.check) {
      colorMode(HSB, 100);
      let delta = map(this.area(), 0, PI * data.thing.circle.r * data.thing.circle.r, 0, 100);
      fill(delta, 100, 100, 40);
    } else {
      noFill();
    }
    triangle(this.A.x, this.A.y, this.B.x, this.B.y, this.C.x, this.C.y);
    pop();

    let midpointX = (this.B.x + this.C.x + this.A.x) / 3;
    let midpointY = (this.B.y + this.C.y + this.A.y) / 3;

    // Vertices
    push();
    stroke(0);
    strokeWeight(10);
    point(this.A.x, this.A.y);
    point(this.B.x, this.B.y);
    point(this.C.x, this.C.y);
    point(midpointX, midpointY);

    point(-400, this.A.y);
    point(-500, this.B.y);
    point(-600, this.C.y);
    pop();

    // Lines joining vertices from Centroid
    push();
    line(this.A.x, this.A.y, midpointX, midpointY);
    line(this.B.x, this.B.y, midpointX, midpointY);
    line(this.C.x, this.C.y, midpointX, midpointY);
    pop();

    // Text
    push();
    textAlign(CENTER, TOP);
    text(
      `A : (${Math.floor(this.A.x)}, ${Math.floor(this.A.y)})`,
      this.A.x + 10,
      this.A.y + 10
    );
    text(
      `B : (${Math.floor(this.B.x)}, ${Math.floor(this.B.y)})`,
      this.B.x + 10,
      this.B.y + 10
    );
    text(
      `C : (${Math.floor(this.C.x)}, ${Math.floor(this.C.y)})`,
      this.C.x + 10,
      this.C.y + 10
    );
    text(
      `G : (${Math.floor(midpointX)}, ${Math.floor(midpointY)})`,
      midpointX + 10,
      midpointY + 10
    );
    text(`Area : ${Math.floor(this.area())}`, 500, 0);
    pop();

    // Area representation with bar
    push();
    translate(500, 0);
    let height = map(
      Math.floor(this.area()),
      0,
      PI * data.thing.circle.r * data.thing.circle.r,
      50,
      1000
    );
    fill(0, 50);
    rect(0, 0, 100, height);
    pop();

    push();
    line(-400, -300, -400, 300);
    line(-500, -300, -500, 300);
    line(-600, -300, -600, 300);

    line(-400, this.A.y, this.A.x, this.A.y);
    line(-500, this.B.y, this.B.x, this.B.y);
    line(-600, this.C.y, this.C.x, this.C.y);

    pop();

    pop();
  }

  update() {
    if (frameCount % 360 !== 0) {
      let angleA = radians(100 * sin(frameCount) / (frameCount % 360));
      let angleB = radians(200 * sin(frameCount) / (frameCount % 360));
      let angleC = radians(360 * sin(frameCount) / (frameCount % 360));

      this.A.rotate(angleA);
      this.B.rotate(angleB);
      this.C.rotate(angleC);
    }
  }

  reset() {
    if (mouseIsPressed) {
      this.A = p5.Vector.random2D();
      this.B = p5.Vector.random2D();
      this.C = p5.Vector.random2D();

      this.A.mult(data.thing.circle.r);
      this.B.mult(data.thing.circle.r);
      this.C.mult(data.thing.circle.r);
    }
  }

  area() {
    return abs(
      0.5 *
        (this.A.x * (this.B.y - this.C.y) +
          this.B.x * (this.C.y - this.A.y) +
          this.C.x * (this.A.y - this.B.y))
    );
  }
}
