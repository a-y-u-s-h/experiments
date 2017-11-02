/**
 * Class : Square
 *
 * Arguments : 
 *     1. cx : number :  Abscissa of Center of the square.
 *     2. cy : number : Ordinate of Center of square.
 *     3. size : number : width and height of square
 *     4. i_factor : number : a multiplier to create different changes in arrays and other places.
 *
 * Fields : 
 *     1. revCx : number : intially stores ( width / 2) :  Abscissa of center of revolution of Square
 *     2. revCy : number : intially stores (height / 2) :  Ordinate of center of revolution of Square
 *     3. cx : number : intially stores (argument : cx) :  Abscissa of Center of the square.
 *     4. cy : number : intially stores (argument : cy) :  Ordinate of Center of square.
 *     5. size : number : intially stores (argument : size) :  width and height of square
 *     6. rotation : number : intially stores (0) :  State to store rotation angle of square at each frame.
 *     7. revolution : number : intially stores (0) :  state to store angle for revolution.
 *     8. i_factor : number : intially stores (argument : i_factor) :  a multiplier to create different changes in arrays and other places.
 *     9. position : number : intially stores (2 * i_factor * Math.PI / data.n) :  angle at which square will be generated w.r.t revolution center.
 *     10. phi : number : intially stores (2 * i_factor * Math.PI / data.n) :  phase difference.
 *
 * Methods :
 *     1. show : displays the square.
 *     2. update : updates few fields.
 *     3. rotate : rotates the square around its own z-axis.
 *     4. revolve : makes it revolve around revolution center.
 */
class Square {
    constructor(cx, cy, size, i_factor) {
        this.revCx = width / 2;
        this.revCy = height / 2;
        this.cx = cx;
        this.cy = cy;
        this.size = size;
        this.rotation = 0;
        this.revolution = 0;
        this.i_factor = i_factor;
        this.position = 2 * i_factor * Math.PI / data.n;
        this.phi = 2 * i_factor * Math.PI / data.n;
    }

    show() {
        push();
        translate(this.cx, this.cy);
        rectMode(CENTER);
        angleMode(DEGREES);
        rotate(this.rotation);
        stroke(data.square.stroke);
        strokeWeight(data.square.stroke_weight);
        fill(data.square.fill);
        rect(0, 0, this.size, this.size);
        pop();
    }

    update() {
        this.size = data.square.size;
        this.phi = this.position * data.movement.separation;
    }

    rotate() {
        this.rotation = lerp(
            this.rotation,
            this.rotation + 1,
            data.square.rotation_speed
        );
    }

    revolve() {
        angleMode(DEGREES);
        this.cx =
            this.revCx +
            data.movement.radius *
                cos(
                    degrees(this.revolution) +
                        degrees(this.phi) +
                        degrees(this.position)
                );
        this.cy =
            this.revCy +
            data.movement.radius *
                sin(
                    degrees(this.revolution) +
                        degrees(this.phi) +
                        degrees(this.position)
                );
        this.revolution = lerp(
            this.revolution,
            this.revolution + 1,
            map(data.movement.revolution_speed, 0, 100, 0, 1)
        );
    }
}