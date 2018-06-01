let data = {
  sketch: {
    background: "#1D1D1D"
  },
  torus: {
    R: window.innerWidth * 0.15,
    r: window.innerWidth * 0.08
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  colorMode(HSL, 100);
}

function draw() {
  background(data.sketch.background);

  ortho();
  orbitControl();
  // rotateX(radians(90));
  // translate(0, 200, 0);
  rotateZ(radians(90));
  push();
  let lx =
    (data.torus.R * 0.5 + data.torus.r * cos(frameCount)) * cos(frameCount);
  let ly =
    (data.torus.R * 0.5 + data.torus.r * cos(frameCount)) * sin(frameCount);
  let lz = 0;
  pointLight(255, 255, 255, lx, ly, lz);
  pop();
  /**
   * Coordinates of a point in torus are parametrically defined as : 
   * x (theta, phi) = (R + r * cos(theta)) * cos(phi)
   * y (theta, phi) = (R + r * cos(theta)) * sin(phi)
   * x (theta, phi) = r * sin(theta)
   */
  for (var phi = -90; phi < 90; phi += 5) {
    for (var theta = -180; theta < 180; theta += 10) {
      let x = (data.torus.R + data.torus.r * cos(theta)) * cos(phi);
      let y = (data.torus.R + data.torus.r * cos(theta)) * sin(phi);
      let z = data.torus.r * sin(theta);
      let d = dist(x, z, y, 0, 0, 0);
      push();
      rotateY(radians(360 * sin(frameCount + phi * 0.2)));
      translate(x, y, z);
      // sphere(map(d, 0, data.torus.R + data.torus.r, 5, 20));
      sphere(15);
      pop();
    }
  }
}