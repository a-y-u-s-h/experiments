let data = {
  sketch: {
    background: "#FFFFFF"
  }
};

let rules = [
  {
    a: 0.85,
    b: 0.04,
    c: -0.04,
    d: 0.87,
    tx: 0,
    ty: 1.6,
    weight: 0.85,
    color: "#148272"
  },
  {
    a: -0.15,
    b: 0.28,
    c: 0.26,
    d: 0.24,
    tx: 0,
    ty: 0.44,
    weight: 0.07,
    color: "#A89906"
  },
  {
    a: 0.2,
    b: -0.26,
    c: 0.23,
    d: 0.22,
    tx: 0,
    ty: 1.6,
    weight: 0.07,
    color: "#7D2B9C"
  },
  {
    a: 0,
    b: 0,
    c: 0,
    d: 0.16,
    tx: 0,
    ty: 0,
    weight: 0.01,
    color: "#A50B0B"
  }
];

let x;
let y;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("#container");
  canvas.id("canvas");
  background(data.sketch.background);
  strokeWeight(1);

  x = Math.random();
  y = Math.random();
}

var getRule = () => {
  let rand = Math.random();
  for (var i = 0, upperLimit_i = rules.length; i < upperLimit_i; i += 1) {
    let rule = rules[i];
    if (rand < rule.weight) {
      return rule;
    }
    rand -= rule.weight;
  }
};

function draw() {
  translate(width * 0.5, height);
  scale(1, -1);
  for (var i = 0, upperLimit_i = 150; i < upperLimit_i; i += 1) {
    let rule = getRule();
    let x1 = x * rule.a + y * rule.b + rule.tx;
    let y1 = x * rule.c + y * rule.d + rule.ty;

    x = x1;
    y = y1;
    point(x * 50, y * 50);
    endShape();
  }
}
