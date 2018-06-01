class Spring {
  constructor(hinge, bob) {
    this.hinge = hinge;
    this.bob = bob;
  }

  show() {
    push();
    stroke(data.spring.color);
    strokeWeight(data.spring.strokeWeight);
    line(
      this.hinge.position.x,
      this.hinge.position.y,
      this.bob.position.x,
      this.bob.position.y
    );
    pop();
  }

  applyForce(bob, hinge) {
    let currentLength = p5.Vector.sub(bob.position, hinge.position).mag();
    let direction = p5.Vector.sub(bob.position, hinge.position).normalize();

    let k = data.spring.constant;
    let stretch = currentLength - data.spring.rest_length;
    let spring = direction.mult(-(k * stretch) + 10 * sin(frameCount * 0.1));

    if (bob instanceof Bob) {
      bob.applyForce(spring);

      if (mouseIsPressed) {
        bob.drag(mouseX, mouseY);
      } else {
        bob.dragging = false;
      }
    }
    if (hinge instanceof Bob) {
      hinge.applyForce(spring.mult(-1));
      if (mouseIsPressed) {
        hinge.drag(mouseX, mouseY);
      } else {
        hinge.dragging = false;
      }
    }

  }
}
