/**
 * Class : Star
 * 
 * Arguments : (none)
 *  
 * Fields : 
 *      1. x : number : current value of x coordinate of star object instance
 *      2. y : number : current value of y coordinate of star object instance
 *      3. z : number : current value of z coordinate of star object instance
 *      4. pz : previous value of z coordinate of star object instance (before next .update() is called)
 *
 * Methods : 
 *     1. show : Shows star
 *     2. update : Updates its position
 */

class Star {
  constructor() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    this.pz = this.z;
  }

  show() {
    fill(255);
    noStroke();

    /*
      Instead of updating x and y, we'll update our z field.
      It's not really our z coordinate.
      z will decrease from some value (max : 'width' value ) to <=1
      x and y will increase from their positions to outside the canvas as z <= 1
      if z is less than one, x and y will reach their approx max, taking line / star outside the canvas.
      we'll then update our z back to some random number from 0 to width.
    */
    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);

    // Uncomment below lines if you want circles instead of lines
    // let r = map(this.z, 0, width, data.r, 0);
    // ellipse(sx, sy, r, r);

    /*
      px and py will store previous values of x and y;
      previous value of z is pz for now (at least before we make this.pz and this.z equal just below declaring px and py)
    */
    let px = map(this.x / this.pz, 0, 1, 0, width);
    let py = map(this.y / this.pz, 0, 1, 0, height);
    /*
      Now, we set pz to be current value of z, after this when update is called, pz will again become previous value
      ..till our control flow reaches this statement.
    */
    this.pz = this.z;
    strokeWeight(1);
    stroke(255);
    line(px, py, sx, sy);
  }

  update() {
    /*
      this.z decreases by some pixel value everytime update is called in draw.
      as a result it'll some day become less than 1.
      When that happens, our Star will go outside the canvas.
      We want our star back with its position and stuff reinitialized. Hence...
    */
    this.z = this.z - data.speed;
    if (this.z < 1) {
      this.z = width;
      this.pz = this.z;
      this.x = random(-width, width);
      this.y = random(-height, height);
    }
  }
}
