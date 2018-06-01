let data = {
  sketch: {
    background: "#FFFFFF"
  },
  pathfinders: {
    n: 15,
    counter: 0
  }
};

let paths = [];
let number;
let count;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  angleMode(DEGREES);
  background(data.sketch.background);
  stroke(200, 0, 0, 200);
  smooth();

  for (var i = 0, upperLimit_i = data.pathfinders.n; i < upperLimit_i; i += 1) {
    paths.push(new Pathfinder());
  }
}

function draw() {
  for (var i = 0, upperLimit_i = paths.length; i < upperLimit_i; i += 1) {
    let location = paths[i].location;
    let lastLocation = paths[i].lastLocation;
    strokeWeight(paths[i].diameter);
    line(lastLocation.x, lastLocation.y, location.x, location.y);
    paths[i].update();
  }
}

function mousePressed() {
  background(data.sketch.background);
  count = data.pathfinders.counter;
  number = data.pathfinders.n;
  paths = [];
  for (var i = 0, upperLimit_i = data.pathfinders.n; i < upperLimit_i; i += 1) {
    paths.push(new Pathfinder());
  }
}

class Pathfinder {
  constructor(cx = width * 0.5, cy = height * 0.5) {
    this.location = new p5.Vector(cx, cy);
    this.lastLocation = new p5.Vector(this.location.x, this.location.y);
    this.velocity = new p5.Vector(0, -10);
    this.diameter = random(10, 20);
    this.isFinished = false;
  }

  parent(p) {
    this.location = p.location;
    this.lastLocation = p.lastLocation;
    this.velocity = p.velocity;
    this.diameter = p.diameter * 0.62;
    this.isFinished = p.isFinished;
    p.diameter = this.diameter;
  }

  update() {
    if (
      this.location.x > -10 &&
      this.location.x < width + 10 &&
      this.location.y > -10 &&
      this.location.y < height + 10
    ) {
      this.lastLocation.set(this.location.x, this.location.y);

      if (this.diameter > 0.2) {
        count++;
        let bump = new p5.Vector(random(-1, 1), random(-1, 1));
        bump.mult(4);

        this.velocity.normalize();
        this.velocity.mult(3);
        this.velocity.add(bump);
        this.velocity.mult(random(0.5, 1));

        this.location.add(this.velocity);

        // Controlling length
        if (random(0, 1) < 0.2) {
          let finder = new Pathfinder();
          finder.parent(this);
          paths.push(finder);
        } else {
          if (!this.isFinished) {
            this.isFinished = true;
            noStroke();
            fill(240, 230, 150, 100);
            ellipse(this.location.x, this.location.y, 10, 10);
            stroke(200, 0, 0, 200);
          }
        }
      }
    }
  }
}
