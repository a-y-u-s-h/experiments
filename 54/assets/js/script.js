let data = {
  sketch: {
    background: "#FFFFFF",
    camera: {
      x: 0,
      y: 0,
      z: 0,
      animate: false
    }
  },
  trail: {
    color: "#000000",
    limit: 300
  },
  body: {
    r_multipler: {
      three: 4,
      two: 10
    },
    force_constant: 10000,
    mass: 5,
    initial_position: {
      x: 0,
      y: 30,
      z: 0
    },
    initial_velocity: {
      x: 0,
      y: 0,
      z: 0
    }
  },
  rings: {
    n: 80,
    r: 300,
    body: {
      r_multipler: {
        three: 4,
        two: 10
      }
    },
    lambda: 1
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
      label: "Controls",
      align: "right"
    })
    .addColor(data.sketch, "background", {
      colorMode: "hex",
      label: "Background Color"
    })
    .addNumberInput(data.body, "mass", {
      label: "Q : Point Charge",
      step: 0.1,
      dp: 1
    })
    .addNumberInput(data.rings, "r", {
      label: "Ring's Radius",
      step: 1,
      dp: 1
    })
    .addNumberInput(data.rings, "lambda", {
      label: "Ring's λ",
      step: 1,
      dp: 1
    })
    .addSubGroup({
      label: "Initial Conditions"
    })
    .addNumberInput(data.body.initial_position, "x", {
      label: "Position x",
      step: 1,
      dp: 1
    })
    .addNumberInput(data.body.initial_position, "y", {
      label: " Position y",
      step: 1,
      dp: 1
    })
    .addNumberInput(data.body.initial_position, "z", {
      label: "Position z",
      step: 1,
      dp: 1
    })
    .addNumberInput(data.body.initial_velocity, "x", {
      label: "Velocity x",
      step: 1,
      dp: 1
    })
    .addNumberInput(data.body.initial_velocity, "y", {
      label: " Velocity y",
      step: 1,
      dp: 1
    })
    .addNumberInput(data.body.initial_velocity, "z", {
      label: "Velocity z",
      step: 1,
      dp: 1
    })
    .addSubGroup({
      label: "Camera Controls"
    })
    .addNumberInput(data.sketch.camera, "x", {
      label: "Position x",
      step: 10,
      dp: 1
    })
    .addNumberInput(data.sketch.camera, "y", {
      label: " Position y",
      step: 10,
      dp: 1
    })
    .addNumberInput(data.sketch.camera, "z", {
      label: "Position z",
      step: 1,
      dp: 1
    })
    .addButton("Animate", function() {
      data.sketch.camera.animate = !data.sketch.camera.animate;
    })
    .addSubGroup({
      label: "Reset Sketch"
    })
    .addButton("Reset", function() {
      reinitialize();
    });
};

var point;
var ring;
var forces = [];
var fnet;
let trail = []; // Stores object instances of TrailPoint class, which basically is history of wherever our point on the line went.

function setup() {
  createCanvas(windowWidth * 0.75, windowHeight, WEBGL);
  reinitialize();
  console.log(
    "Ratios determine the motion here, not the actual values observed!"
  );
}

function draw() {
  background(data.sketch.background);
  scale(1, -1);
  if (data.sketch.camera.animate) {
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
  }
  camera(data.sketch.camera.x, data.sketch.camera.y, data.sketch.camera.z);
  if (mouseX < width) {
    orbitControl();
  }
  if (ring && point) {
    ring.update();
    ring.display();
    forces = [];
    ring.bodies.forEach(body => {
      forces.push(point.calculateForce(body));
    });
    fnet = point.netForce(forces);
    point.applyForce(fnet);
    point.display3D();
    point.update();

    // Now, I want to push a trailPoint object to trail array everytime my point moves to another location..
    // ..Which will happen everytime draw loops..
    trail.push(
      new TrailPoint(
        point.position.x,
        point.position.y,
        point.position.z,
        data.trail.color
      )
    );

    // For every element in array, I'll call show method, except for zeroeth element, because I can't pass it another trailPoint object.
    for (var i = 0, upperLimit = trail.length; i < upperLimit; i += 1) {
      if (i > 0) {
        trail[i].show(trail[i - 1]);
      }
    }

    // If length of our history of point, which is trail array, becomes greater than the limit I set in data.trail limit, it'll remove the first object.
    // First In First Out.
    if (data.trail.limit < trail.length) {
      trail.splice(0, 1);
    }
  }
}
createControlKit();

function reinitialize() {
  point = null;
  ring = null;
  fnet = 0;
  forces = [];
  trail = [];
  point = new Body(
    data.body.initial_position.x,
    data.body.initial_position.y,
    data.body.initial_position.z,
    data.body.mass,
    0
  );
  ring = new Ring(0, 0, 0);
  ring.initialize();
}
