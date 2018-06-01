let data = {
  sketch: {
    background: "#EFEFEF",
    opacity: 255
  },
  thing: {
    radius: window.innerWidth * 0.1
  },
  axes: {
    stroke: "#000000",
    weight: 3
  }
};

let thing;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("canvas");
  data.thing.radius = width * 0.08;

  angleMode(DEGREES);

  thing = new Thing(width * 0.15, height * 0.75);
}

function draw() {
  background(
    red(data.sketch.background),
    green(data.sketch.background),
    blue(data.sketch.background),
    data.sketch.opacity
  );

  thing.run();
}

class Thing {
  constructor(cx, cy) {
    this.origin = new p5.Vector(cx, cy);
    this.position = new p5.Vector(cx, cy);
    this.sine_positions = [];
    this.cosine_positions = [];
  }

  run() {
    this.axes();
    this.sine();
    this.cos();
    this.update();
    this.show();
  }

  sine() {
    let p = new p5.Vector(width * 0.3, this.origin.y + this.position.y);
    this.sine_positions.push(p);
    push();
    stroke(0);
    line(
      this.origin.x + this.position.x,
      this.origin.y + this.position.y,
      p.x,
      p.y
    );
    strokeWeight(10);
    point(p.x, p.y);
    pop();

    push();
    this.sine_positions.forEach(position => {
      position.x += 1;
    });

    for (var i = 0; i < this.sine_positions.length; i += 1) {
      if (i > 1) {
        line(
          this.sine_positions[i].x,
          this.sine_positions[i].y,
          this.sine_positions[i - 1].x,
          this.sine_positions[i - 1].y
        );

        if (this.sine_positions[i].x > width) {
          this.sine_positions.splice(0, 1);
          console.log(this.sine_positions.length);
        }
      }
    }

    pop();
  }

  cos() {
    push();
    stroke(0);
    noFill();
    arc(
      width * 0.3,
      height * 0.5,
      2 * (this.origin.x - this.position.x),
      2 * (this.origin.x - this.position.x),
      180,
      270
    );
    strokeWeight(10);
    point(this.origin.x + this.position.x, height * 0.5);
    let o = new p5.Vector(width * 0.3, height * 0.5);
    let pa = new p5.Vector(this.origin.x + this.position.x, height * 0.5);
    let oa = p5.Vector.sub(pa, o);
    oa.rotate(radians(90));
    let pb = p5.Vector.add(oa, o);
    this.cosine_positions.push(pb);

    point(pb.x, pb.y);
    strokeWeight(1);
    line(
      this.origin.x + this.position.x,
      this.origin.y + this.position.y,
      pa.x,
      pa.y
    );
    pop();

    push();
    this.cosine_positions.forEach(position => {
      position.x += 1;
    });

    for (var i = 0; i < this.cosine_positions.length; i += 1) {
      if (i > 1) {
        line(
          this.cosine_positions[i].x,
          this.cosine_positions[i].y,
          this.cosine_positions[i - 1].x,
          this.cosine_positions[i - 1].y
        );

        if (this.cosine_positions[i].x > width) {
          this.cosine_positions.splice(0, 1);
          console.log(this.cosine_positions.length);
        }
      }
    }
  }

  axes() {
    push();
    stroke(data.axes.stroke);
    line(
      width * 0.3,
      height * 0.5 - (width * 0.3 - this.origin.x),
      width,
      height * 0.5 - (width * 0.3 - this.origin.x)
    );
    line(width * 0.3, height * 0.75, width, height * 0.75);
    strokeWeight(data.axes.weight);
    line(0, height * 0.5, width, height * 0.5);
    line(width * 0.3, 0, width * 0.3, height);
    pop();
  }

  show() {
    translate(this.origin.x, this.origin.y);
    push();
    strokeWeight(5);
    point(0, 0);
    pop();

    push();
    noFill();
    ellipse(0, 0, data.thing.radius * 2, data.thing.radius * 2);
    line(0, 0, this.position.x, this.position.y);
    push();
    translate(this.position.x, this.position.y);
    stroke(0);
    strokeWeight(10);
    point(0, 0);
    pop();

    pop();
  }

  update() {
    this.position.x = data.thing.radius * cos(frameCount * 1.5);
    this.position.y = data.thing.radius * sin(frameCount * 1.5);
  }
}
