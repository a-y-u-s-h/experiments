class Armature {
  constructor(cx, cy) {
    this.position = new p5.Vector(cx, cy);
    this.conductors = [];
  }

  insertConductors() {
    push();
    translate(this.position.x, this.position.y);
    this.rotate();
    for (
      var angle = 0, upperLimit_angle = 360;
      angle < upperLimit_angle;
      angle += 360 / data.dc.conductors
    ) {
      let x =
        (data.dc.armature.r.inner + data.dc.armature.r.outer) *
        0.55 *
        cos(angle + 0.5 * (360 / data.dc.conductors));
      let y =
        (data.dc.armature.r.inner + data.dc.armature.r.outer) *
        0.55 *
        sin(angle + 0.5 * (360 / data.dc.conductors));

      push();
      translate(x, y);
      let total = Math.floor(
        (angle + frameCount * data.dc.rotation_speed + 95) % 360
      );
      rotate(angle + 270);
      colorMode(HSB, 100);
      if (total <= 180) {
        if (total < 90) {
          fill(map(total, 0, 90, 50, 55), 100, 100);
        } else {
          fill(map(total, 90, 180, 55, 50), 100, 100);
        }
      } else {
        if (total < 270) {
          fill(map(total, 180, 270, 10, 0), 100, 100);
        } else {
          fill(map(total, 270, 360, 0, 10), 100, 100);
        }
      }
      ellipse(0, 0, 15, 15);
      if (total <= 180) {
        push();
        noStroke();
        fill(0);
        text("✕", 0, 0);
        pop();
      } else {
        push();
        noStroke();
        fill(0);
        textSize(16);
        text("•", 0, 0);
        pop();
      }
      pop();
    }
    pop();
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

    ellipse(0, 0, data.dc.armature.r.outer * 2, data.dc.armature.r.outer * 2);

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
    ellipse(0, 0, data.dc.armature.r.inner * 2, data.dc.armature.r.inner * 2);
    pop();
  }

  rotate() {
    rotate(frameCount * data.dc.rotation_speed);
  }
}
