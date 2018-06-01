let data = {
    sketch: {
        background: "#000000",
        gravity: null
    },
    fireworks: {
        n: 10,
        explosion_n: 150,
        color_mode: 255
    }
};

class Particle {
    constructor(x, y, color = "#FFFFFF", exploded = false) {
        this.pos = createVector(x, y);
        this.accn = createVector(0, 0);
        this.exploded = exploded;

        if (!this.exploded) {
            this.vel = createVector(0, -random(12, 17));
        } else {
            this.vel = p5.Vector.random2D();
            this.vel.mult(random(1, 6));
        }
        this.color = color;
        this.lifespan = 255;
    }

    applyForce(force) {
        this.accn.add(force);
    }

    update() {
        if (this.exploded) {
            this.vel.mult(random(0.97, 1));
            if (this.lifespan >= 0) {
                this.lifespan -= 2;
            }
        }
        this.vel.add(this.accn);
        this.pos.add(this.vel);
        this.accn.mult(0);
    }

    show() {
        stroke(this.color, this.lifespan);
        if (this.exploded) {
            push();
            strokeWeight(1);
            point(this.pos.x, this.pos.y);
            pop();
        } else {
            push();
            strokeWeight(3);
            point(this.pos.x, this.pos.y);
            pop();
        }
    }

    done() {
        if (this.lifespan < 0) {
            return true;
        } else {
            return false;
        }
    }
}

class Firework {
    constructor() {
        this.color = color(random(255), random(255), random(255));
        this.firework = new Particle(random(width), height, this.color);
        this.exploded = false;
        this.particles = [];
    }

    update() {
        if (!this.exploded) {
            this.firework.applyForce(data.sketch.gravity);
            this.firework.update();

            if (this.firework.vel.y >= 0) {
                this.exploded = true;
                this.explode();
            }
        }
    }

    explode() {
        for (
            var i = 0, upperLimit_i = data.fireworks.explosion_n;
            i < upperLimit_i;
            i += 1
        ) {
            this.particles.push(
                new Particle(
                    this.firework.pos.x,
                    this.firework.pos.y,
                    this.color,
                    this.exploded
                )
            );
        }
    }

    show() {
        if (!this.exploded) {
            this.firework.show();
        } else {
            for (
                var i = 0, upperLimit_i = data.fireworks.explosion_n;
                i < upperLimit_i;
                i += 1
            ) {
                if (this.particles[i]) {
                    if (this.particles[i].done()) {
                        this.particles.splice(i, 1);
                    } else {
                        this.particles[i].applyForce(data.sketch.gravity);
                        this.particles[i].update();
                        this.particles[i].show();
                    }
                }
            }
        }
    }
}

let fireworks = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    data.sketch.gravity = createVector(0, 0.2);
    background(0);
}

function draw() {
    background(0, 150);
    if (random(1) < 0.1) {
        fireworks.push(new Firework());
    }
    for (var i = 0, upperLimit_i = fireworks.length; i < upperLimit_i; i += 1) {
        fireworks[i].update();
        fireworks[i].show();
    }

    if (fireworks.length > 30) {
        fireworks.splice(0, 1);
    }
}
