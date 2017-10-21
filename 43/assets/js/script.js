let data = {
  sketch: {
    background: "#000000"
  },
  symbol: {
    size: 15,
    fadeInterval: 1.3,
    color: {
      fill: "#00FF70",
      first: "#A5FFB1",
      stroke: "#086C34"
    }
  }
};

let streams = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  let x = 0;
  for (
    var i = 0, upperLimit_i = width / data.symbol.size;
    i < upperLimit_i;
    i += 1
  ) {
    let stream = new Stream();
    stream.generateSymbols(x, random(0, -height * 0.5));
    streams.push(stream);
    x += data.symbol.size + random(10, 30);
  }

  fill(data.symbol.color.fill);
  stroke(data.symbol.color.stroke);
  strokeWeight(1);
  textSize(data.symbol.size);
}

function draw() {
  background(0, 150);
  streams.forEach(function(stream) {
    stream.show();
  });
}

class Symbol {
  constructor(x, y, speed = 1, first, opacity) {
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
    this.switchInterval = round(random(2, 20));
    this.first = first;
    this.opacity = opacity;
  }

  show() {
    push();
    text(this.value, this.x, this.y);
    pop();
  }

  setToRandomSymbol() {
    var charType = round(random(0, 5));
    if (frameCount % this.switchInterval == 0) {
      if (charType > 1) {
        // set it to Devnagri
        this.value = String.fromCharCode(0x0904 + round(random(0, 36)));
      } else {
        // set it to numeric
        this.value = round(random(0, 9));
      }
    }
  }

  rain() {
    this.y = this.y > height ? 0 : (this.y += this.speed);
  }
}

class Stream {
  constructor() {
    this.symbols = [];
    this.totalSymbols = round(random(5, 20));
    this.speed = random(2, 15);
  }

  generateSymbols(x, y) {
    let first = round(random(0, 4)) == 1;
    let opacity = 255;
    for (
      var i = 0, upperLimit_i = this.totalSymbols;
      i < upperLimit_i;
      i += 1
    ) {
      let symbol = new Symbol(x, y, this.speed, first, opacity);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      y -= data.symbol.size;
      if (i >= 0) {
        opacity -= (255 / this.totalSymbols / data.symbol.fadeInterval);
        y -= data.symbol.size;
        first = false;
      }
    }
  }

  show() {
    this.symbols.forEach(function(symbol) {
      if (symbol.first) {
        fill(140, 255, 170, symbol.opacity);
      } else {
        fill(0, 255, 70, symbol.opacity);
      }
      // text(symbol.value, symbol.x, symbol.y);
      symbol.show();
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  }
}
