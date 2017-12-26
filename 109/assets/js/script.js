/*
    Author : Ayush Sharma
    a-y-u-s-h.github.io
 */

let data = {
    sketch: {
        background: "#FFFFFF",
        scale: window.innerHeight / window.innerWidth,
        width: 160,
        height: 120
    },
    metaball: {
        number: 8,
        size: 0.5
    }
};

let blobs = [];

function setup() {
    let canvas = createCanvas(
        data.sketch.width,
        data.sketch.height * data.sketch.scale
    );
    canvas.id("canvas");
    colorMode(HSL, 100);

    for (var i = 0, max_i = data.metaball.number; i < max_i; i += 1) {
        blobs.push(new Blob(random(width), random(height)));
    }
}

function draw() {
    background(data.sketch.background);
    loadPixels();

    for (var x = 0, max_x = width; x < max_x; x += 1) {
        for (var y = 0, max_y = height; y < max_y; y += 1) {
            let index = (x + y * width) * 4;
            let sum = 0;
            blobs.forEach(b => {
                let d = dist(x, y, b.position.x, b.position.y);
                sum += b.r / d;
            });
            let r = map(
                sum,
                0,
                (width + height) * data.metaball.size,
                0,
                sum
            );
            let g = map(
                sum,
                0,
                (width + height) * data.metaball.size,
                0,
                60
            );
            let b = map(
                sum,
                0,
                (width + height) * data.metaball.size,
                100,
                0
            );
            let col = color(b, g, r);
            set(x, y, col);
        }
    }

    updatePixels();
    blobs.forEach(b => {
        b.update();
    });
}
