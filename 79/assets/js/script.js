let data = {
  sketch: {
    moon: "#000000",
    sun: "#DDDDDD"
  },
  blob: {
    moon: {
      r: 96,
      g: 124,
      b: 130,
      a: 30
    },
    sun: {
      r: 200,
      g: 124,
      b: 130,
      a: 60
    }
  }
};

let moon = true;
let blob;

function setup() {
  createCanvas(windowWidth, windowHeight);
  blob = new Blob(width * 0.5, height * 0.5);
  angleMode(DEGREES);
  background(data.sketch.moon);
  strokeWeight(1);
}

function draw() {
  blob.show();

  if (frameCount > 4000) {
    noLoop();
  }
}

function mousePressed() {
  moon = !moon;

  if (moon) {
    background(data.sketch.moon);
  } else {
    background(data.sketch.sun);
  }
}

class Blob {
  constructor(cx, cy) {
    this.position = new p5.Vector(cx, cy);
  }

  show() {
    let velocity = p5.Vector.random2D();
    velocity.normalize();
    let position = this.position;
    let start = p5.Vector.mult(velocity, randomGaussian(0, 0.1));
    position.add(start);

    let next_position = p5.Vector.add(position, velocity);


    for (var i = 0, upperLimit_i = 3000; i < upperLimit_i; i += 1) {
      let p1 = random(130, 250);
      let p2 = random(-5, 10);

      if (moon) {
        if (i > p1 || i < p2) {
          stroke(
            data.blob.moon.r,
            data.blob.moon.g,
            data.blob.moon.b,
            data.blob.moon.a
          );
        } else {
          stroke(random(200, 255), random(30, 50));
        }
      } else {
        if (i > p1 || i < p2) {
          stroke(
            data.blob.sun.r,
            data.blob.sun.g,
            data.blob.sun.b,
            data.blob.sun.a
          );
        } else {
          stroke(204, 45, 9, random(30, 50));
        }
      }
      line(position.x, position.y, next_position.x, next_position.y);

      position = next_position;
      if (i > 200) {
        velocity.rotate(random(-0.3, 0.3));
      } else {
        velocity.rotate(-0.04, 0.04);
      }

      next_position.add(velocity);
    }
  }
}
