class Label {
  constructor(cx, cy) {
    this.position = new p5.Vector(cx, cy);
  }

  show() {
    this.shaft();
    this.commutator();
    this.fieldWinding();
    this.interpole();

    this.frame();
    this.armature();
    this.pole();
    this.armatureConductors();
  }

  shaft() {
    push();
    translate(this.position.x, this.position.y);
    let x = data.label.r * cos(30);
    let y = data.label.r * sin(-30);
    textSize(16);
    text("Shaft", x, y);
    x = x + 16;
    y = y + 16;
    strokeWeight(5);
    point(x, y);
    strokeWeight(1);
    line(x, y, x - 180, y);
    line(x - 180, y, 0, 0);
    pop();
  }

  commutator() {
    push();
    translate(this.position.x, this.position.y);
    let x = data.label.r * cos(10);
    let y = data.label.r * sin(-10);
    textSize(16);
    text("Commutator Segments", x, y);
    x = x + 16;
    y = y + 16;
    strokeWeight(5);
    point(x, y);
    strokeWeight(1);
    line(x, y, x - 180, y);
    line(x - 180, y, 0, 40);
    pop();
  }

  fieldWinding() {
    push();
    translate(this.position.x, this.position.y);
    let x = data.label.r * cos(10);
    let y = data.label.r * sin(10);
    textSize(16);
    text("Feild Winding", x, y);
    x = x + 16;
    y = y + 16;
    strokeWeight(5);
    point(x, y);
    strokeWeight(1);
    line(x, y, x - 200, y);
    line(x - 200, y, x - 280, y - 70);
    pop();
  }

  interpole() {
    push();
    translate(this.position.x, this.position.y);
    let x = data.label.r * cos(30);
    let y = data.label.r * sin(30);
    textSize(16);
    text("Interpole", x, y);
    x = x + 16;
    y = y + 16;
    strokeWeight(5);
    point(x, y);
    strokeWeight(1);
    line(x, y, x - 180, y);
    line(x - 180, y, 0, y - 40);
    pop();
  }

  frame() {
    push();
    translate(this.position.x, this.position.y);
    let x = data.label.r * cos(180 - 30);
    let y = data.label.r * sin(-30);
    textSize(16);
    text("Frame", x, y);
    x = x + 16;
    y = y + 16;
    strokeWeight(5);
    point(x, y);
    strokeWeight(1);
    line(x, y, x + 180, y);
    line(x + 180, y, x + 220, y + 40);
    pop();
  }
  armature() {
    push();
    translate(this.position.x, this.position.y);
    let x = data.label.r * cos(180 - 10);
    let y = data.label.r * sin(-10);
    textSize(16);
    text("Armature", x, y);
    x = x + 16;
    y = y + 16;
    strokeWeight(5);
    point(x, y);
    strokeWeight(1);
    line(x, y, x + 350, y);
    line(x + 350, y, -60, -40);
    pop();
  }

  pole() {
    push();
    translate(this.position.x, this.position.y);
    let x = data.label.r * cos(180 - 10);
    let y = data.label.r * sin(10);
    textSize(16);
    text("Pole", x, y);
    x = x + 16;
    y = y + 16;
    strokeWeight(5);
    point(x, y);
    strokeWeight(1);
    line(x, y, x + 180, y);
    line(x + 180, y, x + 260, y - 80);
    pop();
  }

  armatureConductors() {
    push();
    translate(this.position.x, this.position.y);
    let x = data.label.r * cos(180 - 30);
    let y = data.label.r * sin(30);
    textSize(16);
    text("Armature Conductors", x, y);
    x = x + 16;
    y = y + 16;
    strokeWeight(5);
    point(x, y);
    strokeWeight(1);
    line(x, y, x + 180, y);
    line(x + 180, y, -50, 95);
    pop();
  }
}
