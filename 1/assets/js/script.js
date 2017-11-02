/**
 * Experiment 1 : Illusion with Circles #1
 *
 * Description : 
 *
 * There's a big circle whose radius can be controlled, 
 * on it there are small circles equally distributed whose numbers and radii can be controlled as well. 
 * Points are rotating on each of those small circles and are connected by lines creating illusion of 3D at default parameters that I chose.
 */

var particles = []; // Will store array of PointsOnCircle object instances.
var smallCircles = []; // Will store array of CircularThing object instances : specifically speaking :- Smaller Circles.
var bigCircle; // Variable to store Big Circle

var data = {
  nsmall: 13, // Number of Small Circles = Number of Points on those Small Circles.
  diasmall: 30, // Diameter of Small Circles
  diabig: 300, // DIameter of Big Circle
  speed: 200, // Speed at which Points on Small Circles are rotating.
  alternatepaths: false, // False if all Points rotate either clockwise or anticlockwise
  clockwise: true, // True if Points rotate clockwise
  showline: true, // True will display Lines
  showbigcircle: true, // True will display Big Circle
  showsmallcircle: true // True will display Small Circles
};

var controlkit; // Variable to store ControlKit
function createControlKit() {
  controlkit = new ControlKit();

  controlkit
    .addPanel({
      label: "Control Panel",
      width: 300,
      fixed: false
    })
    .addNumberInput(data, "nsmall", {
      label: "Small Circles ",
      onChange: function() {
        createCircles();
      }
    })
    .addNumberInput(data, "diasmall", {
      label: "Radius (small) ",
      onChange: function() {
        createCircles();
      }
    })
    .addNumberInput(data, "diabig", {
      label: "Radius (Big) ",
      onChange: function() {
        createCircles();
      }
    })
    .addNumberInput(data, "speed", {
      label: "Speed",
      onChange: function() {
        createCircles();
      }
    })
    .addCheckbox(data, "clockwise", {
      label: "Clockwise?",
      onChange: function() {
        createCircles();
      }
    })
    .addCheckbox(data, "alternatepaths", {
      label: "Alternate Spin?",
      onChange: function() {
        createCircles();
      }
    })
    .addCheckbox(data, "showline", {
      label: "Show lines?",
      onChange: function() {
        createCircles();
      }
    })
    .addCheckbox(data, "showbigcircle", {
      label: "Show Big Circle?",
      onChange: function() {
        createCircles();
      }
    })
    .addCheckbox(data, "showsmallcircle", {
      label: "Show Small Circles?",
      onChange: function() {
        createCircles();
      }
    });
}



function createCircles() {
  /* 
    passed arguments to big circle : cx, cy, r, angle, phi = 0
    Notice that we are passing it (0, 0) to be the center, reason being, we'll shift everything to center of screen later in draw.
  */
  bigCircle = new CircularThing(0, 0, data.diabig, 2 * PI / data.nsmall);
  bigCircle.theta = 2 * PI / data.nsmall;
  /*
    Since you can't create private fields in JS, it makes sense to just update them when you want without creating setter method, no?
    Here we created a big circle, now we're setting its theta value to be controlled by our GUI.
    When number of small circles = 10, theta will be 2*PI/10. We'll put a small circle on that coordinate
    Then we'll update our theta, and update (x, y) of an arbitrary point on our bigCircle, and then put another small circle.
    In the process creating what we desire => Small circles on big circle.
  */
  smallCircles = [];
  particles = [];

  for (var i = 0; i < data.nsmall; i += 1) {
    bigCircle.incrementTheta();
    smallCircles[i] = new CircularThing(
      bigCircle.x / 2,
      bigCircle.y / 2,
      data.diasmall
    );
    /*
    Just exactly how we put Small Circles on Big Circle, I'll put points on Small Circles.
    */
    particles[i] = new PointOnCircle(
      smallCircles[i].cx,
      smallCircles[i].cy,
      data.diasmall / 2,
      data.clockwise,
      i
    );
    // Logic to handle when alternatepaths field is changed in our data object.
    if (data.alternatepaths) {
      if (i % 2 == 0) {
        particles[i].speed *= -1;
      }
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  createControlKit();
  createCircles();
}

function draw() {
  background(255);

  // Shifting origin to center of screen as promised.
  translate(windowWidth / 2, windowHeight / 2);

  // Showing everything.
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
  // Creating lines between circles when required
  for (var i = 0; i < particles.length; i += 1) {
    for (var j = 0; j < particles.length; j += 1) {
      if (i != j && i > j) {
        strokeWeight(1);
        if (data.showline) {
          line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
        }
      }
    }
  }
  strokeWeight(10);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
