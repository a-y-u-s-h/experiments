let digit;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  angleMode(DEGREES);
  noStroke();
  digit = new Digit(width * 0.5, height * 0.5, 8);
}

function draw() {
  background(0);
  digit.operate((frameCount / 30) % 16);
}

class Clock {
  constructor() {}
}

class Digit {
  constructor(x, y, value) {
    this.position = new p5.Vector(x, y);
    this.value = value % 9;
    this.magnify = 5;
    this.width = 50;
    this.height = 100;
    this.segment_width = 43;
    this.segment_height = 5;
    this.on = {
      a: false,
      b: false,
      c: false,
      d: false,
      e: false,
      f: false,
      g: false
    };
  }

  operate(value) {
    this.update(value);
    this.show();
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    fill("#FF2E2E90");
    scale(this.magnify);
    strokeCap(CURVE);
    textAlign(CENTER, CENTER);
    // a
    if (this.on.a) {
      push();
      translate(0, -this.height * 0.5);
      push();
      textSize(5);
      text("a", 0, -this.height * 0.1);
      pop();
      rect(0, 0, this.segment_width, this.segment_height);

      pop();
    }

    // d
    if (this.on.d) {
      push();
      translate(0, this.height * 0.5);
      push();
      textSize(5);
      text("d", 0, this.height * 0.1);
      pop();
      rect(0, 0, this.segment_width, this.segment_height);

      pop();
    }

    // b
    if (this.on.b) {
      push();
      translate(this.width * 0.5, -this.width * 0.5);
      push();
      textSize(5);
      text("b", this.width * 0.15, 0);
      pop();
      rotate(-90);
      rect(0, 0, this.segment_width, this.segment_height);
      pop();
    }

    // f
    if (this.on.f) {
      push();
      translate(-this.width * 0.5, -this.width * 0.5);
      push();
      textSize(5);
      text("f", -this.width * 0.15, 0);
      pop();
      rotate(90);
      rect(0, 0, this.segment_width, this.segment_height);
      pop();
    }

    // e
    if (this.on.e) {
      push();
      translate(-this.width * 0.5, this.width * 0.5);
      push();
      textSize(5);
      text("e", -this.width * 0.15, 0);
      pop();
      rotate(90);
      rect(0, 0, this.segment_width, this.segment_height);
      pop();
    }

    // c
    if (this.on.c) {
      push();
      translate(this.width * 0.5, this.width * 0.5);
      push();
      textSize(5);
      text("c", this.width * 0.15, 0);
      pop();
      rotate(90);
      rect(0, 0, this.segment_width, this.segment_height);
      pop();
    }

    // g
    if (this.on.g) {
      push();
      push();
      textSize(5);
      text("g", 0, -this.height * 0.1);
      pop();
      rect(0, 0, this.segment_width, this.segment_height);
      pop();
    }

    pop();
  }

  update(value = this.value) {
    this.value = value;
    switch (this.value) {
      case 0:
        this.on.a = true;
        this.on.b = true;
        this.on.c = true;
        this.on.d = true;
        this.on.e = true;
        this.on.f = true;
        this.on.g = false;
        break;
      case 1:
        this.on.a = false;
        this.on.b = true;
        this.on.c = true;
        this.on.d = false;
        this.on.e = false;
        this.on.f = false;
        this.on.g = false;
        break;
      case 2:
        this.on.a = true;
        this.on.b = true;
        this.on.c = false;
        this.on.d = true;
        this.on.e = true;
        this.on.f = false;
        this.on.g = true;
        break;
      case 3:
        this.on.a = true;
        this.on.b = true;
        this.on.c = true;
        this.on.d = true;
        this.on.e = false;
        this.on.f = false;
        this.on.g = true;
        break;
      case 4:
        this.on.a = false;
        this.on.b = true;
        this.on.c = true;
        this.on.d = false;
        this.on.e = false;
        this.on.f = true;
        this.on.g = true;
        break;
      case 5:
        this.on.a = true;
        this.on.b = false;
        this.on.c = true;
        this.on.d = true;
        this.on.e = false;
        this.on.f = true;
        this.on.g = true;
        break;
      case 6:
        this.on.a = true;
        this.on.b = false;
        this.on.c = true;
        this.on.d = true;
        this.on.e = true;
        this.on.f = true;
        this.on.g = true;
        break;
      case 7:
        this.on.a = true;
        this.on.b = true;
        this.on.c = true;
        this.on.d = false;
        this.on.e = false;
        this.on.f = false;
        this.on.g = false;
        break;
      case 8:
        this.on.a = true;
        this.on.b = true;
        this.on.c = true;
        this.on.d = true;
        this.on.e = true;
        this.on.f = true;
        this.on.g = true;
        break;
      case 9:
        this.on.a = true;
        this.on.b = true;
        this.on.c = true;
        this.on.d = true;
        this.on.e = false;
        this.on.f = true;
        this.on.g = true;
        break;
      case 10:
        this.on.a = true;
        this.on.b = true;
        this.on.c = true;
        this.on.d = false;
        this.on.e = true;
        this.on.f = true;
        this.on.g = true;
        break;
      case 11:
        this.on.a = false;
        this.on.b = false;
        this.on.c = true;
        this.on.d = true;
        this.on.e = true;
        this.on.f = true;
        this.on.g = true;
        break;
      case 12:
        this.on.a = true;
        this.on.b = false;
        this.on.c = false;
        this.on.d = true;
        this.on.e = true;
        this.on.f = true;
        this.on.g = false;
        break;
      case 13:
        this.on.a = false;
        this.on.b = true;
        this.on.c = true;
        this.on.d = true;
        this.on.e = true;
        this.on.f = false;
        this.on.g = true;
        break;
      case 14:
        this.on.a = true;
        this.on.b = false;
        this.on.c = false;
        this.on.d = true;
        this.on.e = true;
        this.on.f = true;
        this.on.g = true;
        break;
      case 15:
        this.on.a = true;
        this.on.b = false;
        this.on.c = false;
        this.on.d = false;
        this.on.e = true;
        this.on.f = true;
        this.on.g = true;
        break;
    }
  }
}

function windowResized() {
  rectMode(CENTER);
  angleMode(DEGREES);
  noStroke();
  digit = new Digit(width * 0.5, height * 0.5, 8);
}
