// Variable to store control UI
var controlkit;

// Data for this experiment
let data = {
    amplitude: {
        xp: 300,
        yp: 300
    },
    speed: {
        xp: 0.1,
        yp: 0.1
    },
    phi: {
        xp: 360,
        yp: 0
    },
    color: {
        Line: "#000",
        Point: "#E82107",
        Trail: "#223344"
    },
    point: {
        ratio: {
            m1: 4,
            m2: 3
        }
    },
    trail: {
        limit: 800
    }
};

// Function to create control GUI
var createControlKit = () => {
    controlkit = new ControlKit();
    controlkit
        .addPanel({
            fixed: false,
            opacity: 0.9
        })
        .addSubGroup({
            label: "Line Controls"
        })
        .addNumberInput(data["amplitude"], "xp", {
            label: "X-anchor's Amplitude",
            step: 1
        })
        .addNumberInput(data["speed"], "xp", {
            label: "X-anchor's Speed",
            step: 0.1
        })
        .addNumberInput(data["phi"], "xp", {
            label: "X-anchor's Initial Phase",
            step: 1
        })
        .addNumberInput(data["amplitude"], "yp", {
            label: "Y-anchor's Amplitude",
            step: 1
        })
        .addNumberInput(data["speed"], "yp", {
            label: "Y-anchor's Speed",
            step: 0.1
        })
        .addNumberInput(data["phi"], "yp", {
            label: "Y-anchor's Initial Phase",
            step: 1
        })
        .addColor(data["color"], "Line", {
            colorMode: "hex",
            label: "Line Color"
        })
        .addSubGroup({
            label: "Point Controls"
        })
        .addNumberInput(data["point"]["ratio"], "m1", {
            label: "Proximity with X anchor",
            step: 0.1
        })
        .addNumberInput(data["point"]["ratio"], "m2", {
            label: "Proximity with Y anchor",
            step: 0.1
        })
        .addColor(data["color"], "Point", {
            colorMode: "hex",
            label: "Point Color"
        })
        .addSubGroup({
            label: "Point Trail Controls"
        })
        .addColor(data["color"], "Trail", {
            colorMode: "hex",
            label: "Trail Color"
        });
};

/*
    Class to create anchors on X axis and Y axis
*/
class SHMPoint {
    constructor(axis) {
        this.axis = axis;
        this.x = 0;
        this.y = 0;
        this.theta = 0;
        this.phi = 0;
        this.amplitude = 0;
        this.speed = 0;
    }

    show() {
        // Create a point at origin
        strokeWeight(1);
        point(this.x, this.y);
        strokeWeight(1);
        // If axis provided is Y, then it'll perform SHM on Y axis. Main thing happens in update method.
        if (this.axis == "Y") {
            this.y =
                this.amplitude *
                Math.sin(degrees(this.theta) + degrees(this.phi));
            this.phi = data.phi.yp;
        }
        // If axis provided is X, then it'll perform SHM on X axis. Main thing happens in update method.
        if (this.axis == "X") {
            this.x =
                this.amplitude *
                Math.sin(degrees(this.theta) + degrees(this.phi));
            this.phi = data.phi.xp;
        }
    }

    update() {
        //  Y = A * sin(wt + phi);
        if (this.axis == "Y") {
            this.amplitude = data.amplitude.yp;
            this.speed = data.speed.yp;
            this.theta = lerp(this.theta, this.theta + this.speed, 0.1);
            this.y = this.amplitude * Math.sin(this.theta + this.phi);
        }
        // X = A * sin(wt + phi);
        if (this.axis == "X") {
            this.amplitude = data.amplitude.xp;
            this.speed = data.speed.xp;
            this.theta = lerp(this.theta, this.theta + this.speed, 0.1);
            this.x = this.amplitude * Math.sin(this.theta + this.phi);
        }
    }
}

let xp; // Stores  X-anchor
let yp; // Stores  Y-anchor
let trail = []; // Stores object instances of TrailPoint class, which basically is history of wherever our point on the line went.

/*
    This class creates an object with x,y as coordinates and color as ..color.
    It has a method = show, which has an optional 'other' argument, which should be another TrailPoint object.
*/
class TrailPoint {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    show(other = null) {
        // If no object is passed, create a point, basically.
        // Otherwise create a line between this object and this other object.
        if (other !== null) {
            stroke(this.color);
            strokeWeight(1);
            line(this.x, this.y, other.x, other.y);
        } else {
            line(this.x, this.y, this.x, this.y);
        }
    }
}

var setup = () => {
    createCanvas(windowWidth, windowHeight); // Creating canvas
    yp = new SHMPoint("Y"); // Initializing Y anchor
    xp = new SHMPoint("X"); // Initializing X anchor
};

var draw = () => {
    /*
        Set background to white
        Translate origin to middle of the canvas.
        Y-axes will point UP after scale(1, -1)
    */
    background(255); // Setting background to white repeatitively
    translate(width / 2, height / 2); // Translating origin to center of screen
    scale(1, -1); // Flipping Y-axis so that it becomes a mathematically normal Y-axis

    line(-width / 2, 0, width / 2, 0); // X- axis
    line(0, -height / 2, 0, height / 2); // Y-axis

    // Showing and moving X and Y anchors
    xp.show();
    yp.show();
    xp.update();
    yp.update();

    // Creating a line from X anchor to Y anchor, color is set from GUI
    stroke(data.color["Line"]);
    strokeWeight(2);
    line(xp.x, xp.y, yp.x, yp.y);
    strokeWeight(1);
    stroke(0);

    // The point with coordinates pointX and pointY will cut line segment joining X and Y anchor in ratio m1:m2
    // So here I'm defining m1 and m2
    var m1 = data.point.ratio.m1;
    var m2 = data.point.ratio.m2;

    // Now, pointX and pointY will be given with that really simple coordinate geometry equation that everyone knows... 
    var pointX = (m1 * yp.x + m2 * xp.x) / (m1 + m2);
    var pointY = (m1 * yp.y + m2 * xp.y) / (m1 + m2);

    // Creating the point with some thickness and stroke color..
    strokeWeight(8);
    stroke(data.color["Point"]);
    point(pointX, pointY);

    // Now, I want to push a trailPoint object to trail array everytime my point moves to another location..
    // ..Which will happen everytime draw loops..
    trail.push(new TrailPoint(pointX, pointY, data.color["Trail"]));

    // For every element in array, I'll call show method, except for zeroeth element, because I can't pass it another trailPoint object.
    for (var i = 0, upperLimit = trail.length; i < upperLimit; i += 1) {
        if (i > 0) {
            trail[i].show(trail[i - 1]);
        }
    }

    // If length of our history of point, which is trail array, becomes greater than the limit I set in data.trail limit, it'll remove the first object.
    // First In First Out. 
    if (data.trail.limit < trail.length) {
        trail.splice(0, 1);
    }
    strokeWeight(1);
    stroke(0);
};

// Resize Canvas on windows size change.
var windowResized = () => {
    resizeCanvas(windowWidth, windowHeight);
};

// Create Control GUI
createControlKit();
