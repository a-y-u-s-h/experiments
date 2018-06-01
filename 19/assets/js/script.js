let data = {
  sketch: {
    background: "#10703B",
    rotate: 0,
    animate_rotation: true,
    animation_rotation_speed: 1,
    animate_spacing: false,
    animation_spacing_speed: 0.025
  },
  spiral: {
    n: 545,
    spacing: 1.58,
    curve: true,
    stroke: "#0c240f",
    strokeWeight: 1
  }
};

// To create ControlKit GUI
var controlKit;
var createControlKit = () => {
  controlKit = new ControlKit();

  controlKit
    .addPanel({
      fixed: false,
      label: "Controls"
    })
    .addColor(data.sketch, "background", {
      label: "Background"
    })
    .addNumberInput(data.sketch, "rotate", {
      label: "Manually Rotate Spiral"
    })
    .addCheckbox(data.sketch, "animate_rotation", {
      label: "Animate Rotation?"
    })
    .addNumberInput(data.sketch, "animation_rotation_speed", {
      label: "Rotation Animation Speed",
      dp: 2,
      step: 0.1
    })
    .addCheckbox(data.sketch, "animate_spacing", {
      label: "Animate Spacing?"
    })
    .addNumberInput(data.sketch, "animation_spacing_speed", {
      label: "Spacing Animation Speed",
      dp: 3,
      step: 0.001
    })
    .addSubGroup({
      label: "Spiral Controls"
    })
    .addColor(data.spiral, "stroke", {
      label: "Color"
    })
    .addNumberInput(data.spiral, "strokeWeight", {
      label: "Thickness"
    })
    .addNumberInput(data.spiral, "n", {
      label: "Number of Points"
    })
    .addNumberInput(data.spiral, "spacing", {
      label: "Spacing",
      dp: 3,
      step: 0.005
    })
    .addCheckbox(data.spiral, "curve", {
      label: "Curved?"
    });
};
createControlKit();

class Spiral {
  constructor(cx, cy, spacing) {
    this.cx = cx;
    this.cy = cy;
    this.spacing = spacing;
  }

  show() {
    push();
    angleMode(RADIANS);
    noFill();
    stroke(data.spiral.stroke);
    strokeWeight(data.spiral.strokeWeight);
    beginShape();
    for (var i = 0, upperLimit_i = data.spiral.n; i < upperLimit_i; i += 1) {
      let r = i * this.spacing;
      let theta = i * this.spacing;
      let x = this.cx + r * cos(theta);
      let y = this.cy + r * sin(theta);
      if (data.spiral.curve) {
        curveVertex(x, y);
      } else {
        vertex(x, y);
      }
    }
    endShape();
    pop();
  }

  update() {
    if (data.sketch.animate_spacing) {
      this.spacing = 10 * sin(frameCount * data.sketch.animation_spacing_speed);
    } else {
      this.spacing = data.spiral.spacing;
    }
    if (data.spiral.mouseX_controlled_n) {
      data.spiral.n = map(mouseX, 0, width, 0, 1000);
    }
    if (data.spiral.mouseY_controlled_spacing) {
      data.spiral.spacing = map(mouseY, 0, height, 0, 10);
    }
  }
}

let s;

function setup() {
  createCanvas(windowWidth, windowHeight);
  s = new Spiral(0, 0, 1.1);
}

function draw() {
  background(data.sketch.background);
  translate(width / 2, height / 2);
  scale(1, -1);
  if (!data.sketch.animate_rotation) {
    angleMode(DEGREES);
    rotate(data.sketch.rotate);
  } else {
    angleMode(DEGREES);
    rotate(-frameCount * data.sketch.animation_rotation_speed);
  }
  s.update();
  s.show();
  pop();
}
