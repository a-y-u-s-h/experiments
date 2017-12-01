let data = {
  sketch: {
    background: "#FFFFFF"
  },
  circle: {
    root: 100,
    mf: 0.5,
    threshshold_radius: 20,
    speed: 1,
    spacing: 1
  },
  trail: {
    points: 800,
    color: "#287485"
  }
};

// Variable to store GUI
// var controlkit;

// // Function to create control GUI
// var createControlKit = () => {
//     controlkit = new ControlKit();
//     controlkit
//         .addPanel({
//             fixed: false,
//             label: "Controls"
//         })
//         .addColor(data.sketch, "background", {
//             colorMode: "hex",
//             label: "Background Color"
//         })
//         .addNumberInput(data.circle, "root", {
//             label: "Root Radius",
//             step: 1,
//             dp: 2
//         })
//                 .addNumberInput(data.circle, "mf", {
//             label: "Common Radius Multiplier",
//             step: 0.01,
//             dp: 3
//         })        .addNumberInput(data.circle, "mf", {
//             label: "Common Radius Multiplier",
//             step: 0.001,
//             dp: 3
//         })        .addNumberInput(data.circle, "threshshold_radius", {
//             label: "threshshold_radius",
//             step: 0.1,
//             dp: 3
//         })        .addNumberInput(data.circle, "speed", {
//             label: "Animation Speed Factor",
//             step: 0.01,
//             dp: 3
//         })        .addNumberInput(data.circle, "spacing", {
//             label: "Generation Spacing Factor",
//             step: 0.01,
//             dp: 3
//         })
//         // .addCheckbox(data, "mouse_controlled", {
//         //     label: "Mouse Position Controlled?"
//         // })
//         // .addSubGroup({
//         //     label: "Left Branch"
//         // })
//         // .addNumberInput(data["left"], "mf", {
//         //     label: "Length multiplier",
//         //     step: 0.01
//         // })
//         // .addNumberInput(data["left"], "angle", {
//         //     label: "Root to left branch Angle",
//         //     step: 1
//         // })
//         // .addSubGroup({
//         //     label: "Right Branch"
//         // })
//         // .addNumberInput(data["right"], "angle", {
//         //     label: "Root to right branch Angle",
//         //     step: 1
//         // })
//         // .addNumberInput(data["right"], "mf", {
//         //     label: "Length multiplier",
//         //     step: 0.01
//         // });
// };

// createControlKit();

let c;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("canvas");
  ellipseMode(CENTER);
  angleMode(DEGREES);
  c = new Circle(width * 0.5, height * 0.5, data.circle.root, 1);
}

function init() {
  c = new Circle(width * 0.5, height * 0.5, data.circle.root, 1);
}

function draw() {
  background(data.sketch.background);
  c.update();
  c.show();
}
