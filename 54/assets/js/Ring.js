class Ring {
  constructor(x, y, z = 0) {
    this.bodies = [];
    this.center = new p5.Vector(x, y, z);
    this.n = data.rings.n;
    this.r = data.rings.r;
    this.lambda = data.rings.lambda;
  }

  display() {
    if (data.rings.r > 0) {
      push();
      translate(this.center.x, this.center.y, this.center.z);
      for (
        var angle = 0, upperLimit_angle = 360;
        angle < upperLimit_angle;
        angle += 360 / this.n
      ) {
        let i = Math.ceil(angle / (360 / this.n));
        let x = this.r * cos(angle);
        let y = this.r * sin(angle);
        this.bodies[i].display3D();
        this.bodies[i].update();
      }
      scale(map(data.rings.r, 0, 300, 0, 1));
      torus(300, 3, 60, 60);
      pop();
    }
  }

  update() {
    this.n = data.rings.n;
    this.r = data.rings.r;
    for (
      var angle = 0, upperLimit_angle = 360;
      angle < upperLimit_angle;
      angle += 360 / this.n
    ) {
      let i = angle / (360 / this.n);
      let x = this.r * cos(angle);
      let y = this.r * sin(angle);
      this.bodies[i].position.x = x;
      this.bodies[i].position.y = y;
    }
  }

  initialize() {
    angleMode(DEGREES);
    for (
      var angle = 0, upperLimit_angle = 360;
      angle < upperLimit_angle;
      angle += 360 / this.n
    ) {
      let x = this.r * cos(angle);
      let y = this.r * sin(angle);
      this.bodies.push(new Body(x, y, 0, data.rings.lambda, 0, "ring"));
    }
  }
}
