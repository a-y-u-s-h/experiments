/**
 * Experiment 9 : Illusion of 3D with Rotating Squares!
 *
 * Description : 
 * 
 * It's exactly what the title says : an illusion of 3D. Again, 
 * I overdid it maybe with the controls, but I think it's cool. One day if required, 
 * I can choose one of the cool parameter sets to be used in something small..maybe like a webpage for some college fest? 
 * I have no clue, but..it may be useful someday.
 *
 * Remarks : 
 *
 * I don't have any mastery on 3D animations/interactions yet, 
 * this one's made with 2D canvas. 
 * But again, a lot can be done with 2D itself. 
 * This is one great example.s
 */

data = {
    background: "#E8DADA",
    n: 120,
    follow_mouse: false,
    square: {
        stroke: "#000000",
        stroke_weight: 1,
        fill: "#FFFFFF",
        rotation_speed: 2.1,
        size: 70
    },
    movement: {
        radius: 220,
        revolution_speed: 0,
        separation: 0
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
        .addCheckbox(data, "follow_mouse", {
            label: "Center according to Mouse?"
        })
        .addSubGroup({
            label: "Square Controls"
        })
        .addNumberInput(data["square"], "rotation_speed", {
            label: "Rotation Speed",
            step: 0.1
        })
        .addNumberInput(data["square"], "size", {
            label: "Size"
        })
        .addNumberInput(data["square"], "stroke_weight", {
            label: "Border Thickness"
        })
        .addColor(data["square"], "stroke", {
            label: "Border Color"
        })
        .addColor(data["square"], "fill", {
            label: "Fill Color"
        })
        .addNumberInput(data["movement"], "radius", {
            label: "Revolution Radius",
            step: 1
        })
        .addNumberInput(data["movement"], "revolution_speed", {
            label: "Revolution Speed",
            step: 0.1
        })
        .addNumberInput(data["movement"], "separation", {
            label: "Separation",
            step: 0.01,
            dp: 3
        });
};
createControlKit();

// This array stores Square objects.
let squares = [];


function setup() {
    createCanvas(windowWidth, windowHeight);

    // Filling up the squares array.
    for (var i = 1; i <= data.n; i += 1) {
        squares.push(new Square(width / 2, height / 2, data.square.size, i));
    }
}

function draw() {
    background(data.background);

    // Displaying and updating everything.
    if (data.follow_mouse == true) {
        for (var i = 0, upperLimit = data.n; i < upperLimit; i += 1) {
            squares[i].revCx = mouseX;
            squares[i].revCy = mouseY;
            squares[i].update();
            squares[i].revolve();
            squares[i].rotate();
            squares[i].show();
        }
    } else {
        for (var i = 0, upperLimit = data.n; i < upperLimit; i += 1) {
            squares[i].revCx = width / 2;
            squares[i].revCy = height / 2;
            squares[i].update();
            squares[i].revolve();
            squares[i].rotate();
            squares[i].show();
        }
    }
}

