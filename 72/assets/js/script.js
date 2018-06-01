let settings = {
  sketch: {
    background: "#BBBBBB"
  },
  data: {
    draw: {
      onmousedragged: true
    },
    size: 10,
    fill: {
      check: true,
      color: "#222222"
    },
    stroke: {
      check: false,
      color: "#000000",
      weight: 1
    }
  },
  line: {
    m: 1,
    b: 0,
    weight: 2,
    color: "#000000"
  }
};

let data = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("#container");
  canvas.id("canvas");
}

function draw() {
  background(settings.sketch.background);

  for (var i = 0, upperLimit_i = data.length; i < upperLimit_i; i += 1) {
    let x = map(data[i].x, 0, 1, 0, width);
    let y = map(data[i].y, 0, 1, 0, height);
    showData(x, y);
  }

  if (data.length > 1) {
    linearRegression();
    drawLine();
  }
}

var linearRegression = () => {
  let xsum = 0;
  let ysum = 0;
  for (var i = 0, upperLimit_i = data.length; i < upperLimit_i; i += 1) {
    xsum += data[i].x;
    ysum += data[i].y;
  }

  let xmean = xsum / data.length;
  let ymean = ysum / data.length;

  let num = 0;
  let den = 0;

  for (var i = 0, upperLimit_i = data.length; i < upperLimit_i; i += 1) {
    let x = data[i].x;
    let y = data[i].y;
    num += (x - xmean) * (y - ymean);
    den += (x - xmean) * (x - xmean);
  }

  settings.line.m = num / den;
  settings.line.b = ymean - settings.line.m * xmean;
};

var drawLine = () => {
  let x1 = 0;
  let y1 = settings.line.m * x1 + settings.line.b;
  let x2 = 1;
  let y2 = settings.line.m * x2 + settings.line.b;

  x1 = map(x1, 0, 1, 0, width);
  y1 = map(y1, 0, 1, 0, height);
  x2 = map(x2, 0, 1, 0, width);
  y2 = map(y2, 0, 1, 0, height);
  push();
  stroke(settings.line.color);
  strokeWeight(settings.line.weight);
  line(x1, y1, x2, y2);
  pop();
};

var showData = (x, y) => {
  if (settings.data.fill.check) {
    fill(settings.data.fill.color);
  } else {
    noFill();
  }

  if (settings.data.stroke.check) {
    stroke(settings.data.stroke.color);
    strokeWeight(settings.data.stroke.weight);
  } else {
    noStroke();
  }

  ellipse(x, y, settings.data.size);
};

  var mouseDragged = () => {
    let x = map(mouseX, 0, width, 0, 1);
    let y = map(mouseY, 0, height, 0, 1);
    let point = createVector(x, y);
    data.push(point);
  };
  var mousePressed = () => {
    let x = map(mouseX, 0, width, 0, 1);
    let y = map(mouseY, 0, height, 0, 1);
    let point = createVector(x, y);
    data.push(point);
  };
