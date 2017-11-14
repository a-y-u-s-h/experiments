class Arrow {
  constructor(cx, cy) {
    this.start = new p5.Vector(cx, cy);
    this.position = new p5.Vector(cx, cy);
    this.velocity = new p5.Vector();
    this.acceleration = new p5.Vector();
    this.forces = [];
    this.netf = new p5.Vector();
    this.size = data.arrow.size;
    this.color = color(constrain(this.velocity.mag(), 20, 10), 100, 100, 50);
    this.destroyed = false;
  }

  show() {
    push();
    if (data.arrow.stroke.check) {
      stroke(constrain(this.velocity.mag(), 20, 10), 100, 100);
      strokeWeight(data.arrow.stroke.weight);
    } else {
      noStroke();
    }
    fill(this.color);
    let direction = this.velocity.normalize();
    let x = this.size * direction.x;
    let y = this.size * direction.y;
    push();
    translate(this.position.x, this.position.y);
    line(0, 0, x, y);
    pop();
    pop();
  }

  update() {
    this.mass = data.arrow.mass;
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    if (!this.destroyed) {
      this.color = color(constrain(this.velocity.mag(), 20, 10), 100, 100);
    }
  }

  attracted(target) {
    let relative_position = p5.Vector.sub(target.position, this.position);
    let distance_squared = relative_position.magSq();
    distance_squared = constrain(
      distance_squared,
      target.size * 3,
      target.size * 2 * 200
    );
    let direction = relative_position.normalize();
    let force_magnitude =
      data.sketch.constant / distance_squared * target.strength;
    let force;
    if (target.type === "south") {
      force = direction.setMag(force_magnitude);
    } else {
      force = direction.setMag(-force_magnitude);
    }
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
      this.position.x = this.start.x;
      this.velocity = new p5.Vector();
    }

    if (this.position.y > height + width * 0.5 || this.position.y < - width * 0.5) {
      this.position.y = this.start.y;
      this.velocity = new p5.Vector();
    }
  }

  destroy() {
    this.detroyed = true;
  }
}
