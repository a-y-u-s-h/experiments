let data = {
  sketch: {
    background: "#261a07"
  },
  circles: {
    inner: {
      invertColors: true,
      speed: 0.01
    },
    outer: {
      outerspacing: 3,
      radius_multiplier: 1,
      n: 37,
      fill: "#d4b779",
      stroke: "#d4b779"
    }
  }
};

// Variable to store GUI
var controlkit;

// Function to create control GUI
var createControlKit = () => {
  controlkit = new ControlKit();
  controlkit
    .addPanel({
      fixed: false,
      label: "Sketch Controls"
    })
    .addColor(data.sketch, "background", {
      colorMode: "hex",
      label: "Background Color"
    })
    .addGroup({
      label: "Circle Specific Controls"
    })
    .addSubGroup({
      label: "Inner Ring"
    })
    .addCheckbox(data.circles.inner, "invertColors", {
      label: "Invert Colors?"
    })
    .addSubGroup({
      label: "Outer Ring"
    });
};
createControlKit();

class Circle {
  constructor(cx, cy, r, i = 0, inner, angle = 0) {
    this.cx = cx;
    this.cy = cy;
    this.r = r;
    this.br = r;
    this.i = i;
    this.inner = inner;
    this.angle = angle;
    this.speed = data.circles.inner.speed;
  }

  show() {
    push();
    translate(this.cx, this.cy);
    if (this.inner) {
      if (data.circles.inner.invertColors) {
        if (this.i % 2 == 0) {
          fill(data.circles.outer.fill);
        } else {
          fill(data.sketch.background);
        }
      } else {
        if (this.i % 2 == 0) {
          fill(data.sketch.background);
        } else {
          fill(data.circles.outer.fill);
        }
      }
      noStroke();
    } else {
      fill(data.circles.outer.fill);
      // noFill();
      stroke(data.circles.outer.stroke);
    }
    ellipse(0, 0, this.r * 2, this.r * 2);
    pop();
  }

  update() {
    this.r = this.br * Math.sin(this.speed);
    this.speed += 0.01;
  }
}

class CircleCollections {
  constructor(cx = 0, cy = 0) {
    this.cx = cx;
    this.cy = cy;
  }

  returnInnerCircleArray(cx, cy, rmin, n) {
    let inner = [];
    for (var i = n, lowerLimit = 0; i > lowerLimit; i -= 1) {
      let r = i * rmin;
      inner.push(new Circle(cx, cy - r, r, i, true));
    }
    return inner;
  }

  returnOuterCircleArray(cx, cy, cover_radius, rmax, n) {
    let outer = [];
    angleMode(DEGREES);
    let previous_angle;

    n = Math.floor((n + 1) / 2);
    for (var i = 0, upperLimit = n; i < upperLimit; i += 1) {
      let r = rmax / (i + 1);
      let angle;

      if (i > 0) {
        r *= data.circles.outer.radius_multiplier;
        let c = r + r * (i + 1) / i;
        let a = r + cover_radius;
        let b = cover_radius + r * (i + 1) / i;
        let c_squared = Math.pow(c, 2);
        let a_squared = Math.pow(a, 2);
        let b_squared = Math.pow(b, 2);
        angle =
          acos((a_squared + b_squared - c_squared) / (2 * a * b)) +
          previous_angle +
          data.circles.outer.outerspacing;
        previous_angle = angle;
        let ocx = cx + (cover_radius + r) * cos(angle);
        let ocy = cy - cover_radius + (cover_radius + r) * sin(angle);
        outer.push(new Circle(ocx, ocy, r, i, false));

        angle *= -1;
        angle += 180;
        ocx = cx + (cover_radius + r) * cos(angle);
        ocy = cy - cover_radius + (cover_radius + r) * sin(angle);
        outer.push(new Circle(ocx, ocy, r, i, false));
      } else {
        angle = -90;
        previous_angle = angle;
        let ocx = cx + (cover_radius + r) * cos(angle);
        let ocy = cy - cover_radius + (cover_radius + r) * sin(angle);
        outer.push(new Circle(ocx, ocy, r, i, false));
      }
    }
    return outer;
  }
}

let innerCircles = [];
let outerCircles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  let cc = new CircleCollections();
  innerCircles = cc.returnInnerCircleArray(width / 2, height / 2, 20, 7);
  outerCircles = cc.returnOuterCircleArray(
    width / 2,
    height / 2,
    140,
    50,
    data.circles.outer.n
  );
}

let count = 0;
function draw() {
  background(data.sketch.background);
  push();
  translate(width / 2, height / 2);
  angleMode(DEGREES);
  rotate(-90 + count);
  push();
  translate(-width / 2, -height / 2);
  for (var i = 0, upperLimit = innerCircles.length; i < upperLimit; i += 1) {
    innerCircles[i].show();
  }
  for (var i = 0, upperLimit = outerCircles.length; i < upperLimit; i += 1) {
    outerCircles[i].show();
  }
  push();
  translate(width / 2, height / 2);
  rotate(180 - count);
  rotate(count);
  push();
  translate(-width / 2, -height / 2);
  for (var i = 0, upperLimit = innerCircles.length; i < upperLimit; i += 1) {
    // innerCircles[i].update();
    innerCircles[i].show();
  }
  for (var i = 0, upperLimit = outerCircles.length; i < upperLimit; i += 1) {
    outerCircles[i].update();
    outerCircles[i].show();
  }
  pop();
  pop();
  count += 0.2;
}
