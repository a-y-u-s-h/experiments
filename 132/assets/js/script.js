let stackoverflow;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  stackoverflow = new Stackoverflow(0, 100, 0);
}

function draw() {
  background(220);
  ortho();
  rotateY(radians(frameCount * 0.5));
  orbitControl();

  stackoverflow.show();
}

class Stackoverflow {
  constructor(cx = 0, cy = 0, cz = 0) {
    this.position = new p5.Vector(cx, cy, cz);
    this.size = 200;
    this.height = 100;
    this.magnify = 1.5;
  }

  show() {
    push();
    translate(this.position.x, this.position.y, this.position.y);
    scale(this.magnify);
    rotateX(radians(1));
    rotateY(radians(2 * cos(frameCount * 0.1)));
    rotateZ(radians(-5));
    
    ambientLight(170, 170, 170);
    pointLight(250, 250, 250, 100, 100, 0);
    pointLight(50, 50, 50, -100, -100, 0);

    specularMaterial("#E6350A");
    this.stack();

    specularMaterial("#797373");
    push();
    translate(0, this.size * 0.5, 0);
    rotateX(radians(90));
    box(this.size, this.size, 10);
    pop();

    push();
    translate(this.size * 0.5, this.height * 0.5, 0);
    rotateY(radians(90));
    box(this.size, this.height * 1.1, 10);
    pop();

    push();
    translate(-this.size * 0.5, this.height * 0.5, 0);
    rotateY(radians(90));
    box(this.size, this.height * 1.1, 10);
    pop();

    pop();
  }

  stack() {
    push();
    translate(0, this.height * 0.5, 0);
    for (var i = 0; i < 6; i += 1) {
      push();
      translate(Math.exp(i * 0.94), -i * 50 + i * sin(frameCount * 0.1), i * 5);
      rotateX(radians(90));
      rotateY(radians(-i * 10));
      box(this.size * 0.8, this.size * 0.8, 20);
      pop();
    }
    pop();
  }
}
