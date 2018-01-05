let data = {
  sketch: {
    background: "#FFFFFF"
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  ellipseMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  background(data.sketch.background);
  ortho(-800, 800);
  orbitControl();

  rotateX(radians(20));
  rotateY(radians(20));
  rotateZ(radians(5));

  push();
  normalMaterial();
  for (var i = -width * 0.5; i < width * 0.5; i += 30) {
    push();
    translate(i, Math.pow(-1, i) * height * 0.15 * sin(frameCount + i * 0.5));
    box(5, height * 0.3 * sin(frameCount + i * 0.5));
    pop();
    push();
    rotateX(radians(90));
    translate(i, Math.pow(-1, i) * height * 0.15 * sin(frameCount + i * 0.5));
    box(5, height * 0.3 * sin(frameCount + i * 0.5));
    pop();
  }
  pop();

  push();
  specularMaterial("#00000010");
  for (var i = -width * 0.5; i < width * 0.5; i += 50) {
    push();
    translate(i, 0, 0);
    box(50, 500, 5);
    pop();

    push();
    translate(i, 0, 0);
    rotateZ(radians(90));
    box(5, 50, 500);
    pop();
  }
  pop();
}
