/**
 * Class : CircularThing
 *
 * Arguments : 
 *     1. cx : number : Abscissa of its center
 *     2. cy : number : Ordinate of its center
 *     3. r : number : Radius
 *     4. angle : number : defaults to zero : to increase theta (field) by 'angle' amount.
 *     5. phi : number : defaults to zero : phase difference
 *
 * Fields : 
 *     1. cx : number : stores argument cx
 *     2. cy : number : stores argument cy
 *     3. r : number : stores argument r
 *     4. phi : number : stores argument phi
 *     5. x : number : abscissa of an arbitrary point on circle
 *     6. y : number : ordinate of an arbitrary point on circle
 *     7. theta : number : theta to describe position of point on the circle
 *     8. angle : number : amount by which theta increases when 'incrememntTheta' method is called.
 *
 * Methods :
 *     1. show : to display the circular thing
 *     2. incrementTheta : whenever called, it'll increment theta (which describes an arbitrary point on circle)
 */

class CircularThing {
  constructor(cx, cy, r, angle = 0, phi = 0) {
    this.cx = cx;
    this.cy = cy;
    this.r = r;
    this.phi = phi;
    this.x;
    this.y;
    this.theta = 0;
    this.angle = angle;
  }

  show() {
    stroke(0);
    noFill();
    strokeWeight(1);

    // Drawing out a circle with (cx, cy) as its center and r as its radius.
    ellipse(this.cx, this.cy, this.r, this.r);

    // Setting up coordinates of arbitrary point on this circle, with theta = 0 initially;
    this.x = this.cx + this.r * Math.cos(this.theta + this.phi);
    this.y = this.cy + this.r * Math.sin(this.theta);
  }

  incrementTheta() {

    // Increasing theta by 'angle' amount, which is by default = 0.
    this.theta += this.angle;
    
    // Updating x and y fields so that they can be used somewhere.
    this.x = this.cx + this.r * Math.cos(this.theta + this.phi);
    this.y = this.cy + this.r * Math.sin(this.theta + this.phi);
  }
}
