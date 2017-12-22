let data = {
  sketch: {
    background: "#0000000A"
  }
};

let nx = 0,
  ny = 0,
  nz = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  colorMode(HSB, 100);
}

function draw() {
  background(data.sketch.background);
  drawStream();
}

function drawStream() {
  let nx = 0;
  for (let i = 0; i < width; i += 20) {
    let ny = 0;
    for (let j = 0; j < width; j += 20) {
      let angle = map(noise(nx, ny, nz), 0, 1.0, 0, 4 * PI);
      let x = 30 * cos(angle);
      let y = 30 * sin(angle);
      stroke((frameCount + 50 * noise(nx + ny + nz)) % 100, map(angle, 0, 4 * PI, 70, 100), 100);
      line(i, j, i + x, j + y);
      ny += 0.03;
    }
    nx += 0.02;
  }
  nz += 0.01;
}
