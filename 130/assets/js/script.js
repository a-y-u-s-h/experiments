let data = {
  sketch: {
    background: "#FFFFFF01"
  }
};

let ants = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSL, 100);
  rectMode(CENTER);
  ellipseMode(CENTER);
  noStroke();

  for (var y = 0; y < height; y += 3) {
    ants.push(new Ant(random(width), y));
  }
}

function draw() {
  background(data.sketch.background);

  for (var i = 0; i < ants.length; i += 1) {
    ants[i].update();
    ants[i].show();
  }
}

class Ant {
  constructor(x, y, i = 0) {
    this.position = new p5.Vector(x, y);
    this.size = 5;
    this.i = i;
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    fill(
      map(
        this.position.x,
        0,
        width,
        10 + 5 * map(this.i, 0, ants.length, 1, 2) * cos(frameCount + 10 * noise(this.position.x, this.position.y)),
        50 + 50 * map(this.i, 0, ants.length, 0.5, 1) * sin(frameCount + 10 * noise(this.position.x, this.position.y))
      ),
      100,
      50
    );
    ellipse(0, 0, this.size, this.size);
    pop();
  }

  update() {
    if (this.position.x > width + this.size) {
      this.position.x = -this.size;
    }

    if (this.position.x < -this.size) {
      this.position.x = width + this.size;
    }

    if (this.position.y > height + this.size) {
      this.position.y = -this.size;
    }

    if (this.position.y < -this.size) {
      this.position.y = height + this.size;
    }
    this.position.x += 10 * noise(this.position.x, this.position.y) * sin(frameCount * map(this.i, 0, ants.length, 0, 2 * noise(this.i, this.position.x)));
    this.position.y += 10 * noise(this.position.x, this.position.y) * cos(frameCount * map(this.i, 0, ants.length, 0, 2 * noise(this.i, this.position.x)));
    this.position.x += 1;
  }
}
