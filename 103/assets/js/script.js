let data = {
  sketch: {
    background: "#30B4DC"
  },
  fractal: {
    radius: 200,
    points: 3
  }
};

let snowflake = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES);
  stroke(255);
  if (data.fractal.points > 0) {
    for (var angle = 0; angle < 360; angle += 360 / data.fractal.points) {
      let x1 = data.fractal.radius * cos(angle);
      let y1 = data.fractal.radius * sin(angle);
      let x2 = data.fractal.radius * cos(angle + 360 / data.fractal.points);
      let y2 = data.fractal.radius * sin(angle + 360 / data.fractal.points);
      snowflake.push(new Koch(x1, y1, x2, y2));
    }
  }
}

function draw() {
  background(data.sketch.background);

  push();
  noStroke();
  fill(0);
  textSize(16);
  text("Click to generate", width * 0.05, height * 0.1);
  text("Press any key to reset", width * 0.05, height * 0.13);
  pop();
  translate(width * 0.5, height * 0.5);
  snowflake.forEach(koch => {
    koch.show();
  });
}

let pressed = 0;
function keyPressed() {
  snowflake = [];
  pressed = 0;
  if (data.fractal.points > 0) {
    for (var angle = 0; angle < 360; angle += 360 / data.fractal.points) {
      let x1 = data.fractal.radius * cos(angle);
      let y1 = data.fractal.radius * sin(angle);
      let x2 = data.fractal.radius * cos(angle + 360 / data.fractal.points);
      let y2 = data.fractal.radius * sin(angle + 360 / data.fractal.points);
      snowflake.push(new Koch(x1, y1, x2, y2));
    }
  }
}

function mousePressed() {
  pressed += 1;
  if (pressed <= 6) {
    snowflake.forEach(koch => {
      koch.generate();
    });
  }
}

class Koch {
  constructor(x1, y1, x2, y2) {
    this.generation = 0;
    this.start = new p5.Vector(x1, y1);
    this.end = new p5.Vector(x2, y2);
    this.array = [new Line(this.start, this.end)];
  }

  show() {
    this.array.forEach(line => {
      line.show();
    });
  }

  generate() {
    let next = [];

    // For every line in current generation (two points)
    // Figure out the next generation (5 points including start and end)
    // that need to be created..
    // and connect every point with a line.
    // and store them in array
    this.array.forEach(line => {
      // Points : start (a)----b----/--c--\----d----(e) end
      let a = line.start;
      let e = line.end;
      let b = new p5.Vector((2 * a.x + e.x) / 3, (2 * a.y + e.y) / 3);
      let d = new p5.Vector((2 * e.x + a.x) / 3, (2 * e.y + a.y) / 3);
      let side = p5.Vector.sub(d, b);
      side.rotate(-radians(60));
      let c = p5.Vector.add(b, side);

      next.push(new Line(a, b));
      next.push(new Line(b, c));
      next.push(new Line(c, d));
      next.push(new Line(d, e));
    });

    this.array = next;
  }
}

class Line {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  show() {
    push();
    line(this.start.x, this.start.y, this.end.x, this.end.y);
    pop();
  }
}
