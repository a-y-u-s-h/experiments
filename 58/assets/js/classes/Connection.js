class Connection {
  constructor(source, destination, weight) {
    this.source = source;
    this.destination = destination;
    this.weight = weight;

    this.sending = false;
    this.dataflow;
    this.output = 0;
  }

  display() {
    // Draw a line and travelling circle
    push();
    stroke(0);
    strokeWeight(0.5 + this.weight * 4);
    line(
      this.source.location.x,
      this.source.location.y,
      this.destination.location.x,
      this.destination.location.y
    );
    pop();
  }

  displayData() {
    push();

    if (this.sending) {
      fill(0);
      strokeWeight(1);
      ellipse(
        this.dataflow.x,
        this.dataflow.y,
        map(this.output, -1, 1, 2, 20),
        map(this.output, -1, 1, 2, 20)
      );
    }
    pop();
  }

  feedforward(input) {
    this.dataflow = new p5.Vector(
      this.source.location.x,
      this.source.location.y
    ); // Start animation at Source Neuron
    this.output = input * this.weight; // Compute output
    this.sending = true; // Turn on sending
  }

  update() {
    if (this.sending) {
      // Use simple interpolation
      this.dataflow.x = lerp(this.dataflow.x, this.destination.location.x, 0.1);
      this.dataflow.y = lerp(this.dataflow.y, this.destination.location.y, 0.1);

      let separation = p5.Vector.dist(this.dataflow, this.destination.location);

      // If we've reached the end..
      if (separation < 1) {
        // Pass the output
        this.destination.feedforward(this.output);
        this.sending = false;
      }
    }
  }
}
