let data = {
  sketch: {
    background: "#FFFFFF"
  },
  illusion: {
    spacing: 100
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 100);
}

function draw() {
  background(map(1000 * sin(frameCount * 0.01), 0, 1000, 100, 0), map(1000 * sin(frameCount * 0.01), 0, 1000, 80, 100), map(1000 * sin(frameCount * 0.01), 0, 1000, 90, 100));
  translate(width * 0.5, height * 0.5);
  scale(1, -1);
  strokeWeight(1 + 3 * abs(sin(frameCount)));
  for (
    var i = -width, upperLimit_i = width;
    i < upperLimit_i;
    i += width / data.illusion.spacing
  ) {
    line(
      i + 100 * sin(frameCount * 0.01),
      height * 0.5,
      i + 100 * sin(frameCount * 0.01),
      -height * 0.5
    );
  }
  for (
    var i = -width, upperLimit_i = width;
    i < upperLimit_i;
    i += width / data.illusion.spacing
  ) {
    line(
      width * 0.5,
      i + 100 * sin(frameCount * 0.01),
      -width * 0.5,
      i + 100 * sin(frameCount * 0.01)
    );
  }

  data.illusion.spacing = 10 + abs(100 * sin(frameCount * 0.01));
}
