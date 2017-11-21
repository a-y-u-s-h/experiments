let data = {
  sketch: {
    background: "#FFFFFF"
  },
  dc: {
    conductors: 20,
    rotation_speed: 1,
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


// Variable to store GUI
// var controlkit;

// Function to create control GUI
// var createControlKit = () => {
//   controlkit = new ControlKit();
//   controlkit
//     .addPanel({
//       fixed: false,
//       label: "Controls"
//     })
//     .addColor(data.sketch, "background", {
//       colorMode: "hex",
//       label: "Background Color"
//     });
  // .addNumberInput(data, "mf", {
  //     label: "Common Length Multiplier",
  //     step: 0.001,
  //     dp: 3
  // })
  // .addCheckbox(data, "mouse_controlled", {
  //     label: "Mouse Position Controlled?"
  // })
  // .addSubGroup({
  //     label: "Left Branch"
  // })
  // .addNumberInput(data["left"], "mf", {
  //     label: "Length multiplier",
  //     step: 0.01
  // })
  // .addNumberInput(data["left"], "angle", {
  //     label: "Root to left branch Angle",
  //     step: 1
  // })
  // .addSubGroup({
  //     label: "Right Branch"
  // })
  // .addNumberInput(data["right"], "angle", {
  //     label: "Root to right branch Angle",
  //     step: 1
  // })
  // .addNumberInput(data["right"], "mf", {
  //     label: "Length multiplier",
  //     step: 0.01
  // });
// };

// createControlKit();

let machine;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("#container");
  canvas.id("canvas");
  background(0);
  angleMode(DEGREES);
  rectMode(CENTER);
  ellipseMode(CENTER);

  machine = new DCMachine(width * 0.5, windowHeight * 0.5);
}

function draw() {
  background(data.sketch.background);
  machine.show();
}
