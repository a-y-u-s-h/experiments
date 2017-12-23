let data = {
  sketch: {
    background: "rgba(255, 207, 14, 1)"
  }
};

let font;
let poem = `
break     do        instanceof  typeof
case      else      new         var
catch     finally   return      void
continue  for       switch      while
debugger  function  this        with
default   if        throw
delete    in        try

abstract  export      interface  static
boolean   extends     long       super
byte      final       native     synchronized
char      float       package    throws
class     goto        private    transient
const     implements  protected  volatile
double    import      public 
enum      int         short
`;

poem = poem
  .replace(/\n/g, " ")
  .split(/(\s+)/)
  .filter(e => e.trim().length > 0);

let words = [];

function preload() {
  font = loadFont("assets/media/font/font.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  poem.forEach(keyword => {
    words.push(new Word(random(width), random(height), keyword));
  });
}
function draw() {
  background(data.sketch.background);

  push();
  textSize(width * 0.4);
  textFont(font);
  textStyle(BOLD);
  fill(0);
  noStroke();
  text("JS", width * 0.5, height * 0.9);
  pop();

  words.forEach(word => {
    word.run();
  });
}

class Word {
  constructor(cx, cy, text) {
    this.position = new p5.Vector(cx, cy);
    this.text = text;
    this.random = random(8, 20);
    this.velocity = new p5.Vector();
    this.acceleration = new p5.Vector();
  }

  run() {
    this.show();
    this.update();
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    textSize(this.random);
    textFont(font);
    fill(0);
    noStroke();
    text(`${this.text}`, 0, 0);
    pop();
  }

  update() {
    this.velocity.x = random(-2, 2);
    this.velocity.y = random(-2, 2);

    if (this.position.x > width || this.position.x < 0) {
      this.velocity.x *= 1;
    }

    if (this.position.y > height || this.position.y < 0) {
      this.velocity.y *= -1;
    }

    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
  }
}
