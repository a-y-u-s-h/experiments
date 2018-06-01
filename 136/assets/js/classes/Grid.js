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
    this.path = [];
    this.init();
  }

  run() {
    // Am I still searching ?
    if (this.openSet.length > 0) {
      // Best next option
      let winner = 0;
      for (var i = 0; i < this.openSet.length; i += 1) {
        if (this.openSet[i].f < this.openSet[winner].f) {
          winner = i;
        }
      }

      let current = this.openSet[winner];

      // Finding out current path
      this.path = [];
      let temp = current;
      this.path.push(temp);
      while (temp.previous) {
        this.path.push(temp.previous);
        temp = temp.previous;
      }

      // Did I Finish?
      if (current === this.end) {
        // noLoop();
        console.log("done!");
      } else {
        // If I'm not finished, put current in closed set and
        // take it out from open set
        this.closedSet.push(current);
        this.openSet.splice(winner, 1);

        // Check neighbors
        let neighbors = current.neighbors;
        neighbors.forEach(n => {
          // Check if some neighbor is valid next spot
          if (!this.closedSet.includes(n) && !n.wall) {
            let tentative_g = current.g + heuristic(n, current);

            // Is this a better path than before?
            let newPath = false;
            if (this.openSet.includes(n)) {
              if (tentative_g < n.g) {
                n.g = tentative_g;
                newPath = true;
              }
            } else {
              n.g = tentative_g;
              newPath = true;
              this.openSet.push(n);
            }
            // Yes it's a better path
            if (newPath) {
              n.h = heuristic(n, this.end);
              n.f = n.g + n.h;
              n.previous = current;
            }
          }
        });
      }
    } else {
      // no solution
      console.log("no solution");
      // noLoop();
      return;
    }
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

    this.cells.forEach(row => {
      row.forEach(cell => {
        cell.addNeighbors(this.cells);
      });
    });

    this.start = this.cells[0][0];
    this.start.wall = false;
    this.end = this.cells[this.cells.length - 1][this.cells[0].length - 1];
    this.end.wall = false;

    this.openSet = [];
    this.closedSet = [];
    this.openSet.push(this.start);
  }

  show() {
    push();
    translate(this.position.x, this.position.y);

    for (var x = 0; x < this.cells.length; x += 1) {
      for (var y = 0; y < this.cells[x].length; y += 1) {
        this.cells[x][y].show();
      }
    }

    push();
    fill(0, 255, 0, 100);
    for (var i = 0; i < this.openSet.length; i += 1) {
      this.openSet[i].show();
    }
    pop();

    push();
    fill(255, 0, 0, 100);
    for (var i = 0; i < this.closedSet.length; i += 1) {
      this.closedSet[i].show();
    }
    pop();

    push();
    noFill();
    stroke("#00A874");
    strokeWeight(data.grid.scale * 0.5);
    beginShape();
    for (var i = 0; i < this.path.length; i++) {
      vertex(this.path[i].position.x, this.path[i].position.y);
    }
    endShape();
    pop();

    pop();
  }
}
