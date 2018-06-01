let data = {
    sketch: {
        background: "#000000"
    },
    skelion: {
        position: {
            x: 0,
            y: 0
        },
        scale: 2,
        radius: 100,
        theta: 590,
        a: 0.986,
        animate: {
            a: true,
            b: false
        },
        b: 0.411,
        rotation_speed_factor: 1
    },
    appearance: {
        stroke: {
            check: true,
            color: "#FFFFFF",
            weight: 2
        }
    },
    shape: {
        n: 6,
        animate: false
    }
}

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
        .addSubGroup({
            label: "Hexaskelion Settings"
        })
        .addNumberInput(data.skelion, "theta", {
            label: "Subpart length",
            step: 1,
            dp: 3
        })
        .addNumberInput(data.skelion, "a", {
            label: "Factor A",
            step: 0.01,
            dp: 3
        })
        .addCheckbox(data.skelion.animate, "a", {
            label: "Animate A?"
        })
        .addValuePlotter(data.skelion, "a", {
            label: "A's variation",
            height: 65
        })
        .addNumberInput(data.skelion, "b", {
            label: "Factor B",
            step: 0.001,
            dp: 3
        })
        .addCheckbox(data.skelion.animate, "b", {
            label: "Animate B?"
        })
        .addValuePlotter(data.skelion, "b", {
            label: "Factor b",
            height: 65,
        })
        .addNumberInput(data.skelion, "scale", {
            label: "Scale Factor",
            step: 1,
            dp: 3
        })
        .addNumberInput(data.skelion, "radius", {
            label: "Radius",
            step: 1,
            dp: 3
        })
        .addSubGroup({
            label: "Hexaskelion Appearance"
        })
        .addColor(data.appearance.stroke, "color", {
            colorMode: "hex",
            label: "Stroke Color"
        })
        .addNumberInput(data.appearance.stroke, "weight", {
            label: "Stroke Weight",
            step: 1,
            dp: 3
        })
        .addCheckbox(data.shape, "animate", {
            label: "Animate Shape?"
        })
        .addNumberInput(data.shape, "n", {
            label: "Vertices",
            step: 1,
            dp: 3
        })
};
createControlKit();

let shapy;

function setup() {
    createCanvas(windowWidth * 0.77, windowHeight);
    data.skelion.position.x = width * 0.5;
    data.skelion.position.y = height * 0.5;
    shapy = new Skelion(data.skelion.position.x, data.skelion.position.y);
    angleMode(DEGREES);
    noFill();
}

function draw() {
    background(data.sketch.background);
    if (data.skelion.animate.a) {
        data.skelion.a = 0.5 + 0.49 * sin(frameCount);
    }
    if (data.skelion.animate.b) {
        data.skelion.b = 0.5 + 0.49 * sin(frameCount);
    }
    controlkit.update();
    shapy.show();
    shapy.update();
}

class Skelion {
    constructor(x, y) {
        this.position = new p5.Vector(x, y);
        this.velocity = new p5.Vector();
        this.acceleration = new p5.Vector();
    }

    update() {
        this.position.x = data.skelion.position.x;
        this.position.y = data.skelion.position.y;
    }

    show() {
        push();
        translate(this.position.x, this.position.y);
        scale(data.skelion.scale);
        rotate(frameCount * data.skelion.rotation_speed_factor);
        if (data.appearance.stroke.check) {
            strokeWeight(data.appearance.stroke.weight);
            stroke(data.appearance.stroke.color);
        } else {
            noStroke();
        }
        if (data.shape.n > 0) {
            for (let theta = 0; theta < 360; theta += 360 / data.shape.n) {
                let rx = data.skelion.radius * cos(theta);
                let ry = data.skelion.radius * sin(theta);
                push();
                translate(rx, ry);
                rotate(theta);
                beginShape();
                let x;
                let y;
                for (let i = 0; i < data.skelion.theta; i += 1) {
                    let r = data.skelion.a * Math.exp(radians(i * data.skelion.b));
                    x = r * cos(i);
                    y = r * sin(i);
                    curveVertex(x, y);
                }
                endShape();
                pop();
            }
        }
        pop();
    }
}