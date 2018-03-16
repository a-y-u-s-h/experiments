let data = {
  sketch: {
    background: "#FFFFFF"
  },
  sphere: {
    r: 100,
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

  for (var theta = 0, upperLimit_theta = 360 ; theta < upperLimit_theta; theta += 5 ) {
    for (var phi = 0, upperLimit_phi = 180 ; phi < upperLimit_phi; phi += 10 ) {
      let d = dist(theta, phi, 0, 0);
      let x = data.sphere.r * sin(theta) * sin(phi)  + noise(d) * 2 * sin(frameCount * 2);
      let y = data.sphere.r * cos(theta) * sin(phi)  + noise(d) * 100 * tan(frameCount * 0.5);
      let z = data.sphere.r * cos(phi) + random(10);
      push();
      translate(x, y, z);
      fill(map(theta, 0, 360, 0, 100), 100, 100, 100);
      rotateX(phi + frameCount);
      sphere(2);
      pop();
    }
  }
}
