let data = {
  sketch: {
    background: "#000000"
  },
  grid: {
    ny: 250,
    nx: 60,
    strokeWeight: 3
  }
};

let song;
let fft;
let loading = true;

function setup() {
  let c = createCanvas(windowWidth, windowHeight);
  console.log("Song Credits : TVF Pitchers OST by Vaibhav Bundhoo.");
  song = loadSound("/sounds/experiments/33.mp3", loaded);
  fft = new p5.FFT(0.8, 512);
}

function loaded() {
  loading = false;
  song.play();
}

function draw() {
  background(data.sketch.background);

  if (loading) {
    push();
    translate(width * 0.5, height * 0.5);
    textSize(20);
    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    text("Loading...", 0, 0);
    pop();
  } else {
    let spectrum = fft.analyze();
    push();
    translate(width * 0.5, height * 0.5);
    colorMode(HSB, 100);
    noStroke();
    rectMode(CENTER);
    fill(255, 0, 0);
    for (var i = 0, upperLimit_i = spectrum.length; i < upperLimit_i; i += 1) {
      fill(
        map(i * 5, 0, upperLimit_i * 5, 0, 100),
        map(i, 0, upperLimit_i, 100, 0),
        map(i, 0, upperLimit_i, 100, 0)
      );

      let h = map(spectrum[i], 0, 255, 0, height * 0.5);
      let x = map(
        i * width / data.grid.ny,
        0,
        width,
        -width * 0.5,
        width * 0.5
      );
      let w = width / data.grid.ny;
      rect(x - w / 2, 0, w, h);
    }
    pop();

    push();
    translate(width * 0.5, height * 0.5);
    strokeWeight(data.grid.strokeWeight);
    for (
      var i = -width * 0.5, upperLimit_i = width * 0.5;
      i < upperLimit_i;
      i += width / data.grid.ny
    ) {
      line(i, -height * 0.5, i, height * 0.5);
    }

    // for (
    //   var i = -height * 0.5, upperLimit_i = height * 0.5;
    //   i < upperLimit_i;
    //   i += height / data.grid.nx
    // ) {
    //   line(-width * 0.5, i, width * 0.5, i);
    // }
    pop();
  }
}

function mousePressed() {
  if (!loading) {
    if (song.isPlaying()) {
      song.pause();
    } else {
      song.play();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
