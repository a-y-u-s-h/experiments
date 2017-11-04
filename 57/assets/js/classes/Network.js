class Network {
  constructor(x, y) {
    this.location = new p5.Vector(x, y);
    this.neurons = [];
    this.connections = [];
  }

  addNeuron(n) {
    this.neurons.push(n);
  }

  feedforward(input) {
    let start = this.neurons[0];
    start.feedforward(input);
  }

  connect(first, second, weight) {
    let link = new Connection(first, second, weight);
    first.addConnection(link);
    this.connections.push(link);
  }

  update() {
    this.connections.forEach(connection => {
      connection.update();
    });
  }

  display() {
    push();
    translate(this.location.x, this.location.y);
    this.neurons.forEach(n => {
      n.display();
    });

    this.connections.forEach(connection => {
      connection.display();
    });
    pop();
  }

}
