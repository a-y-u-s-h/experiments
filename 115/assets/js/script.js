let data = {
  sketch: {
    background: "#FFFFFF03"
  }
};

let vehicles = [];
let flow;

let song;
let amp;
let vol;
let fft;
let spectrum;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSL, 100);
  background(data.sketch.background);
  angleMode(DEGREES);
  noStroke();
  flow = new Flowfield(10);
  flow.init();
  amp = new p5.Amplitude();
  fft = new p5.FFT(0.8, 256);
  for (var i = 0, upperLimit_i = 256; i < upperLimit_i; i += 1) {
    vehicles[i] = new Vehicle(
      random(width * 0.1, width * 0.9),
      random(height * 0.1, height * 0.9),
      i
    );
  }
  song = loadSound("/sounds/experiments/115.mp3", loaded);
}

function loaded() {
  song.loop();
}

function draw() {
  background(data.sketch.background);
  let mouse = new p5.Vector(mouseX, mouseY);
  orbitControl();
  camera(0, 0, 600);
  spectrum = fft.analyze();
  vol = map(amp.getLevel(), 0, 1, 100, 700);
  // Call the appropriate steering behaviors for our agents
  let max = 0;
  for (var i = 0, upperLimit_i = spectrum.length; i < upperLimit_i; i += 1) {
    if (spectrum[i] > spectrum[max]) {
      max = i;
    }
  }
  let x =
    width * 0.5 + map(spectrum[max], 0, 255, 0, width * 0.3) * sin(frameCount + map(vol, 0, 255, 0, 360));
  let y =
    height * 0.5 +
    map(spectrum[max], 0, 255, 0, height * 0.3) * cos(frameCount + map(vol, 0, 255, 0, 360) ) * tan(frameCount);
  let target = new p5.Vector(x, y);
  vehicles.forEach(v => {
    v.seek(target);
  });



  vehicles.forEach(v => {
    if ( spectrum[max] > 0 ) {
    
    v.desired_separation = 20 + 20 * cos(frameCount);
    }
    v.separate(vehicles);
    v.update();
    v.display2D();
  });
}

class Vehicle {
  constructor(x, y, i) {
    this.location = new p5.Vector(x, y);
    this.velocity = new p5.Vector();
    this.acceleration = new p5.Vector(0, 0);
    this.i = i;
    this.r = map(i, 0, 25, 1, 1.1);
    this.maxSpeed = random(10, 10);
    this.maxForce = 5;
    this.desired_separation = 100;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    if (this.location.x > width || this.location.x < -0) {
      if (this.location.x > 0) {
        this.location.x = -0;
      } else {
        this.location.x = width;
      }
    }
    if (this.location.y > height || this.location.y < -0) {
      if (this.location.y > 0) {
        this.location.y = -0;
      } else {
        this.location.y = height;
      }
    }
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.location.add(this.velocity);
    // Reset acceleration to zero each cycle.
    this.acceleration.mult(0);
  }

  align(boids) {
    let sum = new p5.Vector(0, 0);
    for (other of boids) {
      sum.add(other.velocity);
    }
    sum.div(boids.length);

    sum.setMag(this.maxspeed);

    let steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.location);
    let d = desired.mag();
    desired.normalize();

    if (d < 100) {
      let m = map(d, 10, 100, 2, this.maxSpeed);
      desired.mult(m);
    } else {
      // Normalize desired and scale to maximum speed
      desired.mult(this.maxSpeed);
    }

    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);

    this.applyForce(steer);
  }

  separate(array) {
    let sum = new p5.Vector();
    let count = 0;
    array.forEach(other => {
      let d = p5.Vector.dist(this.location, other.location);

      if (d > 0 && d < this.desired_separation) {
        let diff = p5.Vector.sub(this.location, other.location);
        diff.normalize();
        sum.add(diff);
        count++;
      }
    });

    if (count > 0) {
      sum.div(count);

      sum.setMag(this.maxSpeed);

      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      this.applyForce(steer);
    }
  }

  follow(flowfield) {
    let desired = flowfield.lookup(this.location);
    desired.mult(this.maxSpeed);

    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  display3D() {
    push();
    translate(this.location.x, this.location.y);
    specularMaterial(map(this.velocity.mag(), 0, 20, 0, 100), 100, 100, 90);
    sphere(this.r * 2);
    pop();
  }

  display2D() {
    let theta = this.velocity.heading() + PI / 2;
    push();
    translate(this.location.x, this.location.y);
    rotate(theta);
    // stroke(0);
    fill(map(this.velocity.mag(), 0, this.maxSpeed, 0, 100), 100, 30);
    triangle(this.r, this.r, -this.r, this.r, 0, -this.r * 2);
    pop();
  }
}

class Flowfield {
  constructor(r) {
    this.resolution = r;
    this.columns = width / r;
    this.rows = height / r;
    this.depth = (width + height) * 0.5 / r;
    this.field = [];
  }

  init() {
    let xOff = 0;
    for (var i = 0; i < this.columns; i += 1) {
      let yOff = 0;
      this.field[i] = [];
      for (var j = 0; j < this.rows; j += 1) {
        let zOff = 0;
        this.field[i][j] = [];
        for (var k = 0; k < this.depth; k += 1) {
          let theta = map(noise(xOff, yOff, zOff), 0, 1, 0, 2 * PI);
          this.field[i][j][k] = new p5.Vector(cos(theta), sin(theta), 0);
          zOff += 0.1;
        }
        yOff += 0.1;
      }
      xOff += 0.1;
    }
  }

  lookup(lookup) {
    let column = int(
      constrain(lookup.x / this.resolution, 0, this.columns - 1)
    );
    let row = int(constrain(lookup.y / this.resolution, 0, this.rows - 1));
    // let depth = int(constrain(lookup.z / this.resolution, 0, this.depth - 1));
    let depth = 0;
    return this.field[column][row][depth].copy();
  }
}
