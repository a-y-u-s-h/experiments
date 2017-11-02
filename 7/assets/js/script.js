/**
 * Experiment 7 : 2D Orbital Motion Implementaion #1
 *
 * Description : 
 *
 *      'Orbital motion' here is something moving on an ellipse. 
 *      I've provided controls in this experiment as well so that user can play with various parameters, 
 *      such as color, thickness of border of 'planets', etc. and produce creative things. 
 *      It's better to look at than reading its description.
 *
 * Remarks : 
 *
 *      It's a cool example showing how many periodic motions with different periods can result in another periodic motion with its own time period 
 *      (..LCM of time periods?) ...Whatever, I had fun making it!
 */

// Data for this experiment
let data = {
    background: "#223344",
    common_spacing: 60,
    a_spacing: 60,
    b_spacing: 60,
    orbit_color: "#000000",
    orbit_stroke_weight: 1,
    points: {
        color: "#05615C",
        stroke: "#000000",
        radius: 18,
        stroke_weight: 1
    },
    speed: 0.007
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
        .addSubGroup({
            label: "Orbit Controls"
        })
        .addNumberInput(data, "orbit_stroke_weight", {
            label: "Orbit Thickness"
        })
        .addNumberInput(data, "common_spacing", {
            label: "Orbital Spacing"
        })
        .addNumberInput(data, "a_spacing", {
            label: "Orbital Horizontal Spacing"
        })
        .addNumberInput(data, "b_spacing", {
            label: "Orbital Vertical Spacing"
        })
        .addColor(data, "orbit_color", {
            label: "Color"
        })
        .addSubGroup({
            label: "Point Controls"
        })
        .addNumberInput(data, "speed", {
            label: "Speed",
            step: 0.001,
            dp: 3
        })
        .addNumberInput(data["points"], "radius", {
            label: "Radius"
        })
        .addNumberInput(data["points"], "stroke_weight", {
            label: "Border Thickness"
        })
        .addColor(data["points"], "stroke", {
            label: "Stroke Color"
        })
        .addColor(data["points"], "color", {
            label: "Fill Color"
        });
};

let bodies = []; // Array to store circular bodies;

// Function will run once when the document loads
function setup() {
    createCanvas(windowWidth, windowHeight);
    for (var i = 0, upperLimit = 10; i < upperLimit; i += 1) {
        bodies.push(
            new CircularBody(
                width / 2, // cx
                height / 2, // cy
                i + 1, // da
                i + 1, // db
                upperLimit - i // speed factor
            )
        );
    }
}

// Function will loop at 60 FPS unless frameRate variable is changed
function draw() {
    background(data.background);

    for (var i = 0, upperLimit = bodies.length; i < upperLimit; i += 1) {
        bodies[i].show(); // Showing orbital
        bodies[i].pShow(); // Showing point
        bodies[i].pUpdate(); // Updating point
    }
}

createControlKit();
