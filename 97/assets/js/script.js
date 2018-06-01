let data = {
  sketch: {
    background: "#FFFFFF06"
  },
  circle: {
    r: window.innerWidth * 0.10,
    spacing: 1,
    toMorphto: 3
  }
};

let circlePath = [];
let trianglePath = [];

function polarToCartesian(r, angle) {
  return createVector(r * cos(angle), r * sin(angle));
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("#canvas");
  angleMode(DEGREES);
  colorMode(HSB, 100);
  background(255);
  strokeWeight(1);

  let startA = 0;
  let endA = 360 / data.circle.toMorphto;

  let startV = polarToCartesian(data.circle.r, startA);
  let endV = polarToCartesian(data.circle.r, endA);

  for (var a = startA; a < 360; a += data.circle.spacing) {
    let x = data.circle.r * cos(a);
    let y = data.circle.r * sin(a);
    let cv = new p5.Vector(x, y);
    circlePath.push(cv);

    let amountToLerp = (a % (360 / data.circle.toMorphto)) / (endA - startA);
    let tv = p5.Vector.lerp(startV, endV, amountToLerp);
    trianglePath.push(tv);

    if ((a + data.circle.spacing) % (360 / data.circle.toMorphto) == 0) {
      startA = startA + 360 / data.circle.toMorphto;
      endA = endA + 360 / data.circle.toMorphto;
      startV = polarToCartesian(data.circle.r, startA);
      endV = polarToCartesian(data.circle.r, endA);
    }
  }
}

function draw() {
  background(data.sketch.background);
  translate(width * 0.5, height * 0.5);
  stroke(50 + 50 * sin(frameCount), 100, 100, 30);
  strokeWeight(1);
  stroke("#00000090");
  noFill();
  push();
  translate(width * 0.37, 0);

  rotate(30 + frameCount);
  let amt = (2 * sin(frameCount * 3) + 3) * 0.5;
  beginShape();
  for (var i = 0; i < circlePath.length; i += 1) {
    let cv = circlePath[i];
    let tv = trianglePath[i];

    let x = lerp(cv.x, tv.x, amt);
    let y = lerp(cv.y, tv.y, amt);
    curveVertex(x, y);
    push();
    strokeWeight(1);
    point(x, y);
    pop();
  }
  endShape(CLOSE);
  pop();

  push();
  translate(-width * 0.37, 0);
  rotate(30 - frameCount);
  amt = (2 * sin(frameCount * 3) + 2) * 0.5;
  beginShape();
  for (var i = 0; i < circlePath.length; i += 1) {
    let cv = circlePath[i];
    let tv = trianglePath[i];

    let x = lerp(cv.x, tv.x, amt);
    let y = lerp(cv.y, tv.y, amt);
    vertex(x, y);
    push();
    strokeWeight(1);
    point(x, y);
    pop();
  }
  endShape(CLOSE);
  pop();

  push();
  translate(-width * 0.12, 0);
  rotate(30 - frameCount);
  amt = (sin(frameCount * 3) + 1) * 0.5;
  beginShape();
  for (var i = 0; i < circlePath.length; i += 1) {
    let cv = circlePath[i];
    let tv = trianglePath[i];

    let x = lerp(cv.x, tv.x, amt);
    let y = lerp(cv.y, tv.y, amt);
    vertex(x, y);
    push();
    strokeWeight(1);
    point(x, y);
    pop();
  }
  endShape(CLOSE);
  pop();

  push();
  translate(width * 0.12, 0);
  rotate(30 - frameCount);
  amt = (2 * sin(frameCount * 3) + 1) * 0.5;
  beginShape();
  for (var i = 0; i < circlePath.length; i += 1) {
    let cv = circlePath[i];
    let tv = trianglePath[i];

    let x = lerp(cv.x, tv.x, amt);
    let y = lerp(cv.y, tv.y, amt);
    vertex(x, y);
    push();
    strokeWeight(1);
    point(x, y);
    pop();
  }
  endShape(CLOSE);
  pop();
}
