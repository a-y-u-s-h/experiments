class Body {
  constructor(x, y, z = 0, mass = 0, i = 0, type = "normal") {
    this.mass = mass;
    this.position = new p5.Vector(x, y, z);
    this.type = type;
    if (this.type == "normal") {
      this.velocity = new p5.Vector(
        data.body.initial_velocity.x,
        data.body.initial_velocity.y,
        data.body.initial_velocity.z
      );
    } else {
      this.velocity = new p5.Vector(0, 0, 0);
    }
    this.acceleration = new p5.Vector(0, 0, 0);
    this.i = i;
    this.r = data.body.r_multipler.three * this.mass;
  }

  display3D() {
    if (this.type == "normal") {
      this.r = data.body.r_multipler.three * this.mass;
    } else {
      this.r = data.rings.body.r_multipler.three;
    }
    push();
    translate(this.position.x, this.position.y, this.position.z);
    sphere(this.r * 0.5);
    pop();
  }

  display2D() {
    this.r = data.body.r_multipler.two * this.mass;
    push();
    translate(this.position.x, this.position.y);
    ellipse(0, 0, this.r * 2, this.r * 2);
    pop();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    if (this.type == "normal") {
      this.mass = data.body.mass;
    } else {
      this.mass = data.rings.lambda;
    }
    this.acceleration.mult(0);
  }

  applyForce(force) {
    if (this.mass !== 0) {
      let acceleration = force.mag() / this.mass;
      let unit = force.normalize();
      this.acceleration = unit.mult(acceleration);
    }
  }

  calculateForce(another) {
    let distance = this.position.dist(another.position);
    let threshhold = 0;

    if (distance > threshhold) {
      var magnitude =
        data.body.force_constant *
        this.mass *
        another.mass /
        Math.pow(distance, 2);
    }
    var direction = p5.Vector.sub(this.position, another.position);
    direction.normalize();
    if (this.mass > 0) {
      return direction.mult(magnitude);
    } else {
      return direction.mult(-magnitude);
    }
  }

  netForce(forces) {
    let netf = new p5.Vector(0, 0, 0);
    forces.forEach(force => {
      netf.add(force);
    });
    return netf;
  }
}
