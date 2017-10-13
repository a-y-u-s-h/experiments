let data = {
  sketch: {
    background: "#000000",
    frameRate: 60
  },
  snake: {
    size: 10,
    fill: "#53D921",
    stroke: {
      color: "#00550A",
      weight: 1
    }
  },
  food: {
    n: 30,
    types: [
      {
        color: "#DBB822",
        probability_of_showing_up: 0.2,
        score: 3
      },
      {
        color: "#DB1BA6",
        probability_of_showing_up: 0.5,
        score: 2
      },
      {
        color: "#258197",
        probability_of_showing_up: 0.7,
        score: 1
      },
      {
        color: "#BD1A1A",
        probability_of_showing_up: 0.4,
        score: -2
      }
    ]
  },
  grid: {
    color: "#0B150B"
  }
};

// Variable to store GUI
var controlkit;

// Function to create control GUI
var createControlKit = () => {
  controlkit = new ControlKit();
  controlkit
    .addPanel({
      fixed: true,
      align: "right",
      label: "Game Settings"
    })
    .addColor(data.grid, "color", {
      colorMode: "hex",
      label: "Grid Color"
    })
    .addNumberInput(data.snake, "size", {
      label: "Grid Size",
      step: 1,
      dp: 1
    })
    .addNumberInput(data.sketch, "frameRate", {
      label: "Framerate",
      step: 1,
      dp: 1
    })
    .addSubGroup({
      label: "Snake Settings"
    })
    .addColor(data.snake, "fill", {
      colorMode: "hex",
      label: "Fill Color"
    })
    .addColor(data.snake.stroke, "color", {
      colorMode: "hex",
      label: "Stroke Color"
    })
    .addNumberInput(data.snake.stroke, "weight", {
      label: "Border Thickness",
      step: 1,
      dp: 1
    });
};

createControlKit();

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
  createCanvas(windowWidth * 0.77, windowHeight);
  grid = new Grid();
  snake = new Snake();
  background(color(data.sketch.background));
  init_food(snake, grid);
}

let angle = 0;
function draw() {
  frameRate(abs(data.sketch.frameRate));
  background(0, 100);
  let spacingX =
    (width - Math.floor(width / data.snake.size) * data.snake.size) * 0.5;
  let spacingY =
    (height - Math.floor(height / data.snake.size) * data.snake.size) * 0.5;
  translate(spacingX, spacingY);
  grid.show();
  snake.update();
  snake.show();
  for (var i = 0, upperLimit_i = foods.length; i < upperLimit_i; i += 1) {
    foods[i].show();
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
