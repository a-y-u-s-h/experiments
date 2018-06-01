class Paddle {
  constructor(half) {
    this.half = half;
    if (this.half == "left") {
      this.position = new p5.Vector(width * 0.1, height * 0.5);
    } else {
      this.position = new p5.Vector(width * 0.9, height * 0.5);
    }
    this.w = 10;
    this.h = 50;
    this.color = color(0, 0, 0);
    this.velocity = new p5.Vector();
    this.acceleration = new p5.Vector();
  }

  run()  {
    this.update();
    this.show();
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    rectMode(CENTER);
    fill(this.color);
    rect(0, 0, this.w, this.h);
    pop();
  }

  update() {
    if (
      this.position.y < height * 0.93 - this.h * 0.5 ||
      this.position.y > height * 0.07 + this.h * 0.5
    ) {
      if (this.half === "right") {
        if (keyIsPressed) {
          switch (keyCode) {
            case UP_ARROW:
              this.position.y -= 5;
              break;
            case DOWN_ARROW:
              this.position.y += 5;
              break;
          }
        }
      } else {
        if (keyIsPressed) {
          switch (keyCode) {
            case "w":
            case "W":
              this.position.y -= 5;
              break;
            case "D":
            case "d":
              this.position.y += 5;
              break;
          }
        }
      }
    }
  }
}
