let data = {
  sketch: {
    background: "#FFFFFF"
  }
};

let vehicles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0, upperLimit_i = 25; i < upperLimit_i; i += 1) {
    vehicles[i] = new Vehicle(random(width), random(height), i);
  }
  colorMode(HSB, 100);
  background(data.sketch.background);
  noStroke();
}

function draw() {
  background(255, 5);
  let mouse = new p5.Vector(mouseX, mouseY);

  // Call the appropriate steering behaviors for our agents
  for (var i = 0, upperLimit_i = vehicles.length; i < upperLimit_i; i += 1) {
    if (i == 0) {
      vehicles[i].seek(mouse);
    }
    if (i > 0) {
      vehicles[i].seek(vehicles[i - 1].location);
    }
  }

  vehicles.forEach(v => {
    v.update();
    v.display();
  });
}

class Vehicle {
  constructor(x, y, i) {
    this.location = new p5.Vector(x, y);
    this.velocity = p5.Vector.random2D();
    this.acceleration = new p5.Vector(0, 0);
    this.i = i;
    this.r = map(i, 0, 25, 20, 5);
    this.maxSpeed = random(20, 21);
    this.maxForce = 2;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.location.add(this.velocity);
    // Reset acceleration to zero each cycle.
    this.acceleration.mult(0);
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

  display() {
    let theta = this.velocity.heading() + PI / 2;
    push();
    translate(this.location.x, this.location.y);
    rotate(theta);
    stroke(0);
    stroke(1);
    fill(map(this.i, 0, vehicles.length, 0, 100), 100, 100, 90);
    triangle(this.r, this.r, -this.r, this.r, 0, -this.r * 2);
    pop();
  }
}
