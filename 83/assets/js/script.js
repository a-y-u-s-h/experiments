let data = {
  sketch: {
    background: "#000000"
  }
};

let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB, 100);
  noStroke();
}

function draw() {
  background(data.sketch.background);

  if (frameCount % 2 == 0) {
      particles.push(
        new Particle(
          randomGaussian(width * 0.5, width * 0.05),
          randomGaussian(height, 2)
        )
      );
  }

  for (var i = 0, upperLimit_i = particles.length; i < upperLimit_i; i += 1) {


    if (particles[i]) {
      particles[i].update();
      particles[i].show();
      if (particles[i].lifespan < 0) {
        particles.splice(i, 1);
        i--;
      }
    }
  }

  console.log(particles.length);
}

class Particle {
  constructor(x, y) {
    this.origin = new p5.Vector(x, y);
    this.x = x;
    this.y = y;
    this.lifespan = 400;
    this.hue = random(20, 40);
    this.r = random(2, 3);
    this.original_r = this.r;
    this.delay = random(0, 360);
  }

  show() {
    push();
    translate(this.x, this.y);
    fill(this.hue + 20 * sin(frameCount), 100, this.delay, 100);
    ellipse(0, 0, this.r * 2, this.r * 2);
    pop();
  }

  update() {
    this.lifespan--;
    this.x = this.origin.x + 100 * sin(frameCount + this.delay);
    this.y = this.y - 2;

    let distance = dist(this.x, this.y, mouseX, mouseY);

    this.r = (this.original_r + 2) * sin(frameCount * 0.5 * this.original_r);
  }
}
