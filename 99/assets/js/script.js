let data = {
  sketch: {
    background: "#000000"
  }
};

let vehicles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0, upperLimit_i = 100; i < upperLimit_i; i += 1) {
    vehicles[i] = new Vehicle(random(width), random(height), i);
  }
  colorMode(HSB, 100);
  background(data.sketch.background);
  noStroke();
}

function draw() {
  background(0, 20);
  let mouse = new p5.Vector(mouseX, mouseY);

  // Call the appropriate steering behaviors for our agents
  for (var i = 0, upperLimit_i = vehicles.length; i < upperLimit_i; i += 1) {
    vehicles[i].seek(mouse);
  }

  vehicles.forEach(v => {
    v.separate(vehicles);
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
    this.r = map(i, 0, 25, 4, 4);
    this.maxSpeed = random(20, 20);
    this.maxForce = 2;
    this.desired_separation = 100;
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

  separate(array)  {
    let sum = new p5.Vector();
    let count = 0;
    array.forEach((other) => {
        let d = p5.Vector.dist(this.location, other.location);

        if ( d > 0 && d < this.desired_separation ) {
            let diff = p5.Vector.sub(this.location, other.location);
            diff.normalize();
            sum.add(diff);
            count++;
        }
    });

    if ( count > 0 ) {
    sum.div(count);

    sum.setMag(this.maxSpeed);

    let steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
    }
  }

  display() {
    let theta = this.velocity.heading() + PI / 2;
    push();
    translate(this.location.x, this.location.y);
    rotate(theta);
    // stroke(0);
    // stroke(1);
    // fill(50);
    fill(map(this.velocity.mag(), 0, 20, 0, 100), 100, 100, 90);
    // fill(map(this.i, 0, vehicles.length, 0, 100), 100, 100, 90);
    triangle(this.r, this.r, -this.r, this.r, 0, -this.r * 2);
    // arc(0, 0, this.r, this.r * 3, -PI/2, PI/2);
    // arc(0, 0, -this.r, this.r * 3, -PI/2, PI/2);
    pop();
  }
}
