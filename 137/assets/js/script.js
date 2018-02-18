let data = {
  sketch: {
    background: "#000000"
  },
  structure: {
    rings: 50
  },
  ring: {
    n: 10,
    r: 15
  },
  atoms: {
    size: 1
  }
};

let atoms = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB, 100);

  for (var j = 0; j < data.structure.rings; j += 1) {
    let r = data.ring.r * (j + 1);
    atoms[j] = [];
    for (var i = 0; i < data.ring.n; i += 1) {
      let x = r * cos(frameCount + i * (360 / data.ring.n));
      let y = r * sin(frameCount + i * (360 / data.ring.n));
      let z = 100;
      atoms[j].push(new Atom(x, y, z));
    }
  }
}

function draw() {
  background(data.sketch.background);
  // ortho();
  orbitControl();
  camera(0, 0, 100);
  rotateX(90);
  // rotateZ(-15);
  rotateY(radians(-15) );
  for (var i = atoms.length - 1; i >= 0; i -= 1) {
    push();
    rotateZ(frameCount * 0.01 + Math.log((i + 1) * 0.1));
    fill(
      map(i, atoms.length - 1, 0, 0, abs(50 * (1 + 0.5 * sin(frameCount * 2 + i * (360 / data.structure.rings))))),
      100,
      100,
      60
    );
    beginShape();
    for (var j = 0; j < atoms[i].length; j += 1) {
      vertex(
        atoms[i][j].position.x,
        atoms[i][j].position.y,
        atoms[i][j].position.z
      );
    }
    endShape(CLOSE);
    pop();
  }
  ambientLight(0, 0, 0);
  pointLight(0, 0, 100, 300 * sin(frameCount), 0, 300);
  specularMaterial(255, 255, 255);
  for (var i = atoms.length - 1; i >= 0; i -= 1) {
    push();
    rotateZ(frameCount * 0.01 + Math.log((i + 1) * 0.1));
    for (var j = 0; j < atoms[i].length; j += 1) {
      atoms[i][j].show(i);
    }
    pop();
  }
}

class Atom {
  constructor(x = 0, y = 0, z = 0) {
    this.position = new p5.Vector(x, y, z);
    this.original = new p5.Vector(x, y, z);
  }

  show(i) {
    this.update(i);
    push();
    translate(this.position.x, this.position.y, this.position.z);
    sphere(data.atoms.size, 60);
    pop();
  }

  update(i) {
    this.position.z =
      this.original.z * sin(frameCount * 4 + i * (360 / data.structure.rings));
  }
}
