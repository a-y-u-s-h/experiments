let data = {
  sketch: {
    background: {
      color: "#FFFFFF",
      a: 10
    },
    color_mode: ["RGB", "HSB"]
  },
  circle: {
    stroke: {
      color: "#000000",
      a: 190
    },
    r: window.innerWidth * 0.2,
    spacing: 1,
    toMorphto: 3,
    animation_speed: {
      x: 3,
      y: 3
    },
    shape_factors: {
      a: {
        x: 2,
        y: 2
      },
      b: {
        x: 3,
        y: 3
      },
      c: {
        x: 0.5,
        y: 0.5
      }
    }
  }
};

// Variable to store GUI
var controlkit;

// Function to create control GUI
var createControlKit = () => {
  controlkit = new ControlKit();
  controlkit
    .addPanel({
      fixed: false,
      label: "Controls"
    })
    .addSubGroup({
      label: "Background Settings"
    })
    .addColor(data.sketch.background, "color", {
      colorMode: "hex",
      label: "Background Color"
    })
    .addNumberInput(data.sketch.background, "a", {
      label: "Opacity",
      step: 1,
      dp: 2
    })
    .addSubGroup({
      label: "Click to observe Effect"
    })
    .addNumberInput(data.circle, "spacing", {
      label: "Point Spacing",
      step: 1,
      dp: 2
    })
    .addNumberInput(data.circle, "toMorphto", {
      label: "Target Polygon Vertices",
      step: 1,
      dp: 1
    })
    .addNumberInput(data.circle, "r", {
      label: "Radius of Circle",
      step: 1,
      dp: 2
    })
    .addSubGroup({
      label: "Dynamic Settings"
    })
    .addNumberInput(data.circle.animation_speed, "x", {
      label: "X Lerp Animation Speed",
      step: 0.1,
      dp: 2
    })
    .addNumberInput(data.circle.shape_factors.a, "x", {
      label: "X Lerp Factor A",
      step: 0.01,
      dp: 2
    })
    .addNumberInput(data.circle.shape_factors.b, "x", {
      label: "X Lerp Factor B",
      step: 0.01,
      dp: 2
    })
    .addNumberInput(data.circle.shape_factors.c, "x", {
      label: "X Lerp Factor C",
      step: 0.01,
      dp: 2
    })
    .addNumberInput(data.circle.animation_speed, "y", {
      label: "Y Lerp Animation Speed",
      step: 0.1,
      dp: 2
    })
    .addNumberInput(data.circle.shape_factors.a, "y", {
      label: "Y Lerp Factor A",
      step: 0.01,
      dp: 2
    })
    .addNumberInput(data.circle.shape_factors.b, "y", {
      label: "Y Lerp Factor B",
      step: 0.01,
      dp: 2
    })
    .addNumberInput(data.circle.shape_factors.c, "y", {
      label: "Y Lerp Factor C",
      step: 0.01,
      dp: 2
    })
    .addColor(data.circle.stroke, "color", {
      colorMode: "hex",
      label: "Stroke Color"
    })
    .addNumberInput(data.circle.stroke, "a", {
      label: "Opacity",
      step: 1,
      dp: 2
    });
};

createControlKit();

let circlePath = [];
let trianglePath = [];

function polarToCartesian(r, angle) {
  return createVector(r * cos(angle), r * sin(angle));
}

function mousePressed() {
  circlePath = [];
  trianglePath = [];
  let startA = 0;
  let endA = 360 / data.circle.toMorphto;

  let startV = polarToCartesian(data.circle.r, startA);
  let endV = polarToCartesian(data.circle.r, endA);

  if (data.circle.spacing !== 0) {
    for (var a = startA; a < 360; a += abs(data.circle.spacing)) {
      let x = data.circle.r * cos(a);
      let y = data.circle.r * sin(a);
      let cv = new p5.Vector(x, y);
      circlePath.push(cv);

      let amountToLerp = (a % (360 / data.circle.toMorphto)) / (endA - startA);
      let tv = p5.Vector.lerp(startV, endV, amountToLerp);
      trianglePath.push(tv);

      if ((a + data.circle.spacing) % (360 / data.circle.toMorphto) == 0) {
        startA = startA + 360 / data.circle.toMorphto;
        endA = endA + 360 / data.circle.toMorphto;
        startV = polarToCartesian(data.circle.r, startA);
        endV = polarToCartesian(data.circle.r, endA);
      }
    }
  }
}

function setup() {
  let canvas = createCanvas(windowWidth * 0.75, windowHeight);
  canvas.id("canvas");
  angleMode(DEGREES);
  background(255);
  strokeWeight(1);

  let startA = 0;
  let endA = 360 / data.circle.toMorphto;

  let startV = polarToCartesian(data.circle.r, startA);
  let endV = polarToCartesian(data.circle.r, endA);

  for (var a = startA; a < 360; a += data.circle.spacing) {
    let x = data.circle.r * cos(a);
    let y = data.circle.r * sin(a);
    let cv = new p5.Vector(x, y);
    circlePath.push(cv);

    let amountToLerp = (a % (360 / data.circle.toMorphto)) / (endA - startA);
    let tv = p5.Vector.lerp(startV, endV, amountToLerp);
    trianglePath.push(tv);

    if ((a + data.circle.spacing) % (360 / data.circle.toMorphto) == 0) {
      startA = startA + 360 / data.circle.toMorphto;
      endA = endA + 360 / data.circle.toMorphto;
      startV = polarToCartesian(data.circle.r, startA);
      endV = polarToCartesian(data.circle.r, endA);
    }
  }
}

function draw() {
  colorMode(data.sketch.color_mode);
  background(
    red(data.sketch.background.color),
    green(data.sketch.background.color),
    blue(data.sketch.background.color),
    abs(data.sketch.background.a)
  );
  translate(width * 0.5, height * 0.5);
  stroke(50 + 50 * sin(frameCount), 100, 100, 30);
  strokeWeight(1);
  stroke(
    red(data.circle.stroke.color),
    green(data.circle.stroke.color),
    blue(data.circle.stroke.color),
    abs(data.circle.stroke.a)
  );
  noFill();
  push();
  rotate(30 + frameCount);
  let amtx =
    (data.circle.shape_factors.a.x *
      sin(frameCount * data.circle.animation_speed.x) +
      data.circle.shape_factors.b.x) *
    data.circle.shape_factors.c.x;
  let amty =
    (data.circle.shape_factors.a.y *
      sin(frameCount * data.circle.animation_speed.y) +
      data.circle.shape_factors.b.y) *
    data.circle.shape_factors.c.y;
  beginShape();
  for (var i = 0; i < circlePath.length; i += 1) {
    let cv = circlePath[i];
    let tv = trianglePath[i];

    let x = lerp(cv.x, tv.x, amtx);
    let y = lerp(cv.y, tv.y, amty);
    curveVertex(x, y);
    push();
    strokeWeight(1);
    point(x, y);
    pop();
  }
  endShape(CLOSE);
  pop();
}
