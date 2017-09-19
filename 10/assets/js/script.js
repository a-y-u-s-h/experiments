/*
  Data for this experiment
*/
let data = {
  n: 1000,
  bubble: {
    stroke: "#000000",
    stroke_weight: 1
  }
};


/*
  Class: Bubble
  Fields : x, y, radius
  Methods: 
    1. Show : Displays the ellipses 
    2. Update: Updates radius and things 
*/
class Bubble {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.radius = 0;
  }

  show() {
    stroke(data.bubble.stroke);
    strokeWeight(data.bubble.strokeWeight);
    fill(random(200, 255), 100);
    ellipse(this.x, this.y, this.radius, this.radius);
  }

  update() {
    this.radius = lerp(this.radius, random(1, 5), 0.03);

    let mouseLocation = new p5.Vector(mouseX, mouseY);
    let centerLocation = new p5.Vector(this.x, this.y);

    if (mouseIsPressed) {
      if (mouseLocation.dist(centerLocation) < this.radius + 50) {
        this.radius = lerp(this.radius, this.radius + 10, 0.7);
      } else {
        this.x = lerp(this.x, this.x + random(-1, 1), 0.4);
        this.y = lerp(this.y, this.y + random(-1, 1), 0.4);
      }
    }
  }
}

// Array to store instances of Bubble class
let bubbles = [];

// This function will run once when the document loads
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0, upperLimit = data.n; i < upperLimit; i += 1) {
    bubbles.push(new Bubble());
  }
}

// Loops at 60 FPS
function draw() {
  background(0);
  for (var i = 0, upperLimit = data.n; i < upperLimit; i += 1) {
    bubbles[i].update();
    bubbles[i].show();
  }
}


function mousePressed() {
  let clickLocation = new p5.Vector(mouseX, mouseY);
}
