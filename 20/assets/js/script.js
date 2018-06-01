let data = {
  sketch: {
    background: "#983010"
  }
};

class Letter {
  constructor(x, y, key) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0.5;
    this.key = key;
    this.size = random(5, 200);
    this.random = random(0.7, 1);
  }

  show() {
    push();
    noStroke();
    colorMode(HSL);
    fill(0, this.random);
    textAlign(CENTER, CENTER);
    textSize(this.size);
    if (this.random < 0.5) {
      textStyle(BOLD);
    }
    text(this.key, this.x, this.y);
    pop();
  }

  update() {
    angleMode(DEGREES);
    if (this.x > width || this.x < 0) {
      this.vx *= -1;
    }

    if (this.y > height || this.y < 0) {
      this.vy *= -1;
    }
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }
}

let letters = [];
let sfx = [];
let loading = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  soundFormats('mp3');
  for (var i = 1, upperLimit_i = 13; i < upperLimit_i; i += 1) {
    if (i < 11) {
      sfx[i] = loadSound(`/sounds/experiments/20/${i}.mp3`);
    } else {
      sfx[i] = loadSound(`/sounds/experiments/20/${i}.mp3`, loaded);
    }
  }
}

function loaded() {
  loading = false;
}

function draw() {
  if (loading) {
    background(0);
    push();
    translate(width / 2, height / 2);
    rectMode(CENTER);
    angleMode(DEGREES);
    fill(255);
    rect(0, 0, 40 * sin(frameCount * 0.5), 20);
    pop();
  } else {
    background(data.sketch.background);
    for (var i = 0; i < letters.length; i += 1) {
      letters[i].update();
      letters[i].show();
    }
  }
}

function keyTyped() {
  if (keyIsDown) {
    sfx[Math.floor(random(1, 13))].play();
    letters.push(new Letter(random(0, width), random(0, height), key));
    if (letters.length > 100) {
      letters.splice(0, 1);
    }
  }
}
