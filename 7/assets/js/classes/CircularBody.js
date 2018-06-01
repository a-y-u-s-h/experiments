/**
 * Class : CircularBody
 *
 * Arguments : 
 *    1. cx : number : Abscissa of center of the body
 *    2. cy : number : Ordinate of center of the body
 *    3. spacing_factor_a : number : In a way will determine the 'a' of the elliptical orbit.
 *    4. spacing_factor_b : number : In a way will determine the 'b' of the elliptical orbit.
 *    5. speed_factor : number : Determines speed at which body on the orbit rotates.
 *
 * Fields : 
 *     1. cx : number : intially stores argument 'cx' : abscissa of center of orbit
 *     2. cy : number : intially stores argument 'cy' : ordinate of center of orbit
 *     3. ia : number : intially stores argument (spacing_factor / 2) : factor to determine 'a' of elliptical orbit
 *     4. ib : number : intially stores argument (spacing_factor / 2) : factor to determine 'b' of elliptical orbit
 *     5. ra : number : intially stores (this.ia * data.a_spacing) : radius 'a'
 *     6. rb : number : intially stores argument (this.ib * data.b_spacing) : radius 'b'
 *     7. r : number : initially stores argument (this.ia * data.common_spacing) : radius when 'a' == 'b'
 *     8. theta  : number : intially stores '0' : to determine position of point/body on the orbit
 *     9. p_speed_factor : number : intially stores argument 'speed_factor' :  speed of point/body
 *     10. px : number : stores current abscissa of point. 
 *     11. py : number : stores current ordinate of point.
 *
 * Methods : 
 *     1. show : Displays the orbit
 *     2. pShow : Displays the point / body.
 *     3. pUpdate : Updates the position of point / body.
 */

class CircularBody {
    constructor(cx, cy, spacing_factor_a, spacing_factor_b, speed_factor) {
        this.cx = cx;
        this.cy = cy;
        this.ia = spacing_factor_a / 2;
        this.ib = spacing_factor_b / 2;
        this.ra = this.ia * data.a_spacing;
        this.rb = this.ib * data.b_spacing;
        this.r = this.ia * data.common_spacing;
        this.theta = 0;
        this.p_speed_factor = speed_factor;
        this.px = this.ra * Math.cos(this.theta);
        this.py = this.rb * Math.sin(this.theta);
    }

    show() {
        push();
        stroke(data.orbit_color);
        strokeWeight(data.orbit_stroke_weight);
        noFill();
        if (data.a_spacing == data.b_spacing) {
            this.r = this.ia * data.common_spacing;
            ellipse(this.cx, this.cy, this.r * 2, this.r * 2);
        } else {
            this.ra = this.ia * data.a_spacing;
            this.rb = this.ib * data.b_spacing;
            ellipse(this.cx, this.cy, this.ra * 2, this.rb * 2);
        }
        pop();
    }

    pShow() {
        push();
        translate(this.cx, this.cy);
        stroke(data.points.stroke);
        strokeWeight(data.points.stroke_weight);

        if (data.a_spacing !== data.b_spacing) {
            this.ra = this.ia * data.a_spacing;
            this.rb = this.ib * data.b_spacing;
            this.px = this.ra * Math.cos(this.theta);
            this.py = this.rb * Math.sin(this.theta);
        } else {
            this.r = this.ia * data.common_spacing;
            this.px = this.r * Math.cos(this.theta);
            this.py = this.r * Math.sin(this.theta);
        }
        ellipseMode(CENTER);
        fill(data.points.color);
        ellipse(this.px, this.py, data.points.radius, data.points.radius);
        pop();
    }

    pUpdate() {
        this.theta = lerp(
            this.theta,
            this.theta + 1,
            this.p_speed_factor * data.speed
        );
    }
}
