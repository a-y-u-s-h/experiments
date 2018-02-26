let data = {
  sketch: {
    background: "#FFFFFF"
  }
}

let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.width  = capture.width * 0.3;
  capture.height  = capture.height * 0.3;
  capture.hide();
}

function draw() {
  background(0);
  translate(width, 0);
  scale(-1, 1); // horizontally inverting the capture
  // tint(255, 127); // uncomment for transparency
  image(capture, 0, 0, width, width * capture.height / capture.width);
  filter(INVERT);
}