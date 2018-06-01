let data = {
  sketch: {
    background: "#FFC28E"
  },
  fractal: {
    text: `ॐ`,
    fill: "#FF1E00",
    size: 200,
    size_multiplier: 0.5,
    threshhold_factor: 0.2,
    yinyangs: 10,
    spacing: 2.2,
    rotation: {
      check: true,
      value: 0
    }
  }
};

let song;
let loading = true;
let amplitude;
let vol;
let fft;
let spectrum;

function setup() {
  createCanvas(windowWidth, windowHeight);
  song = loadSound("/sounds/experiments/41.mp3", loaded);
  amplitude = new p5.Amplitude();
  fft = new p5.FFT(0.8, 64);
}

function loaded() {
  loading = false;
  song.play();
}

function draw() {
  background(data.sketch.background);
  angleMode(DEGREES);
  colorMode(HSB, 100);

  vol = amplitude.getLevel();
  spectrum = fft.analyze();
  for (var i = 0, upperLimit_i = spectrum.length; i < upperLimit_i; i += 1) {
    push();
    translate(width * 0.5, height * 0.5);
    fill(
      map(spectrum[i], 0, 255, 100, 0),
      map(spectrum[i], 0, 255, 100, 0),
      map(spectrum[i], 0, 255, 0, 100)
    );
    stroke(0);
    ellipse(
      0,
      0,
      data.fractal.size * 0.12 * (upperLimit_i - i + 1),
      data.fractal.size * 0.12 * (upperLimit_i - i + 1)
    );
    pop();
  }
  push();
  translate(width * 0.5, height * 0.5);
  rotate(data.fractal.rotation);
  fractal(data.fractal.size, `${data.fractal.text}`);
  pop();
}

function fractal(size, symbol) {
  noSmooth();
  textAlign(CENTER, CENTER);
  textSize(size);
  angleMode(DEGREES);
  noStroke();
  if ( loading ) {
  fill(data.fractal.fill);
  noStroke();
} else {
  stroke(0);
  fill(255);
  strokeWeight(1);
}
  push();
  text(`${symbol}`, 0, 0);
  pop();

  if (size > data.fractal.size * data.fractal.threshhold_factor) {
    for (
      var angle = 0, upperLimit_angle = 360;
      angle < upperLimit_angle;
      angle += 360 / data.fractal.yinyangs
    ) {
      push();
      let x = size * data.fractal.spacing * cos(angle + frameCount * 0.1);
      let y = size * data.fractal.spacing * sin(angle + frameCount * 0.1);
      translate(x, y);
      scale(0.7 - vol);
      fractal(size * data.fractal.size_multiplier, `${symbol}`);
      pop();
    }
  }
}
