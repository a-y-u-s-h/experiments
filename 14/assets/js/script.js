let song;
let fft;
let loaded = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  song = loadSound("/sounds/experiments/14.mp3", soundloaded);
  fft = new p5.FFT(0, 64);
}

function soundloaded() {
  song.play();
  loaded = true;
}

function draw() {
  if (!loaded) {
    push();
    background(0);
    translate(width / 2, height / 2);
    rectMode(CENTER);
    fill(255);
    textAlign(CENTER);
    text("Loading..", 0, -20);
    fill(255);
    rect(0, 0, 200 * Math.sin(frameCount * 0.05), 10);
    pop();
  } else {
    background(0);
    let spectrum = fft.analyze();
    push();
    translate(width / 2, height / 2);
    rectMode(CENTER);
    colorMode(HSL);
    scale(1, -1);
    angleMode(DEGREES);
    for (var i = 0, upperLimit = spectrum.length; i < upperLimit; i += 1) {
      let w = width / upperLimit;
      noFill();
      strokeWeight(10);
      let h = map(spectrum[i], 0, 255, 0, 100);
      let s = map(spectrum[i + 1] + spectrum[i], 0, 510, 100, 0);
      let l = map(spectrum[i + 2] + spectrum[i], 0, 510, 0, 100);
      stroke(h, s, l);
      arc(0, 0, i * w * 1.2, i * w * 1.2, 0, 360);
    }
    pop();
  }
}
