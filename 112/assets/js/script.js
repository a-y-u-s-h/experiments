let data = {
  sketch: {
    background: "#FF080723"
  }
};

let wave1;
let wave2;
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.id("canvas");
  colorMode(HSB, 100);
  rectMode(CENTER);
  ellipseMode(CENTER);
  angleMode(DEGREES);
  wave1 = new Wave();
  wave2 = new Wave();
  stroke(0);
  fill("#56ABBC78");
}

function draw() {
  background(data.sketch.background);
  wave1.show();
  wave2.show();
}

class Wave {
  constructor(cx, cy) {
    this.position = new p5.Vector(cx, cy);
    this.velocity = new p5.Vector();
    this.acceleration = new p5.Vector();
    this.size = 200;
    this.thickness = 5;
  }

  show() {
    push();

    translate(this.position.x, this.position.y);
    for (var i = -width * 0.5; i < width * 0.5; i += 30) {
      push();
      rotateX(radians(frameCount * 0.9 + i * (0.1 + 0.1 * sin(frameCount))));
      if (floor(i / 30) % 2 == 0) {
        push();
        fill("#DD7514");
        translate(i, this.size * 0.5 * sin(i * 0.25 + frameCount * 0.5), 0);
        box(this.thickness, this.size * sin(i * 0.25 + frameCount * 0.5));
        pop();
        push();
        fill("seagreen");
        translate(i, -this.size * 0.5 * sin(i * 0.25 + frameCount * 0.5), 0);
        box(this.thickness, this.size * sin(i * 0.25 + frameCount * 0.5));
        pop();
      } else {
        push();
        fill("#15B9D0");
        translate(i, this.size * 0.5 * sin(i * 0.25 + frameCount * 0.5), 0);
        box(this.thickness, this.size * sin(i * 0.25 + frameCount * 0.5));
        pop();
        push();
        fill("#D01263");
        translate(i, -this.size * 0.5 * sin(i * 0.25 + frameCount * 0.5));
        box(this.thickness, this.size * sin(i * 0.25 + frameCount * 0.5));
        pop();
      }
      fill(0);
      push();
      translate(i, this.size * sin(i * 0.25 + frameCount * 0.5), 0);
      sphere(8);
      pop();

      push();
      translate(i, -this.size * sin(i * 0.25 + frameCount * 0.5), 0);
      sphere(8);
      pop();
      pop();
    }
    pop();
  }
}
