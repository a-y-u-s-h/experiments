let data = {
  sketch: {
    background: "#000000"
  },
  tile: {
    rows: 10,
    cols: 10,
    spacing_cols: 0,
    spacing_rows: 0
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  var fov = 60 / 180 * PI;
  var cameraZ = height / 2.0 / tan(fov / 2.0);
  perspective(60 / 180 * PI, width / height, cameraZ * 0.1, cameraZ * 10);
}

let cameraX;
let cameraY;
let cameraZ = 0;

function draw() {
  orbitControl();
  background(data.sketch.background);
  colorMode(HSL);
  var locY = (mouseY / height - 0.5) * -2;
  var locX = (mouseX / width - 0.5) * 2;
  cameraX = width / 4 * locX;
  cameraY = height / 4 * locY;
  camera(cameraX, cameraY, cameraZ);
  pointLight(250, 250, 250, 0, 0, 100);
  ambientLight(70);

  for (
    var i = -data.tile.cols - 1, upperLimit_i = data.tile.cols;
    i < upperLimit_i;
    i += 1
  ) {
    for (
      var j = -data.tile.rows - 1, upperLimit_j = data.tile.rows;
      j < upperLimit_j;
      j += 1
    ) {
      push();
      specularMaterial(
        map(i, -data.tile.cols - 1, data.tile.cols - 1, 100, 0),
        map(j, -data.tile.rows - 1, data.tile.rows - 1, 0, 100),
        map(
          i + j,
          -data.tile.cols - data.tile.rows - 2,
          data.tile.rows + data.tile.cols - 2,
          0,
          100
        )
      );
      translate(
        (i + 1) * width / data.tile.cols,
        (j + 1) * height / data.tile.rows,
        sin(
          frameCount *
            noise(10) *
            0.01 *
            map(i, -data.tile.cols - 1, data.tile.cols - 1, -5, 5) *
            map(j, -data.tile.rows - 1, data.tile.rows - 1, -5, 5)
        ) * 100
      );
      box((width / data.tile.cols - data.tile.spacing_cols) / 2);
      pop();
    }
  }
}

function mouseWheel(e) {
  cameraZ += e.delta * 1;
}
