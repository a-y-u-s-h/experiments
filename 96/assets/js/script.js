let data = {
  sketch: {
    background: "#00000021"
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
  background(0);
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

  if (frameCount % 10 == 0) {
    reinit();
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

function reinit() {
  background(data.sketch.background);
  count = data.pathfinders.counter;
  number = data.pathfinders.n;
  paths = [];
  for (var i = 0, upperLimit_i = data.pathfinders.n; i < upperLimit_i; i += 1) {
    paths.push(new Pathfinder());
  }
}

class Pathfinder {
  constructor(cx = width * 0.5, cy = height) {
    this.location = new p5.Vector(cx, cy);
    this.lastLocation = new p5.Vector(this.location.x, this.location.y);
    this.velocity = new p5.Vector(0, -10);
    this.diameter = random(1, 4);
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

      if (this.diameter > 1) {
        count++;
        let bump = new p5.Vector(random(-0.7, 0.7), random(-0.1,0));
        bump.mult(2);

        this.velocity.normalize();
        this.velocity.mult(3);
        this.velocity.add(bump);
        this.velocity.mult(random(0, 20));

        this.location.add(this.velocity);

        // Controlling length
        if (random(0, 1) < 0.3) {
          let finder = new Pathfinder();
          finder.parent(this);
          paths.push(finder);
        } else {
          if (!this.isFinished) {
            this.isFinished = true;
            noStroke();
            fill(220, 230, 30, 30);
            let r = random(10, 20);
            ellipse(this.location.x, this.location.y, r, r);
            stroke(255, 70, 40, 200);
          }
        }
      }
    }
  }
}
