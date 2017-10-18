let data = {
  sketch: {
    background: "#000000"
  },
  squares: {
    size: 25
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  for (
    var i = -1, upperLimit_i = Math.ceil(width / data.squares.size) + 1;
    i < upperLimit_i;
    i += 1
  ) {
    for (
      var j = -1, upperLimit_j = Math.ceil(height / data.squares.size) + 1;
      j < upperLimit_j;
      j += 1
    ) {
      push();
      translate(
        i * data.squares.size +
          10 * sin(frameCount * (upperLimit_i - i + 1) * 0.01),
        j * data.squares.size
      );
      if (i % 2 == 1) {
        fill(0);
        stroke(255);
      } else {
        fill(255);
        stroke(0);
      }
      rect(0, 0, data.squares.size * 0.5, data.squares.size * 0.5);
      pop();
    }
  }
}
