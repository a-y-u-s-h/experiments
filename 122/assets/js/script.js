let data = {
  sketch: {
    background: "#1D1D1D"
  },
  torus: {
    R: window.innerWidth * 0.4,
    r: window.innerWidth * 0.32
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  colorMode(RGB, 100);
}

function draw() {
  background(data.sketch.background);

  // ortho();
  orbitControl();
  translate(0, 0, -400);
  rotateX(radians(90));
  push();
  let lx =
    (data.torus.R * 0.25 + data.torus.r * cos(frameCount)) * cos(frameCount + 45);
  let ly =
    (data.torus.R * 0.25 + data.torus.r * cos(frameCount)) * sin(frameCount + 45);
  let lz = 0;
  pointLight(80, 80, 80, lx, ly, lz * cos(frameCount));
  pointLight(80, 80, 80, lx, ly, lz * sin(frameCount));
  pop();
  /**
   * Coordinates of a point in torus are parametrically defined as : 
   * x (theta, phi) = (R + r * cos(theta)) * cos(phi)
   * y (theta, phi) = (R + r * cos(theta)) * sin(phi)
   * x (theta, phi) = r * sin(theta)
   */
  for (var phi = -180; phi < 180; phi += 10) {
    for (var theta = -180; theta < 180; theta += 10) {
      let x = data.torus.r * cos(theta + frameCount * 0.5) * cos(phi);
      let y = data.torus.r * cos(theta + frameCount * 0.5) * sin(phi);
      let z = data.torus.r * sin(theta + frameCount * 0.5);
      let d = dist(x, z, y, 0, 0, 0);
      push();
      translate(data.torus.R * cos(phi), data.torus.R * sin(phi), 0);
      translate(x, y, z);
      scale(map(d, 0, 800, 0.01, 4));
      sphere(20);
      pop();
    }
  }
}
