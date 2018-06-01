/*
  Class: Bubble
  Arguments : (none)
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
        this.radius = lerp(this.radius, this.radius + 10, 0.8);
      } else {
        this.x = lerp(this.x, this.x + random(-1, 1), 0.8);
        this.y = lerp(this.y, this.y + random(-1, 1), 0.8);
      }
    }
  }
}