let data = {
    sketch: {
        background: "#000000"
    },
    hexaskelion: {
        position: {
            x: 0,
            y: 0
        },
        scale: 2,
        radius: 100,
        theta: 590,
        a: 0.986,
        b: 0.411,
        rotation_speed_factor: 1
    },
    appearance: {
        stroke: {
            check: true,
            color: "#FFFFFF",
            weight: 2
        }
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
        .addNumberInput(data.hexaskelion, "theta", {
            label: "Subpart length",
            step: 1,
            dp: 3
        })
        .addNumberInput(data.hexaskelion, "a", {
            label: "Hexaskelion factor 'a'",
            step: 0.01,
            dp: 3
        })
        .addNumberInput(data.hexaskelion, "b", {
            label: "Hexaskelion factor 'b'",
            step: 0.001,
            dp: 3
        })
        .addNumberInput(data.hexaskelion, "scale", {
            label: "Scale Factor",
            step: 1,
            dp: 3
        })
        .addNumberInput(data.hexaskelion, "radius", {
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
        .addValuePlotter(data.hexaskelion, "a", {
            label: "a",
            height: 50,
        })
};

let hexy;

function setup() {
    createCanvas(windowWidth * 0.77, windowHeight);
    data.hexaskelion.position.x = width * 0.5; 
    data.hexaskelion.position.y = height * 0.5;
    hexy = new Hexaskelion(data.hexaskelion.position.x, data.hexaskelion.position.y);
    angleMode(DEGREES);
    noFill();
}

function draw() {
    background(data.sketch.background);
    hexy.show();
    hexy.update();
}

class Hexaskelion {
    constructor(x, y) {
        this.position = new p5.Vector(x, y);
        this.velocity = new p5.Vector();
        this.acceleration = new p5.Vector();
    }

    update()  {
        this.position.x = data.hexaskelion.position.x;
        this.position.y = data.hexaskelion.position.y;
    }

    show() {
        push();
        translate(this.position.x, this.position.y);
        scale(data.hexaskelion.scale);
        rotate(frameCount * data.hexaskelion.rotation_speed_factor);
        if (data.appearance.stroke.check) {
            strokeWeight(data.appearance.stroke.weight);
            stroke(data.appearance.stroke.color);
        } else {
            noStroke();
        }
        for (let theta = 0; theta < 360; theta += 60) {
            let rx = data.hexaskelion.radius * cos(theta);
            let ry = data.hexaskelion.radius * sin(theta);
            push();
            translate(rx, ry);
            rotate(theta);
            beginShape();
            let x;
            let y;
            for (let i = 0; i < data.hexaskelion.theta; i += 1) {
                let r = data.hexaskelion.a * Math.exp(radians(i * data.hexaskelion.b));
                x = r * cos(i);
                y = r * sin(i);
                curveVertex(x, y);
            }
            endShape();
            pop();
        }
        pop();
    }
}

createControlKit();