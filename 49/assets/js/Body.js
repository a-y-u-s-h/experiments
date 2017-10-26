class Body {
  constructor(x, y, z = 0, mass = 0, i = 0) {
    this.mass = mass;
    this.position = new p5.Vector(x, y, z);
    this.velocity = new p5.Vector(0, 0, 0);
    this.acceleration = new p5.Vector(0, 0, 0);
    this.i = i;
    this.r = data.body.r_multipler.three * this.mass;
  }

  display3D() {
    this.r = data.body.r_multipler.three * this.mass;
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
  }

  applyForce(force) {
    if (this.mass !== 0) {
      let acceleration = force.mag() / this.mass;
      let unit = force.normalize();
      this.acceleration = unit.mult(acceleration);
    }
  }

  calculateForce(another) {

    let distance = abs(this.position.dist(another.position));

    if (distance > (this.r + another.r) ) {
      var magnitude =
        data.body.force_constant *
        this.mass *
        another.mass /
        Math.pow(distance, 3);
    } 
    var direction = p5.Vector.sub(this.position, another.position);
    direction.normalize();
    return direction.mult(-magnitude);
  }
}
