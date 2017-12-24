let data = {
  sketch: {
    background: "#FFFFFF"
  },
  cells: {
    columns: 50,
    rows: 25,
    w: 40,
    h: 40
  }
};

var grid = [];

var current;

var stack = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  data.cells.w = width / data.cells.columns;
  data.cells.h = height / data.cells.rows;
  colorMode(HSB, 100);
  for (let j = 0; j < data.cells.rows; j++) {
    for (let i = 0; i < data.cells.columns; i++) {
      let cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];
}

function mousePressed() {
  grid = [];

  stack = [];
  for (let j = 0; j < data.cells.rows; j++) {
    for (let i = 0; i < data.cells.columns; i++) {
      let cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];
}

function draw() {
  background(0);
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  current.highlight();

  // STEP 1
  let next = current.checkNeighbors();
  if (next) {
    next.visited = true;

    // STEP 2
    stack.push(current);

    // STEP 3
    removeWalls(current, next);

    // STEP 4
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > data.cells.columns - 1 || j > data.cells.rows - 1) {
    return -1;
  }
  return i + j * data.cells.columns;
}

function removeWalls(a, b) {
  let x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  let y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
