class Vehicle {
  constructor(x, y, i) {
    this.location = new p5.Vector(x, y);
    this.velocity = p5.Vector.random2D();
    this.acceleration = new p5.Vector(0, 0);
    this.i = i;
    this.r = 3;
    this.maxSpeed = random(3, 5);
    this.maxForce = 0.8;
    this.desired_separation = 20;
  }

  run(path) {
    this.follow(path);
    this.update();
    this.borders(path);
    this.display();
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

  follow(path) {
    let predict = this.velocity.copy();
    predict.normalize();
    predict.mult(25);
    let predictedLocation = p5.Vector.add(this.location, predict);

    let normal = null;
    let target = null;

    let worldRecord = 1000000;

    // Loop through all points of path

    for (var i = 0; i < path.points.length - 1; i += 1) {
      // Look at line segment
      let a = path.points[i].copy();
      let b = path.points[i + 1].copy();

      // Get the normal to that line
      let normalPoint = this.getNormalPoint(predictedLocation, a, b);

      // This only works because we know path goes from left to right
      // We could have more sophisticated test to tell if a point is in the line segment or not
      if (normalPoint.x < a.x || normalPoint.x > b.x) {
        // This is something of a hacky solution, but if it's not within the line segment
        // consider the normal to just be the end of the line segment (point b)

        if (a.x < b.x) {
          normalPoint = b.copy();
        } else {
          normalPoint = a.copy();
        }
      }
      // How far away are we from the target ?
      var distance = p5.Vector.dist(predictedLocation, normalPoint);
      // Did we beat the record and find the closest line segment?
      if (distance < worldRecord) {
        worldRecord = distance;
        // If so the target we want to steer towards is the normal
        normal = normalPoint;
        // Look at the direction of the line segment so we can seek a little bit ahead of the normal
        let dir = p5.Vector.sub(b, a);
        dir.normalize();
        // This is an oversimplification
        // Should be based on distance to path & velocity
        dir.mult(20);
        target = normalPoint.copy();
        target.add(dir);
      }
    }

    if (distance > path.radius) {
      this.seek(target);
    }

    // Draw the debugging stuff
    if (debug) {
      // Draw predicted future position
      stroke(0);
      fill(0);
      line(
        this.location.x,
        this.location.y,
        predictedLocation.x,
        predictedLocation.y
      );
      ellipse(predictedLocation.x, predictedLocation.y, 4, 4);

      // Draw normal position
      stroke(0);
      fill(0);
      if (normal !== null) {
        ellipse(normal.x, normal.y, 4, 4);
        // Draw actual target (red if steering towards it)
        line(predictedLocation.x, predictedLocation.y, normal.x, normal.y);
        if (worldRecord > p.radius) fill(255, 0, 0);
        noStroke();
        ellipse(target.x, target.y, 8, 8);
      }
    }
  }

  borders(path) {
    if (this.location.x > path.getEnd().x) {
      this.location.x = path.getStart().x - this.r;
      this.location.y = path.getStart().y + (this.location.y - path.getEnd().y);
    }
  }

  getNormalPoint(p, a, b) {
    let ap = p5.Vector.sub(p, a); // Vector points from a to p
    let ab = p5.Vector.sub(b, p); // Vector points from a to b
    ab.normalize();
    ab.mult(ap.dot(ab));

    let normalPoint = p5.Vector.add(a, ab);
    return normalPoint;
  }

  display() {
    let theta = this.velocity.heading() + PI / 2;
    push();
    colorMode(HSB, 100);
    translate(this.location.x, this.location.y);
    rotate(theta);
    stroke(0);
    fill(map(this.velocity.mag(), 0, 20, 0, 100), 100, 100, 90);
    triangle(this.r, this.r, -this.r, this.r, 0, -this.r * 2);
    pop();
  }
}
