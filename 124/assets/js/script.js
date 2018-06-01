let data = {
  sketch: {
    background: "#FFFFFF01"
  }
};

let creatures = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB, 100);
  angleMode(DEGREES);
  noStroke();
  background(255);

  for (var i = 0; i < 2; i += 1) {
    creatures[i] = new Creature(width * 0.5, height * 0.5);
  }
}

function draw() {
  background(data.sketch.background);

  for (creature of creatures) {
    creature.run();
  }
}

class Creature {
  constructor(cx, cy) {
    this.position = new p5.Vector(cx, cy);
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(5);
    this.acceleration = new p5.Vector();
    this.r = 30;
    this.locations = [];
  }

  run() {
    this.trail();
    this.update();
  }

  update() {
    if (this.position.x > width - this.r || this.position.x < this.r) {
      this.velocity.x *= -1;
    }

    if (this.position.y > height - this.r || this.position.y < this.r) {
      this.velocity.y *= -1;
    }

    this.r = 50 * noise(this.position.x, this.position.y);

    if (frameCount % 1 == 0) {
      if (this.locations.length < 600) {
        this.locations.push(this.position.copy());
      } else {
        this.locations.splice(0, 1);
      }
    }
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
  }

  trail() {
    if (this.locations.length > 1) {
      for (var i = 0; i < this.locations.length; i += 1) {
        let n = noise(this.locations[i].x, this.locations[i].y);
        let x = this.locations[i].x + 100 * n * tan(frameCount * 5 + 90 * n) + random(-n * 30, n * 30);
        let y = this.locations[i].y + 100 * n * cos(frameCount * 5 + 90 * n) + random(-20, 20);
        let r = randomGaussian(0, 5) * sin(frameCount * 0.1 * i + i * 0.1);
        push();
        translate(x, y);
        fill(
          map(n + sin(frameCount * 3 + i * 5), -2, 2, 50, 100 * sin(frameCount * 0.4 + i)),
          map(n + sin(frameCount * 3 + i * 5), -2, 2, 90, 100 * cos(frameCount + i)),
          map(n + sin(frameCount * 3 + i * 5), -2, 2, 90, 100 * sin(frameCount)),
          map(n, -1, 1, 0, 100)
        );
        ellipse(0, 0, r * 2, r * 2);
        pop();
      }
    }
  }
}
