let data = {
  sketch: {
    background: "#248B21"
  }
};

let ground;
let left_paddle;
let right_paddle;

function setup() {
  createCanvas(windowWidth, windowHeight);
  left_paddle = new Paddle("left");
  right_paddle = new Paddle("right");
  ground = new Ground(width * 0.5, height * 0.5, left_paddle);
}

function draw() {
  background(data.sketch.background);
  ground.show();
  left_paddle.show();
  right_paddle.show();
}
