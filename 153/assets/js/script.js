let data = {
  sketch: {
    background: "#000000"
  },
  supershape: {
    a: 38,
    b: 38,
    n: 1.5
  }
};

let supershapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  data.supershape.n = 1.5 + 1.3 * sin(frameCount);
  for (let i = 0; i < ceil(width / (2 * data.supershape.a)); i += 1) {
    supershapes[i] = [];
    for (let j = 0; j < ceil(height / (2 * data.supershape.b)); j += 1) {
      supershapes[i][j] = new Supershape(
        i * data.supershape.a * 2 + data.supershape.a,
        j * data.supershape.b * 2 + data.supershape.b      
        );
    }
  }

  angleMode(DEGREES);
  ellipseMode(CENTER);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  fill(255);
  noStroke();
}

function draw() {
  background(data.sketch.background);
  data.supershape.n = 1.5 + 0.2 * sin(frameCount * 10);

  supershapes.forEach(row => {
    row.forEach(supershape => {
      supershape.show();
    });
  });
}

class Supershape {
  constructor(x, y, i) {
    this.position = new p5.Vector(x, y);
    this.scale = 0.9;
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    let d = dist(this.position.x, this.position.y, width * 0.5, height * 0.5);
    scale(this.scale + map(d, 0, width + height, 0.1, -2));
    rotate(frameCount * 10+ d );
    beginShape();
    for (let angle = 0; angle < 360; angle += 1) {
      let x =
        data.supershape.a *
        pow(abs(cos(angle)), 2 / data.supershape.n) *
        Math.sign(cos(angle));
      let y =
        data.supershape.b *
        pow(abs(sin(angle)), 2 / data.supershape.n) *
        Math.sign(sin(angle));
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
}
