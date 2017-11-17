class Circle {
  constructor(cx, cy, radius, i = 0) {
    this.position = new p5.Vector(cx, cy);
    this.start = new p5.Vector(cx, cy);
    if (i !== 0) {
      this.i = 1;
    } else {
      this.i = data.circle.mf;
    }
    this.r = radius * this.i;
    if (this.r > data.circle.threshshold_radius) {
      this.child = new Circle(
        cx + this.r * (1 + data.circle.mf * data.circle.spacing),
        cy,
        this.r
      );
    } else {
      this.child = null;
    }

    if (this.child == null) {
      this.px =
        cx +
        this.r * cos(frameCount * 0.001 * data.circle.root * data.circle.speed);
      this.py =
        cy +
        this.r * sin(frameCount * 0.001 * data.circle.root * data.circle.speed);
      this.trail = [];
    }
  }

  update() {
    if (this.child) {
      this.child.position.x =
        this.position.x +
        (this.r + this.child.r * data.circle.spacing) *
          cos(
            frameCount *
              0.04 *
              (data.circle.root - this.child.r) *
              data.circle.speed
          );
      this.child.position.y =
        this.position.y +
        (this.r + this.child.r * data.circle.spacing) *
          sin(
            frameCount *
              0.04 *
              (data.circle.root - this.child.r) *
              data.circle.speed
          );
    } else {
      this.px =
        this.position.x +
        this.r * cos(frameCount * 0.04 * (this.r * 20) * data.circle.speed);
      this.py =
        this.position.y +
        this.r * sin(frameCount * 0.04 * (this.r * 20) * data.circle.speed);

      this.trail.push(new TrailPoint(this.px, this.py));

      if (this.trail.length > data.trail.points) {
        this.trail.splice(0, 1);
      }
    }
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    noFill();
    stroke(0);
    ellipse(0, 0, this.r * 2, this.r * 2);
    pop();

    if (this.child) {
      this.child.update();
      this.child.show();
    } else {
      for (
        var i = 0, upperLimit_i = this.trail.length;
        i < upperLimit_i;
        i += 1
      ) {
        if (i > 0) {
          this.trail[i].show(this.trail[i - 1]);
        } else {
          this.trail[i].show();
        }
      }
    }
  }
}
