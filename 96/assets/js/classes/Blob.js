/*
    Author : Ayush Sharma
    a-y-u-s-h.github.io
 */

class Blob {
    constructor(cx, cy) {
        this.position = new p5.Vector(cx, cy);
        this.velocity = p5.Vector.random2D();
        this.r = random(200, 400);
    }

    show() {
        push();
        translate(this.position.x, this.position.y);
        ellipse(0, 0, this.r * 2, this.r * 2);
        pop();
    }

    update() {
        this.position.add(this.velocity);

        if (this.position.x > width || this.position.x < 0) {
            this.velocity.x *= -1;
        }

        if (this.position.y > height || this.position.y < 0) {
            this.velocity.y *= -1;
        }
    }
}
