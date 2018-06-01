let data = {
  sketch: {
    background: "#FEFEEF"
  },
  boxes: {
    big: {
      size_i: 5,
      size_j: 5,
      size_k: 5
    },
    spacing_factor: 150,
    size: 150
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB, 100);
}

function draw() {
  background(50 + 50 * sin(frameCount * 0.1), 100, 100, 20);
  orbitControl();
  camera(0, 0, 800);
  rotateY(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  // data.boxes.spacing_factor = sin(frameCount) * 140;
  translate(
    data.boxes.size * 0.5,
    data.boxes.size * 0.5,
    data.boxes.size * 0.5
  );
  for (
    var i = -data.boxes.big.size_i * 0.5,
      upperLimit_i = data.boxes.big.size_i * 0.5;
    i < upperLimit_i;
    i += 1
  ) {
    for (
      var j = -data.boxes.big.size_j * 0.5,
        upperLimit_j = data.boxes.big.size_j * 0.5;
      j < upperLimit_j;
      j += 1
    ) {
      for (
        var k = -data.boxes.big.size_k * 0.5,
          upperLimit_k = data.boxes.big.size_k * 0.5;
        k < upperLimit_k;
        k += 1
      ) {
        push();
        translate(
          i * data.boxes.spacing_factor+ 100 * tan(frameCount),
          j * data.boxes.spacing_factor,// + 100 * cos(frameCount * 0.1 *  (i * k * j + 1)),
          k * data.boxes.spacing_factor + 100 * tan(frameCount * (i * k * j + 1))
        );
        scale(
          1 +
            0.9 *
              sin(frameCount * 5 + 20 * (-data.boxes.big.size_i * 1.5 + i + j + k + 1))
        );
        // rotateY(frameCount * 0.03);
        // rotateZ(frameCount * 0.03);
        // rotateX(frameCount * 0.03);
        box(data.boxes.size * 0.5, data.boxes.size * 0.5);
        pop();
      }
    }
  }
}
