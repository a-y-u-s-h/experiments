let data = {
  sketch: {
    background: "#000000"
  },
  perlin: {
    offsets: {
      x: 0,
      y: 0,
      increment: 0.006
    },
    increment: 1,
    start_size: 1,
    size_multiplier: 1.02
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  blendMode(ADD);
  noFill();
  stroke(random(255), random(255), random(255), 128);
}

function draw() {
  translate(width * 0.5, height * 0.5);

  if (data.perlin.start_size < 3000) {
    // Create a series of perlin rings from big to small
    for (var i = 0; i < 10; i++) {

      // Less points for smaller rings
      nPoints = int(2 * PI * data.perlin.start_size);
      nPoints = min(nPoints, 800);

      // Create ring
      beginShape();
      for (var i = 0; i < nPoints; i++) {
        var a = i / nPoints * TAU;
        var p = p5.Vector.fromAngle(i / nPoints * TAU);
        var n = noise(data.perlin.offsets.x + p.x * data.perlin.increment, data.perlin.offsets.y + p.y * data.perlin.increment) * data.perlin.start_size;
        p.mult(n);
        vertex(p.x, p.y);
      }
      endShape(CLOSE);

      // Increment perlin offset for next ring
      data.perlin.offsets.x += data.perlin.offsets.increment;
      data.perlin.offsets.y += data.perlin.offsets.increment;

      // Update size
      data.perlin.start_size *= data.perlin.size_multiplier;
    }
  }
}

function mousePressed () {
  blendMode(NORMAL);
  background(0);
  blendMode(ADD);
}