/**
 * Class : PointOnCircle
 *
 * Arguments : 
 *     1. cx : number : Abscissa of center of circle where this point lies.
 *     2. cy : number : Ordinate of center of circle where this point lies.
 *     3. r : number : Radius of circle where this point lies.
 *     4. clockwise : boolean :  true by default : set to false if you want to rotate this point in anti-clockwise direction.
 *     5. phi : number : default to zero : give this a value if you want to start with an initial phase difference.
 *
 * Fields : 
 *     1. cx : number : stores argument 'cx'.
 *     2. cy : number : stores argument 'cy'.
 *     3. r : number : stores argument 'r'.
 *     4. x : number : stores abscissa of point on the circle.
 *     5. y : number : stores ordinate of point on the circle.
 *     6. speed : number : stores mapped speed from data of this experiment.
 *     7. theta : number : intially 0 :  required to describe position of this point.
 *     8. phi : number : stores argument 'phi'.
 *     9. clockwise : stores argument 'clockwise'.
 *
 * Methods :
 *     1. show : displays the point.
 *     2. update : updates the point.
 */
class PointOnCircle {
  constructor(cx, cy, r, clockwise = true, phi = 0) {
    this.cx = cx;
    this.cy = cy;
    this.r = r;
    this.x;
    this.y;
    this.speed = map(data.speed, 0, 200, 0, 0.1);
    this.theta = 0;
    this.phi = phi;
    this.clockwise = clockwise;
  }

  show() {
    stroke(0);
    strokeWeight(1);
    this.x = this.cx + this.r * Math.cos(this.theta + this.phi);
    this.y = this.cy + this.r * Math.sin(this.theta + this.phi);
    point(this.x, this.y);
  }

  update() {
    this.x = this.cx + this.r * Math.cos(this.theta + this.phi);
    this.y = this.cy + this.r * Math.sin(this.theta + this.phi);
    if (this.clockwise) {
      this.theta += this.speed;
    } else {
      this.theta -= this.speed;
    }
  }
}
