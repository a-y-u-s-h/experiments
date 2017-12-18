let data = {
  sketch: {
    background: "#000000",
    opacity: 10
  },
  blobs: {
    size: 50,
    number: 10,
    sticks: 5
  }
};

let blobs = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  ellipseMode(CENTER);
  // for (var i = 0; i < data.blobs.number; i += 1) {
  //   blobs.push(new Blob(random(width), random(height)));
  // }
  blobs.push(new Blob(width * 0.5, height * 0.5))
}

function draw() {
  background(
    red(data.sketch.background),
    green(data.sketch.background),
    blue(data.sketch.background),
    data.sketch.opacity
  );

  for (let blob of blobs) {
    blob.show();
  }
}

class Blob {
  constructor(cx, cy, size = data.blobs.size) {
    this.position = new p5.Vector(cx, cy);
    this.size = size;
    this.rotation = random(1) < 0.5 ? random(10, 11) : random(-10, -11) ;
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    rotate(frameCount * 0.2 * this.rotation);
    stroke(255);
    strokeWeight(3);
    fill(data.sketch.background);

    let x1, x2, x3, x4, y1, y2, y3, y4;

    push();
    strokeWeight(1);
    fill(255);
    for (var angle = 0; angle < 360; angle += data.blobs.sticks) {
      x1 = this.size * cos(angle);
      y1 = this.size * sin(angle);
      x2 = this.size * 2 * (2 + 0.4 * sin(frameCount * 2)) * cos(angle);
      y2 = this.size * 2 * (2 + 0.4 * sin(frameCount * 2)) * sin(angle);
      x3 = this.size * 2 * (2.5 + 0.5 * sin(frameCount * 2.5)) * cos(angle);
      y3 = this.size * 2 * (2.5 + 0.5 * sin(frameCount * 2.5)) * sin(angle);
      x4 = x2 * (1 + 0.25 * cos(frameCount * 3));
      y4 = y2 * (1 + 0.25 * cos(frameCount * 3));

      if ((angle / data.blobs.sticks) % 2 == 0) {
        push();
        stroke("#0EB2B0");
        line(x1, y1, x3, y3);
        line(x1, y1, x4, y4);
        pop();
        ellipse(x3, y3, this.size * 0.25, this.size * 0.25);
        ellipse(x4, y4, this.size * 0.25, this.size * 0.25);
      } else {
        line(x1, y1, x2, y2);
        ellipse(x2, y2, this.size * 0.15, this.size * 0.15);
      }
    }
    pop();
    ellipse(0, 0, this.size * 2, this.size * 2);
    pop();
  }
}
