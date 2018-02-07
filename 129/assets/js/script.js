let data = {
  sketch: {
    background: "#00000010"
  },
  animation: {
    size: 20
  }
};

let comic = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  ellipseMode(CENTER);
  angleMode(DEGREES);
  colorMode(HSL, 100);
}

function draw() {
  background(100);

  translate(width * 0.5, height * 0.5);
  if (comic) {
    stroke(0);
  } else {
    noStroke();
  }

  for (
    var x = -width * 0.5;
    x < width * 0.5 + data.animation.size * 3;
    x += data.animation.size
  ) {
    for (
      var y = -height * 0.5;
      y < height * 0.5 + data.animation.size * 3;
      y += data.animation.size
    ) {
      let d = abs(dist(x, y, 0, 0));
      push();
      fill(map(d, 0, (width + height) * 0.5, 0, 100), 100, 40, 80);
      rect(
        x,
        y,
        data.animation.size * (1 + 0.5 * sin(-frameCount * 10 + d * 0.7)),
        data.animation.size * (1 + 0.5 * sin(-frameCount * 10 + d * 0.7))
      );
      pop();
    }
  }
}

function mousePressed() {
  comic = !comic;
}
