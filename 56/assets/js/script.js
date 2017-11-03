var n = 15;
var nv, nh, w, h, size;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  nv = n;
  nh = n;
  size = map(n, 1, 101, 8, 0);
  w = width / nv;
  h = height / nh;
  stroke(50, 70);
  strokeWeight(size);
  for (var i = 1; i < nv; i += 1) {
    for (var j = 1; j < nh; j += 1) {
      // Vertical lines
      line(i * w + 5 * sin(frameCount * 0.05 * abs(nv / 2 - i) ), 0, i * w + 5 * sin(frameCount * 0.05 * abs(nv / 2 - i) ), height);
      // Horizontal Lines
      line(0 + 5 * sin(frameCount * 0.05 * abs(nv / 2 - i) ), j * h, width, j * h);
    }
  }
  strokeWeight(size);
  stroke("whitesmoke");
  for (var i = 1; i < nv; i += 1) {
    for (var j = 1; j < nh; j += 1) {
      // Dots

      ellipse(i * w + 5 * sin(frameCount * 0.05 * abs(nv / 2 - i) ), j * h, size, size);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
