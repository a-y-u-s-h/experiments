let data = {
  sketch: {
    background: "#000000"
  },
  cities: {
    n: 10,
    r: 10
  }
};

let universe;
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  universe = new Universe();
}

function draw() {
  background(data.sketch.background);

  universe.show();
  universe.update("random-swapping");
}

