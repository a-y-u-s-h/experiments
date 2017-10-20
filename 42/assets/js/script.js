let data = {
  sketch: {
    background: "#FFFFFF"
  },
  rings: {
    n: 10
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(data.sketch.background);
}

function draw() {
  push();
  strokeWeight(3);
  stroke(0);
  line(width * 0.5, 0, width * 0.5, height);
  pop();

  if (mouseIsPressed) {
    push();
    line(pmouseX, pmouseY, mouseX, mouseY);
    pop();

    push();
    line(width - pmouseX, pmouseY, width - mouseX, mouseY);
    pop();
  }
}

function keyTyped() {
    background(data.sketch.background);
}
