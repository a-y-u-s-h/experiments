let data = {
  sketch: {
    background: "#000000"
  },
  hexagon: {
    size: 90
  }
};

let t;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB, 100);
  noStroke();

  t = new Layer(width * 0.5, height * 0.5);
  t.init();
}

function draw() {
  background(data.sketch.background);
  t.update();
  t.show();
}

class Layer {
  constructor(cx, cy) {
    this.position = new p5.Vector(cx, cy);
    this.hexagons = [];
    this.layers = 5;
  }

  init() {
    for (var i = 0, upperLimit_i = this.layers; i < upperLimit_i; i += 1) {
      if (i == 0) {
        this.hexagons.push(new Hexagon(this.position.x, this.position.y, i));
      } else {
        for (var j = 0, upperLimit_j = 6 * i; j < upperLimit_j; j += 1) {
          let theta = 360 / upperLimit_j * (j + 1);
          let phi = theta * 0.5 * i / (j + 1);

          if (j % i < i - 1 && i >= 2) {
            var x =
              (1.75 + 0.03 * i) * i * data.hexagon.size * cos(theta + phi);
            var y =
              (1.75 + 0.03 * i) * i * data.hexagon.size * sin(theta + phi);

            this.hexagons.push(
              new Hexagon(this.position.x + x, this.position.y + y, i)
            );
          } else {
            var x = 2 * i * data.hexagon.size * cos(theta + phi);
            var y = 2 * i * data.hexagon.size * sin(theta + phi);

            this.hexagons.push(
              new Hexagon(this.position.x + x, this.position.y + y, i)
            );
          }
        }
      }
    }
  }

  show() {
    this.hexagons.forEach(hexagon => {
      hexagon.show();
    });
  }

  update() {}
}

class Hexagon {
  constructor(cx = width * 0.5, cy = height * 0.5, i = 0) {
    this.position = new p5.Vector(cx, cy);
    this.size = data.hexagon.size;
    this.n = 6;
    this.i = i;
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    rotate(frameCount * Math.pow(-1, this.i));
    fill(map(this.i, 0, 10, 0, 40 + 20 * sin(frameCount)), 100, 100);
    scale(0.9);
    beginShape();
    for (var i = 0, upperLimit_i = this.n; i < upperLimit_i; i += 1) {
      let x = this.size * cos(i * (360 / this.n));
      let y = this.size * sin(i * (360 / this.n));
      vertex(x, y);
    }
    endShape(CLOSE);

    fill(0);
    scale(0.5);
    beginShape();
    for (var i = 0, upperLimit_i = this.n; i < upperLimit_i; i += 1) {
      let x = this.size * cos(i * (360 / this.n));
      let y = this.size * sin(i * (360 / this.n));
      vertex(x, y);
    }
    endShape(CLOSE);

    pop();
  }

  seek(target) {}

  update() {}
}
