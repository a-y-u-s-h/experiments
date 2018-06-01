class Neuron {
  constructor(x, y) {
    this.location = new p5.Vector(x, y);
    this.connections = [];
    this.sum = 0;
    this.r = data.neuron.size.lower;
  }

  addConnection(connection) {
    this.connections.push(connection);
  }

  feedforward(input)  {
    this.sum += input;
    if ( this.sum > 1 ) {
      this.fire();
      this.sum = 0;
      playSound();
    }  
  }

  fire()  {
    this.r = data.neuron.size.upper; // It suddenly becomes bigger
    this.connections.forEach((c)  => {
      c.feedforward(this.sum);
    })
  }
  
  display() {
    stroke(0);
    strokeWeight(1);
    let hue = map(this.sum, 0, 1, 0, 25);
    fill(hue, 100, 100);
    ellipse(this.location.x, this.location.y, this.r, this.r);

    // Size shrinks back to original 
    this.r = lerp(this.r, data.neuron.size.lower, 0.1);
  }

}
