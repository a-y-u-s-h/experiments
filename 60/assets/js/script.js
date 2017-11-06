let data = {
  sketch: {
    background: "#FFFFFF"
  },
  tree: {
    n : 14,
    root: {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.5
    },
    node: {
      size: 30,
      textSize: 16,
      textColor: "#FFFFFF",
      stroke: {
        check: true,
        color: "#000000"
      },
      fill: {
        check: true,
        color: "#000000"
      }
    },
    branch: {
      r: 100,
      angle: {
        left: 45,
        right: 45
      }
    }
  }
};

let tree;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);
  rectMode(CENTER);
  angleMode(DEGREES);

  tree = new Tree(width * 0.7, height * 0.1);
  for (var i = 0, upperLimit_i = data.tree.n ; i < upperLimit_i; i += 1 ) {
    tree.put(round(random(0, 100)));
  }
}

function draw() {
  background(data.sketch.background);
  tree.connect();
  tree.traverse();
}
