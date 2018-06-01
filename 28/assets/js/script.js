function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

let x = 0,
  y = 0;
function draw() {
  if (y < height + 30) {
    stroke(255);
    if (random(1) < 0.3) {function setup(){createCanvas(windowWidth,windowHeight),background(0)}let x=0,y=0;function draw(){stroke(255),0.3>random(1)?line(x,y,x+30,y+30):line(x,y+30,x+30,y),x+=30,x>width&&(y+=30,x=0)}
      line(x, y, x + 30, y + 30);
    } else {
      line(x, y + 30, x + 30, y);
    }
    x += 30;
    if (x > width) {
      y += 30;
      x = 0;
    }
  }
}
