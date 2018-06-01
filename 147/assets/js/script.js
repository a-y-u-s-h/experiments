let creatures = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  ellipseMode(CENTER);
  angleMode(DEGREES);

  for (var i = 0, upperLimit_i = 400 ; i < upperLimit_i; i += 1 ) {
    creatures.push( new Being(random(width), random(height)));
  }
  noFill();
}

function draw() {
  background(255);
  stroke(0);
  creatures.forEach((creature) => {
    creature.run()
  });
}

class Being {
  constructor(x, y) {
    this.position = new p5.Vector(x, y);
    this.velocity = p5.Vector.random2D();
    this.acceleration = new p5.Vector();
    this.size = random(50, 150);
    this.phase = random(360);
    this.direction = random([-1, 1]);
    this.standard_deviation = random(0.01, 0.08);
  }

  run()  {
    this.update();
    this.show();
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    beginShape();
    for (var i = 0, upperLimit_i = 20; i < upperLimit_i; i += 1) {
      let x = this.size * (1 + 0.5 * randomGaussian(1, this.standard_deviation)) * sin(this.phase + i + frameCount * this.direction);
      let y = this.size * (1 + 0.5 * randomGaussian(1, this.standard_deviation)) * cos(this.phase + i + frameCount * this.direction);
      let d = dist(x, y, this.position.x, this.position.y);
      strokeWeight(1);
      curveVertex(x, y);
      // point(x, y);
    }
    endShape();
    pop();
  }

  update() {
    if (this.position.x >= width || this.position.x < 0) {
      this.velocity.x *= -1;
    }

    if (this.position.y >= height || this.position.y <= 0) {
      this.velocity.y *= -1;
    }
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }
}
