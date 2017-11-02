/**
 * Class : TrailPoint : Instances of this class should be stored in an array and removed appropriately.
 *
 * Arguments : 
 *     1. x : abscissa at which this point should be created
 *     2. y : ordinate at which this point should be created
 *     3. color : color of this point
 *
 * Fields :
 *     1. x : contains argument x
 *     2. y : contains argument y
 *     3. color : contains argument color
 *     
 * Methods : 
 *     1. show : displays the point
 */
class TrailPoint {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    show(other = null) {
        // If no object is passed, create a point, basically.
        // Otherwise create a line between this object and this other object.
        if (other !== null) {
            stroke(this.color);
            strokeWeight(1);
            line(this.x, this.y, other.x, other.y);
        } else {
            line(this.x, this.y, this.x, this.y);
        }
    }
}
