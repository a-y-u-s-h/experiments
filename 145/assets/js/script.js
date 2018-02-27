let data = {
  sketch: {
    background: "#000000",
    scaleX: null,
    scaleY: null
  }
};

let video;
let portrait;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  video = createCapture(VIDEO);
  video.size(60, 40);
  video.hide();

  data.sketch.scaleX = width / video.width;
  data.sketch.scaleY = height / video.height;

  noStroke();
  rectMode(CENTER);
  angleMode(DEGREES);
  ellipseMode(CENTER);

  portrait = new Video3D(-width * 0.5, -height * 0.5);
}

function draw() {
  frameRate(60);
  background(data.sketch.background);
  camera(0, 0, 300);
  scale(-1, 1);

  portrait.show();
}

class Video3D {
  constructor(cx, cy) {
    this.position = new p5.Vector(cx, cy);
    this.brightnesses = [];
    this.boxes = [];
    this.init();
  }

  init() {
    for (var x = 0, upperLimit_x = video.width; x < upperLimit_x; x += 1) {
      this.brightnesses[x] = [];
      this.boxes[x] = [];
      for (var y = 0, upperLimit_y = video.height; y < upperLimit_y; y += 1) {
        this.brightnesses[x][y] = 0;
        this.boxes[x][y] = new Box(x, y);
      }
    }
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    orbitControl();
    video.loadPixels();
    ambientLight(0, 0, 0);
    directionalLight(200, 200, 200, 0.05, 0.05, 0.9);
    directionalLight(200, 200, 200, 0, 0.5, 0.3);
    pointLight(10, 10, 10, 0, 0, 300);
    translate(width * 0.006, height * 0.009);
    for (var x = 0, upperLimit_x = video.width; x < upperLimit_x; x += 1) {
      for (var y = 0, upperLimit_y = video.height; y < upperLimit_y; y += 1) {
        let index = (x + y * video.width) * 4;

        let r = video.pixels[index + 0];
        let g = video.pixels[index + 1];
        let b = video.pixels[index + 2];

        let bright = (r + g + b) / 3;
        if (this.brightnesses[x][y] !== NaN) {
          if (abs(this.brightnesses[x][y] - bright) > 3) {
            this.brightnesses[x][y] = bright;
          }
          this.displayBox(x, y);
        }
      }
    }
    pop();
  }

  displayBox(x, y) {
    specularMaterial(this.brightnesses[x][y]);
    this.boxes[x][y].update(this.brightnesses[x][y]);
    this.boxes[x][y].show();
  }
}

class Box {
  constructor(cx, cy, cz = 0) {
    this.position = new p5.Vector(cx, cy, cz);
    this.brightness = 0;
    if (this.brightness < 127.5) {
      this.size = map(this.brightness, 0, 127.5, -200, 0);
    } else {
      this.size = map(this.brightness, 127.5, 255, 0, 100);
    }
    this.shape = 0;
  }

  update(new_brightness) {
    this.brightness = new_brightness;
    if (this.brightness < 127.5) {
      this.size = map(this.brightness, 0, 127.5, -100, 0);
    } else {
      this.size = map(this.brightness, 127.5, 255, 0, 100);
    }
  }

  show() {
    push();

    translate(
      this.position.x * data.sketch.scaleX,
      this.position.y * data.sketch.scaleY,
      this.size
    );

    switch (this.shape % 4) {
      case 1:
        push();
        rotateX(radians(90));
        cylinder(data.sketch.scaleX * 0.5, 100);
        pop();
        break;
      case 2:
        push();
        torus(data.sketch.scaleX * 0.5, 5);
        pop();
        break;
      case 3:
        box(data.sketch.scaleX * 0.7, data.sketch.scaleX * 0.7, 100);
        break;
      default:
        sphere(data.sketch.scaleX * 0.7);
        break;
    }
    pop();
  }
}

function keyPressed() {
  portrait.boxes.forEach(array => {
    array.forEach(box => {
      box.shape++;
    });
  });
}
