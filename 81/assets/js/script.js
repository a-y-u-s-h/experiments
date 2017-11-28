let data = {
  sketch: {
    background: "#FFFFFF"
  },
  arcs: {
    number: 20,
    base_size: 150,
    speed_factor: 0.2
  }
};

let waves = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("canvas");
  angleMode(DEGREES);
  ellipseMode(CENTER);
  colorMode(HSB, 100);

  noStroke();

  for (var i = 0, upperLimit_i = data.arcs.number; i < upperLimit_i; i += 1) {
    waves.push(new Arc(width * 0.5, height, i));
  }
}

function draw() {
  background(map(mouseX + mouseY, 0, width + height, 0, 100), 100, 100, 50);

  for (var i = waves.length - 1, upperLimit_i = 0; i > upperLimit_i; i -= 1) {
    fill(50 + 50 * sin(frameCount * 0.01 * i + i * 10), 100, 100, 10);
    stroke(50 + 50 * sin(frameCount * 0.01 * i + i * 10), 100, 100, 30);
    strokeWeight(2);
    waves[i].show();
  }
}

class Arc {
  constructor(cx, cy, i = 0) {
    this.origin = new p5.Vector(cx, cy);
    this.i = i;
  }

  show() {
    push();
    translate(this.origin.x, this.origin.y);
    arc(
      0,
      0,
      data.arcs.base_size * (1 + this.i),
      data.arcs.base_size * (1 + this.i),
      180,
      -90 +
        89 *
          sin(
            frameCount * data.arcs.speed_factor * (data.arcs.number - this.i) +
              this.i * 2
          ),
      PIE
    );
    pop();
  }
}
