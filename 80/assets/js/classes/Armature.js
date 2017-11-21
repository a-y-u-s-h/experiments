class Armature {
  constructor(cx, cy) {
    this.position = new p5.Vector(cx, cy);
    this.conductors = [];
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    this.rotate();
    if (data.dc.armature.stroke.check) {
      stroke(data.dc.armature.stroke.color);
      strokeWeight(data.dc.armature.stroke.weight);
    } else {
      noStroke();
    }

    if (data.dc.armature.fill.outer.check) {
      fill(data.dc.armature.fill.outer.color);
    } else {
      noFill();
    }

    ellipse(
      0,
      0,
      data.dc.armature.r.outer * 2,
      data.dc.armature.r.outer * 2
    );

    stroke(0);
    strokeCap(SQUARE);
    strokeWeight(1);
    fill(255);
    for (
      var angle = 0, upperLimit_angle = 360;
      angle < upperLimit_angle;
      angle += 360 / data.dc.conductors
    ) {
      let x =
        0 +
        (data.dc.armature.r.inner + data.dc.armature.r.outer) *
          0.5 *
          cos(angle);
      let y =
        0 +
        (data.dc.armature.r.inner + data.dc.armature.r.outer) *
          0.5 *
          sin(angle);
      push();
      translate(x, y);
      rotate(angle + 270);
      rect(0, 0, 10, 30);
      pop();
    }

    if (data.dc.armature.fill.inner.check) {
      fill(data.dc.armature.fill.inner.color);
    } else {
      noFill();
    }
    stroke(255);
    strokeWeight(1);
    ellipse(
      0,
      0,
      data.dc.armature.r.inner * 2,
      data.dc.armature.r.inner * 2
    );
    pop();
  }

    rotate() {
    rotate(frameCount * data.dc.rotation_speed);
  }
}
