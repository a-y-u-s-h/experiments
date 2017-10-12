let data = {
  sketch: {
    background: "#000000"
  }
};

let dancer;
let music;
let soundLoading = true;
let videoLoading = true;
function setup() {
  createCanvas(windowWidth, windowHeight);
  dancer = createVideo("assets/media/vid/34.mp4", videoLoaded).hide();
  dancer.size(80, 60);
  music = loadSound("/sounds/experiments/34.mp3", soundLoaded);
}

function soundLoaded() {
  soundLoading = false;
  music.loop();
}

function videoLoaded() {
  videoLoading = false;
  dancer.loop();
  dancer.speed(1.2);
}

function draw() {
  if (soundLoading || videoLoading) {
    push();
    background(0);
    textSize(15);
    noStroke();
    fill(255);
    translate(width * 0.5, height * 0.5);
    textAlign(CENTER, CENTER);
    text("Loading..", 0, 0);
    pop();
  } else {
    background(data.sketch.background);
    stroke(0);
    // rectMode(CENTER);
    colorMode(HSB, 100);
    angleMode(DEGREES);
    dancer.loadPixels();
    for (var x = 0, upperLimit_x = dancer.width; x < upperLimit_x; x += 1) {
      for (var y = 0, upperLimit_y = dancer.height; y < upperLimit_y; y += 1) {
        let index = (x + y * dancer.width) * 4;
        let r = dancer.pixels[index + 0];
        let g = dancer.pixels[index + 1];
        let b = dancer.pixels[index + 2];
        let bright = (r + g + b) / 2;
        fill(
          map(r * x, 0, 255 * dancer.width, 100 * cos(frameCount), 100 * sin(frameCount)),
          map(g * y, 0, 255 * dancer.height, 80, 100 * cos(frameCount)),
          map(
            b * (x + y),
            0,
            255 * (dancer.width + dancer.height),
            random(20, 25),
            100
          )
        );
        if ( bright < 127 ) {
            strokeWeight(2);

        } else {
              strokeWeight(1);

        }
        rect(
          x * (1 * width / dancer.width),
          y * (1 * height / dancer.height),
          1 * (1 * width / dancer.width),
          1 * (1 * height / dancer.height)
        );
      }
    }
    // image(dancer, 0, 0, width, height);
  }
}
