class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;
    this.color = map(this.i + this.j, 0, data.cells.columns + data.cells.rows - 2, 0, 100);
  }

  checkNeighbors() {
    let neighbors = [];

    let top = grid[index(this.i, this.j - 1)];
    let right = grid[index(this.i + 1, this.j)];
    let bottom = grid[index(this.i, this.j + 1)];
    let left = grid[index(this.i - 1, this.j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      let r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  }

  highlight() {
    let x = this.i * data.cells.w;
    let y = this.j * data.cells.h;
    noStroke();
    fill(this.color, 100, 100, 70);
    rect(x, y, data.cells.w, data.cells.h);
  }

  show() {
    let x = this.i * data.cells.w;
    let y = this.j * data.cells.h;
    stroke(0, 100);
    strokeWeight(2);
    if (this.walls[0]) {
      line(x, y, x + data.cells.w, y);
    }
    if (this.walls[1]) {
      line(x + data.cells.w, y, x + data.cells.w, y + data.cells.h);
    }
    if (this.walls[2]) {
      line(x + data.cells.w, y + data.cells.h, x, y + data.cells.h);
    }
    if (this.walls[3]) {
      line(x, y + data.cells.h, x, y);
    }

    if (this.visited) {
      noStroke();
      fill(this.color, 100, 100, 40);
      rect(x, y, data.cells.w, data.cells.h);
    }
  }
}
