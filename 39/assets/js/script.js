/**
 * Variables : A B
 * Axioms : A
 * Rules : (A -> AB) , (B -> A)
 */

/**
 * Variables : F+-[]
 * Axioms : F
 * Rules : F -> FF+[+F-F-F]-[-F+F+F]
 */

let data = {
  sketch: {
    background: "#FFFFFF"
  },
  system: {
    axiom: "F",
    rules: [
      {
        a: "F",
        b: "FF+[+F-F-F]-[-F+F+F]"
      }
    ]
  },
  turtle: {
    iterations: 5,
    len: 10,
    length_multiplier: 0.5,
    stroke: {
      weight: 1,
      color: "#30750E"
    },
    rotation: {
      left: 15,
      right: 15
    }
  }
};

let controlkit;
var createControlKit = () => {
  controlkit = new ControlKit();
  controlkit
    .addPanel({
      fixed: false
    })
    .addStringInput(data.system, "axiom", {
      label: "Axiom"
    })
    .addStringInput(data.system.rules[0], "a", {
      label: "A in (A -> B) : "
    })
    .addStringInput(data.system.rules[0], "b", {
      label: "B in (A -> B) : "
    })
    .addColor(data.sketch, "background", {
      colorMode: "hex",
      label: "Background Color"
    })
    .addColor(data.turtle.stroke, "color", {
      colorMode: "hex",
      label: "Stroke Color"
    })
    .addNumberInput(data.turtle, "iterations", {
      label: "Iterations (Advised : below 6)",
      step: 1
    })
    .addNumberInput(data.turtle, "len", {
      label: "Root Length",
      step: 1
    })
    .addNumberInput(data.turtle, "length_multiplier", {
      label: "Length Multiplier",
      step: 0.01
    })
    .addNumberInput(data.turtle.rotation, "left", {
      label: "Rotation Left",
      step: 1
    })
    .addNumberInput(data.turtle.rotation, "right", {
      label: "Rotation Right",
      step: 1
    })
    .addButton("Reset", function() {
      sentence = data.system.axiom;
      for (
        var i = 0, upperLimit_i = data.turtle.iterations;
        i < upperLimit_i;
        i += 1
      ) {
        generate();
      }
    });
};

createControlKit();

let sentence = data.system.axiom;

function generate() {
  var nextSentence = "";
  for (var i = 0, upperLimit_i = sentence.length; i < upperLimit_i; i += 1) {
    var current = sentence.charAt(i);
    var found = false;
    for (
      var j = 0, upperLimit_j = data.system.rules.length;
      j < upperLimit_j;
      j += 1
    ) {
      if (current == data.system.rules[j].a) {
        found = true;
        nextSentence += data.system.rules[j].b;
        break;
      }
    }

    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  turtle(data.turtle.len * data.turtle.length_multiplier);
}

function turtle(len) {
  background(data.sketch.background);
  resetMatrix();
  strokeWeight(data.turtle.stroke.weight);
  stroke(data.turtle.stroke.color);
  angleMode(DEGREES);
  translate(width * 0.5, height);
  colorMode(HSB, 100);

  for (var i = 0, upperLimit_i = sentence.length; i < upperLimit_i; i += 1) {
    let current = sentence.charAt(i);
    switch (current) {
      case "F":
        line(0, 0, 0, -len);
        translate(0, -len);
        break;
      case "+":
        rotate(data.turtle.rotation.right);
        break;
      case "-":
        rotate(-data.turtle.rotation.left);
        break;
      case "[":
        push();
        break;
      case "]":
        pop();
        break;
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(data.sketch.background);
  for (
    var i = 0, upperLimit_i = data.turtle.iterations;
    i < upperLimit_i;
    i += 1
  ) {
    generate();
  }
}
