let data = {
  sketch: {
    background: "#B82020"
  },
  rings: {
    n: 36,
    particles: 20,
    spacing: 20
  },
  particle: {
    stroke: {
      activate: false,
      color: "#000000",
      weight: 3
    },
    fill: {
      activate: true,
      color: "#FFFFFF"
    },
    amplitude: 10,
    frequency: 1
  }
};

class Particle {
  constructor(x, y, r = 0) {
    this.options = {
      frequency: 3,
      amplitude: 5,
      br: 3
    };
    this.x = x;
    this.y = y;
    this.r = r;
  }

  show() {
    push();
    if (data.particle.stroke.activate) {
      stroke(data.particle.stroke.color);
      strokeWeight(data.particle.stroke.weight);
    } else {
      noStroke();
    }
    if (data.particle.fill.activate) {
      fill(data.particle.fill.color);
    } else {
      noFill();
    }
    ellipse(this.x, this.y, this.r, this.r);
    pop();
  }

  update(i = 0) {
    let phi = 360 / (i + 1);
    this.r =
      this.options.br * Math.pow(0.5, i) +
      this.options.amplitude * i * 0.5 *
        abs(sin(this.options.frequency * frameCount * i * 0.1 + phi));
  }

  oscillate(i = 0) {
    if (i != 0) {
      this.options.amplitude = data.particle.amplitude;
      this.options.frequency = data.particle.frequency;
    }
  }
}

class Ring {
  constructor(cx, cy, spacing, i = 0) {
    this.cx = cx;
    this.cy = cy;
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.array = [];
    this.i = i;
    this.spacing = spacing;
    this.r = this.spacing * this.i;
  }

  populate(i, phi = 0) {
    angleMode(DEGREES);
    this.spacing = data.rings.spacing;
    this.r = this.spacing * this.i;
    this.angle = i * (360 / data.rings.particles);
    this.x = this.cx + this.r * cos(this.angle + phi);
    this.y = this.cy + this.r * sin(this.angle + phi);
    this.array.push(new Particle(this.x, this.y));
  }

  show(i = 0) {
    push();
    for (
      var j = 0, upperLimit_j = this.array.length;
      j < upperLimit_j;
      j += 1
    ) {
      this.array[j].update(i);
      this.array[j].show();
    }
    pop();
  }
}

let rings = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  for (var i = 0, upperLimit_i = data.rings.n; i < upperLimit_i; i += 1) {
    rings[i] = new Ring(width / 2, height / 2, 20, i);
    for (
      var j = 0, upperLimit_j = data.rings.particles;
      j < upperLimit_j;
      j += 1
    ) {
      if (i % 2) {
        rings[i].populate(j, 0);
      } else {
        rings[i].populate(j, 360 / data.rings.particles / 2);
      }
    }
  }
}

function draw() {
  background(data.sketch.background);
  for (var i = 0, upperLimit_i = rings.length; i < upperLimit_i; i += 1) {
    rings[i].show(i);
  }
}
