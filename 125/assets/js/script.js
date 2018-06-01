let data = {
  sketch: {
    background: "#00000001"
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  noStroke();
  angleMode(DEGREES);
  colorMode(HSL, 100);
}

function draw() {
  background(data.sketch.background);

  translate(width * 0.5, height * 0.5);

  for (var i = 30 + 30 * sin(frameCount); i > 0; i -= 1) {
    push();
    fill(map(i, 60, 0, 100, 0), 100, 50, 2);
    if (i > 1) {
      for (var j = 1; j < i + 1; j += 1) {
        let frequency = 10 * Math.log(i * 10) * sin(frameCount);
        let phase = j * 360 / i + frameCount;
        let amplitude = 3 * tan(frameCount + i + frameCount);

        let x1 = (i - 1) * amplitude * sin(frequency + phase);
        let y1 = (i - 1) * amplitude * tan(frequency + phase);
        let x2 = i * amplitude * sin(frequency + phase);
        let y2 = i * amplitude * tan(frequency + phase);

        push();
        rotate(frameCount * Math.log(i));
        ellipse(x1, y1, x2, y2);
        pop();
      }
    }
  }
  pop();
}
