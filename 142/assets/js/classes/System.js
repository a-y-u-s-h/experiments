class System {
  constructor(cx, cy) {
    this.origin = new p5.Vector(cx, cy);
    this.hinge = new Hinge(cx, cy);
    this.bob = new Bob(cx, data.spring.rest_length);
    this.spring = new Spring(this.hinge, this.bob);
  }

  setHinge(hinge) {
    this.hinge = hinge;
    this.spring = new Spring(hinge, this.bob);
  }

  show() {
    if (this.hinge instanceof Bob) {
      this.hinge.update();
    } else {
      this.hinge.show();
    }
    this.spring.show();
    this.bob.show();
  }

  update() {
    this.spring.applyForce(this.hinge, this.bob);
    let gravity = new p5.Vector(0, data.sketch.gravity * data.bob.mass);
    this.bob.applyForce(gravity);
    this.bob.update();
    if (mouseIsPressed) {
      this.bob.drag(mouseX, mouseY);
    } else {
      this.bob.dragging = false;
    }
  }
}
