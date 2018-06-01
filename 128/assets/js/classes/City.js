class City {
  constructor(x, y, i) {
    this.position = new p5.Vector(x, y);
    this.r = data.cities.r;
    this.i = i;
  }

  exist(i) {
    this.update(i);
    this.show();
  }

  show() {
    push();
    let multiplier = 1;
    if (this.i == 0 || this.i == data.cities.n - 1) {
      multiplier = 3;
    }
    if (this.i == 0) {
      fill("#D00D0D50");
    }

    if (this.i == data.cities.n - 1) {
      fill("#31818650");
    }
    ellipse(
      this.position.x,
      this.position.y,
      this.r * multiplier,
      this.r * multiplier
    );
    pop();
  }

  update(i) {
    this.i = i;
  }
}
