let data = {
  sketch: {
    background: "#456778"
  },
  body: {
    r_multipler: {
      three: 4,
      two: 10
    },
    force_constant: 100000
  },
  rings: {
    n: 60,
    r: 300
  }
};

let body1;
let body2;
let ring;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  body2 = new Body(200, 0, 0, 10, 0);
  body1 = new Body(-200, 0, 0, 10, 0);
  ring = new Ring(0, 0, 0);
  ring.initialize();
}

function draw() {
  background(data.sketch.background);
  scale(1, -1);

  ring.display();
  let force1 = body1.calculateForce(body2);
  let force2 = body2.calculateForce(body1);

  body1.applyForce(force2.mult(-1));
  body2.applyForce(force1.mult(-1));

  body1.display3D();
  body1.update();

  body2.display3D();
  body2.update();
}
