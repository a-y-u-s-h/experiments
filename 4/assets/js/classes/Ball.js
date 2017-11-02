/**
 * Class : Ball
 *
 * Arguments : 
 *     1. x : number :  If nothing is passed, a random value between 0 and window.innerWidth
 *     2. y : number : If nothing is passed, a random value between 0 and innerHeight
 *     3. r : number : If nothing is passed, 10 
 *
 * Fields :
 *     1. position : array : [x, y]
 *     2. velocity : array : [0, 0] (default)
 *     3. acceleration : array : [0, 1] (default)
 *     4. r : number : mapped r (from arguments)
 *
 * Methods :
 *     1. display : displays the ball
 *     2. move : moves the ball
 */
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
