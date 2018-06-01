/**
 * Class : SHMPoint
 *
 * Arguments : 
 *     1. axis : string : either "X" or "Y"
 *
 * Fields : 
 *     1. axis : string : contains the argument axis
 *     2. x : number : default to 0, stores x position of point
 *     3. y : number : default to 0, stores y position of point
 *     4. theta : number : default to 0, stores theta for SHM
 *     5. phi : number : default to 0, stores phase for SHM
 *     6. amplitude : number : default to 0, stores amplitude of SHM
 *     7. speed : number : default to 0, stores speed of SHM
 *
 * Methods : 
 *     1. show : shows the point
 *     2. update : updates states
 */
class SHMPoint {
    constructor(axis) {
        this.axis = axis;
        this.x = 0;
        this.y = 0;
        this.theta = 0;
        this.phi = 0;
        this.amplitude = 0;
        this.speed = 0;
    }

    show() {
        // Create a point at origin
        strokeWeight(1);
        point(this.x, this.y);
        strokeWeight(1);
        // If axis provided is Y, then it'll perform SHM on Y axis. Main thing happens in update method.
        if (this.axis == "Y") {
            this.y =
                this.amplitude *
                Math.sin(degrees(this.theta) + degrees(this.phi));
            this.phi = data.phi.yp;
        }
        // If axis provided is X, then it'll perform SHM on X axis. Main thing happens in update method.
        if (this.axis == "X") {
            this.x =
                this.amplitude *
                Math.sin(degrees(this.theta) + degrees(this.phi));
            this.phi = data.phi.xp;
        }
    }

    update() {
        //  Y = A * sin(wt + phi);
        if (this.axis == "Y") {
            this.amplitude = data.amplitude.yp;
            this.speed = data.speed.yp;
            this.theta = lerp(this.theta, this.theta + this.speed, 0.1);
            this.y = this.amplitude * Math.sin(this.theta + this.phi);
        }
        // X = A * sin(wt + phi);
        if (this.axis == "X") {
            this.amplitude = data.amplitude.xp;
            this.speed = data.speed.xp;
            this.theta = lerp(this.theta, this.theta + this.speed, 0.1);
            this.x = this.amplitude * Math.sin(this.theta + this.phi);
        }
    }
}