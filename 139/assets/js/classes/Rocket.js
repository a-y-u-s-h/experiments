class Rocket {
  constructor(x = width * 0.5, y = height * 0.5) {
    this.position = new p5.Vector(x, y);
    this.velocity = new p5.Vector();
    this.acceleration = new p5.Vector();
    this.dna = new DNA();
    this.count = 0;
  }

  run() {
    this.update();
    this.show();
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.applyForce(this.dna.genes[this.count]);
    this.count++;
    if (this.count > data.rocket.lifespan - 1) {
      this.count = 0;
    }

    this.pass();

    this.velocity.add(this.acceleration);
    this.velocity.limit(5);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show() {
    push();
    fill(map(this.velocity.mag(), 0, 5, 0, 13), 100, 100, 20);
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
