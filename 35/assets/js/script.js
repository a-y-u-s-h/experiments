let data = {
  sketch: {
    background: "#9C0000"
  },
  cubes: {
    n: 8,
    size: 150,
    rotation_z: false
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(data.sketch.background);
  let mx = mouseX - width * 0.5;
  let my = -(mouseY - height * 0.5);
  angleMode(DEGREES);
  scale(1, -1);
  camera(0, 0, 900);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  cubez(data.cubes.size, data.cubes.n);
}

function cubez(size, n) {
  if (data.cubes.rotation_z) {
    angleMode(DEGREES);
    rotateZ(360 * sin(frameCount * 0.001));
  }

  colorMode(HSB, size);
  fill(
    map(n, 0, data.cubes.n, 100, 90),
    map(n, 0, data.cubes.n, 100, 90),
    100,
    50
  );
  box(size * n);
  if (n > 2) {
    cubez(size * 0.9, n * 0.9);
  }
}

function mousePressed() {
  data.cubes.rotation_z = !data.cubes.rotation_z;
}
