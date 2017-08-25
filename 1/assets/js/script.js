var particles = [];
var smallCircles = [];
var data = {
  nsmall: 13,
  diasmall: 30,
  speed: 200,
  clockwise: true,
  alternatepaths: false,
  showline: true,
  diabig: 300,
  showbigcircle: true,
  showsmallcircle: true
}
var bigCircle;
var controlkit;

function CircularThing(cx, cy, r, angle = 0, phi = 0) {
  this.cx = cx;
  this.cy = cy;
  this.r = r;
  this.phi = phi;
  this.x;
  this.y;
  this.theta = 0;
  this.show = function() {
    stroke(0);
    noFill();
    strokeWeight(1);
    ellipse(this.cx, this.cy, this.r, this.r);
    this.x = this.cx + (this.r * Math.cos(this.theta + this.phi));
    this.y = this.cy + (this.r * Math.sin(this.theta));
  }
  this.incrementTheta = function() {
    this.theta += angle;
    this.x = this.cx + (this.r * Math.cos(this.theta + this.phi));
    this.y = this.cy + (this.r * Math.sin(this.theta + this.phi));
  }
}

function PointOnCircle(cx, cy, r, clockwise = true, phi = 0) {
  this.r = r;
  this.cx = cx;
  this.cy = cy;
  this.x;
  this.y;
  this.speed = map(data.speed, 0, 200, 0, 0.1);
  this.theta = 0;
  this.phi = phi;

  this.show = function() {
    stroke(0);
    strokeWeight(1);
    point(this.x, this.y);
  }
  this.update = function() {
    this.x = this.cx + (this.r * Math.cos(this.theta + this.phi));
    this.y = this.cy + (this.r * Math.sin(this.theta + this.phi));
    if (clockwise) {
      this.theta += this.speed;
    } else {
      this.theta -= this.speed;
    }
  }

}

function createCircles() {
  // var diasmall = (windowWidth < 360) ? windowHeight/15 : windowWidth/15;
  // bigCircle = (windowWidth < 360) ? new CircularThing(0, 0, windowHeight / 2, 2 * PI / data.nsmall) : bigCircle = new CircularThing(0, 0, windowWidth / 3, 2 * PI / data.nsmall);
  bigCircle = new CircularThing(0, 0, data.diabig, 2 * PI / data.nsmall);

  bigCircle.theta = 2 * PI / data.nsmall;
  smallCircles = [];
  particles = [];
  for (var i = 0; i < data.nsmall; i += 1) {
    bigCircle.incrementTheta();
    smallCircles[i] = new CircularThing(bigCircle.x / 2, bigCircle.y / 2, data.diasmall);
    particles[i] = new PointOnCircle(smallCircles[i].cx, smallCircles[i].cy, data.diasmall / 2, data.clockwise, i);
    if (data.alternatepaths) {
      //execute this line of code
      //  Uncomment this for a weirder pen
      if (i % 2 == 0) {
        particles[i].speed *= -1;
      }
    }
    console.log(bigCircle.theta);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  controlkit = new ControlKit();

  controlkit.addPanel({
      label: 'Control Panel',
      width: 300,
      fixed: false
    })
    .addNumberInput(data, 'nsmall', {
      label: 'Small Circles ',
      onChange: function() {
        createCircles();
      }
    })
    .addNumberInput(data, 'diasmall', {
      label: 'Radius (small) ',
      onChange: function() {
        createCircles();
      }
    })
    .addNumberInput(data, 'diabig', {
      label: 'Radius (Big) ',
      onChange: function() {
        createCircles();
      }
    })
    .addNumberInput(data, 'speed', {
      label: 'Speed',
      onChange: function() {
        createCircles();
      }
    })
    .addCheckbox(data, 'clockwise', {
      label: 'Clockwise?',
      onChange: function() {
        createCircles();
      }
    })
    .addCheckbox(data, 'alternatepaths', {
      label: 'Alternate Spin?',
      onChange: function() {
        createCircles();
      }
    })
    .addCheckbox(data, 'showline', {
      label: 'Show lines?',
      onChange: function() {
        createCircles();
      }
    })
    .addCheckbox(data, 'showbigcircle', {
      label: 'Show Big Circle?',
      onChange: function() {
        createCircles();
      }
    })
    .addCheckbox(data, 'showsmallcircle', {
      label: 'Show Small Circles?',
      onChange: function() {
        createCircles();
      }
    })

  createCircles();
}

function draw() {
  background(255);
  translate(windowWidth / 2, windowHeight / 2);
  // Axes
  // stroke(0);
  // strokeWeight(1);
  // line(0, -windowHeight / 2, 0, windowHeight / 2);
  // strokeWeight(1);
  // line(-windowWidth / 2, 0, windowWidth / 2, 0);
  if (data.showbigcircle) {

    bigCircle.show();
  }
  strokeWeight(1);
  if (data.showsmallcircle) {
    for (var i = 0; i < smallCircles.length; i += 1) {
      smallCircles[i].show();
    }
  }
  for (var i = 0; i < smallCircles.length; i += 1) {
    particles[i].show();
    particles[i].update();
  }
  for (var i = 0; i < particles.length; i += 1) {
    for (var j = 0; j < particles.length; j += 1) {
      if (i != j && i > j) {
        strokeWeight(1);
        if (data.showline) {
          //execute this line of code
          line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
        }
        // particles[i].phi += 0.01;

      }
    }
  }
  strokeWeight(10);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}