class Game {
  constructor(ground, ball, paddles) {
    this.ground = ground;
    this.ball = ball;
    this.paddles = paddles;
    this.boundaries = {
      left: {
        x1: this.cx - this.paddles.left.w,
        x2: this.cx - this.w * 0.5 + this.paddles.left.w,
        y1: this.cx + this.h * 0.5 + this.paddles.left.h,
        y2: this.cy - this.h * 0.5 + this.paddles.left.h
      },
      right: {
        x1: this.cx + this.paddles.right.w,
        x2: this.cx + this.w * 0.5 + this.paddles.right.w,
        y1: this.cy + this.h * 0.5 + this.paddles.right.h,
        y2: this.cy - this.h * 0.5 + this.paddles.right.h
      }
    };
  }
}
