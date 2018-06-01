class Particle {
  constructor(cx, cy) {
    this.position = new p5.Vector(cx, cy);
    this.velocity = new p5.Vector();
    this.acceleration = new p5.Vector();
    this.mass = data.particle.mass;
    this.forces = [];
    this.netf = new p5.Vector();
    this.size = data.particle.size;
  }

  show() {
    push();
    if (data.particle.stroke.check) {
      stroke(data.particle.stroke.color);
      strokeWeight(data.particle.stroke.weight);
    } else {
      noStroke();
    }

    if (data.particle.fill.check) {
      // fill(data.particle.fill.color);
      fill(constrain(this.velocity.mag(), 0, 100), 100, 100);
    } else {
      noFill();
    }

    ellipse(
      this.position.x,
      this.position.y,
      data.particle.size,
      data.particle.size
    );
    pop();
  }

  update() {
    this.mass = data.particle.mass;
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }

  attracted(target) {
    let relative_position = p5.Vector.sub(target.position, this.position);
    let distance_squared = relative_position.magSq();
    distance_squared = constrain(
      distance_squared,
      target.size * 3,
      target.size * 2 * 10
    );
    let direction = relative_position.normalize();
    let force_magnitude =
      data.sketch.G / distance_squared * this.mass * target.mass;
    let force = direction.setMag(force_magnitude);
    this.netf.add(force);
    this.applyForce(this.netf);
  }

  applyForce(force) {
    this.acceleration = force.div(this.mass);
  }

  clearForce() {
    this.netf = new p5.Vector();
  }

  edges() {
    if (this.position.x > width || this.position.x < 0) {
      this.velocity.x *= -1;
    }

    if (this.position.y > height || this.position.y < 0) {
      this.velocity.y *= -1;
    }
  }
}
