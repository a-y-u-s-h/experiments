let data = {
  sketch: {
    background: "#000000"
  },
  terrain: {
    columns: 100,
    rows: 100,
    scale: 10
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB, 100);
  data.terrain.rows = round(width / data.terrain.scale + 1);
  data.terrain.columns = round(height / data.terrain.scale + 1);
  fill(255);
}

function draw() {
  background(data.sketch.background);
  orbitControl();
  camera(0, 0, 0);
  // translate(-width * 0.5, -height * 0.5);
  // rotateY(frameCount * 0.001)
  // rotateX(frameCount * 0.001)
  push();
  for (
    var i = -data.terrain.rows * 0.5, upperLimit_i = data.terrain.rows * 0.5;
    i < upperLimit_i;
    i += 1
  ) {
    beginShape();
    for (
      var j = -data.terrain.columns * 0.5,
        upperLimit_j = data.terrain.columns * 0.5;
      j < upperLimit_j;
      j += 1
    ) {
      vertex(
        i * data.terrain.scale,
        j * data.terrain.scale,
        1 *
          map(
            noise(i * sin(frameCount * 0.1), j * sin(frameCount * 0.1)),
            0,
            1,
            0,
            100 * sin(frameCount)
          )
      );
    }
    endShape();
  }
  pop();
  push();
  for (
    var i = -data.terrain.columns * 0.5, upperLimit_i = data.terrain.columns * 0.5;
    i < upperLimit_i;
    i += 1
  ) {
    beginShape();
    for (
      var j = -data.terrain.rows * 0.5, upperLimit_j = data.terrain.rows * 0.5;
      j < upperLimit_j;
      j += 1
    ) {
      vertex(
        j * data.terrain.scale,
        i * data.terrain.scale,
        1 *
          map(
            noise(i * sin(frameCount * 0.1), j * sin(frameCount * 0.1)),
            0,
            1,
            0,
            100 * sin(frameCount)
          )
      );
    }
    endShape();
  }
  pop();
}
