let data = {
  sketch: {
    background: "#000000"
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  stroke(255);
  angleMode(DEGREES);
  colorMode(HSL, 100);
}

function draw() {
  background(data.sketch.background);

  translate(width * 0.5, height * 0.5);

  for (var i = 30; i > 0; i -= 1) {
    let frequency = 10;
    let amplitude = 25;
    push();
    ellipse(0, 0, i * amplitude * 2, i * amplitude * 2);
    fill(map(i, 60, 0, 90, 60), 100, 50, 1);
    if (i > 1) {
      let limit = i * 3;
      for (var j = 1; j < limit + 1; j += 1) {
        let phase = j * 360 / limit;

        let x1 = (i - 1) * amplitude * sin(frequency + phase);
        let y1 = (i - 1) * amplitude * cos(frequency + phase);
        let x2 = i * amplitude * sin(frequency + phase);
        let y2 = i * amplitude * cos(frequency + phase);

        push();
        rotate(frameCount * 0.01 * map(limit, 0, 30, 20, 0));
        line(x1, y1, x2, y2);
        pop();
      }
    }
  }
  pop();
}
