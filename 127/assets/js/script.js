let data = {
  sketch: {
    background: "#0000002",
    frameRate: 60
  },
  snake: {
    size: 15,
    fill: "#00FFFA10",
    stroke: {
      color: "#00FFE8",
      weight: 1
    }
  },
  food: {
    n: 100,
    color: "#FFC80040",
    probability_of_showing_up: 0.9,
    score: 1
  },
  grid: {
    color: "#0B150B"
  }
};


let snake;
let grid;
let foods = [];

function init_food(snake, grid) {
  for (var i = 0, upperLimit_i = data.food.n; i < upperLimit_i; i += 1) {
    foods.push(new Food(snake, grid));
    foods[i].initialize();
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = new Grid();
  snake = new Snake();
  background(color(data.sketch.background));
  init_food(snake, grid);
}

let angle = 0;
let spacingX;
let spacingY;
function draw() {
  frameRate(abs(data.sketch.frameRate));
  background(0, 50);
  spacingX =
    (width - Math.floor(width / data.snake.size) * data.snake.size) * 0.5;
  spacingY =
    (height - Math.floor(height / data.snake.size) * data.snake.size) * 0.5;
  translate(spacingX, spacingY);
  grid.show();
  snake.update();
  snake.show();
  for (var i = 0, upperLimit_i = foods.length; i < upperLimit_i; i += 1) {
    if (foods[i]) {
      foods[i].update();
      foods[i].show();
      eat(i);
    }
  }

    if (foods.length < 4) {
      foods.push(new Food(snake, grid));
      foods[foods.length - 1].initialize();
    }
}

function eat(i) {
  let distance = dist(snake.cx, snake.cy, foods[i].x, foods[i].y);
  let limit = 20;
  if (distance < limit) {
    snake.eats(foods[i]);
    foods.splice(i, 1);
  }
}

function keyPressed() {
  if (mouseX < width) {
    switch (keyCode) {
      case UP_ARROW:
        snake.dir(0, -1);
        break;
      case DOWN_ARROW:
        snake.dir(0, 1);
        break;
      case LEFT_ARROW:
        snake.dir(-1, 0);
        break;
      case RIGHT_ARROW:
        snake.dir(1, 0);
        break;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth * 0.77, windowHeight);
}
