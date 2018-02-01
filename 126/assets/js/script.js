let data = {
  sketch: {
    background: "#000000"
  },
  constants: {
    frequency: 20,
    amplitude: 25
  },
  variables: {
    limit: undefined,
    phase: undefined,
    x1: undefined,
    y1: undefined,
    x2: undefined,
    y2: undefined
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

  for (var i = 20; i > 0; i -= 1) {
    data.constants.amplitude = 40 * map(i, 0, 20, 0.5, 1);
    push();
    ellipse(0, 0, i * data.constants.amplitude * 2, i * data.constants.amplitude * 2);
    fill(map(i * sin(frameCount + i * 5), -20, 20, 0, 100), 100, 50, 1);
    if (i > 1) {
       data.variables.limit = map(i, 0, 20, 0, 100);
      for (var j = 1; j < data.variables.limit + 1; j += 1) {
         data.variables.phase = j * 360 / data.variables.limit;
         data.variables.x1 = (i - 1) * 40 * map(i - 1, 0, 20, 0.5, 1) * sin(data.constants.frequency + data.variables.phase);
         data.variables.y1 = (i - 1) * 40 * map(i - 1, 0, 20, 0.5, 1) * cos(data.constants.frequency + data.variables.phase);
         data.variables.x2 = i * data.constants.amplitude * sin(data.constants.frequency + data.variables.phase);
         data.variables.y2 = i * data.constants.amplitude * cos(data.constants.frequency + data.variables.phase);

        push();
        rotate(frameCount * 0.015 * map(data.variables.limit, 0, 30, 10, 0));
        line(data.variables.x1, data.variables.y1, data.variables.x2, data.variables.y2);
        pop();
      }
    }
  }
  pop();
}
