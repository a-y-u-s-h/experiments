class Hinge {
  constructor(cx, cy) {
    this.origin = new p5.Vector(cx, cy);
    this.position = new p5.Vector(cx, cy);
    this.fixed = true;
  }

  show() {
    push();
    strokeWeight(8);
    stroke(0);
    point(this.position.x, this.position.y);
    pop();
  }

  update(location) {
    if (location) {
      this.position = location.copy();
    } else {
      this.position = this.origin.copy();
    }
  }

}
