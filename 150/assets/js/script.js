let wind;
let things = [];
let loc = {
  latitude: 0,
  longitude: 0
};
let url;

function preload() {
  navigator.geolocation.getCurrentPosition(function(location) {
    loc.latitude = location.coords.latitude;
    loc.longitude = location.coords.longitude;
  });
}

let arrow;

function setup() {
  createCanvas(windowWidth, windowHeight);
  url = `https://api.apixu.com/v1/current.json?key=04ace88a16ce4948a06181925181803&q=${
    loc.latitude
  },${loc.longitude}`;
  loadJSON(url, gotWeather);

  for (var i = 0; i < width; i += width / 15) {
    for (var j = 0; j < height; j += height / 15) {
      things.push(
        new Thing(
          randomGaussian(width * 0.5, 150),
          randomGaussian(height * 0.5, 150)
        )
      );
    }
  }

  wind = createVector();

  arrow = new Arrow();
}

function draw() {
  background(200);

  things.forEach(thing => {
    thing.run(wind);
  });
  arrow.show();

  if ( (frameCount % (60 * 30))  ) {
   //execute this line of code
  }
}

function gotWeather(weather) {
  let angle = radians(Number(weather.current.wind_degree));
  let windmag = Number(weather.current.wind_mph);
  let temperatureDiv = createDiv(floor(weather.current.temp_f) + "&deg;");
  let windDiv = createDiv("WIND " + windmag + " <small>MPH</small>");
  wind = p5.Vector.fromAngle(angle);
}

class Arrow {
  constructor(x, y) {
    this.position = new p5.Vector(x, y);
    this.magnification = 3;
  }

  show() {
    push();
    translate(width * 0.5, height * 0.5);
    scale(this.magnification);
    rotate(wind.heading() + PI / 2);

    noStroke();
    fill(255);
    ellipse(0, 0, 48, 48);

    stroke(45, 123, 182);
    strokeWeight(3);
    line(0, -10, 0, 16);

    noStroke();
    fill(45, 123, 182);
    triangle(0, -18, -6, -10, 6, -10);
    pop();
  }
}

class Thing {
  constructor(x, y) {
    this.position = new p5.Vector(x, y);
    this.velocity = new p5.Vector();
    this.acceleration = new p5.Vector();
    this.size = 10;
  }

  run(force) {
    this.applyForce(force);
    this.update();
    this.show();
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    stroke(0);
    fill(0);
    scale(0.5)
    rotate(wind.heading() + PI / 2 + random(radians(-2), radians(2)) + this.velocity.heading());
    triangle(0, -15, -3, -5, 3, -5);
    pop();
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.edges();
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
    this.velocity.add(p5.Vector.random2D());
    this.velocity.limit(random(3, 5));
  }

  edges() {
    if (this.position.x < -this.size * 2) {
      this.position.x = width + this.size;
    }

    if (this.position.x > width + this.size * 2) {
      this.position.x = -this.size;
    }

    if (this.position.y < -this.size * 2) {
      this.position.y = height + this.size;
    }

    if (this.position.y > height + this.size * 2) {
      this.position.y = -this.size;
    }
  }
}

function windowResized() {
  createCanvas(windowWidth, windowHeight);
  url = `https://api.apixu.com/v1/current.json?key=e93aa386630f4eb4ae3173139181803&q=${
    loc.latitude
  },${loc.longitude}`;
  loadJSON(url, gotWeather);

  for (var i = 0; i < width; i += width / 20) {
    for (var j = 0; j < height; j += height / 20) {
      things.push(
        new Thing(
          randomGaussian(width * 0.5, 150),
          randomGaussian(height * 0.5, 150)
        )
      );
    }
  }

  wind = createVector();

  arrow = new Arrow();
}
