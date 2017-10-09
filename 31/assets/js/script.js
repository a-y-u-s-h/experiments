let data = {
  sketch: {
    background: "#0A5E6E"
  }
};

let yinYang;

function setup() {
  createCanvas(windowWidth, windowHeight);
  yinYang = new YinYang(width / 2, height / 2);
}

function draw() {
  background(data.sketch.background);
  yinYang.rotate();
  yinYang.show();
}

class YinYang {
  constructor(cx, cy) {
    this.cx = cx;
    this.cy = cy;
    this.size = height * 0.75;
    this.rotation = 0;
  }

  show() {
    push();
    translate(this.cx, this.cy);
    rotate(this.rotation);
    ellipseMode(CENTER);
    angleMode(DEGREES);
    noStroke();

    // Biggest Left Half : White
    fill(255);
    arc(0, 0, this.size, this.size, 90, 270);

    // Biggest Right Half : Black
    fill(0);
    arc(0, 0, this.size, this.size, -90, 90);

    // Smaller Upper Left Half : Black
    fill(0);
    arc(1, -this.size * 0.25, this.size * 0.5, this.size * 0.5, 90, 270);

    // Smaller Bottom Right Half: White
    fill(255);
    arc(-1, this.size * 0.25, this.size * 0.5, this.size * 0.5, -90, 90);

    // Small Black circle in white part
    fill(0);
    ellipse(0, this.size * 0.25, this.size * 0.125, this.size * 0.125);

    // Small White circle in black part
    fill(255);
    ellipse(0, -this.size * 0.25, this.size * 0.125, this.size * 0.125);

    pop();
  }

  rotate()  {
    angleMode(DEGREES);
    this.rotation = - frameCount ;
  }
}
