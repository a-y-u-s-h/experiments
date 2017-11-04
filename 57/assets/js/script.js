let data = {
  sketch: {
    background: "#FFFFFF"
  },
  neuron: {
    size:  {
      lower: 64,
      upper: 128
    },
    stroke: {
      check: true,
      color: "#000000",
      weight: 1
    }
  }
};

let network;
let a, b, c, d, e, f;

function diagram() {
  // Create the Network object
  network = new Network(width / 2, height / 2);

  // Create a bunch of Neurons
  a = new Neuron(-550, 0);
  b = new Neuron(-300, 0);
  c = new Neuron(0, 150);
  d = new Neuron(0, -150);
  e = new Neuron(300, 0);
  f = new Neuron(550, 0);

  // Connect them
  network.connect(a, b, 1);
  network.connect(b, c, random(1));
  network.connect(b, d, random(1));
  network.connect(c, e, random(1));
  network.connect(d, e, random(1));
  network.connect(e, f, 1);

  // Add them to the Network
  network.addNeuron(a);
  network.addNeuron(b);
  network.addNeuron(c);
  network.addNeuron(d);
  network.addNeuron(e);
  network.addNeuron(f);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);
  diagram();
}

function draw() {
  background(data.sketch.background);
  // Update and display the Network
  network.update();
  network.display();

  // Every 30 frames feed in an input
  if (frameCount % 30 == 0) {
    network.feedforward(random(1));
  }
}
