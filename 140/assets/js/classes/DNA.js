class DNA {
  constructor(genes) {
    if (genes) {
      this.genes = genes;
    } else {
      this.genes = [];
      this.init();
    }
  }

  init() {
    for (var i = 0; i < data.rocket.lifespan; i += 1) {
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].mult(0.5);
    }
  }

  crossover(partner) {
    let result = [];
    let mid = random(this.genes.length);

    for (var i = 0; i < this.genes.length; i += 1) {
      if (i > mid) {
        result[i] = this.genes[i];
      } else {
        result[i] = partner.genes[i];
      }
    }
    return new DNA(result);
  }
}
