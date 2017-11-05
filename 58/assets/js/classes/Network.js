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
    this.neurons[0].feedforward(input);
    let $this = this;
    setTimeout(function() {
      $this.neurons[1].feedforward(input);
    }, random(100, 1000));
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
    this.connections.forEach(connection => {
      connection.display();
    });
    this.neurons.forEach(n => {
      n.display();
    });

    this.connections.forEach( function(connection) {
      connection.displayData();
    });

    pop();
  }
}
