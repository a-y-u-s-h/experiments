let data = {
  sketch: {
    background: "#000000"
  },
  sphere: {
    r: 250,
    scale: 10
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  rectMode(CENTER);
  angleMode(DEGREES);
  colorMode(HSB, 100);
  noStroke();
}

function draw() {
  background(data.sketch.background);
  orbitControl();
  scale(0.7)
  rotateX(45);
  rotateY(-15);
  rotateX(30);
  push();
  colorMode(RGB);
  directionalLight(255, 255, 255, 0, 0, 1);
  pointLight(0, 0, 0, 500, 500, 500);
  ambientLight(255, 255, 255)
  pop();
  // rotateZ(frameCount);

  for (var theta = 0, upperLimit_theta = 360 ; theta < upperLimit_theta; theta += 8 ) {
    for (var phi = 0, upperLimit_phi = 180 ; phi < upperLimit_phi; phi += 8 ) {
      let d = dist(theta, phi, 0, 0);
      let x = data.sphere.r * sin(theta) * sin(phi)  + noise(d) * 100 * sin(frameCount * 2) + tan(frameCount * 0.1 + d) * 4;
      let y = data.sphere.r * cos(theta) * sin(phi)  + noise(d) * 100 * cos(frameCount * 2) + tan(frameCount * 0.1 + d) * 4;
      let z = data.sphere.r * cos(phi);
      push();
      translate(x, y, z);
      fill(map(theta, 0, 360, 0, 100), 100, 100, 100);
      rotateX(phi + frameCount);
      sphere(10);
      pop();
    }
  }
}
