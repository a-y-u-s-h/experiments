class Food {
  constructor(snake, grid) {
    this.snake = snake;
    this.grid = grid;
    this.cells = [];
    this.color = color(data.food.color);
    this.probability = data.food.probability_of_showing_up;
    this.score = data.food.score;
    this.limitX = (Math.floor(width / data.snake.size) - 1) * data.snake.size;
    this.limitY = (Math.floor(height / data.snake.size) - 1) * data.snake.size;
    this.cx = 0;
    this.cy = 0;
    this.size = this.snake.size;
    this.random = random(1);
    this.i = 0;
    this.j = 0;
    this.x = 0;
    this.y = 0;
  }

  initialize() {
    if (this.random < this.probability) {
      this.size = data.snake.size;
      this.cells = this.grid.return_cell_centers();
      this.i = Math.floor(random(this.cells.length));
      this.j = Math.floor(random(this.cells[0].length));
      this.cx = this.cells[this.i][this.j][0] + this.size * 0.5;
      this.cy = this.cells[this.i][this.j][1] + this.size * 0.5;
    }
  }

  show() {
    if (!(this.cx == 0 && this.cy == 0)) {
      push();
      fill(this.color);
      stroke(this.color);
      rectMode(CENTER);
      rect(this.x, this.y, this.size, this.size);
      pop();
    }
  }

  update() {
    this.size = data.snake.size;
    if (random(1) < 0.5) {
      this.i = int(random(-2, 2));
    } else {
      this.j = int(random(-2, 2));
    }

    this.x = this.cx + this.i * this.size;
    this.y = this.cy + this.j * this.size;

    this.limitX = (Math.floor(width / data.snake.size) - 1) * data.snake.size;
    this.limitY = (Math.floor(height / data.snake.size) - 1) * data.snake.size;

    if (this.x > this.limitX) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = int(this.limitX + this.size * 0.5);
    }
    if (this.y > this.limitY) {
      this.y = 0;
    }
    if (this.y < 0) {
      this.y = int(this.limitY + this.size * 0.5);
    }
  }
}
