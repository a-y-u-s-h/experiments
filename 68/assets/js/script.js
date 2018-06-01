let data = {
  sketch: {
    background: "#FFFFFF"
  }
};

let separator;

function setup() {
  createCanvas(windowWidth, windowHeight);
  separator = new Separator();
  noFill();
}

function draw() {
  background(255);

  if (frameCount % 10 == 0) {
    if (mouseX < width * 0.5) {
      separator.init();
    }
  }
  separator.show();
}

class Separator {
  constructor(x = width * 0.5) {
    this.x = x;
    this.slits = [new Slit(x, height * 0.335), new Slit(x, height * 0.685)];
    this.waves = [];
  }

  init() {
    this.waves.push(new Bar());
  }

  takeout() {
    this.waves.forEach((wave, index) => {
      if (wave.position.x > width * 0.25) {
        this.waves.splice(index, 1);
      }
      this.waves.clean(undefined);
      this.waves.clean(null);
    });
  }

  show() {
    push();
    strokeWeight(5);
    strokeCap(SQUARE);
    line(width * 0.5, 0, width * 0.5, height * 0.32);
    line(width * 0.5, height * 0.35, width * 0.5, height * 0.67);
    line(width * 0.5, height * 0.7, width * 0.5, height);
    pop();

    this.takeout();

    if (this.waves.length > 0) {
      this.waves.forEach(wave => {
        wave.update();
        wave.show();
      });
    }

    this.slits.forEach(slit => {
      if (frameCount % 5 == 0) {
        if (this.waves.length > 0) {
          if (this.waves[0].position.x >= width * 0.24) {
            slit.insert();
          }
        }
      }
      slit.emit();
    });
  }
}

class Slit {
  constructor(x, y) {
    this.position = new p5.Vector(x, y);
    this.semicircles = [];
  }

  insert() {
    this.semicircles.push(new Semicircle(this.position.x, this.position.y));
  }

  takeout() {
    this.semicircles.forEach((semicircle, index) => {
      if (semicircle.r > height * 2) {
        this.semicircles.splice(index, 1);
      }
      this.semicircles.clean(undefined);
      this.semicircles.clean(null);
    });
  }

  emit() {
    this.semicircles.forEach(semicircle => {
      semicircle.update();
      semicircle.show();
      this.takeout();
    });
  }
}

class Semicircle {
  constructor(cx, cy) {
    this.position = new p5.Vector(cx, cy);
    this.r = 0;
  }

  show() {
    push();
    fill(0, 3);
    translate(this.position.x, this.position.y);
    arc(0, 0, this.r * 2, this.r * 2, -HALF_PI, HALF_PI);
    pop();
  }

  update() {
    this.r = lerp(this.r, this.r + 5, 0.7);
  }
}

class Bar {
  constructor() {
    this.position = new p5.Vector();
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    line(this.position.x, 0, this.position.x, height);
    pop();
  }

  update() {
    this.position.x = lerp(this.position.x, this.position.x + 5, 0.6);
  }
}

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};
