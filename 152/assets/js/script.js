let grid = [];
let active = [];
let cols;
let rows;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();
  colorMode(HSL, 100);
  angleMode(DEGREES);
  r = 5;
  k = 200;
  w = r / Math.sqrt(2);

  // Step 0
  cols = floor(width / w);
  rows = floor(height / w);

  for (let i = 0; i < cols * rows; i += 1) {
    grid[i] = undefined;
  }
  // ----------------------

  // Step 1
  let x = random(width);
  let y = random(height);
  let i = floor(x / w);
  let j = floor(y / w);
  let pos = createVector(x, y);
  grid[i + j * cols] = pos;
  active.push(pos);
}

function draw() {
  background(0);
  for (let m = 0; m < 30; m += 1) {
    if (active.length > 0) {
      let randIndex = floor(random(active.length));
      let pos = active[randIndex];
      let found = false;
      for (let i = 0; i < k; i += 1) {
        let sample = p5.Vector.random2D();
        sample.setMag(random(r, 2 * r));
        sample.add(pos);

        let col = floor(sample.x / w);
        let row = floor(sample.y / w);

        if (
          col > -1 &&
          row > -1 &&
          col < cols &&
          row < rows &&
          !grid[col + row * cols]
        ) {
          let ok = true;
          for (let a = -1; a <= 1; a += 1) {
            for (let b = -1; b <= 1; b += 1) {
              let index = col + a + (row + b) * cols;
              let neighbor = grid[index];
              if (neighbor) {
                let d = dist(sample, neighbor);
                if (d < r) {
                  ok = false;
                }
              }
            }
          }
          if (ok) {
            found = true;
            grid[col + row * cols] = sample;
            active.push(sample);
            break;
          }
        }
        if (!found) {
          active.splice(randIndex, 1);
        }
      }
    }

    if (active.length == 0) {
      setup();
      break;
    }
  }

  push();
  fill(50 + 50 * sin(frameCount), 100, 40, 40);
  for (let i = 0; i < active.length; i += 1) {
    ellipse(active[i].x, active[i].y, 15, 15);
    ellipse(width - active[i].x, height - active[i].y, 15, 15);
  }
  pop();

  push();
  fill(50 + 50 * sin(frameCount), 100, 90, 90);
  for (let i = 0; i < grid.length; i += 1) {
    if (grid[i]) {
      ellipse(grid[i].x, grid[i].y, 3, 3);
      ellipse(width - grid[i].x, height - grid[i].y, 3, 3);
    }
  }
  pop();
}

function windowResized() {
  setup();
}

function mousePressed() {
  grid = [];
  active = [];
  setup();
}
