let data = {
  sketch: {
    background: "#000000"
  },
  grid: {
    columns: 100,
    rows: 50
  }
};

let board;

function setup() {
  createCanvas(windowWidth, windowHeight);

  board = new Board(width, height);
  board.init();

  colorMode(HSB, 100);
}

function mousePressed () {
  board.init();
}

function draw() {
  background(data.sketch.background);

  board.run();
}

class Board {
  constructor(w, h) {
    this.w = w / data.grid.columns;
    this.h = h / data.grid.rows;
    this.grid = [];
  }

  init() {
    this.grid = [];
    for (var i = 0; i < data.grid.columns; i += 1) {
      this.grid[i] = [];
      for (var j = 0; j < data.grid.rows; j += 1) {
        this.grid[i][j] = new Cell(i, j, this.w, this.h);
      }
    }
  }

  run() {
    this.update();
    this.show();
  }

  show() {
    for (var i = 0; i < this.grid.length; i += 1) {
      for (var j = 0; j < this.grid[i].length; j += 1) {
        this.grid[i][j].run();
      }
    }
  }

  update() {
    for (var k = 0; k < 2; k += 1) {
      for (var i = 0; i < this.grid.length; i += 1) {
        for (var j = 0; j < this.grid[i].length; j += 1) {
          // Neighbors of grid[i][j] =>
          let alive = 0;

          if (
            i > 0 &&
            j > 0 &&
            i < data.grid.columns - 1 &&
            j < data.grid.rows - 1
          ) {
            alive += this.grid[i - 1][j - 1].returnState();
            alive += this.grid[i - 1][j].returnState();
            alive += this.grid[i - 1][j + 1].returnState();
            alive += this.grid[i][j - 1].returnState();
            alive += this.grid[i][j + 1].returnState();
            alive += this.grid[i + 1][j - 1].returnState();
            alive += this.grid[i + 1][j].returnState();
            alive += this.grid[i + 1][j + 1].returnState();
          }

          this.grid[i][j].neighbors = alive;

          // Game rules

          if (this.grid[i][j].alive) {
            if (alive < 2) {
              this.grid[i][j].alive = false;
            }

            if (alive > 3) {
              this.grid[i][j].alive = false;
            }
          } else {
            if (alive == 3) {
              this.grid[i][j].alive = true;
            }
          }
        }
      }
    }
  }
}

class Cell {
  constructor(i, j, w, h) {
    this.i = i;
    this.j = j;
    this.w = w;
    this.h = h;
    this.x = i * w;
    this.y = j * h;
    this.alive = random(1) < 0.96;
    this.neighbors = 0;
  }

  run() {
    this.clicked();
    this.show();
  }

  returnState() {
    if (this.alive) {
      return 1;
    } else {
      return 0;
    }
  }

  show() {
    push();
    stroke(0);
    let h = map(this.neighbors, 0, 8, 30, 60);
    let s = map(this.neighbors, 0, 8, 0, 100);
    let b = map(this.neighbors, 0, 8, 0, 100);
    fill(h, s, b);
    rect(this.x, this.y, this.w - 1, this.h - 1);
    pop();
  }

  clicked() {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.w - 1 &&
      (mouseY > this.y && mouseY < this.y + this.h - 1)
    ) {
      this.alive = !this.alive;
    }
  }
}
