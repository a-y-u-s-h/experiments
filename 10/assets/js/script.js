/**
 * Experiment 10 : Particles : Cloud-ish Effect
 *
 * Description : 
 *     It's a simple experiment with no controls. 
 *     User clicks and drags the mouse, points (..actually tiny ellipses/circles) near mouse expand creating a cloud-like effect. 
 *     Would serve better as some webpage's background, 
 *     it seems there may be a little demand for these kind of things on college fest websites or on maybe any other flashy website.
 *
 * Remarks :
 *     I once saw something like this around 9 months ago and thought to myself: 
 *     "Man, it'll take me years to make something like this" ..and now today I built this without much effort. Feels nice.
 */

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
