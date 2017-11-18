let data = {
  sketch: {
    background: "#FFFFFF"
  },
  put: {
    a: 0.85,
    b: 0.04,
    c: -0.04,
    d: 0.87,
    tx: 0,
    ty: 1.6,
    weight: 0.85
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
    color: "#000000"
  },
  {
    a: -0.15,
    b: 0.28,
    c: 0.26,
    d: 0.24,
    tx: 0,
    ty: 0.44,
    weight: 0.07,
    color: "#000000"
  },
  {
    a: 0.2,
    b: -0.26,
    c: 0.23,
    d: 0.22,
    tx: 0,
    ty: 1.6,
    weight: 0.07,
    color: "#000000"
  },
  {
    a: 0,
    b: 0,
    c: 0,
    d: 0.16,
    tx: 0,
    ty: 0,
    weight: 0.01,
    color: "#000000"
  }
];

// Variable to store GUI
var controlkit;

// Function to create control GUI
var createControlKit = () => {
  controlkit = new ControlKit();
  controlkit
    .addPanel({
      fixed: false
    })
    .addSubGroup({
      label: "Rule 1"
    })
    .addColor(rules[0], "color", {
      colorMode: "hex",
      label: "Background Color"
    })
    .addNumberInput(rules[0], "a", {
      label: "a",
      step: 0.01,
      dp: 3
    })
    .addNumberInput(rules[0], "b", {
      label: "b",
      step: 0.01,
      dp: 3
    })
    .addNumberInput(rules[0], "c", {
      label: "c",
      step: 0.01,
      dp: 3
    })
    .addNumberInput(rules[0], "d", {
      label: "d",
      step: 0.01,
      dp: 3
    })
    .addNumberInput(rules[0], "tx", {
      label: "tx",
      step: 0.01,
      dp: 3
    })
    .addNumberInput(rules[0], "ty", {
      label: "ty",
      step: 0.01,
      dp: 3
    })
    .addNumberInput(rules[0], "weight", {
      label: "weight",
      step: 0.01,
      dp: 3
    })
    .addSubGroup({
      label: "Rule 2"
    })
    .addColor(rules[1], "color", {
      colorMode: "hex",
      label: "Background Color"
    })
    .addNumberInput(rules[1], "a", {
      label: "a",
      step: 0.01,
      dp: 3
    })
    .addNumberInput(rules[1], "b", {
      label: "b",
      step: 0.01,
      dp: 3
    })
    .addNumberInput(rules[1], "c", {
      label: "c",
      step: 0.01,
      dp: 3
    })
    .addNumberInput(rules[1], "d", {
      label: "d",
      step: 0.01,
      dp: 3
    })
    .addNumberInput(rules[1], "tx", {
      label: "tx",
      step: 0.01,
      dp: 3
    })
    .addNumberInput(rules[1], "ty", {
      label: "ty",
      step: 0.01,
      dp: 3
    })
    .addNumberInput(rules[1], "weight", {
      label: "weight",
      step: 0.01,
      dp: 3
    });
  controlkit
    .addPanel({
      fixed: true,
      align: "right",
      label: "Controls"
    })
    .addSubGroup({
      label: "Rule 3"
    })
    .addColor(rules[2], "color", {
      colorMode: "hex",
      label: "Background Color"
    })
    .addNumberInput(rules[2], "a", {
      label: "a",
      step: 0.01,
      dp: 3
    })
    .addNumberInput(rules[2], "b", {
      label: "b",
      step: 0.01,
      dp: 3
    })
    .addNumberInput(rules[2], "c", {
      label: "c",
      step: 0.01,
      dp: 3
    })
    .addNumberInput(rules[2], "d", {
      label: "d",
      step: 0.01,
      dp: 3
    })
    .addNumberInput(rules[2], "tx", {
      label: "tx",
      step: 0.01,
      dp: 3
    })
    .addNumberInput(rules[2], "ty", {
      label: "ty",
      step: 0.01,
      dp: 3
    })
    .addNumberInput(rules[2], "weight", {
      label: "weight",
      step: 0.01,
      dp: 3
    })
    .addSubGroup({
      label: "Rule 4"
    })
    .addColor(rules[3], "color", {
      colorMode: "hex",
      label: "Background Color"
    })
    .addNumberInput(rules[3], "a", {
      label: "a",
      step: 0.01,
      dp: 3
    })
    .addNumberInput(rules[3], "b", {
      label: "b",
      step: 0.01,
      dp: 3
    })
    .addNumberInput(rules[3], "c", {
      label: "c",
      step: 0.01,
      dp: 3
    })
    .addNumberInput(rules[3], "d", {
      label: "d",
      step: 0.01,
      dp: 3
    })
    .addNumberInput(rules[3], "tx", {
      label: "tx",
      step: 0.01,
      dp: 3
    })
    .addNumberInput(rules[3], "ty", {
      label: "ty",
      step: 0.01,
      dp: 3
    })
    .addNumberInput(rules[3], "weight", {
      label: "weight",
      step: 0.01,
      dp: 3
    });
};

createControlKit();

let tree;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("#container");
  canvas.id("canvas");
  background(data.sketch.background);
  strokeWeight(1);
  tree = new Fractal();
}

function draw() {
  tree.show();
}

class Fractal {
  constructor() {
    this.rules = rules;
    this.x = Math.random();
    this.y = Math.random();
  }

  show() {
    push();
    translate(width * 0.5, height);
    scale(1, -1);
    for (var i = 0, upperLimit_i = 150; i < upperLimit_i; i += 1) {
      let rule = this.getRule();
      let x1 = this.x * rule.a + this.y * rule.b + rule.tx;
      let y1 = this.x * rule.c + this.y * rule.d + rule.ty;

      this.x = x1;
      this.y = y1;
      stroke(rule.color);
      point(this.x * 50, this.y * 50);
      endShape();
    }
    pop();
  }

  putRule(rule) {
    let put = {};
    put.a = rule.a ? rule.a : 0;
    put.b = rule.b ? rule.b : 0;
    put.c = rule.c ? rule.c : 0;
    put.d = rule.d ? rule.d : 0;
    put.tx = rule.tx ? rule.tx : 0;
    put.ty = rule.ty ? rule.ty : 0;
    put.weight = rule.weight ? rule.weight : 0;
    let previous = this.rules;
    this.rules = [];
    this.rules.push(...previous);
    this.rules.unshift(put);
  }

  getRule() {
    let rand = Math.random();
    for (
      var i = 0, upperLimit_i = this.rules.length;
      i < upperLimit_i;
      i += 1
    ) {
      let rule = this.rules[i];
      if (rand < rule.weight) {
        return rule;
      }
      rand -= rule.weight;
    }
  }
}

function mousePressed() {
  if (mouseX > width * 0.2 && mouseX < width * 0.8) {
    background(255);
  }
}
