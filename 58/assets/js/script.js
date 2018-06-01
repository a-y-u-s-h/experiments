let data = {
  sketch: {
    background: "#FFFFFF"
  },
  neuron: {
    size: {
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
let a, b, c, d, e, f, g, h;
let sfx;
let loading = true;

function playSound() {
  if (!loading) {
    sfx.play();
  }
}

function loaded() {
  loading = false;
}

function diagram() {
  // Create the Network object
  network = new Network(width / 2, height / 2);

  // Create a bunch of Neurons
  a = new Neuron(-width * 0.4, -height * 0.2);
  b = new Neuron(-width * 0.4, height * 0.2);
  c = new Neuron(-width * 0.15, -height * 0.4);
  d = new Neuron(-width * 0.15, 0);
  e = new Neuron(-width * 0.15, height * 0.4);
  f = new Neuron(width * 0.15, -height * 0.4);
  g = new Neuron(width * 0.15, 0);
  h = new Neuron(width * 0.15, height * 0.4);
  i = new Neuron(width * 0.4, 0);

  // Connect them
  // network.connect(a, b, 1);
  network.connect(a, c, random(1));
  network.connect(a, d, random(1));
  network.connect(a, e, random(1));
  network.connect(b, c, random(1));
  network.connect(b, d, random(1));
  network.connect(b, e, random(1));
  network.connect(c, f, random(1));
  network.connect(c, g, random(1));
  network.connect(c, h, random(1));
  network.connect(d, f, random(1));
  network.connect(d, g, random(1));
  network.connect(d, h, random(1));
  network.connect(e, f, random(1));
  network.connect(e, g, random(1));
  network.connect(e, h, random(1));
  network.connect(f, i, random(1));
  network.connect(g, i, random(1));
  network.connect(h, i, random(1));

  // Add them to the Network
  network.addNeuron(a);
  network.addNeuron(b);
  network.addNeuron(c);
  network.addNeuron(d);
  network.addNeuron(e);
  network.addNeuron(f);
  network.addNeuron(g);
  network.addNeuron(h);
  network.addNeuron(i);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  soundFormats("mp3");
  sfx = loadSound(`/sounds/experiments/58/1.mp3`, loaded);
  ellipseMode(CENTER);
  colorMode(HSB, 100);
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
