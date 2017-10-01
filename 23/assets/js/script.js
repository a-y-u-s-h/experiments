let data = {
  sketch: {
    background: "#000000"
  }
};

class Eye {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.angle = 0;
  }

  update(mx, my) {
    this.angle = atan2(my - this.y, mx - this.x);
  }

  show() {
    push();
    translate(this.x, this.y);
    fill(255);
    ellipse(0, 0, this.r, this.r);
    rotate(this.angle);
    fill(153, 204, 0);
    ellipse(this.r / 4, 0, this.r / 2, this.r / 2);
    pop();
  }
}

let eyes = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0, upperLimit_i = 14; i < upperLimit_i; i += 1) {
    eyes.push(new Eye(random(0, width), random(0, height), random(40, 100)));
  }
}

function draw() {
  background(data.sketch.background);
  for (var i = 0, upperLimit_i = eyes.length; i < upperLimit_i; i += 1) {
    eyes[i].update(mouseX, mouseY);
    eyes[i].show();
  }
}
