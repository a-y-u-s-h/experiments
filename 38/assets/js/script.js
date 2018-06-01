let data = {
  sketch: {
    background: "#FFFFFF"
  },
  fractal: {
    text: [`♣`, "♠", "♦", "♥"],
    fill: "#A10100",
    size: 100,
    size_multiplier: 0.4,
    threshhold_factor: 0.2,
    yinyangs: 6,
    spacing: 1,
    rotation: {
      check: true,
      value: 0
    }
  }
};
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(data.sketch.background);
  angleMode(DEGREES);

  fill("#A10100");
  rect(0, 0, width * 0.25, height);
  // Spades
  push();
  translate(
    width * 0.125,
    height * 0.25 * sin(frameCount + 180) + height * 0.5
  );
  rotate(data.fractal.rotation);
  fractal(data.fractal.size, `${data.fractal.text[1]}`);
  pop();

  fill(0);
  rect(width * 0.25, 0, width * 0.25, height);
  // Diamonds
  push();
  translate(width * 0.375, height * 0.25 * sin(frameCount) + height * 0.5);
  rotate(data.fractal.rotation);
  fractal(data.fractal.size, `${data.fractal.text[2]}`);
  pop();

  fill("#A10100");
  rect(width * 0.5, 0, width * 0.25, height);
  // Clubs
  push();
  translate(width * 0.625, height * 0.25 * sin(frameCount + 180) + height * 0.5);
  rotate(data.fractal.rotation);
  fractal(data.fractal.size, `${data.fractal.text[0]}`);
  pop();

  fill(0);
  rect(width * 0.75, 0, width * 0.25, height);
  // Hearts
  push();
  translate(
    width * 0.875,
    height * 0.25 * sin(frameCount) + height * 0.5
  );
  rotate(data.fractal.rotation);
  fractal(data.fractal.size, `${data.fractal.text[3]}`);
  pop();
}

function fractal(size, symbol) {
  noSmooth();
  if (data.fractal.rotation.check) {
    rotate(frameCount * 0.5);
  }
  textAlign(CENTER, CENTER);
  textSize(size);
  angleMode(DEGREES);
  noStroke();
  switch (`${symbol}`) {
    case "♣":
    case "♠":
      fill(0);
      break;
    case "♦":
    case "♥":
      fill("#A10100");
      break;
    default:
      fill(data.fractal.fill);
      break;
  }
  strokeWeight(0);
  stroke(0);
  text(`${symbol}`, 0, 0);

  if (size > data.fractal.size * data.fractal.threshhold_factor) {
    for (
      var angle = 0, upperLimit_angle = 360;
      angle < upperLimit_angle;
      angle += 360 / data.fractal.yinyangs
    ) {
      push();
      let x = size * data.fractal.spacing * cos(angle);
      let y = size * data.fractal.spacing * sin(angle);
      translate(x, y);
      fractal(size * data.fractal.size_multiplier, `${symbol}`);
      pop();
    }
  }
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      data.fractal.yinyangs++;

      break;
    case DOWN_ARROW:
      data.fractal.yinyangs--;

      break;
    case LEFT_ARROW:
      data.fractal.spacing -= 0.01;
      break;
    case RIGHT_ARROW:
      data.fractal.spacing += 0.01;
      break;
  }
}
