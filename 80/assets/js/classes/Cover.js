class Cover {
  constructor(cx, cy) {
    this.position = new p5.Vector(cx, cy);
  }

  show() {
    push();
    if (data.dc.cover.stroke.check) {
      stroke(data.dc.cover.stroke.color);
      strokeWeight(data.dc.cover.stroke.weight);
    } else {
      noStroke();
    }

    if (data.dc.cover.fill.check) {
      fill(data.dc.cover.fill.color);
    } else {
      noFill();
    }
    ellipse(this.position.x, this.position.y, data.dc.cover.r.outer * 2, data.dc.cover.r.outer * 2);
    fill(255);
    noStroke();
    ellipse(this.position.x, this.position.y, data.dc.cover.r.inner * 2, data.dc.cover.r.inner * 2);

    pop();
  }
}
