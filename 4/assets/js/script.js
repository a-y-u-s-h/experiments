// Data
var data = {
    radius: 10,
    limit: 500
};

// This array will contain all our balls
var balls = [];

// This ball class will create balls with interesting behavior whenever mouse is clicked and dragged.
// Arguments : x coordinate, y coordinate, radius
class Ball {
    constructor(
        x = random(0, window.innerWidth),
        y = random(0, window.innerHeight),
        r = 10
    ) {
        this.position = [x, y];
        this.velocity = [0, 0];
        this.acceleration = [0, 1];
        this.r = map(r, 0, window.innerWidth + window.innerHeight, 1, 100);
    }

    display() {
        strokeWeight(1);
        stroke(200);
        fill(50);
        ellipse(this.position[0], this.position[1], this.r, this.r);
    }

    move() {
        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];
        this.velocity[0] += this.acceleration[0];
        this.velocity[1] += this.acceleration[1];
        if (this.position[0] >= width - 0 || this.position[0] <= 0) {
            this.velocity[0] *= -1;
        }
        if (this.position[1] >= height || this.position[1] <= 0) {
            this.velocity[1] = -1 * this.velocity[1];
        }
    }
}

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
