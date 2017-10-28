// Data for this experiment
let data = {
  sketch: {
    background: "#000000",
    score: 0
  },
  text: {
    size: 15,
    font: null
  }
};

// Matter.js Module Aliases
let Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies;

// Variables for Matter.js
let engine;
let world;
let halves = [];
let scoreboard;
let grounds = [];

function preload() {
  data.text.font = loadFont("assets/media/fonts/font.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  scoreboard = new Scoreboard();
  for (var i = 0, upperLimit_i = 5; i < upperLimit_i; i += 1) {
    grounds.push(new Ground(width * 0.2 * i, height * 0.75));
  }

  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textFont(data.text.font);
  fill(255);
  noStroke();
}

function draw() {
  if (round(data.sketch.score / 50) >= 50) {
    background("#057051");
  } else {
    background(data.sketch.background);
  }
  scoreboard.show();
  for (var i = 0, upperLimit_i = grounds.length; i < upperLimit_i; i += 1) {
    grounds[i].show();
  }

  for (var i = 0, upperLimit_i = halves.length; i < upperLimit_i; i += 1) {
    if (halves[i]) {
      halves[i].show();
      if (halves[i].body.position.y > height + data.text.size * 0.5) {
        halves.splice(i, 1);
        data.sketch.score++;
      }
    }
  }
}

function mouseDragged() {
  halves.push(new Body(mouseX, mouseY));
}

class Body {
  constructor(x, y) {
    this.options = {
      restitution: 1,
      friction: 0
    };
    this.x = x;
    this.y = y;
    this.size = data.text.size;
    this.body = Bodies.rectangle(x, y, this.size, this.size, this.options);
    World.add(world, this.body);
    this.random = random(-50, 100);
  }

  show() {
    let position = this.body.position;
    let angle = this.body.angle;
    push();
    translate(position.x, position.y);
    rotate(angle);
    noStroke();
    fill(100 + this.random, 255, 150 + this.random);
    textSize(this.size);
    text("1", 0, 0);
    text("—", 0, this.size * 0.5);
    text("2", 0, this.size);
    pop();
  }
}

class Ground {
  constructor(x, y, w, h) {
    this.options = {
      isStatic: true,
      restitution: 1,
      angle: random(-PI * 0.25, PI * 0.25)
    };
    this.x = x;
    this.y = y;
    this.w = random(100, 500);
    this.h = 1;
    this.body = Bodies.rectangle(x, y, this.w, this.h, this.options);
    World.add(world, this.body);
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.options.angle);
    rect(0, 0, this.w, this.h);
    pop();
  }
}

class Scoreboard {
  show() {
    push();
    fill(255);
    text(`Score : `, width - 70, 20);
    if (round(data.sketch.score / 50) <= 50) {
      fill(255, 100, 100);
    } else {
      fill("#16311A");
    }
    text(`${data.sketch.score}`, width - 30, 20);
    fill(255);
    text(`Half Centuries : `, 70, 20);
    if (round(data.sketch.score / 50) <= 50) {
      fill(255, 100, 100);
    } else {
      fill("#16311A");
    }
    text(`${round(data.sketch.score / 50)}`, 130, 20);
    pop();
  }
}
