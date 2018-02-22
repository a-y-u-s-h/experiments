class Rocket {
  constructor(x = width * 0.5, y = height * 0.5, dna) {
    this.position = new p5.Vector(x, y);
    this.velocity = new p5.Vector();
    this.acceleration = new p5.Vector();
    if (dna) {
      this.dna = new DNA();
    } else {
      this.dna = new DNA();
    }
    this.count = 0;
    this.fitness = 0;
    this.completed = false;
  }

  run() {
    this.update();
    this.show();
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  calcFitness(target) {
    let d = dist(this.position.x, this.position.y, target.x, target.y);
    this.fitness = map(d, 0, (width + height) * 0.5, (width + height) * 0.5, 0);
  }

  update() {
    let d = dist(this.position.x, this.position.y, target.x, target.y);
    if (d < 10) {
      this.completed = true;
    }


    this.count++;
    if (this.count > data.rocket.lifespan - 1) {
      this.count = 0;
    }

    this.edges();
    if (!this.completed) {
      this.applyForce(this.dna.genes[this.count]);
      this.velocity.add(this.acceleration);
      this.velocity.limit(10);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    } else {
      this.position = target.copy();
    }
  }

  show() {
    push();
    fill(0);
    translate(this.position.x, this.position.y);
    rotate(degrees(this.velocity.heading()) - 90);
    triangle(
      data.rocket.size * 0.6,
      0,
      -data.rocket.size * 0.6,
      0,
      0,
      data.rocket.size * 2
    );
    pop();
  }

  edges() {
    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x *= -1;
    }

    if (this.position.y < 0 || this.position.y > height) {
      this.velocity.y *= -1;
    }
  }

  pass() {
    if (this.position.x < 0) {
      this.position.x = width;
    }

    if (this.position.x > width) {
      this.position.x = 0;
    }

    if (this.position.y < 0) {
      this.position.y = height;
    }

    if (this.position.y > height) {
      this.position.y = 0;
    }
  }
}
