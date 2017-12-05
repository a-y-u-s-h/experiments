let data = {
  sketch: {
    background: "#FFFFFF78"
  }
};

let video;
let loading = true;
let scaleX;
let scaleY;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("canvas");
  noStroke();
  video = createVideo("assets/media/img/88.mp4", loaded);
  video.size(80, 60);
  video.hide();
  textAlign(CENTER, CENTER);
  colorMode(HSB, 100);
  scaleX = Math.ceil(width / 80);
  scaleY = Math.ceil(height / 60);
}

function loaded() {
  loading = false;
  if (!loading) {
    video.loop();
  }
}

function draw() {
  background(data.sketch.background);
  if (!loading) {
    video.loadPixels();

    for (var x = 0, upperLimit_x = video.width; x < upperLimit_x; x += 1) {
      for (var y = 0, upperLimit_y = video.height; y < upperLimit_y; y += 1) {
        let index = (x + y * video.width) * 4;
        let r = video.pixels[index + 0];
        let g = video.pixels[index + 1];
        let b = video.pixels[index + 2];

        fill(r, g, b);
        if (r > g) {
          push();
          translate(x * scaleX, y * scaleY);
          text("##", 0, 0);
          pop(); 
        }
      }
    }
    updatePixels();
  }
}
