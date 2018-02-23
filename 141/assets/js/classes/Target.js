class Target {
  constructor(cx, cy) {
    this.position = new p5.Vector(cx, cy);
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    push();
    noStroke();
    fill(0);
    textSize(12);
    textAlign(CENTER, CENTER);
    text(`Target`, 0, -30);
    pop();
    if (data.target.fill.check) {
      fill(data.target.fill.color);
    } else {
      noFill();
    }

    if (data.target.stroke.check) {
      strokeWeight(data.target.stroke.weight);
      stroke(data.target.stroke.color);
    } else {
      noStroke();
    }
    ellipse(0, 0, 20, 20);
    pop();
  }
}
