let data = {
  sketch: {
    background: "#FFFFFF"
  },
  label: {
    r: 500
  },
  dc: {
    conductors: 20,
    rotation_speed: 0.5,
    commutator: {
      r: {
        inner: 40,
        outer: 60
      },
      stroke: {
        check: true,
        color: "#000000",
        weight: 1
      },
      fill: {
        inner: {
          check: true,
          color: "#FFFFFF"
        },
        outer: {
          check: true,
          color: "#DEDEDE"
        }
      }
    },
    armature: {
      r: {
        inner: 90,
        outer: 91
      },
      stroke: {
        check: true,
        color: "#000000",
        weight: 1
      },
      fill: {
        inner: {
          check: true,
          color: "#FFFFFF"
        },
        outer: {
          check: true,
          color: "#000000"
        }
      }
    },
    shaft: {
      r: 10,
      stroke: {
        check: true,
        color: "#000000",
        weight: 1
      },
      fill: {
        check: true,
        color: "#434343"
      }
    },
    cover: {
      r: {
        outer: 300,
        inner: 250
      },
      stroke: {
        check: true,
        color: "#000000",
        weight: 2
      },
      fill: {
        check: true,
        color: "#434343"
      }
    }
  }
};


let schematic;
let label;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("#container");
  canvas.id("canvas");
  background(0);
  angleMode(DEGREES);
  rectMode(CENTER);
  ellipseMode(CENTER);
  textAlign(CENTER, CENTER);

  label = new Label(width * 0.5, windowHeight * 0.5);
  schematic = new DCMachine(width * 0.5, windowHeight * 0.5);
}

function draw() {
  background(data.sketch.background);
  // scale(0.7);
  // translate(0, height * 0.2);
  schematic.show();
  label.show();
}
