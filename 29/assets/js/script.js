/**
 * Legend : 
 *   [[function_name]] : Comment notation denoting a function
 *   [variable_name] : Comment notation denoting a variable
 */

/**
  *
  * Press SPACE BAR to pause and change the cell's values with the mouse
  * On pause, click to activate/deactivate cells
  * Press R to randomly reset the cells' grid
  * Press C to clear the cells' grid
  *
  * The original Game of Life was created by John Conway in 1970.
  */

let data = {
  sketch: {
    background: "#FFFFFF"
  },
  game: {
    probability_of_being_alive_at_start: 2,
    pause: false,
    cell: {
      size: 20,
      alive: "#209220",
      dead: "#000000"
    }
  },
  timer: {
    interval: 100,
    last_recorded_time: 0
  }
};

let cells = []; // Will contain states of our cells
let cells_buffer = []; // Will contain previous values of cells

/**
 * Will fill up [cells] and [cells_buffer] arrays
 * After this function executes : 
 *  1. [cells] will be a 2D array containing one of the two states : 1 or 0
 *  2. [cells_buffer] will be a 2D array of same size with all elements = 0
 *
 * - Should be executed inside setup.
 */
function initGame() {
  for (
    var i = 0, upperLimit_i = width / data.game.cell.size;
    i < upperLimit_i;
    i += 1
  ) {
    cells[i] = [];
    cells_buffer[i] = [];
    for (
      var j = 0, upperLimit_j = height / data.game.cell.size;
      j < upperLimit_j;
      j += 1
    ) {
      let state = random(100);
      if (state > data.game.probability_of_being_alive_at_start) {
        state = 0;
      } else {
        state = 1;
      }
      cells[i][j] = state;
      cells_buffer[i][j] = 0;
    }
  }
}

/**
 * Will create a grid, with alive cells : green, dead cells : red
 * Should be executed in draw loop.
 */
function drawGrid() {
  let size = data.game.cell.size;
  for (var i = 0, upperLimit_i = width / size; i < upperLimit_i; i += 1) {
    for (var j = 0, upperLimit_j = height / size; j < upperLimit_j; j += 1) {
      if (cells[i][j] == 1) {
        fill(data.game.cell.alive);
      } else {
        fill(data.game.cell.dead);
      }
      let x = i * size;
      let y = j * size;
      rect(x, y, size, size);
    }
  }
}

/**
 * Will be called inside [[timer function]]
 * Meaning : Will run every time the clock ticks.
 * 
 */
function iteration() {
  /**
   * Save cells to buffer array so that we can operate with one array keeping the other intact.
   */
  for (
    var i = 0, upperLimit_i = width / data.game.cell.size;
    i < upperLimit_i;
    i += 1
  ) {
    for (
      var j = 0, upperLimit_j = height / data.game.cell.size;
      j < upperLimit_j;
      j += 1
    ) {
      cells_buffer[i][j] = cells[i][j];
    }
  }

  // Now, we want to visit every cell
  for (
    var i = 0, upperLimit_i = width / data.game.cell.size;
    i < upperLimit_i;
    i += 1
  ) {
    for (
      var j = 0, upperLimit_j = height / data.game.cell.size;
      j < upperLimit_j;
      j += 1
    ) {
      // ..and find out number of neighbours of each cell..
      var alive_neighbours = 0;
      for (var x = i - 1, upperLimit_x = i + 1; x < upperLimit_x; x += 1) {
        for (var y = j - 1, upperLimit_y = j + 1; y < upperLimit_y; y += 1) {
          // Making sure that we're not out of bounds..
          if (
            x >= 0 &&
            x < width / data.game.cell.size &&
            y >= 0 &&
            y < height / data.game.cell.size
          ) {
            // Making sure that we aren't inluding the cell itself among its neighbours..
            if (x !== i && y !== j) {
              // If state of neighbour is 1, include it in alive_neighbours..
              if (cells_buffer[x][y] == 1) {
                alive_neighbours++;
              } else {
                alive_neighbours++;
              }
            }
          }
        }
      }
      // By this line of code, we'll have number of alive neighbours of one cell, now we just have to apply rules of the game.

      // If cell is alive, kill it if necessary..
      // Else..if it is dead, make it alive if necessary..
      if (cells_buffer[i][j] == 1) {
        /** 
          * According to game rules: 
          *  1. If number of alive neighbours are less than 2, cell will die of loneliness..
          *  2. If number of alive neighbours are more than 3, cell will die of over population..
          */
        if (alive_neighbours < 2 || alive_neighbours > 3) {
          cells_buffer[i][j] = 0;
        }
      } else {
        if (alive_neighbours == 3) {
          cells_buffer[i][j] = 1;
        }
      }
    }
  }
}

// If timer ticks, iterate..
function timer() {
  if (millis() - data.timer.last_recorded_time > data.timer.interval) {
    if (!data.game.pause) {
      iteration();
      data.timer.last_recorded_time = millis();
    }
  }
}

// Create a new cell manually on pause..
function createCellOnPause() {
  if (data.game.pause && mouseIsPressed) {
    // Map and avoid out of bound errors..
    let xCellOver = map(mouseX, 0, width, 0, width / cellSize);
    let yCellOver = map(mouseY, 0, height, 0, height / cellSize);

    xCellOver = constrain(xCellOver, 0, width / cellSize - 1);
    yCellOver = constrain(yCellOver, 0, height / cellSize - 1);

    // Check against cells in [cells_buffer]
    if (cells_buffer[xCellOver][yCellOver] == 1) {
      cells[xCellOver][yCellOver] = 0;
      fill(data.game.cell.dead);
    } else {
      cells[xCellOver][yCellOver] = 1;
      fill(data.game.cell.alive);
    }
  } else if (data.game.pause && !mouseIsPressed) {
    // Save cells to buffer (so we opeate with one array keeping the other intact)
    for (
      var i = 0, upperLimit_i = width / data.game.cell.size;
      i < upperLimit_i;
      i += 1
    ) {
      for (
        var j = 0, upperLimit_j = height / data.game.cell.size;
        j < upperLimit_j;
        j += 1
      ) {
        cells_buffer[i][j] = cells[i][j];
      }
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  initGame();
  stroke(48);
  background(0);
}

function draw() {
  background(data.sketch.background);
  timer();
  drawGrid();
  createCellOnPause();
}

function keyTyped() {
  // RESET : Reinitialize the game.
  if (key == "r" || key == "R") {
    initGame();
  }

  if (key == " ") {
    data.game.pause = !data.game.pause;
  }

  if (key == "c" || key == "C") {
    for (
      var i = 0, upperLimit_i = width / data.game.cell.size;
      i < upperLimit_i;
      i += 1
    ) {
      for (
        var j = 0, upperLimit_j = height / data.game.cell.size;
        j < upperLimit_j;
        j += 1
      ) {
        cells[i][j] = 0;
      }
    }
  }
}
