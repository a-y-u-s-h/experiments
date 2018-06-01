let data = {
  sketch: {
    background: "#FFFFFF12"
  },
  cell: {
    inner: {
      fill: {
        check: true,
        color: "#C5032E89"
      },
      size: 10
    },
    outer: {
      fill: {
        check: true,
        color: "#FF454523"
      },
      size: 40
    }
  }
};

let cells = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 100);
  ellipseMode(CENTER);
  angleMode(DEGREES);

  for (var i = 0, upperLimit_i = 200; i < upperLimit_i; i += 1) {
    cells[i] = new Cell(random(width), random(height), i);
  }
}

function draw() {
  background(data.sketch.background);

  cells.forEach(cell => {
    cell.update();
    cell.show();
  });
}

class Cell {
  constructor(cx, cy, i) {
    this.position = new p5.Vector(cx, cy);
    this.velocity = p5.Vector.random2D();
    this.acceleration = new p5.Vector();
    this.i = i;
  }

  show() {
    push();
    translate(this.position.x, this.position.y);

    push();
    fill(data.cell.inner.fill.color);
    noStroke();
    ellipse(0, 0, data.cell.inner.size, data.cell.inner.size);
    pop();

    push();
    fill(data.cell.outer.fill.color);
    noStroke();
    ellipse(0, 0, data.cell.outer.size, data.cell.outer.size);
    pop();
    pop();
  }

  update() {
    this.velocity.x += random(-5, 5);
    this.velocity.y += random(-5, 5);

    this.velocity.limit(10 * sin(frameCount));

    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x *= -1;
    }

    if (this.position.y < 0 || this.position.y > height) {
      this.velocity.y *= -1;
    }

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
}
