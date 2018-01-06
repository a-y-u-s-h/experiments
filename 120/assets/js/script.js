let data = {
  sketch: {
    background: "#000000"
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  // colorMode(HSB, 100);
}

function draw() {
  background(data.sketch.background);
  orbitControl();

  ambientLight(60);

  push();
  let x1 = 300 * sin(frameCount);
  let y1 = 400 * sin(frameCount * 2);
  let z1 = 500 * sin(frameCount * 0.5);
  pointLight(255, 255, 255, x1, y1, z1);
  translate(x1, y1, z1);
  sphere(5);
  pop();

  push();
  let x2 = 300 * cos(frameCount);
  let y2 = 400 * cos(frameCount * 2);
  let z2 = 500 * cos(frameCount * 0.5);
  pointLight(0, 0, 0, x2, y2, z2);
  translate(x2, y2, z2);
  sphere(5);
  pop();

  ortho();
  rotateX(radians(45));
  // rotateX(radians(frameCount));
  rotateY(radians(35));

  specularMaterial(255);
  for (var k = -floor(width * 0.08); k < floor(width * 0.08); k += 20) {
    for (var i = -floor(width * 0.08); i < floor(width * 0.08); i += 20) {
      for (
        var j = -Math.ceil(width * 0.08);
        j < Math.ceil(width * 0.08);
        j += 20
      ) {
        let d = dist(0, 0, 0, i, j, k);
        push();
        // specularMaterial(map(d, 0, 220, 0, 100), 100, 50, 80);
        translate(
          i + i * 1.5 * sin(frameCount * 2 + d),
          j + j * 1.5 * sin(frameCount * 1 + d),
          k + k * 1.5 * sin(frameCount * 0.5 + d)
        );
        sphere(10, 30, 30);
        pop();
      }
    }
  }
}
