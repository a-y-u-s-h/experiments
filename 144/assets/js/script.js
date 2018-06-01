let data = {
  sketch: {
    background: "#248B21"
  },
  ball: {
    outer: {
      radius: 60,
      fill: {
        check: false,
        color: "#000000"
      },
      stroke: {
        check: true,
        color: "#FFFFFF"
      }
    },
    inner: {
      radius: 55,
      fill: {
        check: true,
        color: "#FFFFFF"
      },
      stroke: {
        check: false,
        color: "#000000"
      }
    }
  }
};

let game;

function loaded () {
  game.ball.loading = false;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  game = new System();
  imageMode(CENTER);
}

function draw() {
  background(data.sketch.background);

  game.run();
}
