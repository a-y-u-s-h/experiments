function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noFill();
  background(0);
}

function draw() {
  background(20);

  stroke(255);
  translate(width * 0.5, height * 0.5);

  rotate(frameCount);

  for (let j = 0; j < 2; j += 1) {
    beginShape();
    push();
    for (let angle = 1; angle < 361; angle += 1) {
      let r = 300 * 10 * (1 + 0.5 * sin(frameCount)) * sin(angle * 5) / angle;
      let x = r * cos(angle * 10 * sin(frameCount)) + 10 * sin(frameCount);
      let y = r * sin(angle * 10 * sin(frameCount)) + 10 * sin(frameCount);
      curveVertex(x * Math.pow(-1, j), y * Math.pow(-1, j));
    }
    pop();
    endShape();
  }
}
