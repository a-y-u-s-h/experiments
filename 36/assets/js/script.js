let data = {
  sketch: {
    background: "#125467",
    camera: {
      x: 0,
      y: 0,
      z: 500
    }
  },
  fractal: {
    size: 100,
    spacing: 1.5,
    size_factor: 0.7,
    opacity_factor: 100,
    threshhold: 0.5,
    rotation: {
      x: 0,
      y: 0,
      z: 0
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
      label: "Control Panel"
    })
    .addColor(data.sketch, "background", {
      colorMode: "hex",
      label: "Background Color"
    })
    .addNumberInput(data.sketch.camera, "x", {
      label: "Camera X",
      step: 5,
      dp: 1
    })
    .addNumberInput(data.sketch.camera, "y", {
      label: "Camera Y",
      step: 5,
      dp: 1
    })
    .addNumberInput(data.sketch.camera, "z", {
      label: "Camera Z",
      step: 20,
      dp: 1
    })
    .addSubGroup({
      label: "Fractal Controls"
    })
    .addNumberInput(data.fractal, "opacity_factor", {
      label: "Opacity Factor",
      step: 1,
      dp: 1
    })
    .addNumberInput(data.fractal, "size", {
      label: "Root Size",
      step: 1,
      dp: 1
    })
    .addNumberInput(data.fractal, "spacing", {
      label: "Relative Spacing",
      step: 0.01,
      dp: 2
    })
    .addNumberInput(data.fractal, "size_factor", {
      label: "Size multiplier",
      step: 0.01,
      dp: 2
    })
    .addNumberInput(data.fractal, "threshhold", {
      label: "Threshhold Size",
      step: 0.01,
      dp: 3
    })
    .addNumberInput(data.fractal.rotation, "x", {
      label: "Rotation X",
      step: 0.1,
      dp: 2
    })
    .addNumberInput(data.fractal.rotation, "y", {
      label: "Rotation Y",
      step: 0.1,
      dp: 2
    })
    .addNumberInput(data.fractal.rotation, "z", {
      label: "Rotation Z",
      step: 0.1,
      dp: 2
    });
};

createControlKit();

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  let mx = mouseX - width * 0.5;
  let my = -(mouseY - height * 0.5);
  background(data.sketch.background);
  colorMode(HSB, 100);
  scale(-1, 1, 1);
  camera(data.sketch.camera.x, data.sketch.camera.y, data.sketch.camera.z);
  pointLight(100, 100, 50, 0, 0, 3000);
  orbitControl();
  fractal(data.fractal.size);
}

function fractal(size) {
  push();
  translate(0, 0, 0);
  specularMaterial(100, 100, 100, data.fractal.opacity_factor);
  box(size);
  // angleMode(DEGREES);

  if (size > data.fractal.size * data.fractal.threshhold) {
    push();
    line(
      0,
      0,
      0,
      size * data.fractal.spacing,
      size * data.fractal.spacing,
      size * data.fractal.spacing
    );
    translate(
      size * data.fractal.spacing,
      size * data.fractal.spacing,
      size * data.fractal.spacing
    );
    rotateX(radians(data.fractal.rotation.x));
    rotateY(radians(data.fractal.rotation.y));
    rotateZ(radians(data.fractal.rotation.z));
    fractal(size * data.fractal.size_factor);
    pop();

    push();
    line(
      0,
      0,
      0,
      size * data.fractal.spacing,
      -size * data.fractal.spacing,
      size * data.fractal.spacing
    );
    translate(
      size * data.fractal.spacing,
      -size * data.fractal.spacing,
      size * data.fractal.spacing
    );
    rotateX(radians(data.fractal.rotation.x));
    rotateY(radians(data.fractal.rotation.y));
    rotateZ(radians(data.fractal.rotation.z));
    fractal(size * data.fractal.size_factor);
    pop();

    push();
    line(
      0,
      0,
      0,
      -size * data.fractal.spacing,
      size * data.fractal.spacing,
      size * data.fractal.spacing
    );
    translate(
      -size * data.fractal.spacing,
      size * data.fractal.spacing,
      size * data.fractal.spacing
    );
    rotateX(radians(data.fractal.rotation.x));
    rotateY(radians(data.fractal.rotation.y));
    rotateZ(radians(data.fractal.rotation.z));
    fractal(size * data.fractal.size_factor);
    pop();

    push();
    line(
      0,
      0,
      0,
      size * data.fractal.spacing,
      size * data.fractal.spacing,
      -size * data.fractal.spacing
    );
    translate(
      size * data.fractal.spacing,
      size * data.fractal.spacing,
      -size * data.fractal.spacing
    );
    rotateX(radians(data.fractal.rotation.x));
    rotateY(radians(data.fractal.rotation.y));
    rotateZ(radians(data.fractal.rotation.z));
    fractal(size * data.fractal.size_factor);
    pop();

    push();
    line(
      0,
      0,
      0,
      -size * data.fractal.spacing,
      -size * data.fractal.spacing,
      size * data.fractal.spacing
    );
    translate(
      -size * data.fractal.spacing,
      -size * data.fractal.spacing,
      size * data.fractal.spacing
    );
    rotateX(radians(data.fractal.rotation.x));
    rotateY(radians(data.fractal.rotation.y));
    rotateZ(radians(data.fractal.rotation.z));
    fractal(size * data.fractal.size_factor);
    pop();

    push();
    line(
      0,
      0,
      0,
      -size * data.fractal.spacing,
      size * data.fractal.spacing,
      -size * data.fractal.spacing
    );
    translate(
      -size * data.fractal.spacing,
      size * data.fractal.spacing,
      -size * data.fractal.spacing
    );
    rotateX(radians(data.fractal.rotation.x));
    rotateY(radians(data.fractal.rotation.y));
    rotateZ(radians(data.fractal.rotation.z));
    fractal(size * data.fractal.size_factor);
    pop();

    push();
    line(
      0,
      0,
      0,
      size * data.fractal.spacing,
      -size * data.fractal.spacing,
      -size * data.fractal.spacing
    );
    translate(
      size * data.fractal.spacing,
      -size * data.fractal.spacing,
      -size * data.fractal.spacing
    );
    rotateX(radians(data.fractal.rotation.x));
    rotateY(radians(data.fractal.rotation.y));
    rotateZ(radians(data.fractal.rotation.z));
    fractal(size * data.fractal.size_factor);
    pop();

    push();
    line(
      0,
      0,
      0,
      -size * data.fractal.spacing,
      -size * data.fractal.spacing,
      -size * data.fractal.spacing
    );
    translate(
      -size * data.fractal.spacing,
      -size * data.fractal.spacing,
      -size * data.fractal.spacing
    );
    rotateX(radians(data.fractal.rotation.x));
    rotateY(radians(data.fractal.rotation.y));
    rotateZ(radians(data.fractal.rotation.z));
    fractal(size * data.fractal.size_factor);
    pop();
  }
  pop();
}
