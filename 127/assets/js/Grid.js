class Grid {
  constructor() {
    this.cells = [];
    this.limitX = Math.floor(width / data.snake.size) * data.snake.size;
    this.limitY = Math.floor(height / data.snake.size) * data.snake.size;
    this.cell_centers = [];
  }

  show() {
    noFill();
    stroke(data.grid.color);
    for (
      var i = 0, upperLimit_i = Math.floor(width / data.snake.size);
      i < upperLimit_i;
      i += 1
    ) {
      for (
        var j = 0, upperLimit_j = Math.floor(height / data.snake.size);
        j < upperLimit_j;
        j += 1
      ) {
        rect(
          i * data.snake.size,
          j * data.snake.size,
          data.snake.size,
          data.snake.size
        );
      }
    }
  }

  return_cell_centers() {
    for (
      var i = 0, upperLimit_i = Math.floor(width / data.snake.size);
      i < upperLimit_i;
      i += 1
    ) {
      this.cell_centers[i] = [];
      for (
        var j = 0, upperLimit_j = Math.floor(height / data.snake.size);
        j < upperLimit_j;
        j += 1
      ) {
        this.cell_centers[i][j] = [i* data.snake.size, j * data.snake.size];
      }
    }

    return this.cell_centers;
  }
}
