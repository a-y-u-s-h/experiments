class Rocket {
  constructor(x = width * 0.5, y = height * 0.5, dna) {
    this.position = new p5.Vector(x, y);
    this.velocity = new p5.Vector();
    this.acceleration = new p5.Vector();
    if (dna) {
      this.dna = dna;
    } else {
      this.dna = new DNA();
    }
    this.count = 0;
    this.fitness = 0;
    this.completed = false;
    this.crashed = false;
  }

  run(destination, b) {
    this.update(destination, b);
    this.show();
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  calcFitness(destination) {
    let d = dist(
      this.position.x,
      this.position.y,
      destination.x,
      destination.y
    );
    this.fitness = map(d, 0, (width + height) * 0.5, (width + height) * 0.5, 0);

    if (this.completed) {
      this.fitness *= 10;
    }

    if (this.crashed) {
      this.fitness /= 10;
    }
  }

  handleCrash(b) {
    this.crashed = b.contains(this.position);

    // Rocket has hit left or right of window
    if (this.position.x > width || this.position.x < 0) {
      this.crashed = true;
    }
    // Rocket has hit top or bottom of window
    if (this.position.y > height || this.position.y < 0) {
      this.crashed = true;
    }
  }

  handleCompleted(destination) {
    let d = dist(
      this.position.x,
      this.position.y,
      destination.x,
      destination.y
    );
    if (d < 10) {
      this.completed = true;
      this.position = destination.copy();
    }
  }

  update(destination, b) {
    this.handleCompleted(destination);
    this.handleCrash(b);

    this.edges();
    this.applyForce(this.dna.genes[frameCount % this.dna.genes.length]);
    if (!this.completed && !this.crashed) {
      this.applyForce(this.dna.genes[this.count]);
      this.velocity.add(this.acceleration);
      this.velocity.limit(10);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    } else if (this.completed) {
      this.position = destination.copy();
    }
  }

  show() {
    push();
    fill(0);
    noStroke();
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
