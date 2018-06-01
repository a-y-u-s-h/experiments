class Ball {
  constructor(cx, cy) {
    this.position = new p5.Vector(cx, cy);
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(5);
    this.loading = true;
    this.image = loadImage("assets/media/img/144.png", loaded);
  }

  run() {
      this.update();
      this.show();
  }

  update() {
    this.position.add(this.velocity);
  }

  show() {
    push();
    translate(this.position.x, this.position.y);

    // Outer
    push();
    if (data.ball.outer.fill.check) {
      fill(data.ball.outer.fill.color);
    } else {
      noFill();
    }

    if (data.ball.outer.stroke.check) {
      strokeWeight(data.ball.outer.stroke.weight);
      stroke(data.ball.outer.stroke.color);
    } else {
      noStroke();
    }
    ellipse(0, 0, data.ball.outer.radius * 2, data.ball.outer.radius * 2);
    pop();

    // Inner
    push();
    if (data.ball.inner.fill.check) {
      fill(data.ball.inner.fill.color);
    } else {
      noFill();
    }

    if (data.ball.inner.stroke.check) {
      strokeWeight(data.ball.inner.stroke.weight);
      stroke(data.ball.inner.stroke.color);
    } else {
      noStroke();
    }
    ellipse(0, 0, data.ball.inner.radius * 2, data.ball.inner.radius * 2);
    image(this.image, 0, 0, data.ball.outer.radius * 2, data.ball.outer.radius * 2);
    pop();
    pop();
  }
}
