let data = {
  sketch: {
    background: "#BFFFF523"
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  colorMode(HSL, 100);
}

function draw() {
  background(data.sketch.background);
  orbitControl();
  ortho();
  rotateY(2 * PI * sin(frameCount * 0.1));
  rotateX(45);
  rotateY(35.5);
  ambientLight(255, 255, 255, 0);
  directionalLight(0, 0, 800, 0, 0, 1);
  fill("#DF2F2F");
  for (var i = -4; i < 5; i += 1) {
    for (var j = -4; j < 5; j += 1) {
      for (var k = -4; k < 5; k += 1) {
        let d = dist(0, 0, 0, i, j, k);
        d = map(d, 0, 27, 0, 100);
        push();
        specularMaterial(
          d * (1 + 1 * sin(frameCount * 2 + d * 10)),
          map(d, 0, 100, 70, 20),
          map(d, 0, 100, 40, 60)
        );
        let x =
          i * 25 +
          2 * sin(frameCount) * d * randomGaussian(0, 0.01) +
          200 * sin(frameCount * 1.5 + d * 2 * sin(frameCount));
        let y =
          j * 25 +
          2 * sin(frameCount) * d * randomGaussian(0, 0.01) +
          150 * sin(frameCount * 2 + d * 2 * sin(frameCount));
        let z =
          k * 25 +
          2 * sin(frameCount) * d * randomGaussian(0, 0.01) +
          150 * sin(frameCount * 1 + d * 2 * sin(frameCount));
        translate(x, y, z);
        sphere(10);
        pop();
      }
    }
  }
}
