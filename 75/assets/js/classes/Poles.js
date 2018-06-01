class Poles {
  constructor(cx, cy) {
    this.position = new p5.Vector(cx, cy);
    this.number = 2;
    this.size = (120);
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
          (data.dc.cover.r.outer - data.dc.cover.r.inner) -
          this.size * 0.01) *
        cos(angle);
      let y =
        (data.dc.cover.r.inner -
          (data.dc.cover.r.outer - data.dc.cover.r.inner) -
          this.size * 0.01) *
        sin(angle);
      push();
      translate(x, y);
      rotate(angle);
      rect(0, 0, this.size * 1.1, this.size * 0.5);
      pop();

      if ((angle / (360 / this.number)) % 2 == 0) {
        push();
            translate(x, y);
            rotate(angle);
            push();
                fill("#399988");
                rect(0, -this.size * 0.325, this.size * 0.6, this.size * 0.15);
                push();
                    noStroke();
                    fill(0);
                    text("✕", 0, -this.size * 0.315);
                pop();
            pop();
            push();
                fill("#B93B3B");
                rect(0, this.size * 0.325, this.size * 0.6, this.size * 0.15);
                push();
                        noStroke();
                        fill(0);
                        textSize(16);
                        text("•", 0, this.size * 0.315);
                pop();
            pop();
        pop();
      } else {
        push();
            translate(x, y);
            rotate(angle);
            push();
                fill("#B93B3B");
                rect(0, -this.size * 0.325, this.size * 0.6, this.size * 0.15);
                push();
                        noStroke();
                        fill(0);
                        textSize(16);
                        text("•", 0, -this.size * 0.315);
                pop();
            pop();
            push();
                fill("#399988");
                rect(0, this.size * 0.325, this.size * 0.6, this.size * 0.15);
                push();
                    noStroke();
                    fill(0);
                    text("✕", 0, this.size * 0.315);
                pop();
            pop();
        pop();
      }

      x =
        (data.dc.cover.r.inner -
          (data.dc.cover.r.outer - data.dc.cover.r.inner) -
          this.size * 0.7) *
        cos(angle);
      y =
        (data.dc.cover.r.inner -
          (data.dc.cover.r.outer - data.dc.cover.r.inner) -
          this.size * 0.7) *
        sin(angle);
      push();
      translate(x, y);
      if (angle % 180 == 0) {
        ellipse(0, 0, this.size * 0.5, this.size * 0.75);
      } else {
        ellipse(0, 0, this.size * 0.75, this.size * 0.5);
      }
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
        cos(angle + 180 / this.number);
      let y =
        (data.dc.cover.r.inner -
          (data.dc.cover.r.outer - data.dc.cover.r.inner) -
          this.size * 0.06) *
        sin(angle + 180 / this.number);
      push();
      translate(x, y);
      rotate(angle + 180 / this.number);
      fill(0);
      noStroke();
      rect(0, 0, this.size, this.size * 0.05);
      pop();
    }
  }
}
