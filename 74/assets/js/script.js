let data = {
  sketch: {
    background: "#FFFFFF",
    max_clicks: 2,
    counter: 0
  },
  fractal: {
    root: 300
  }
};

let root;
let sponge = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  root = new Box(0, 0, 0, data.fractal.root);
  sponge.push(root);
  colorMode(HSB, 100);
}

function draw() {
  background(data.sketch.background);

  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);

  for (var i = 0, upperLimit_i = sponge.length; i < upperLimit_i; i += 1) {
    sponge[i].show();
  }
}

function mousePressed() {
  if (data.sketch.counter < data.sketch.max_clicks) {
    let next = [];
    sponge.forEach(b => {
      next.push(...b.generate());
    });
    sponge = next;
  }
  data.sketch.counter++;
}
