let data = {
  sketch: {
    background: "#B0D9E6"
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
  rotateY(radians(30));
  for (var i = -15; i < 16; i += 1) {
    for (var j = -15; j < 16; j += 1) {
      let x = 200 * sin(frameCount * 0.5 + 360 / 31 * i);
      let y = 200 * cos(frameCount * 0.5 + 360 / 31 * i);
      let d = dist(0, 0, i, j);
      push();
      translate(j * 20, x + 50 * cos(frameCount * 0.5 + d * 20), y);
      specularMaterial(50 * (1 + sin(frameCount * 0.5 + d * 2)), 100, 30);
      rotateX(radians(frameCount * 0.5 + 360 / 31 * i));
      scale(1 + 0.5 * sin(frameCount * 5 + d * 20));
      sphere(10);
      pop();
    }
  }
}
