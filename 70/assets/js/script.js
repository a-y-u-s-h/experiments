let data = {
  sketch: {
    background: "#FFFFFF"
  },
  circle: {
    root: 100,
    mf: 0.5,
    threshshold_radius: 20,
    speed: 1,
    spacing: 1
  },
  trail: {
    points: 800,
    color: "#287485"
  }
};


let c;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("canvas");
  ellipseMode(CENTER);
  angleMode(DEGREES);
  c = new Circle(width * 0.5, height * 0.5, data.circle.root, 1);
}

function init() {
  c = new Circle(width * 0.5, height * 0.5, data.circle.root, 1);
}

function draw() {
  background(data.sketch.background);
  c.update();
  c.show();
}
