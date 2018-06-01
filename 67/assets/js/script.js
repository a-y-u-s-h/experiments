let data = {
  sketch: {
    background: "#FFFFFF",
    constant: 10000
  },
  magnet: {
    strength: 1,
    height: 50,
    width: 240
  },
  poles: {
    north: {
      strength: 1,
      height: 50,
      width: 120,
      stroke: {
        check: true,
        color: "#000000",
        weight: 3
      },
      fill: {
        check: true,
        color: "#69D2A0"
      }
    },
    south: {
      strength: 1,
      height: 50,
      width: 120,
      stroke: {
        check: true,
        color: "#000000",
        weight: 3
      },
      fill: {
        check: true,
        color: "#C66346"
      }
    }
  },
  arrow: {
    number: 1000,
    mass: 1,
    size: 1,
    stroke: {
      check: true,
      color: "#000000",
      weight: 1
    },
    fill: {
      check: true,
      color: "#000000"
    }
  },
  attractor: {
    number: 0,
    mass: 10,
    size: 10,
    stroke: {
      check: false,
      color: "#000000",
      weight: 3
    },
    fill: {
      check: true,
      color: "#DE3030"
    }
  }
};

let magnet;
let arrows = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  angleMode(DEGREES);

  for (var i = 0, upperLimit_i = data.arrow.number; i < upperLimit_i; i += 1) {
    arrows.push(new Arrow(randomGaussian(width * 0.5, width * 0.18), randomGaussian(height * 0.5, height * 0.18)));
  }
  magnet = new Magnet(width * 0.5, height * 0.5);
}

function draw() {
  background(255, 5);
  arrows.forEach(a => {
    a.clearForce();
    a.attracted(magnet.north);
    a.attracted(magnet.south);
    a.update();
    a.edges();
    a.show();
  });
  magnet.show();
  if ((frameCount * 1) % 60 == 0) {
    for (
      var i = 0, upperLimit_i = data.arrow.number * 0.1;
      i < upperLimit_i;
      i += 1
    ) {
      arrows.push(new Arrow(arrows[0].start.x, arrows[0].start.y));
      arrows.splice(0, 1);
    }
  }
}

class Magnet {
  constructor(cx, cy) {
    this.position = new p5.Vector(cx, cy);
    this.strength = data.magnet.strength;
    this.length = data.magnet.length;
    this.height = data.magnet.height;
    this.north = new Pole(
      this.position.x - data.magnet.width * 0.25,
      this.position.y,
      this.strength,
      "north"
    );
    this.south = new Pole(
      this.position.x + data.magnet.width * 0.25,
      this.position.y,
      this.strength,
      "south"
    );
  }

  show() {
    push();
    this.south.show();
    this.north.show();
    pop();
  }

}

class Pole {
  constructor(cx, cy, strength, type) {
    this.position = new p5.Vector(cx, cy);
    this.strength = strength;
    this.type = type.toLowerCase();
    this.size = data.poles[`${this.type}`].width;
  }

  show() {
    push();
    translate(this.position.x, this.position.y);

    if (data.poles[`${this.type}`].stroke.check) {
      stroke(data.poles[`${this.type}`].stroke.color);
      strokeWeight(data.poles[`${this.type}`].stroke.weight);
    } else {
      noStroke();
    }

    if (data.poles[`${this.type}`].fill.check) {
      fill(data.poles[`${this.type}`].fill.color);
    } else {
      noFill();
    }

    rect(
      0,
      0,
      data.poles[`${this.type}`].width,
      data.poles[`${this.type}`].height
    );

    push();
    textAlign(CENTER, CENTER);
    textSize(20);
    noStroke();
    fill(0, 200);
    text(`${this.type[0].toUpperCase()}`, 0, 0);
    pop();
    pop();
  }
}
