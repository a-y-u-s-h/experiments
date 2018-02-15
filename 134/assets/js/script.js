let data = {
  sketch: {
    background: "#FFFFFF"
  },
  earth: {
    vehicles: 600,
    r: 500
  }
};

let earth;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);

  earth = new Earth(0, 0, 0);
  earth.initialize();
}

function draw() {
  background(data.sketch.background);
  camera(0, 0, 500);
  orbitControl();

  rotateY(radians(frameCount * 0.6));
  rotateZ(radians(frameCount * 0.1));
  earth.show();
}

class Earth {
  constructor(cx, cy, cz) {
    this.position = new p5.Vector(cx, cy, cz);
    this.vehicles = [];
  }

  initialize() {
    for (var i = 0; i < data.earth.vehicles; i += 1) {
      let phi = randomGaussian(0, 360);
      let theta = randomGaussian(0, 360);
      let x = data.earth.r * cos(phi) * cos(theta);
      let y = data.earth.r * cos(phi) * sin(theta);
      let z = data.earth.r * sin(phi);
      this.vehicles.push(new Vehicle(x, y, z));
    }
  }

  show() {
    push();
    ambientLight(0);
    pointLight(255, 255, 255, 900, 900, 900);
    translate(this.position.x, this.position.y, this.position.y);
    for (var i = 0; i < this.vehicles.length; i += 1) {
      this.vehicles[i].update(i);
      this.vehicles[i].show(i);
    }
    pop();
  }
}

class Vehicle {
  constructor(x = 0, y = 0, z = 0) {
    this.position = new p5.Vector(x, y, z);
    this.origin = new p5.Vector(x, y, z);
    this.random = [randomGaussian(0, 0.4), randomGaussian(0, 0.4)];
  }

  show(i) {
    push();
    specularMaterial(50);
    translate(this.position.x, this.position.y, this.position.z);
    sphere(5);
    pop();
  }

  update(i) {
    let phi = lerp(
      frameCount * noise(this.origin.x, this.origin.y),
      frameCount * noise(this.origin.x, this.origin.y) + i * this.random[0],
      0.3
    );
    let theta = lerp(
      frameCount * noise(this.origin.x, this.origin.y),
      frameCount * noise(this.origin.x, this.origin.y) + i * this.random[1],
      0.3
    );
    this.position.x = data.earth.r * cos(phi + this.random[0]) * cos(theta);
    this.position.y = data.earth.r * cos(phi + this.random[0]) * sin(theta);
    this.position.z = data.earth.r * sin(phi + this.random[0]);
  }
}
