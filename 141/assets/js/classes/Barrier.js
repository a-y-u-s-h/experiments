class Barrier {
  constructor(cx, cy, w, h) {
    this.position = new p5.Vector(cx, cy);
    this.width = w;
    this.height = h;
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    rect(0, 0, this.width, this.height);
    pop();
  }

  contains(p) {
    return (
      p.x > this.position.x - this.width * 0.5 &&
      p.x < this.position.x + this.width * 0.5 &&
      p.y > this.position.y - this.height * 0.5 &&
      p.y < this.position.y + this.height * 0.5
    );
  }
}
