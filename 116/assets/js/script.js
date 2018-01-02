let data = {
  sketch: {
    background: "#DCDCDC"
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
  ambientLight(50, 50, 50);
  directionalLight(100, 100, 100, 0, 0, 1);
  rotateY(radians(-45));
  rotateX(45);
  rotateY(-35);
  rotateZ(radians(60));
  for (var i = -13; i < 14; i += 1) {
    let x = i * 15;
    for (var k = -13; k < 14; k += 1) {
      let y = 0;
      let z = k * 15;
      let d = dist(0, 0, 0, x, y, z) + 100 * sin(frameCount * 3);
      push();
      translate(x, y, z);
      specularMaterial(50 + 50 * sin(frameCount + map(d, 0, 81, 0, 10)), 100, 40);
      box(14, 300 + 300 * sin(frameCount * 4 + d * 2), 14);
      pop();
    }
  }
}
