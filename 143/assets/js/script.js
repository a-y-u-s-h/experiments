let data = {
  sketch: {
    background: "#000000",
    scaleX: null,
    scaleY: null
  }
};

let video;

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(80, 60);
  video.hide();

  data.sketch.scaleX = width / video.width;
  data.sketch.scaleY = height / video.height;

  noStroke();
  rectMode(CENTER);
  ellipseMode(CENTER);
}

function draw() {
  background(data.sketch.background);
  translate(width, 0);
  scale(-1, 1);

  video.loadPixels();
  for (var y = 0, upperLimit_y = video.height; y < upperLimit_y; y += 1) {
    for (var x = 0, upperLimit_x = video.width; x < upperLimit_x; x += 1) {
      let index = (x + y * video.width) * 4;

      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];

      let bright = (r + g + b) / 3;

      if (bright < 120) {
        fill(0, bright, 0);
        ellipse(
          x * data.sketch.scaleX,
          y * data.sketch.scaleY,
          data.sketch.scaleY * sin(frameCount * 0.1 + 10 * noise(x, y)),
          data.sketch.scaleY * sin(frameCount * 0.1 + 10 * noise(x, y))
        );
      }
    }
  }
}
