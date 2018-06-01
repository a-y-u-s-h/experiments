let data = {
  sketch: {
    background: "#FFFFFF"
  },
  grid: {
    scale: 15
  }
};

let grid;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noFill();
  noStroke();
  colorMode(HSB, 100);
  grid = new Grid(width * 1.1, height * 1.1, data.grid.scale);
}

function draw() {
  background(data.sketch.background);
  grid.run();
}

var heuristic = (a, b) => dist(a.i, a.j, b.i, b.j);

class Grid {
  constructor(
    w = width,
    h = height,
    scale = data.grid.scale,
    cx = width * 0.5,
    cy = height * 0.5
  ) {
    this.position = new p5.Vector(cx, cy);
    this.width = w;
    this.height = h;
    this.scale = scale;
    this.cells = [];
    this.init();
  }

  run() {
    // if (this.openSet.length > 0) {
    //   let winner = 0;
    //   for (var i = 0; i < this.openSet.length; i += 1) {
    //     if (this.openSet[i].f < this.openSet[winner].f) {
    //       winner = i;
    //     }
    //   }

    //   let current = this.openSet[winner];
    //   if (current == this.end) {
    //     console.log("done!");
    //   } else {
    //     this.closedSet.push(current);
    //     this.openSet.splice(winner, 1);

    //     let neighbors = current.neighbors;
    //     neighbors.forEach(n => {
    //       if (!this.closedSet.includes(n)) {
    //         let tentative_g = current.g + 1;

    //         if (this.openSet.includes(n)) {
    //           if (tentative_g < n.g) {
    //             n.g = tentative_g;
    //           }
    //         } else {
    //           n.g = tentative_g;
    //           this.openSet.push(n);
    //         }

    //         n.h = heuristic(n, this.end);
    //         n.f = n.g + n.h;
    //       }
    //     });
    //   }
    // } else {
    //   // no solution
    // }

    this.show();
  }

  init() {
    let i = 0;
    let j = 0;
    this.rows = ceil(this.height / this.scale);
    this.cols = ceil(this.width / this.scale);

    for (var x = -this.width * 0.5; x < this.width * 0.5; x += this.scale) {
      this.cells.push(new Array());
      j = 0;
      for (var y = -this.height * 0.5; y < this.height * 0.5; y += this.scale) {
        this.cells[this.cells.length - 1].push(new Cell(x, y, i, j));
        j++;
      }
      i++;
    }

    // this.cells.forEach(row => {
    //   row.forEach(cell => {
    //     cell.addNeighbors(this.cells);
    //   });
    // });

    // this.start = this.cells[0][0];
    // this.end = this.cells[this.cells.length - 1][this.cells[0].length - 1];
    // this.openSet = [];
    // this.closedSet = [];
    // this.openSet.push(this.start);
  }

  show() {
    push();
    translate(this.position.x, this.position.y);

    // push();
    // fill(0, 255, 0, 100);
    // for (var i = 0; i < this.openSet.length; i += 1) {
    //   this.openSet[i].show();
    // }
    // pop();

    // push();
    // fill(255, 0, 0, 100);
    // for (var i = 0; i < this.closedSet.length; i += 1) {
    //   this.closedSet[i].show();
    // }
    // pop();

    for (var x = 0; x < this.cells.length; x += 1) {
      for (var y = 0; y < this.cells[x].length; y += 1) {
        this.cells[x][y].show();
      }
    }
    pop();
  }
}

class Cell {
  constructor(x, y, i, j) {
    this.position = new p5.Vector(x, y);
    this.i = i;
    this.j = j;

    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
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
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    let d = dist(this.position.x, this.position.y, 0, 0);
    fill(
      map(
        d,
        -(width + height) * 0.5,
        (width + height) * 0.5,
        0,
        100 * (0.5 + 0.4 * sin(frameCount * 0.1 + 0.01 *  d * noise(this.i, this.j)))
      )
    );
    rect(0, 0, data.grid.scale, data.grid.scale);
    pop();
  }
}
