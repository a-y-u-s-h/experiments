class Food {
  constructor(snake, grid) {
    this.snake = snake;
    this.grid = grid;
    this.cells = [];
    this.type = Math.floor(random(4));
    this.color = color(data.food.types[this.type].color);
    this.probability = data.food.types[this.type].probability_of_showing_up;
    this.cx = 0;
    this.cy = 0;
    this.size = this.snake.size;
    this.random = random(1);
    this.i = 0;
    this.j = 0;
  }

  initialize() {
      if (this.random < this.probability) {
        this.color = color(data.food.types[this.type].color);
        this.size = this.snake.size;
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
      rect(this.cx, this.cy, this.size, this.size);
      pop();
    }
  }
}
