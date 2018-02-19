class DNA {
  constructor()  {
    this.genes = [];
    this.init();
  }

  init()  {
    for ( var i = 0 ; i < data.rocket.lifespan; i += 1 ) {
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].mult(3);
    }
  }
}