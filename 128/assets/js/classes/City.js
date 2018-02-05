class City {
  constructor(x, y) {
    this.position = new p5.Vector(x, y);
    this.r = data.cities.r;
  }

  show() {
    push();
    ellipse(this.position.x, this.position.y, this.r, this.r);
    pop();
  }
}
