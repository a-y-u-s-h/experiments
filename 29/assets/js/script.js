let data = {
  sketch: {
    background: "#044023"
  },
  fractal: {
    spacing_between_quarters: 170,
    quarter_rotations: {
      upper: 180,
      lower: 180,
      left: 90,
      right: 90
    },
    upper_quarter: true,
    lower_quarter: true,
    left_quarter: true,
    right_quarter: true,
    root: {
      size: 200,
      stroke: {
        weight: 10,
        color: "#FFFFFF"
      }
    },
    threshhold_radius: 5,
    rotation: 360,
    end_angle: 180,
    radius_multipler: 0.5,
    stroke_multiplier: 0.5,
    spacing: {
      x: 0.5,
      y: -0.25
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
      fixed: true,
      align: "left",
      label: "Sketch Controls"
    })
    .addColor(data.sketch, "background", {
      colorMode: "hex",
      label: "Background Color"
    })
    .addNumberInput(data.fractal, "spacing_between_quarters", {
      label: "Spacing between Quarters"
    })
    .addCheckbox(data.fractal, "upper_quarter", {
      label: "Display Upper Quarter?"
    })
    .addNumberInput(data.fractal.quarter_rotations, "upper", {
      label: "Upper Quarter Rotation"
    })
    .addCheckbox(data.fractal, "lower_quarter", {
      label: "Display Lower Quarter?"
    })
    .addNumberInput(data.fractal.quarter_rotations, "lower", {
      label: "Lower Quarter Rotation"
    })
    .addCheckbox(data.fractal, "left_quarter", {
      label: "Display Left Quarter?"
    })
    .addNumberInput(data.fractal.quarter_rotations, "left", {
      label: "Left Quarter Rotation"
    })
    .addCheckbox(data.fractal, "right_quarter", {
      label: "Display Right Quarter?"
    })
    .addNumberInput(data.fractal.quarter_rotations, "right", {
      label: "Right Quarter Rotation"
    });

  controlkit
    .addPanel({
      label: "Fractal Controls",
      fixed: true,
      align: "right"
    })
    .addNumberInput(data.fractal.root, "size", {
      label: "Root Size"
    })
        .addNumberInput(data.fractal, "threshhold_radius", {
      label: "Threshhold Radius"
    })
    .addColor(data.fractal.root.stroke, "color", {
      colorMode: "hex",
      label: "Stroke Color"
    })
    .addNumberInput(data.fractal.root.stroke, "weight", {
      label: "Root Stroke Weight"
    })
    .addNumberInput(data.fractal, "rotation", {
      label: "Relative Rotations",
      step: 1
    })
    .addNumberInput(data.fractal, "end_angle", {
      label: "End Angle of Arc",
      step: 1
    })
    .addNumberInput(data.fractal, "radius_multipler", {
      label: "Radius Multiplier",
      step: 0.001,
      dp: 3
    })
    .addNumberInput(data.fractal, "stroke_multiplier", {
      label: "Stroke Multiplier",
      step: 0.001,
      dp: 3
    })
    .addNumberInput(data.fractal.spacing, "x", {
      label: "Spacing X",
      step: 0.001,
      dp: 3
    })
    .addNumberInput(data.fractal.spacing, "y", {
      label: "Spacing Y",
      step: 0.001,
      dp: 3
    });
};

createControlKit();

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(data.sketch.background);
  translate(width / 2, height / 2);
  if (data.fractal.lower_quarter) {
    push();
    translate(0, data.fractal.spacing_between_quarters);
    rotate(data.fractal.quarter_rotations.lower);
    fractal(data.fractal.root.size, data.fractal.root.stroke.weight);
    pop();
  }
  if (data.fractal.upper_quarter) {
    push();
    translate(0, -data.fractal.spacing_between_quarters);
    rotate(data.fractal.quarter_rotations.upper);

    scale(-1, -1);
    fractal(data.fractal.root.size, data.fractal.root.stroke.weight);
    pop();
  }
  if (data.fractal.right_quarter) {
    push();
    translate(data.fractal.spacing_between_quarters, 0);

    rotate(data.fractal.quarter_rotations.right);
    scale(-1, 1);
    fractal(data.fractal.root.size, data.fractal.root.stroke.weight);
    pop();
  }
  if (data.fractal.left_quarter) {
    push();
    translate(-data.fractal.spacing_between_quarters, 0);
    rotate(data.fractal.quarter_rotations.left);
    scale(1, -1);
    fractal(data.fractal.root.size, data.fractal.root.stroke.weight);
    pop();
  }
}

function fractal(radius, strokeW) {
  ellipseMode(CENTER);
  angleMode(DEGREES);
  noFill();
  stroke(data.fractal.root.stroke.color);
  strokeWeight(strokeW);
  arc(0, 0, radius, radius, 0, data.fractal.end_angle);
  if (radius > data.fractal.threshhold_radius) {
    push();
    translate(radius * data.fractal.spacing.x, radius * data.fractal.spacing.y);
    scale(1, -1);
    rotate(data.fractal.rotation);
    fractal(
      radius * data.fractal.radius_multipler,
      strokeW * data.fractal.stroke_multiplier
    );
    pop();

    push();
    translate(
      -radius * data.fractal.spacing.x,
      radius * data.fractal.spacing.y
    );
    scale(1, -1);
    rotate(data.fractal.rotation);
    fractal(
      radius * data.fractal.radius_multipler,
      strokeW * data.fractal.stroke_multiplier
    );
    pop();
  }
}
