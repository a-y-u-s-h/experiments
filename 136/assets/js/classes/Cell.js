class Cell {
  constructor(x, y, i, j) {
    this.position = new p5.Vector(x, y);
    this.i = i;
    this.j = j;

    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.neighbors = [];
    this.wall = random(1) < 0.03 ? true : false;
  }

  addNeighbors(cells) {
    let i = this.i;
    let j = this.j;
    let rows = cells.length;
    let cols = cells[i].length;

    if (i > 0) {
      this.neighbors.push(cells[i - 1][j]);
    }
    if (j > 0) {
      this.neighbors.push(cells[i][j - 1]);
    }
    if (i < rows - 1) {
      this.neighbors.push(cells[i + 1][j]);
    }
    if (j < cols - 1) {
      this.neighbors.push(cells[i][j + 1]);
    }
    if (i > 0 && j > 0) {
      this.neighbors.push(cells[i - 1][j - 1]);
    }
    if (i < rows - 1 && j > 0) {
      this.neighbors.push(cells[i + 1][j - 1]);
    }
    if (i > 0 && j < cols - 1) {
      this.neighbors.push(cells[i - 1][j + 1]);
    }
    if (i < rows - 1 && j < cols - 1) {
      this.neighbors.push(cells[i + 1][j + 1]);
    }
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    if ( this.wall ) {
      fill(0);
    }
    rect(0, 0, data.grid.scale, data.grid.scale);
    pop();
  }
}
