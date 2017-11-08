let data = {
  sketch: {
    background: "#FFFFFF"
  },
  spring: {
    color: "#000000",
    strokeWeight: 1,
    rest_length: window.innerHeight * 0.25,
    constant: 0.1
  },
  bob: {
    mass: 1,
    radius: 100,
    damping: 0.95,
    stroke: {
      check: true,
      color: "#000000",
      weight: 4
    },
    fill: {
      check: true,
      color: "#333333"
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
    .addColor(data.sketch, "background", {
      colorMode: "hex",
      label: "Background Color"
    })
    .addGroup({
      label: "Spring Controls"
    })
    .addSubGroup({
      label: "Appearance Controls"
    })
    .addColor(data.spring, "color", {
      colorMode: "hex",
      label: "Spring Color"
    })
    .addNumberInput(data.spring, "rest_length", {
      label: "Rest Length",
      step: 1,
      dp: 1
    })
    .addNumberInput(data.spring, "strokeWeight", {
      label: "Stroke Weight",
      step: 1,
      dp: 1
    })
    .addNumberInput(data.spring, "constant", {
      label: "Spring Constant",
      step: 0.001,
      dp: 4
    })
    .addGroup({
      label: "Bob Controls"
    })
    .addSubGroup({
      label: "Appearance Controls"
    })
    .addCheckbox(data.bob.fill, "check", {
      label: "Want fill color?"
    })
    .addColor(data.bob.fill, "color", {
      colorMode: "hex",
      label: "Fill Color"
    })
    .addCheckbox(data.bob.stroke, "check", {
      label: "Want Stroke?"
    })
    .addNumberInput(data.bob.stroke, "weight", {
      label: "Stroke Weight",
      step: 0.001,
      dp: 3
    })
    .addColor(data.bob.stroke, "color", {
      colorMode: "hex",
      label: "Stroke Color"
    })
    .addNumberInput(data.bob, "radius", {
      label: "Radius of Bob",
      step: 1,
      dp: 3
    })
    .addGroup({
      label: "Behavior Controls"
    })
    .addNumberInput(data.bob, "mass", {
      label: "Mass of Bob",
      step: 0.01,
      dp: 3
    })
    .addNumberInput(data.bob, "damping", {
      label: "Damping on Bob",
      step: 0.001,
      dp: 3
    });
};

createControlKit();

let system;

function setup() {
  createCanvas(windowWidth * 0.75, windowHeight);
  ellipseMode(CENTER);
  system = new System(width * 0.5, 100, 300);
}

function draw() {
  background(data.sketch.background);
  system.update();
  system.show();
}

class Bob {
  constructor(cx, cy) {
    this.position = new p5.Vector(cx, cy);
    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0);
    this.dragOffset = new p5.Vector(0, 0);

    this.mass = data.bob.mass;
    this.damping = data.bob.damping;
    this.r = data.bob.radius;
    this.dragging = false;
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    if (data.bob.stroke.check) {
      strokeWeight(data.bob.stroke.weight);
      stroke(data.bob.stroke.color);
    } else {
      noStroke();
    }
    if (data.bob.fill.check) {
      fill(data.bob.fill.color);
    } else {
      noFill();
    }
    ellipse(0, 0, data.bob.radius, data.bob.radius);
    pop();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.mult(this.damping);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.r = data.bob.radius;
    this.mass = data.bob.mass;
  }

  applyForce(force) {
    this.acceleration.add(force.div(this.mass));
  }

  drag(mx, my) {
    let d = dist(mx, my, this.position.x, this.position.y);
    if (d < this.r * 0.5) {
      this.dragging = true;
      this.dragOffset.x = this.position.x - mx;
      this.dragOffset.y = this.position.y - my;
    }
    if (this.dragging) {
      this.position.x = mx + this.dragOffset.x;
      this.position.y = my + this.dragOffset.y;
    }
  }
}

class Spring {
  constructor(hinge, bob) {
    this.hinge = hinge;
    this.bob = bob;
  }

  show() {
    push();
    stroke(data.spring.color);
    strokeWeight(data.spring.strokeWeight);
    line(
      this.hinge.position.x,
      this.hinge.position.y,
      this.bob.position.x,
      this.bob.position.y
    );
    pop();
  }
}

class Hinge {
  constructor(cx, cy) {
    this.position = new p5.Vector(cx, cy);
  }

  show() {
    push();
    strokeWeight(8);
    stroke(0);
    point(this.position.x, this.position.y);
    pop();
  }
}

class System {
  constructor(cx, cy) {
    this.origin = new p5.Vector(cx, cy);
    this.hinge = new Hinge(cx, cy);
    this.bob = new Bob(cx, data.spring.rest_length);
    this.spring = new Spring(this.hinge, this.bob);
  }

  show() {
    this.hinge.show();
    this.spring.show();
    this.bob.show();
  }

  update() {
    let currentLength = p5.Vector
      .sub(this.bob.position, this.hinge.position)
      .mag();

    let direction = p5.Vector
      .sub(this.bob.position, this.hinge.position)
      .normalize();

    let k = data.spring.constant;
    let stretch = currentLength - data.spring.rest_length;
    let spring = direction.mult(-(k * stretch));
    let gravity = new p5.Vector(0, 10);

    this.bob.applyForce(spring);
    this.bob.applyForce(gravity);
    this.bob.update();
    if (mouseIsPressed) {
      this.bob.drag(mouseX, mouseY);
    } else {
      this.bob.dragging = false;
    }
  }
}
