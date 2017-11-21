class Poles {
  constructor(cx, cy) {
    this.position = new p5.Vector(cx, cy);
    this.number = 4;
    this.size = 480 / this.number;
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    fill(data.dc.cover.fill.color);
    noStroke();
    for (
      var angle = 0, upperLimit_angle = 360;
      angle < upperLimit_angle;
      angle += 360 / this.number
    ) {
      let x =
        (data.dc.cover.r.inner -
          (data.dc.cover.r.outer - data.dc.cover.r.inner) +
          this.size * 0.05) *
        cos(angle);
      let y =
        (data.dc.cover.r.inner -
          (data.dc.cover.r.outer - data.dc.cover.r.inner) +
          this.size * 0.05) *
        sin(angle);
      push();
      translate(x, y);
      rotate(angle);
      rect(0, 0, this.size, this.size * 0.5);
      pop();
    }

    this.showInterpoles();
    pop();
  }

  showInterpoles() {
    for (
      var angle = 0, upperLimit_angle = 360;
      angle < upperLimit_angle;
      angle += 360 / this.number
    ) {
      let x =
        (data.dc.cover.r.inner -
          (data.dc.cover.r.outer - data.dc.cover.r.inner) -
          this.size * 0.06) *
        cos(angle + 45);
      let y =
        (data.dc.cover.r.inner -
          (data.dc.cover.r.outer - data.dc.cover.r.inner) -
          this.size * 0.06) *
        sin(angle + 45);
      push();
      translate(x, y);
      rotate(angle + 45);
          fill(0);
    noStroke();
      rect(0, 0, this.size, this.size * 0.05);
      pop();
    }
  }
}
