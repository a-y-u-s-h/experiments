class Path {
  constructor() {
    this.points = [];
    this.radius = 20;
  }

  addPoint(x, y) {
    this.points.push(new p5.Vector(x, y));
  }

  getStart()  {
    return this.points[0];
  }

  getEnd()  {
    return this.points[this.points.length - 1];
  }

  display() {
    push();
      // Draw thick line for radius
      stroke(175);
      strokeWeight(this.radius * 2);
      noFill();
      beginShape();
      for (let v of this.points) {
        vertex(v.x, v.y);
      }
      endShape();

      // Draw thin line for center of path
      stroke(0);
      strokeWeight(1);
      noFill();
      beginShape();
      for (let v of this.points) {
        vertex(v.x, v.y);
      }
      endShape();
    pop();
  }
}
