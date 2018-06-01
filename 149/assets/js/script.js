let data = {
  sketch: {
    background: "#111111"
  },
  grid: {
    n: {
      x: 40,
      y: 30
    },
    scale: {
      x: null,
      y: null
    }
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  data.grid.n.x *= random(0.3, 1.4);
  data.grid.n.y *= random(0.3, 1.4);
  data.grid.scale.x = width / data.grid.n.x;
  data.grid.scale.y = height / data.grid.n.y;
  rectMode(CENTER);
  ellipseMode(CENTER);
  fill(255);
  colorMode(HSB, 100);
  angleMode(DEGREES);
  noStroke();
}

let factor = 1;

function draw() {
  background(data.sketch.background);
  orbitControl();
  rotateX(10);
  translate(0, 0, -300);

  translate(-width * 0.5, -height * 0.5);

  for (var x = data.grid.scale.x * 0.5; x < width; x += data.grid.scale.x) {
    for (var y = data.grid.scale.y * 0.5; y < height; y += data.grid.scale.y) {
      push();
      let d = dist(x, y, width * 0.5, height * 0.5);
      fill(map(d, 0, (width + height) * 0.5, 0, 100), 100, 90, 100);
      translate(
        x,
        y,
        400 * (1 - 0.9 * noise(x, y) * tan(factor * frameCount * noise(x, y)))
      );
      scale(1 - 0.9 * noise(x, y) * sin(frameCount * noise(x, y)));
      rect(0, 0, data.grid.scale.y * 0.9, data.grid.scale.y * 0.9);
      pop();
    }
  }
}

function mousePressed () {
  factor *= -1;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  data.grid.n.x *= random(0.3, 1.4);
  data.grid.n.y *= random(0.3, 1.4);
  data.grid.scale.x = width / data.grid.n.x;
  data.grid.scale.y = height / data.grid.n.y;
  rectMode(CENTER);
  ellipseMode(CENTER);
  fill(255);
  colorMode(HSB, 100);
  angleMode(DEGREES);
  noStroke();
}
