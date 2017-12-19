let data = {
  sketch: {
    background: "#FF00FF",
    opacity: 10
  },
  blobs: {
    size: 2,
    number: 200,
    sticks: 60
  }
};

let blobs_1 = [];
let blobs_2 = [];
let blobs_3 = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  ellipseMode(CENTER);
  for (var i = 0; i < data.blobs.number; i += 1) {
    blobs_1.push(new Blob(random(width * 0.32), random(height * 0.1, height)));
    blobs_2.push(
      new Blob(random(width * 0.33, width * 0.66), random(height * 0.1, height))
    );
    blobs_3.push(
      new Blob(random(width * 0.7, width), random(height * 0.1, height))
    );
  }
  colorMode(HSB, 100);
  noStroke();
  textSize(13);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(
    red(data.sketch.background),
    green(data.sketch.background),
    blue(data.sketch.background),
    data.sketch.opacity
  );
  push();
  stroke(0);
  strokeWeight(2);
  line(0, height * 0.1, width, height * 0.1);
  line(width * 0.33, 0, width * 0.33, height);
  line(width * 0.66, 0, width * 0.66, height);
  pop();

  for (var i = 0; i < data.blobs.number; i += 1) {
    blobs_1[i].run();
    blobs_2[i].run();
    blobs_3[i].run();

    for (var j = 0; j < data.blobs.number; j += 1) {
      blobs_1[i].collide(blobs_1[j]);
      blobs_2[i].collide(blobs_2[j]);
      blobs_3[i].collide(blobs_3[j]);
    }
  }

  push();
  fill(0);
  rect(0, 0, width, height * 0.1);
  noStroke();
  fill(255);
  push();
  translate(width * 0.15, height * 0.05);
  text("Collision Detection : Without Momentum & Energy Conservation", 0, 0);
  pop();
  push();
  translate(width * 0.5, height * 0.05);
  text("CD : With Momentum Conservation only", 0, 0);
  pop();
  push();
  translate(width * 0.8, height * 0.05);
  text("CD : With both Momentum & Energy Conservation", 0, 0);
  pop();
  pop();
}

class Blob {
  constructor(cx, cy, size = data.blobs.size) {
    this.origin = new p5.Vector(cx, cy);
    this.position = new p5.Vector(cx, cy);
    this.mass = random(1, 2);
    this.size = size * this.mass;
    this.rotation = random(1) < 0.5 ? random(10, 11) : random(-10, -11);

    this.velocity =
      this.origin.x < width * 0.33
        ? p5.Vector.random2D().mult(1)
        : this.origin.x < width * 0.66
          ? p5.Vector.random2D().mult(random(2, 3))
          : p5.Vector.random2D().mult(5);

    this.acceleration = new p5.Vector();
  }

  run() {
    this.update();
    this.show();
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    fill(map(this.velocity.mag(), 0, 10, 0, 100), 100, 100);
    ellipse(0, 0, this.size * 2, this.size * 2);
    pop();
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    switch (true) {
      case this.position.x > 0 && this.position.x < width * 0.33:
        if (
          this.position.x > width * 0.33 - this.size ||
          this.position.x < this.size
        ) {
          this.velocity.x *= -1;
        }
        break;
      case this.position.x > width * 0.33 && this.position.x < width * 0.66:
        if (
          this.position.x > width * 0.66 - this.size ||
          this.position.x < width * 0.33 + this.size
        ) {
          this.velocity.x *= -1;
        }

        break;
      case this.position.x > width * 0.66 && this.position.x < width:
        if (
          this.position.x > width - this.size ||
          this.position.x < width * 0.66 + this.size
        ) {
          this.velocity.x *= -1;
        }
        break;
    }

    if (
      this.position.y > height - this.size ||
      this.position.y < height * 0.1 + this.size
    ) {
      this.velocity.y *= -1;
    }

    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
  }

  collide(other) {
    let vector = p5.Vector.sub(this.position, other.position);
    let distance = vector.mag();
    vector.normalize();
    let other_speed = other.velocity.mag();
    let speed = this.velocity.mag();
    if (distance <= this.size + other.size && distance > 0) {
      if (this.origin.x < width * 0.33) {
        vector.mult(speed);
      } else if (this.origin.x > width * 0.33 && this.origin.x < width * 0.7) {
        vector.mult(other_speed);
      } else if (this.origin.x > width * 0.66 && this.origin.x < width * 1.1) {
        vector.mult(other_speed);
        vector.mult(0.96);
      }
      this.velocity = vector.copy();
    }
  }
}

function mousePressed() {
  switch (true) {
    case mouseX < width * 0.32 && mouseX > 0:
      blobs_1 = [];
      for (var i = 0; i < data.blobs.number; i += 1) {
        blobs_1.push(
          new Blob(random(width * 0.32), random(height * 0.1, height))
        );
      }

      break;
    case mouseX < width * 0.66 && mouseX > width * 0.33:
      blobs_2 = [];
      for (var i = 0; i < data.blobs.number; i += 1) {
        blobs_2.push(
          new Blob(
            random(width * 0.33, width * 0.66),
            random(height * 0.1, height)
          )
        );
      }
      break;
    case mouseX > width * 0.66:
      blobs_3 = [];
      for (var i = 0; i < data.blobs.number; i += 1) {
        blobs_3.push(
          new Blob(random(width * 0.7, width), random(height * 0.1, height))
        );
      }
      break;
  }
}
