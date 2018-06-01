/**
 * Experiment 6 : Fractal Implementation #1 : Tree
 *
 * Description : 
 *
 *      A fractal is a pattern that repeats itself over and over again. This is what I've made here. A fractal tree.
 *
 * Remarks : 
 *
 *      Fractal Math is beautiful to play with. 
 *      I can go on and on and on and on and on...with recursions, and not get tired. 
 *      This one was my very first implementation of it, and I played with it for 3+ hours or something.
 */

// Data related to this experiment, will be controlled by GUI, mostly.
var data = {
    mf: 0.597,
    background: "#a52a2a",
    mouse_controlled: false,
    left: {
        angle: 45,
        mf: 1
    },
    right: {
        angle: 45,
        mf: 1
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
        .addColor(data, "background", {
            colorMode: "hex",
            label: "Background Color"
        })
        .addNumberInput(data, "mf", {
            label: "Common Length Multiplier",
            step: 0.001,
            dp: 3
        })
        .addCheckbox(data, "mouse_controlled", {
            label: "Mouse Position Controlled?"
        })
        .addSubGroup({
            label: "Left Branch"
        })
        .addNumberInput(data["left"], "mf", {
            label: "Length multiplier",
            step: 0.01
        })
        .addNumberInput(data["left"], "angle", {
            label: "Root to left branch Angle",
            step: 1
        })
        .addSubGroup({
            label: "Right Branch"
        })
        .addNumberInput(data["right"], "angle", {
            label: "Root to right branch Angle",
            step: 1
        })
        .addNumberInput(data["right"], "mf", {
            label: "Length multiplier",
            step: 0.01
        });
};

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(data.background);
    translate(width / 2, height / 2);
    scale(1, -1);
    stroke(255);
    translate(0, -height / 2);
    branches(height / 2);
    if (data.mouse_controlled) {
        data.left.angle = mouseX;
        data.right.angle = mouseY;
    }
}

// Straight forward recursive logic
function branches(len) {
    let length = len * data.mf;
    angleMode(DEGREES);
    push();
    line(0, 0, 0, length);
    if (len > 10) {
        push();
        translate(0, length);
        rotate(data.left.angle);
        branches(length * data.left.mf);
        pop();
        push();
        translate(0, length);
        rotate(-data.right.angle);
        branches(length * data.right.mf);
        pop();
    }
    pop();
}

createControlKit();
