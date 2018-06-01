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
      this.genes[i].mult(2);
    }
  }

  crossover(partner) {
    let resulting_genes = [];
    let mid = random(this.genes.length);

    for (var i = 0; i < this.genes.length; i += 1) {
      if (i > mid) {
        resulting_genes[i] = this.genes[i];
      } else {
        resulting_genes[i] = partner.genes[i];
      }
    }
    return new DNA(resulting_genes);
  }

  // Adds random mutation to the genes to add variance.
  mutation() {
    for (var i = 0; i < this.genes.length; i++) {
      // if random number less than 0.01, new gene is then random vector
      if (random(1) < 0.1) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(data.rocket.maxforce);
      }
    }
  }
}
