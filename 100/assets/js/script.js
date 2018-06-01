let data = {
  sketch: {
    background: "#FFFFFF"
  }
};

let vehicles = [];
let p;
let mouse;
let debug = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0, upperLimit_i = 100; i < upperLimit_i; i += 1) {
    vehicles[i] = new Vehicle(random(width), random(height), i);
  }

  newPath();
  background(data.sketch.background);
  noStroke();
}

function draw() {
  background(
    red(data.sketch.background),
    green(data.sketch.background),
    blue(data.sketch.background),
    255
  );

  p.display();

  vehicles.forEach(v => {
    v.separate(vehicles);
    v.run(p);
  });
}

function newPath() {
  p = new Path();

  p.addPoint(-20, height / 2);
  for (var i = 0; i < 10; i += 1) {
    p.addPoint(random(width / 10 * i, (i + 1) * width / 10), random(height * 0.2, height * 0.8));
  }
  p.addPoint(width + 20, height / 2);
}

function keyPressed() {
  if (key == " ") {
    debug = !debug;
  }
}

function mousePressed() {
  newPath();
}
