/**
 * Experiment 4 : Bouncing Balls
 *
 * Description : 
 *
 * This is one of my very first object oriented and artistic projects. 
 * It blew my mind when I first made it. There is a class : Ball, 
 * and then I'm pushing object instances of it in an array whenever a click & drag event is recorded 
 * and then I'm displaying and moving all of those Balls according to real life physics turned into code.
 *
 * Remarks : 
 *
 * There's just one thing odd about it, but I don't really wanna change it and that is : 
 * Ball's energy increases after every collision with the ground.
 */


// Data
var data = {
    radius: 10,
    limit: 500
};

// This array will contain all our balls
var balls = [];

// Function runs when document loads, just one time.
function setup() {
    createCanvas(windowWidth, windowHeight);
}

// Function loops at 60FPS
function draw() {
    background(0);
    for (var i = 0; i < balls.length; i += 1) {
        balls[i].display();
        balls[i].move();
        if (balls.length > data.limit) {
            balls.splice(0, 1);
        }
    }
}

function mouseDragged() {
    balls.push(new Ball(mouseX, mouseY, data.radius));
}
