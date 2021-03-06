/**
 * Experiment 8 : Graph Paper
 *
 * Description :
 * 
 *     A super simple graph paper implementation in Canvas. 
 *     User can rotate, zoom in (kind of..) etcetera with controls provided. It can also change colour. 
 *     I may use this sometime later to simulate, something like, I don't know..a CRO machine maybe?..Or anything that'd require a graph paper to look good.
 *
 * Remarks :
 *
 *      I've made something like this some months ago, maybe in April or March. 
 *      That one's still there on my codepen profile. 
 *      This one's a little different and it has controls.

 */

// Data for this experiment
let data = {
    pixel: 50,
    background: "#071A09",
    rotation: 0,
    horizontal: {
        line_color: "#00840C",
        shadow_color: "#1F1F1F",
        stroke_weight: 1
    },
    vertical: {
        line_color: "#00840C",
        shadow_color: "#093000",
        stroke_weight: 1
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
        .addColor(data, "background", {
            label: "Background"
        })
        .addNumberInput(data, "pixel", {
            label: "Zoom"
        })
        .addNumberInput(data, "rotation", {
            label: "Rotate"
        })
        .addSubGroup({
            label: "Horizontal Line Settings"
        })
        .addColor(data["horizontal"], "line_color", {
            label: "Line Color"
        })
        .addColor(data["horizontal"], "shadow_color", {
            label: "Shadow Color"
        })
        .addNumberInput(data["horizontal"], "stroke_weight", {
            label: "Thickness"
        })
        .addSubGroup({
            label: "Vertical Line Settings"
        })
        .addColor(data["vertical"], "line_color", {
            label: "Line Color"
        })
        .addColor(data["vertical"], "shadow_color", {
            label: "Shadow Color"
        })
        .addNumberInput(data["vertical"], "stroke_weight", {
            label: "Thickness"
        });
};

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(data.background);
    angleMode(DEGREES);
    rotate(data.rotation);

    // Logic to draw a styled graph paper.
    if (data.pixel > 49) {
        for (var i = 0; i < windowWidth; i += data.pixel) {
            push();
            stroke(data.horizontal.shadow_color);
            strokeWeight(data.horizontal.stroke_weight);
            line(i, 0, i, height);
            pop();
            stroke(data.horizontal.line_color);
            line(i + 1, 0, i + 1, height + 1);
            for (var j = 0; j < windowHeight; j += data.pixel) {
                push();
                stroke(data.vertical.shadow_color);
                strokeWeight(data.vertical.stroke_weight);
                line(0, j, width, j);
                pop();
                stroke(data.vertical.line_color);
                line(0, j + 1, width + 1, j + 1);
            }
        }
    } else {
        for (var i = 0; i < windowWidth; i += 50) {
            push();
            stroke(data.horizontal.shadow_color);
            strokeWeight(data.horizontal.stroke_weight);
            line(i, 0, i, height);
            pop();
            stroke(data.horizontal.line_color);
            line(i + 1, 0, i + 1, height + 1);
            for (var j = 0; j < windowHeight; j += 50) {
                push();
                stroke(data.vertical.shadow_color);
                strokeWeight(data.vertical.stroke_weight);
                line(0, j, width, j);
                pop();
                stroke(data.vertical.line_color);
                line(0, j + 1, width + 1, j + 1);
            }
        }
    }
}

// Create controls.
createControlKit();
