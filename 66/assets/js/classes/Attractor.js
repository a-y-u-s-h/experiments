class Attractor {
  constructor(cx, cy) {
    this.position = new p5.Vector(cx, cy);
    this.velocity = new p5.Vector();
    this.acceleration = new p5.Vector();
    this.mass = data.attractor.mass;
    this.size = data.attractor.size;
  }

  show() {
    push();
    if (data.attractor.stroke.check) {
      stroke(data.attractor.stroke.color);
      strokeWeight(data.attractor.stroke.weight);
    } else {
      noStroke();
    }

    if (data.attractor.fill.check) {
      fill(data.attractor.fill.color);
    } else {
      noFill();
    }

    ellipse(
      this.position.x,
      this.position.y,
      data.attractor.size,
      data.attractor.size
    );
    pop();
  }

  update() {
    this.mass = data.attractor.mass;
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
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
