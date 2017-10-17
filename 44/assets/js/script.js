let data = {
  sketch: {
    background: "#FFFFFF"
  },
  turtle: {
    len: 10,
    length_multiplier: 0.5,
    stroke: {
      weight: 1,
      color: "#000000"
    },
    rotation: {
      left: 30,
      right: 30
    }
  }
};

function turtle(sentence, len) {
  background(data.sketch.background);
  resetMatrix();
  strokeWeight(data.turtle.stroke.weight);
  stroke(data.turtle.stroke.color);
  angleMode(DEGREES);
  translate(width * 0.5, height);

  for (var i = 0, upperLimit_i = sentence.length; i < upperLimit_i; i += 1) {
    let current = sentence.charAt(i);
    switch (current) {
      case "w":
      case "W":
        line(0, 0, 0, -len);
        translate(0, -len);
        break;
      case "s":
      case "S":
        line(0, 0, 0, len);
        translate(0, len);
        break;
      case "d":
      case "D":
        rotate(data.turtle.rotation.right);
        line(0, 0, 0, -len);
        translate(0, -len);
        break;
      case "a":
      case "A":
        rotate(-data.turtle.rotation.left);
        line(0, 0, 0, -len);
        translate(0, -len);
        break;
      case "p":
      case "P":
        push();
        break;
      case "o":
      case "O":
        pop();
        break;
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {}

let sentence = "";
function keyTyped() {
  sentence += `${key}`;
  turtle(sentence, 10);
}
