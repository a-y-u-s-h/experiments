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

let squares = [];

class Square {
    constructor(cx, cy, size, i_factor) {
        this.revCx = width / 2;
        this.revCy = height / 2;
        this.cx = cx;
        this.cy = cy;
        this.size = size;
        this.rotation = 0;
        this.revolution = 0;
        this.i_factor = i_factor;
        this.position = 2 * i_factor * Math.PI / data.n;
        this.phi = 2 * i_factor * Math.PI / data.n;
    }

    show() {
        push();
        translate(this.cx, this.cy);
        rectMode(CENTER);
        angleMode(DEGREES);
        rotate(this.rotation);
        stroke(data.square.stroke);
        strokeWeight(data.square.stroke_weight);
        fill(data.square.fill);
        rect(0, 0, this.size, this.size);
        pop();
    }

    update() {
        this.size = data.square.size;
        this.phi = this.position * data.movement.separation;
    }

    rotate() {
        this.rotation = lerp(
            this.rotation,
            this.rotation + 1,
            data.square.rotation_speed
        );
    }

    revolve() {
        angleMode(DEGREES);
        this.cx =
            this.revCx +
            data.movement.radius *
                cos(
                    degrees(this.revolution) +
                        degrees(this.phi) +
                        degrees(this.position)
                );
        this.cy =
            this.revCy +
            data.movement.radius *
                sin(
                    degrees(this.revolution) +
                        degrees(this.phi) +
                        degrees(this.position)
                );
        this.revolution = lerp(
            this.revolution,
            this.revolution + 1,
            map(data.movement.revolution_speed, 0, 100, 0, 1)
        );
    }
}

let squres = [];

function setup() {
    createCanvas(windowWidth, windowHeight);

    for (var i = 1; i <= data.n; i += 1) {
        squares.push(new Square(width / 2, height / 2, data.square.size, i));
    }
}

function draw() {
    background(data.background);

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

