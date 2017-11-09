let data = {
  sketch: { background: "#FC5800" },
  pattern: {
    petal: {
      kx: 6,
      ky: 6,
      increment: 0,
      size: 300,
      angle: 360,
      pointy: false,
      fill: {
        check: true,
        color: "#128b94"
      },
      stroke: {
        check: true,
        color: "#000000",
        weight: 2
      }
    },
    point: {
      show: false,
      stroke: {
        check: false,
        color: "#000000",
        weight: 1
      },
      fill: {
        check: true,
        color: "#000000"
      },
      size: 5
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
      label: "Sketch Controls"
    })
    .addColor(data.sketch, "background", {
      colorMode: "hex",
      label: "Background Color"
    })
    .addSubGroup({
      label: "Petal Settings"
    })
    .addNumberInput(data.pattern.petal, "kx", {
      label: "k in rx = A * cos(k * θ)",
      step: 0.1,
      dp: 3
    })
    .addNumberInput(data.pattern.petal, "ky", {
      label: "k in ry = A * sin(k * θ)",
      step: 0.1,
      dp: 3
    })
    .addNumberInput(data.pattern.petal, "size", {
      label: "Petal Size",
      step: 1,
      dp: 3
    })
    .addNumberInput(data.pattern.petal, "increment", {
      label: "Resolution",
      step: 0.01,
      dp: 2
    })
    .addNumberInput(data.pattern.petal, "angle", {
      label: "Angle to travel",
      step: 1,
      dp: 1
    })
    .addCheckbox(data.pattern.petal, "pointy", {
      label: "Pointy?"
    })
    .addCheckbox(data.pattern.petal.stroke, "check", {
      label: "Stroke?"
    })
    .addNumberInput(data.pattern.petal.stroke, "weight", {
      label: "Stroke Weight",
      step: 1,
      dp: 1
    })
    .addColor(data.pattern.petal.stroke, "color", {
      colorMode: "hex",
      label: "Stroke Color"
    })
    .addCheckbox(data.pattern.petal.fill, "check", {
      label: "Fill?"
    })
    .addColor(data.pattern.petal.fill, "color", {
      colorMode: "hex",
      label: "Fill Color"
    })
    .addSubGroup({
      label: "Point Settings"
    })
    .addCheckbox(data.pattern.point, "show", {
      label: "Show?"
    })
    .addColor(data.pattern.point.stroke, "color", {
      colorMode: "hex",
      label: "Stroke Color"
    })
    .addColor(data.pattern.point.fill, "color", {
      colorMode: "hex",
      label: "Fill Color"
    })
    .addNumberInput(data.pattern.point, "size", {
      label: "Size",
      step: 1,
      dp: 1
    });
};

createControlKit();

class Pattern {
  constructor(cx, cy, size, k) {
    this.origin = new p5.Vector(cx, cy);
    this.size = size;
    this.kx = data.pattern.petal.kx;
    this.ky = data.pattern.petal.ky;
    this.increment = data.pattern.petal.increment;
  }

  show() {
    push();
    translate(this.origin.x, this.origin.y);
    if (data.pattern.petal.stroke.check) {
      stroke(data.pattern.petal.stroke.color);
      strokeWeight(data.pattern.petal.stroke.weight);
    } else {
      noStroke();
    }

    if (data.pattern.petal.fill.check) {
      fill(data.pattern.petal.fill.color);
    } else {
      noFill();
    }
    beginShape();
    for (
      var angle = 0, upperLimit_angle = data.pattern.petal.angle;
      angle < upperLimit_angle + 3;
      angle += 1 + abs(this.increment)
    ) {
      let x = this.size * cos(this.kx * angle) * cos(angle);
      let y = this.size * cos(this.ky * angle) * sin(angle);
      if (data.pattern.petal.pointy) {
        vertex(x, y);
      } else {
        curveVertex(x, y);
      }
      if (data.pattern.point.show) {
        push();
        if (data.pattern.point.stroke.check) {
          stroke(data.pattern.point.stroke.color);
          strokeWeight(data.pattern.point.stroke.weight);
        } else {
          noStroke();
        }

        if (data.pattern.point.fill.check) {
          fill(data.pattern.point.fill.color);
        } else {
          noFill();
        }
        ellipse(x, y, data.pattern.point.size, data.pattern.point.size);
        pop();
      }
    }
    endShape();
    pop();
  }

  update() {
    this.kx = data.pattern.petal.kx;
    this.ky = data.pattern.petal.ky;
    this.increment = data.pattern.petal.increment;
    this.size = data.pattern.petal.size;
  }
}

let p;

function setup() {
  createCanvas(windowWidth * 0.77, windowHeight);
  angleMode(DEGREES);
  ellipseMode(CENTER);
  p = new Pattern(width * 0.5, height * 0.5, 300, 4);
}

function draw() {
  background(data.sketch.background);
  p.update();
  p.show();
}
