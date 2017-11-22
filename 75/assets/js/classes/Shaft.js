class Shaft {
  constructor(cx, cy) {
    this.position = new p5.Vector(cx, cy);
  }

  invisibleCircle() {
    push();
    translate(this.position.x, this.position.y);
    fill(220);
    noStroke();
    ellipse(0, 0, data.dc.cover.r.outer * 0.85, data.dc.cover.r.outer * 0.85);
    pop();
  }

  show() {
    push();
    if (data.dc.shaft.stroke.check) {
      stroke(data.dc.shaft.stroke.color);
      strokeWeight(data.dc.shaft.stroke.weight);
    } else {
      noStroke();
    }

    if (data.dc.shaft.fill.check) {
      fill(data.dc.shaft.fill.color);
    } else {
      noFill();
    }
    ellipse(
      this.position.x,
      this.position.y,
      data.dc.shaft.r * 2,
      data.dc.shaft.r * 2
    );
    pop();
  }
}
