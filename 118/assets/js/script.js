let data = {
  sketch: {
    background: "#FFFFFF"
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  colorMode(HSL, 100);
}

function draw() {
  background(data.sketch.background);

  ortho();
  orbitControl();
  ambientLight(255, 255, 255, 0, 0, 0);
  directionalLight(255, 255, 255, 1, 1, 0);
  rotateX(radians(frameCount * 0.5));
  rotateY(radians(frameCount * 0.5));
  scale(0.7);
  for (var i = -4; i < 5; i += 1) {
    if (i !== 0) {
      push();
      translate(400 * sin(frameCount * 0.5 * i), 200 + 200 * cos(frameCount * 0.5 * i), 0);
      specularMaterial(50 * (1 + sin(frameCount * 0.5)), 100, 30, 200);
      sphere(10);
      pop();

      push();
      rotateZ(radians(180));
      translate(400 * sin(frameCount * 0.5 * i), 200 + 200 * cos(frameCount * 0.5 * i), 0);
      specularMaterial(50 * (1 + sin(frameCount * 0.5)), 100, 30, 200);
      sphere(10);
      pop();
    }
  }
  for (var i = -15; i < 16; i += 1) {
    push();
    for (var j = -15; j < 16; j += 1) {
      let x = 200 * sin(frameCount * 0.5 + 360 / 31 * i);
      let y = 200 * cos(frameCount * 0.5 + 360 / 31 * i);
      let d = dist(0, 0, i, j);
      push();
      scale(1 + 0.1 * sin(frameCount * 5 + d * 20 + i * 0.05));
      translate(j * 15, x + 50 * cos(frameCount * 0.5 + d * 20), y);
      specularMaterial(50 * (1 + sin(frameCount * 0.5 + d * 2)), 100, 30);
      rotateX(radians(frameCount * 0.5 + 360 / 31 * i));
      scale(1 + 0.25 * cos(frameCount * 5 + d * 20));
      box(10, 50, 10);
      pop();
    }
    pop();
  }
}
