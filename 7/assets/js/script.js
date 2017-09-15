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

class CircularBody {
    constructor(
        cx,
        cy,
        spacing_factor_a,
        spacing_factor_b,
        speed_factor,
        fc = color(255),
        sc = color(0) // Stroke color of Orbit, by default  = black
    ) {
        this.cx = cx;
        this.cy = cy;
        this.ia = spacing_factor_a / 2;
        this.ib = spacing_factor_b / 2;
        this.ra = this.ia * data.a_spacing;
        this.rb = this.ib * data.b_spacing;
        this.r = this.ia * data.common_spacing;
        this.fill = fc;
        this.stroke = sc;
        this.theta = 0;
        this.p_speed_factor = speed_factor;
        this.px = this.ra * Math.cos(this.theta);
        this.py = this.rb * Math.sin(this.theta);
    } 

    show() {
        push();
        stroke(data.orbit_color);
        strokeWeight(data.orbit_stroke_weight);
        noFill();
        if (data.a_spacing == data.b_spacing ) {
            this.r = this.ia * data.common_spacing;
            ellipse(this.cx, this.cy, this.r * 2, this.r * 2);
        } else {
            this.ra = this.ia * data.a_spacing;
            this.rb = this.ib * data.b_spacing;
            ellipse(this.cx, this.cy, this.ra * 2, this.rb * 2);
        }
        pop();
    }

    pShow() {
        push();
        translate(this.cx, this.cy);
        stroke(data.points.stroke);
        strokeWeight(data.points.stroke_weight);

        if (data.a_spacing !== data.b_spacing) {
            this.ra = this.ia * data.a_spacing;
            this.rb = this.ib * data.b_spacing;
            this.px = this.ra * Math.cos(this.theta);
            this.py = this.rb * Math.sin(this.theta);
        } else {
            this.r = this.ia * data.common_spacing;
            this.px = this.r * Math.cos(this.theta);
            this.py = this.r * Math.sin(this.theta);
        }
        ellipseMode(CENTER);
        fill(data.points.color);
        ellipse(this.px, this.py, data.points.radius, data.points.radius);
        pop();
    }

    pUpdate() {
        this.theta = lerp(
            this.theta,
            this.theta + 1,
            this.p_speed_factor * data.speed
        );
    }
}

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
