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
    colorMode(RGB, 100);

    for (
        var i = 0, upperLimit_i = data.metaball.number;
        i < upperLimit_i;
        i += 1
    ) {
        blobs.push(new Blob(random(width), random(height)));
    }
}

function draw() {
    background(data.sketch.background);

    loadPixels();
    for (var x = 0, upperLimit_x = width; x < upperLimit_x; x += 1) {
        for (var y = 0, upperLimit_y = height; y < upperLimit_y; y += 1) {
            let index = (x + y * width) * 4;
            let sum = 0;
            blobs.forEach(b => {
                let d = dist(x, y, b.position.x, b.position.y);
                sum += b.r / d ;
            });
            let col = color(
                map(
                    sum,
                    0,
                    (width + height) * data.metaball.size,
                    0,
                    100 * sin(frameCount * 0.1)
                ),
                map(
                    sum,
                    0,
                    (width + height) * data.metaball.size,
                    0,
                    100 * sin(frameCount * 0.05)
                ),
                map(
                    sum,
                    0,
                    (width + height) * data.metaball.size,
                    10,
                    100 * sin(frameCount * 0.01)
                )
            );
            set(x, y, col);
        }
    }
    updatePixels();

    blobs.forEach(b => {
        b.update();
    });
}
