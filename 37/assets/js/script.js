let data = {
  sketch: {
    background: "#1e7575"
  },
  shape: {
    cx: window.innerWidth * 0.60,
    cy: window.innerHeight * 0.5,
    animate: {
      check: true
    },
    n: 10,
    r: 200,
    rotation: 30,
    fill: {
      check: true,
      color: "#782711"
    },
    stroke: {
      check: true,
      color: "#360d06",
      weight: 16,
      cap: {
        options: ["Default", "Round", "Square", "Project"],
        selection: "Default"
      }
    },
    beginModes: {
      options: [
        "Default",
        "Points",
        "Lines",
        "Triangles",
        "Triangle Strip",
        "Triangle Fan",
        "Quads",
        "Quad Strip"
      ],
      selection: "Default"
    },
    endModes: {
      options: ["Closed", "Open"],
      selection: "Closed"
    },
    vertices: {
      options: ["Curved", "Pointy"],
      selection: "Pointy"
    }
  }
};

let controlkit;
var createControlKit = () => {
  controlkit = new ControlKit();
  controlkit
    .addPanel({
      align: "left",
      fixed: true
    })
    .addSubGroup({
      label: "Sketch Settings"
    })
    .addColor(data.sketch, "background", {
      colorMode: "hex",
      label: "Background Color"
    })
    .addSubGroup({
      label: "Shape Configs"
    })
    .addNumberInput(data.shape, "cx", {
      label: "Origin X",
      step: 1
    })
    .addNumberInput(data.shape, "cy", {
      label: "Origin Y",
      step: 1
    })
    .addSelect(data.shape.beginModes, "options", {
      label: "Shape Modes",
      onChange: function(index) {
        data.shape.beginModes.selection = data.shape.beginModes.options[index];
      }
    })
    .addSelect(data.shape.endModes, "options", {
      label: "End Cases",
      onChange: function(index) {
        data.shape.endModes.selection = data.shape.endModes.options[index];
      }
    })
    .addSelect(data.shape.vertices, "options", {
      label: "Vertex Types",
      onChange: function(index) {
        data.shape.vertices.selection = data.shape.vertices.options[index];
      }
    })
    .addSelect(data.shape.stroke.cap, "options", {
      label: "Cap Styles",
      onChange: function(index) {
        data.shape.stroke.cap.selection = data.shape.stroke.cap.options[index];
      }
    })
    .addCheckbox(data.shape.animate, "check", {
      label: "Animate?"
    })
    .addCheckbox(data.shape.stroke, "check", {
      label: "Want an outline?"
    })
    .addColor(data.shape.stroke, "color", {
      colorMode: "hex",
      label: "Stroke Color"
    })
    .addNumberInput(data.shape.stroke, "weight", {
      label: "Stroke Weight",
      step: 1
    })
    .addCheckbox(data.shape.fill, "check", {
      label: "Want to give it a color?"
    })
    .addColor(data.shape.fill, "color", {
      colorMode: "hex",
      label: "Fill Color"
    })
    .addNumberInput(data.shape, "n", {
      label: "Controlling Vertices (n)",
      step: 1
    })
    .addNumberInput(data.shape, "r", {
      label: "Radius of Circumcircle",
      step: 1
    })
    .addNumberInput(data.shape, "rotation", {
      label: "Rotation",
      step: 1
    });
};
createControlKit();

class Shape {
  constructor(cx, cy, radius, n) {
    this.cx = cx;
    this.cy = cy;
    this.r = radius;
    this.rotation = 0;
    this.n = n;
  }

  show() {
    push();
    translate(this.cx, this.cy);
    rotate(this.rotation);
    if (data.shape.fill.check) {
      fill(data.shape.fill.color);
    } else {
      noFill();
    }

    if (data.shape.stroke.check) {
      stroke(data.shape.stroke.color);
      strokeWeight(data.shape.stroke.weight);
    } else {
      noStroke();
    }

    switch (data.shape.stroke.cap.selection) {
      case "Round":
        strokeCap(ROUND);
        break;
      case "Square":
        strokeCap(SQUARE);
        break;
      case "Project":
        strokeCap(PROJECT);
        break;
      default:
        break;
    }

    switch (data.shape.beginModes.selection) {
      case "Points":
        beginShape(POINTS);
        break;
      case "Lines":
        beginShape(LINES);
        break;
      case "Triangles":
        beginShape(TRIANGLES);
        break;
      case "Triangle Strip":
        beginShape(TRIANGLE_STRIP);
        break;
      case "Triangle Fan":
        beginShape(TRIANGLE_FAN);
        break;
      case "Quads":
        beginShape(QUADS);
        break;
      case "Quad Strip":
        beginShape(QUAD_STRIP);
        break;
      default:
        beginShape();
        break;
    }
    angleMode(DEGREES);
    if (this.n >= 0) {
      for (
        var angle = 0, upperLimit_angle = 360;
        angle < upperLimit_angle;
        angle += 360 / this.n
      ) {
        let x = this.r * cos(angle);
        let y = this.r * sin(angle);
        switch (data.shape.vertices.selection) {
          case "Curved":
            curveVertex(x, y);
            break;
          default:
            vertex(x, y);
            break;
        }
      }
    }
    switch (data.shape.endModes.selection) {
      case "Closed":
        endShape(CLOSE);
        break;
      default:
        endShape();
        break;
    }
    pop();
  }

  update() {
    this.n = data.shape.n;
    this.r = data.shape.r;
    this.rotation = data.shape.rotation;
    this.cx = data.shape.cx;
    this.cy = data.shape.cy;
  }

  animate() {
    this.n = data.shape.n * abs(sin(frameCount * 0.5));
    this.r = data.shape.r * 0.5 + data.shape.r * abs(sin(frameCount * 0.5));
    this.rotation = data.shape.rotation;
    this.cx = data.shape.cx;
    this.cy = data.shape.cy;
  }
}

let s;
function setup() {
  createCanvas(windowWidth, windowHeight);
  s = new Shape(width * 0.5, height * 0.5, 100, 3);
}

function draw() {
  background(data.sketch.background);
  if (data.shape.animate.check) {
    s.animate();
  } else {
    s.update();
  }
  s.show();
}
