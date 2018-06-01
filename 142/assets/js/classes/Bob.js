class Bob {
  constructor(cx, cy) {
    this.origin = new p5.Vector(cx, cy);
    this.position = new p5.Vector(cx, cy);
    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0);
    this.dragOffset = new p5.Vector(0, 0);

    this.mass = data.bob.mass;
    this.damping = data.bob.damping;
    this.r = data.bob.radius;
    this.dragging = false;
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    if (data.bob.stroke.check) {
      strokeWeight(data.bob.stroke.weight);
      stroke(data.bob.stroke.color);
    } else {
      noStroke();
    }
    if (data.bob.fill.check) {
      fill(data.bob.fill.color);
    } else {
      noFill();
    }
    ellipse(0, 0, data.bob.radius, data.bob.radius);
    pop();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.mult(this.damping);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.r = data.bob.radius;
    this.mass = data.bob.mass;
    this.damping = data.bob.damping;
  }

  applyForce(force) {
    this.acceleration.add(force.div(this.mass));
  }

  drag(mx, my) {
    let d = dist(mx, my, this.position.x, this.position.y);
    if (d < this.r * 0.5) {
      this.dragging = true;
      this.dragOffset.x = this.position.x - mx;
      this.dragOffset.y = this.position.y - my;
    }
    if (this.dragging) {
      this.position.x = mx + this.dragOffset.x;
      this.position.y = my + this.dragOffset.y;
    }
  }
}
