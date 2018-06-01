let data = {
  sketch: {
    background: "#FFFFFF",
    max_clicks: 4,
    counter: 0
  },
  fractal: {
    root: 600
  }
};

let root;
let vicsek = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  root = new Box(0, 0, 0, data.fractal.root);
  vicsek.push(root);
  colorMode(HSB, 100);
}

function draw() {
  background(data.sketch.background);

  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  if ( data.sketch.counter < data.sketch.max_clicks ) {
  scale( map(data.sketch.max_clicks - data.sketch.counter, data.sketch.max_clicks, 0, 0.5, 1));
    
  }
  for (var i = 0, upperLimit_i = vicsek.length; i < upperLimit_i; i += 1) {
    vicsek[i].show();
  }
}

function mousePressed() {
  if (data.sketch.counter < data.sketch.max_clicks) {
    let next = [];
    vicsek.forEach(b => {
      next.push(...b.generate());
    });
    vicsek = next;
  }
  data.sketch.counter++;
}