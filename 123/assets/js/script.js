let data = {
  sketch: {
    background: "#000000"
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
}

randomSeed(99);

function draw() {
  background(data.sketch.background);

  ortho();
  orbitControl();

  rotateY(radians(frameCount));
  rotateX(radians(frameCount));
  rotateZ(radians(frameCount));

  fill(255);

  for (var i = 0; i < 3; i += 1) {
    for (var theta = 0; theta < 360; theta += (i + 1) * 10) {
      for (var phi = 0; phi < 360; phi += (i + 1) * 10) {
        let r = randomGaussian(20, 1);
        let a = coordiates(100 + i * 120, theta, phi + frameCount);
        let b = coordiates(120 + i * 120, theta, phi + frameCount * i);
        push();
        rotateY(radians(i));
        beginShape();
        vertex(a.x, a.y, a.z);
        vertex(b.x, b.y, b.z);
        endShape();
        pop();
      }
    }
  }
}

function coordiates(r, theta, phi) {
  let x = r * sin(phi) * cos(theta);
  let y = r * sin(phi) * sin(theta);
  let z = r * cos(phi);
  return new p5.Vector(x, y, z);
}
