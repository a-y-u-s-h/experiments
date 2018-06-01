/**
 * Data for experiment.
 * Contains two more objects: 
 *   1. sketch - contains data for overall sketch
 *   2. square - contains data for individual squares
 * @type {Object}
 */
let data = {
  sketch: {
    background: "#345345"
  },
  square: {
    length: 200,
    length_multiplier: 0.5,
    width: 200,
    width_multiplier: 0.5,
    angle: 0,
    separation: 0,
    stroke: "#000000",
    color: "#0F5C52",
    nofill: true
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
    .addSubGroup({
      label: "Square Controls"
    })
    .addNumberInput(data.square, "angle", {
      label: "Relative Angle"
    })
    .addNumberInput(data.square, "length", {
      label: "Root Length"
    })
    .addNumberInput(data.square, "length_multiplier", {
      label: "Length Multiplier",
      step: 0.01,
      dp: 2
    })
    .addNumberInput(data.square, "width", {
      label: "Root Width"
    })
    .addNumberInput(data.square, "width_multiplier", {
      label: "Width Multiplier",
      step: 0.01,
      dp: 2
    })
    .addNumberInput(data.square, "separation", {
      label: "Relative Separation",
      step: 1,
      dp: 2
    })
    .addColor(data.square, "stroke", {
      label: "Stroke Color"
    })
    .addColor(data.square, "color", {
      label: "Fill Color"
    })
    .addCheckbox(data.square, "nofill", {
      label: "Transparent?"
    });
};
createControlKit();

/**
 * Initializes everything
 * @return {void} 
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
}

/**
 * Draw is animation loop, looping at 60FPS ideally.
 * @return {void} 
 */
function draw() {
  background(data.sketch.background);
  translate(width / 2, height / 2);
  fractal(data.square.length, data.square.width);
}

/**
 * Function with recursive definition
 * @param  {number} len - Size of root square
 * @return {[type]}     [description]
 */
function fractal(len, wid) {
  angleMode(DEGREES);
  noSmooth();
  if (data.square.nofill) {
    noFill();
  } else {
    fill(data.square.color);
  }
  stroke(data.square.stroke);

  rectMode(CENTER);
  push();
  translate(0, 0);
  rect(0, 0, len, wid);
  pop();

  if (len > data.square.length / 10 || wid > data.square.width / 10) {
    for (var i = 0; i < 2; i += 1) {
      for (var j = 0, upperLimit = 2; j < upperLimit; j += 1) {
        push();
        noSmooth();
        stroke(data.square.stroke);

        translate(
          Math.pow(-1, i) * (len / 2 + data.square.separation),
          Math.pow(-1, j) * (wid / 2 + data.square.separation)
        );
        rotate(data.square.angle);
        rect(
          0,
          0,
          len * data.square.length_multiplier,
          wid * data.square.width_multiplier
        );
        fractal(
          len * data.square.length_multiplier,
          wid * data.square.width_multiplier
        );
        pop();
      }
    }
  }
}
