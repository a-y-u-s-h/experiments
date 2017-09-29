let data = {
  sketch: {
    background: "#FFFFFF"
  },
  fractal: {
    n: 3,
    transparent: true,
    fill: "#FFFFFF",
    stroke: "#000000",
    strokeWeight: 1,
    root_diameter: 300,
    threshhold_diameter: 20,
    diameter_multiplier: 0.5,
    translate_multiplier: 0.5,
    animate_rotation: false,
    rotation: 0,
    rotation_animation_speed: 0.2
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
      label: "Fractal Controls"
    })
    .addColor(data.sketch, "background", {
      colorMode: "hex",
      label: "Background Color"
    })
    .addSubGroup({
      label: "Fractal Controls"
    })
    .addCheckbox(data.fractal, "transparent", {
      label: "Transparent?"
    })
    .addColor(data.fractal, "fill", {
      colorMode: "hex",
      label: "Fill Color"
    })
    .addColor(data.fractal, "stroke", {
      colorMode: "hex",
      label: "Stroke Color"
    })
    .addNumberInput(data.fractal, "n", {
      label: "Branches per iteration"
    })
    .addNumberInput(data.fractal, "root_diameter", {
      label: "Root Diameter"
    })
    .addNumberInput(data.fractal, "translate_multiplier", {
      label: "Spacing between Generations",
      dp: 3,
      step: 0.01
    })
    .addNumberInput(data.fractal, "threshhold_diameter", {
      label: "Threshhold Diameter",
      dp: 1,
      step: 0.5
    })
    .addNumberInput(data.fractal, "diameter_multiplier", {
      label: "Diameter Multiplier",
      dp: 2,
      step: 0.01
    })
    .addCheckbox(data.fractal, "animate_rotation", {
      label: "Animate Rotation?"
    })
    .addNumberInput(data.fractal, "rotation_animation_speed", {
      label: "Rotation Animation Speed",
      dp: 2,
      step: 0.01
    })
    .addNumberInput(data.fractal, "rotation", {
      label: "Rotation (Manual)",
      dp: 1,
      step: 1
    });
};

createControlKit();

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(data.sketch.background);
  translate(width / 2, height / 2);
  fractal(data.fractal.root_diameter);
}

function fractal(diameter) {
  angleMode(DEGREES);
  if (data.fractal.transparent) {
    noFill();
  } else {
    fill(data.fractal.fill);
  }
  stroke(data.fractal.stroke);
  strokeWeight(data.fractal.strokeWeight);
  ellipse(0, 0, diameter, diameter);
  if (data.fractal.animate_rotation) {
    rotate(data.fractal.rotation_animation_speed * frameCount);
  } else {
    rotate(data.fractal.rotation);
  }
  if (diameter > data.fractal.threshhold_diameter) {
    for (var i = 0, upperLimit_i = data.fractal.n; i < upperLimit_i; i += 1) {
      let cr = diameter;
      let cx = diameter * cos(360 / data.fractal.n * i);
      let cy = diameter * sin(360 / data.fractal.n * i);
      push();
      translate(
        cx * data.fractal.translate_multiplier,
        cy * data.fractal.translate_multiplier
      );
      fractal(diameter * data.fractal.diameter_multiplier);
      pop();
    }
  }
}
