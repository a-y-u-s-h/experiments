let data = {
  sketch: {
    background: "#F1C20A"
  },
  bars: {
    h: 200
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  rectMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  background(data.sketch.background);
  ortho(-200, 200, -150, 150, 0, 1000);
  directionalLight(70, 160, 100, 255, 1, -1, 1);
  directionalLight(200, 100, 255, 255, -1, 1, 1);
  rotateX(PI / 4);
  rotateX(PI / 8);
  rotateY(atan(1 / Math.sqrt(2)));
  specularMaterial("#E02A2A");
  for (var z = -width * 0.05; z < width * 0.05; z += 10) {
    for (var x = -width * 0.05; x < width * 0.05; x += 10) {
      let d = dist(x, z, 0, 0);
      let offset = map(d, 0, 90, -90, 90)
      push();
      translate(x, 0, z);
      box(5, data.bars.h * (0.5 + 0.5 *  sin(frameCount * 5 + offset + d)), 5);
      pop();
    }
  }
}
