let data = {
    sketch: {
        background: "#000000"
    },
    cwave: {
        r: 200,
        thickness: 5
    }
};

let r;
let g;
let b;

function setup() {
    createCanvas(windowWidth, windowHeight);
    strokeWeight(40);
    ellipseMode(CENTER);
    rectMode(CENTER);
    angleMode(DEGREES);
    r = new CWave(width * 0.5, height * 0.5, 100, 0);
    g = new CWave(width * 0.5, height * 0.5, 200, 120);
    b = new CWave(width * 0.5, height * 0.5, 300, 270);
}

function draw() {
    background(data.sketch.background);
    blendMode(ADD);
    r.show("#C33B3B90");
    b.show("#14ABCD90");
    g.show("#24CC5D90");
    blendMode(NORMAL);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    strokeWeight(40);
    ellipseMode(CENTER);
    rectMode(CENTER);
    angleMode(DEGREES);
    r = new CWave(width * 0.5, height * 0.5, 100, 0);
    g = new CWave(width * 0.5, height * 0.5, 200, 120);
    b = new CWave(width * 0.5, height * 0.5, 300, 270);
}

class CWave {
    constructor(cx, cy, r, phase) {
        this.position = new p5.Vector(cx, cy);
        this.r = r;
        this.phase = phase;
    }

    show(color = "#FFFFFF") {
        push();
        stroke(color);
        translate(this.position.x, this.position.y);
        for (var i = -180, upperLimit_i = 180; i < upperLimit_i; i += 2) {
            let x = this.r * cos(i + this.phase) + 100 * noise(random(1, -1), random(1, -1)) * map(i, -180, 180, -1, 1) * cos(frameCount + i * 0.1);
            let y = this.r * sin(i + this.phase) + 100 * noise(random(1, -1), random(1, -1)) * sin(frameCount * 3);
            push();
            if (i > 0) {
                this.r = data.cwave.r + 50 * sin(frameCount * 2 + i * 3);
                strokeWeight(map(i, 0, 180, 0, 30 * (1 + sin(-frameCount * 3 + i))));
            } else {
                this.r = data.cwave.r + 50 * sin(-frameCount * 2 + i * 3);
                strokeWeight(map(i, 0, -180, 0, 30 * (1 + sin(frameCount * 3 + i))));
            }
            point(x, y);
            pop();
        }
        pop();
    }
}