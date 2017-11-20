let data = {
  sketch: {
    background: "#000000"
  },
  mickey: {
    number: 64,
    head: 10
  }
};

let mickeys = [];
let song;
let fft;
let amp;

var loaded = () => {
  song.loop();
};

var setup = () => {
  createCanvas(windowWidth, windowHeight);
  song = loadSound("/sounds/experiments/73.mp3", loaded);
  fft = new p5.FFT(0.8, 64);
  amp = new p5.Amplitude();

  for (var i = 0, upperLimit_i = data.mickey.number; i < upperLimit_i; i += 1) {
    mickeys[i] = new Mickey(i);
  }
  angleMode(DEGREES);
  ellipseMode(CENTER);
  colorMode(HSB, 100);
  noStroke();
};

var draw = () => {
  background(data.sketch.background);
  let vol = amp.getLevel();
  let spectrum = fft.analyze();

  for (
    var i = spectrum.length - 1, upperLimit_i = 0;
    i > upperLimit_i;
    i -= 1
  ) {
    mickeys[i].show(1, spectrum[i]);
  }
};

class Mickey {
  constructor(i = 1, cx = width * 0.5, cy = height * 0.6) {
    this.i = i;
    this.origin = new p5.Vector(cx, cy);
    this.x = 0;
    this.y = 0;
  }

  show(vol = 1, f = 0) {
    push();
    translate(this.origin.x, this.origin.y);
    translate(this.x, this.y);
    if (this.i % 2 == 0) {
      fill(
        map(f, 0, 255, 0, 50 + 50 * sin(frameCount)),
        100,
        100
      );
    } else {
      fill(0);
    }
    this.shape(map(vol * f, 0, 1000, 0, 30));
    pop();
  }

  shape(size = 1) {
    push();
    ellipse(
      0,
      0,
      data.mickey.head * size * this.i,
      data.mickey.head * size * this.i
    );

    // Left most nail
    push();
    translate(
      -data.mickey.head * size * this.i * 0.5,
      -data.mickey.head * size * this.i * 0.5
    );
    ellipse(
      0,
      0,
      data.mickey.head * size * this.i * 0.7,
      data.mickey.head * size * this.i * 0.7
    );
    pop();

    // Right most nail
    push();
    translate(
      data.mickey.head * size * this.i * 0.5,
      -data.mickey.head * size * this.i * 0.5
    );
    ellipse(
      0,
      0,
      data.mickey.head * size * this.i * 0.7,
      data.mickey.head * size * this.i * 0.7
    );
    pop();

    pop();
  }

  update() {
    let rand = random(1);
    if (rand < 0.25) {
    } else if (rand < 0.5) {
    } else if (rand < 0.75) {
    } else {
    }
  }
}
