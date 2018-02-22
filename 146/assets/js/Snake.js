class Snake {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.limitX = (Math.floor(width / data.snake.size) - 1) * data.snake.size;
    this.limitY = (Math.floor(height / data.snake.size) - 1) * data.snake.size;
    this.vx = data.snake.size;
    this.vy = 0;
    this.size = data.snake.size;
    this.cx = Math.floor(this.x + this.size * 0.5);
    this.cy = Math.floor(this.y + this.size * 0.5);
    this.length = 1;
    this.trail = [];
  }

  update() {
    this.size = data.snake.size;
    this.limitX = (Math.floor(width / data.snake.size) - 1) * data.snake.size;
    this.limitY = (Math.floor(height / data.snake.size) - 1) * data.snake.size;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x > this.limitX && this.vx > 0) {
      this.x = 0;
    }
    if (this.x < 0 && this.vx < 0) {
      this.x = this.limitX;
    }
    if (this.y > this.limitY && this.vy > 0) {
      this.y = 0;
    }
    if (this.y < 0 && this.vy < 0) {
      this.y = this.limitY;
    }
  }

  show() {
    push();
    fill(data.snake.fill);
    stroke(data.snake.stroke.color);
    strokeWeight(data.snake.stroke.weight);
    rectMode(CENTER);
    rect(this.cx, this.cy, this.size, this.size);

    for (var i = 1, upperLimit_i = this.length; i <= upperLimit_i; i += 1) {
      rect(this.cx, this.cy, this.size, this.size);
    }
    pop();
    // Required after showing.
    this.cx = Math.floor(this.x + this.size * 0.5);
    this.cy = Math.floor(this.y + this.size * 0.5);
  }

  dir(x, y) {
    this.vx = x * data.snake.size;
    this.vy = y * data.snake.size;
  }

  eats(food) {
    this.length += food.score;
  }
}
