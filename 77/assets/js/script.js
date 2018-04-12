let data = {
  sketch: {
    background: "#FFFFFF"
  },
  particle: {
    stroke: {
      check: false,
      color: "#60BFD1",
      weight: 1
    },
    fill: {
      check: true,
      color: "#2E90DD"
    },
    radius: 2
  }
};

// Matter.js module aliases
let Engine = Matter.Engine;
let World = Matter.World;
let Bodies = Matter.Bodies;

// Required variables
let engine;
let world;

// Our objects
let particles = [];
let obstacles = [];
let scenery;
let ground1;
let ground2;
let ground3;
let ground4;
let ground5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  ground1 = new Ground(width * 0.5, height);
  ground2 = new Ground(random(width * 0.1, width * 0.15), height);
  ground3 = new Ground(random(width * 0.25, width * 0.3), height);
  ground4 = new Ground(random(width * 0.6, width * 0.65), height);
  ground5 = new Ground(random(width * 0.75, width * 0.8), height);
  scenery = new Scenery();

  rectMode(CENTER);
  ellipseMode(CENTER);
  colorMode(HSB, 100);
  angleMode(DEGREES);

  background(0);
}

function draw() {
  background(0, 10);
  // scenery.show();

  for (var i = 0, upperLimit_i = 1; i < upperLimit_i; i += 1) {
    particles.push(
      new Particle(
        random(width * 0, width * 0.49),
        random(height * 0, height * 0.01)
      )
    );
  }

  for (var i = 0, upperLimit_i = 1; i < upperLimit_i; i += 1) {
    particles.push(
      new Particle(
        random(width * 0.49, width * 0.5),
        random(0, height * 0.01)
      )
    );
  }

  for (var i = 0, upperLimit_i = 1; i < upperLimit_i; i += 1) {
    particles.push(
      new Particle(
        random(width * 0.5, width),
        random(0, height * 0.01)
      )
    );
  }

  ground1.show();
  ground2.show();
  ground3.show();
  ground4.show();
  ground5.show();

  for (var i = 0, upperLimit_i = particles.length; i < upperLimit_i; i += 1) {
    if (particles[i]) {
      particles[i].show();

      if (
        particles[i].body.position.x > width ||
        particles[i].body.position.x < 0 ||
        particles[i].body.position.y > height ||
        particles[i].body.position.y < 0
      ) {
        particles[i].removeFromWorld();
        particles.splice(i, 1);
        i--;
      }
    }
  }

  for (var i = 0, upperLimit_i = obstacles.length; i < upperLimit_i; i += 1) {
    if (obstacles[i]) {
      obstacles[i].show();
    }
  }
}

function mousePressed() {
  obstacles.push(new Obstacle(mouseX, mouseY));
}

class Scenery {
  show() {
    push();
    stroke(255);
    beginShape();
    for (var x = 0, upperLimit_x = width * 0.48; x < upperLimit_x; x += 4) {
      curveVertex(x, height * 0.1 + 5 * noise(x + 100 * sin(frameCount)));
    }
    endShape();
    pop();

    push();
    stroke(255);
    beginShape();
    for (var x = width * 0.51, upperLimit_x = width; x < upperLimit_x; x += 4) {
      curveVertex(x, height * 0.1 + 5 * noise(x + 100 * sin(frameCount)));
    }
    endShape();
    pop();
  }
}

class Ground {
  constructor(cx, cy) {
    this.options = {
      isStatic: true,
      restitution: 1,
      friction: 0
    };
    this.width = width * 0.1;
    this.height = random(150, 500);
    this.body = Bodies.rectangle(cx, cy, this.width, this.height, this.options);
    World.add(world, this.body);
  }

  show() {
    push();
    translate(this.body.position.x, this.body.position.y);
    stroke(255);
    rect(0, 0, this.width, this.height);
    pop();
  }

  update()  {
  }
}

class Obstacle {
  constructor(cx, cy) {
    this.options = {
      isStatic: true,
      restitution: 0.8,
      friction: 0
    };
    this.radius = 20;
    this.body = Bodies.circle(cx, cy, this.radius * 0.5, this.options);
    World.add(world, this.body);
  }

  show() {
    push();
    translate(this.body.position.x, this.body.position.y);
    stroke(255);
    ellipse(0, 0, this.radius, this.radius);
    pop();
  }
}

class Particle {
  constructor(cx, cy) {
    this.options = {
      restitution: 0.6,
      friction: 0
    };
    this.radius = data.particle.radius;
    this.body = Bodies.circle(cx, cy, this.radius, this.options);
    World.add(world, this.body);
  }

  show() {
    let position = this.body.position;
    let angle = this.body.angle;
    push();

    if (data.particle.stroke.check) {
      stroke(data.particle.stroke.color);
      strokeWeight(data.particle.stroke.weight);
    } else {
      noStroke();
    }

    if (data.particle.fill.check) {
      fill(data.particle.fill.color);
    } else {
      noFill();
    }

    translate(position.x, position.y);
    rotate(angle);
    ellipse(0, 0, this.radius, this.radius);
    // line(0, 0, 0, -1);
    pop();
  }

  removeFromWorld() {
    World.remove(world, this.body);
  }
}

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};
