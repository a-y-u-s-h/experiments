let data = {
  sketch: {
    background: "#333444"
  },
  pixels: {
    size: 20
  }
};

let grid;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 100);
  rectMode(CENTER);
  grid = new Grid();
  grid.init();
}

function draw() {
  background(data.sketch.background);
  grid.disco();
  grid.show();
  console.log(frameCount);
}

class Pixel {
  constructor(cx, cy, i = 0, j = 0) {
    this.cx = cx;
    this.cy = cy;
    this.i = i;
    this.j = j;
    this.color = color(random(100), random(100), random(100));
  }

  show() {
    push();
    fill(this.color);
    strokeWeight(1 + 2 * sin(frameCount * 0.01))
    translate(this.cx, this.cy);
    rotate(frameCount * 0.05)
    rect(0, 0, data.pixels.size, data.pixels.size);
    pop();
  }

  disco()  {
    this.color = color(20 + 20 * sin(frameCount * 0.01) + random(10, 20), random(10, 20) + 50 + 20 * cos(frameCount * (this.j + 1) * 0.0001), 100);
  }
}

class Grid {
  constructor() {
    this.pixels = [];
  }

  init() {
    for (
      let i = 0, upperLimit_i = round(width / data.pixels.size);
      i < upperLimit_i;
      i += 1
    ) {
      this.pixels[i] = [];
      for (
        let j = 0, upperLimit_j = round(height / data.pixels.size);
        j < upperLimit_j;
        j += 1
      ) {
        let x = (i + 0.5) * data.pixels.size;
        let y = (j + 0.5) * data.pixels.size;
        this.pixels[i].push(new Pixel(x, y, i, j));
      }
    }
  }

  show() {
    for (
      let i = 0, upperLimit_i = this.pixels.length;
      i < upperLimit_i;
      i += 1
    ) {
      for (
        let j = 0, upperLimit_j = this.pixels[i].length;
        j < upperLimit_j;
        j += 1
      ) {
        this.pixels[i][j].show();
      }
    }
  }

  destroy()  {
    this.pixels = [];
  }


  disco()  {
    for (var i = 0, upperLimit_i = this.pixels.length ; i < upperLimit_i; i += 1 ) {
      for (var j = 0, upperLimit_j = this.pixels[i].length ; j < upperLimit_j; j += 1 ) {
        this.pixels[i][j].disco();
      }
    }
  }
}

