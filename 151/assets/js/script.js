let data = {
  sketch: {
    background: "#000000"
  }
}

function setup () {
  createCanvas(windowWidth, windowHeight, WEBGL);

  angleMode(DEGREES);
  noStroke();
  colorMode(HSB, 100);
}

function draw () {
  background(data.sketch.background);

  rotateY(frameCount * 0.4)
  rotateZ(frameCount * 0.4)
  rotateX(frameCount * 0.4)
  scale(2);

  for (var x = -10, upperLimit_x = 10 ; x < upperLimit_x; x += 1 ) {
    for (var y = -10, upperLimit_y = 10 ; y < upperLimit_y; y += 1 ) {
      push();
      let a = x * 10;
      let b = y * 10;
      let d = dist(x, y, 0, 0); 
      let z = 100 * tan(frameCount + d * sin(frameCount) * 10)
      translate(a, b, z);
      fill(map(d, 0, 10 * Math.SQRT2, 0, 50 + 20 * sin(frameCount)), 100, 100)
      rect(0, 0, 9, 9);
      pop();
    }
  }
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight)
}