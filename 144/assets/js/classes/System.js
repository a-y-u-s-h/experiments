class System {
  constructor() {
    // this.left_paddle = new Paddle("left");
    // this.right_paddle = new Paddle("right");
    this.ground = new Ground(width * 0.5, height * 0.5, this.left_paddle);
    this.ball = new Ball(width * 0.5, height * 0.5);
  }

  run() {
    this.edges();
    // this.strike();
    this.ground.show();
    // this.left_paddle.run();
    // this.right_paddle.run();
    this.ball.run();
  }

  strike() {
    if (this.left_paddle && this.right_paddle) {
      if (
        this.ball.position.x + data.ball.outer.radius >
          this.right_paddle.position.x ||
        (this.ball.position.x - data.ball.outer.radius >
          this.right_paddle.position.x &&
          this.ball.position.y <
            this.right_paddle.position.y + this.right_paddle.h * 0.5 &&
          this.ball.position.y >
            this.right_paddle.position.y - this.right_paddle.h * 0.5)
      ) {
        this.ball.velocity.x *= -1;
      }

      if (
        this.ball.position.y + data.ball.outer.radius ==
          this.right_paddle.position.y ||
        (this.ball.position.y - data.ball.outer.radius ==
          this.right_paddle.position.y &&
          this.ball.position.x <
            this.right_paddle.position.x + this.right_paddle.w * 0.5 &&
          this.ball.position.x >
            this.right_paddle.position.x - this.right_paddle.w * 0.5)
      ) {
        this.ball.velocity.y *= -1;
      }
    }
  }

  edges() {
    if (
      this.ball.position.x + data.ball.outer.radius * 0.2 > width * 0.93 ||
      this.ball.position.x - data.ball.outer.radius * 0.2 < width * 0.07
    ) {
      this.ball.velocity.x *= -1;
    }

    if (
      this.ball.position.y + data.ball.outer.radius * 0.5 > height * 0.93 ||
      this.ball.position.y - data.ball.outer.radius * 0.5 < height * 0.07
    ) {
      this.ball.velocity.y *= -1;
    }
  }
}
