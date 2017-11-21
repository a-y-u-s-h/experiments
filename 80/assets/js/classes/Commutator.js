class Commutator {
  constructor(cx, cy) {
    this.position = new p5.Vector(cx, cy);
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    this.rotate();
    if (data.dc.commutator.stroke.check) {
      stroke(data.dc.commutator.stroke.color);
      strokeWeight(data.dc.commutator.stroke.weight);
    } else {
      noStroke();
    }

    if (data.dc.commutator.fill.outer.check) {
      fill(data.dc.commutator.fill.outer.color);
    } else {
      noFill();
    }

    ellipse(
      0,
      0,
      data.dc.commutator.r.outer * 2,
      data.dc.commutator.r.outer * 2
    );

    for (
      var angle = 0, upperLimit_angle = 360;
      angle < upperLimit_angle;
      angle += 360 / data.dc.conductors
    ) {
      let x1 = 0 + data.dc.commutator.r.inner * cos(angle);
      let y1 = 0 + data.dc.commutator.r.inner * sin(angle);
      let x2 = 0 + data.dc.commutator.r.outer * cos(angle);
      let y2 = 0 + data.dc.commutator.r.outer * sin(angle);
      line(x1, y1, x2, y2);
    }
    if (data.dc.commutator.fill.inner.check) {
      fill(data.dc.commutator.fill.inner.color);
    } else {
      noFill();
    }
    ellipse(
      0,
      0,
      data.dc.commutator.r.inner * 2,
      data.dc.commutator.r.inner * 2
    );

    pop();
  }

  rotate() {
    rotate(frameCount * data.dc.rotation_speed);
  }
}
