let data = {
  sketch: {
    background: "#000000"
  },
  circle: {
    noFill: true,
    noStroke: false,
    fill: "#000000",
    stroke: "#FFFFFF",
    strokeWeight: 1
  },
  packing: {
    n: 10
  }
};

class Circle {
  constructor(x_, y_, r_ = 0) {
    this.x = x_;
    this.y = y_;
    this.r = r_ / 2;
    this.growing = true;
  }

  show() {
    if (data.circle.noFill) {
      noFill();
    } else {
      fill(data.circle.fill);
    }
    if (data.circle.noStroke) {
      noStroke();
    } else {
      stroke(data.circle.stroke);
      strokeWeight(data.circle.strokeWeight);
    }
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  grow() {
    if (this.growing) {
      this.r += 1;
    }
  }

  edges() {
    return (
      this.x + this.r > width ||
      this.x - this.r < 0 ||
      this.y + this.r > height ||
      this.y - this.r < 0
    );
  }

  checkOverlap(other) {
    this.overlapping = false;
    let d = dist(this.x, this.y, other.x, other.y);
    if (d <= this.r + other.r) {
      this.overlapping = true;
      this.growing = false;
      other.growing = false;
      return this.overlapping;
    } else {
      return this.overlapping;
    }
  }
}

let circles = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0, upperLimit_i = data.packing.n; i < upperLimit_i; i += 1) {
    circles.push(new Circle(random(0, width), random(0, height)));
  }
}

function draw() {
  background(data.sketch.background);
  let c = newCircle();
  if (c !== null) {
    circles.push(c);
  }
  for (var i = 0, upperLimit_i = circles.length; i < upperLimit_i; i += 1) {
    if (circles[i]) {
      if (circles[i].growing) {
        if (circles[i].edges()) {
          circles[i].growing = false;
        } else {
          for (
            var j = 0, upperLimit_j = circles.length;
            j < upperLimit_j;
            j += 1
          ) {
            if (circles[j]) {
              if (i !== j) {
                let overlapping = circles[i].checkOverlap(circles[j]);
              }
            }
          }
        }
      }
      circles[i].grow();
      circles[i].show();
    }
  }
}

function newCircle() {
  let x = random(width);
  let y = random(height);

  let valid = true;

  for (var i = 0, upperLimit_i = circles.length; i < upperLimit_i; i += 1) {
    let d = dist(x, y, circles[i].x, circles[i].y);
    if (d - 2 * data.circle.strokeWeight < circles[i].r) {
      valid = false;
      break;
    }
  }

  if (valid) {
    return new Circle(x, y);
  } else {
    return null;
  }
}
