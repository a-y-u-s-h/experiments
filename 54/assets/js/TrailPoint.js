/*
    This class creates an object with x,y as coordinates and color as ..color.
    It has a method = show, which has an optional 'other' argument, which should be another TrailPoint object.
*/
class TrailPoint {
    constructor(x, y, z, color) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.color = color;
    }

    show(other = null) {
        // If no object is passed, create a point, basically.
        // Otherwise create a line between this object and this other object.
        if (other !== null) {
            stroke(this.color);
            strokeWeight(1);
            line(this.x, this.y, this.z, other.x, other.y, other.z);
        } else {
            line(this.x, this.y, this.z, this.x, this.y, this.z);
        }
    }
}
