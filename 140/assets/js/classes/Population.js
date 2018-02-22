class Population {
  constructor(cx = width * 0.5, cy = height * 0.5) {
    this.center = new p5.Vector(cx, cy);
    this.rockets = [];
    this.size = 0;
    this.init();
  }

  init() {
    for (var i = 0; i < data.population.rockets; i += 1) {
      this.rockets.push(new Rocket(this.center.x, this.center.y));
    }
    this.size = this.rockets.length;
  }

  run() {
    if (this.rockets.length > 0) {
      if (this.rockets.length > data.population.rockets) {
        this.rockets.splice(0, 11);
      }

      for ( var i = 0 ; i < this.rockets.length; i += 1 ) {
        this.rockets[i].run(i);
      }
    };
    this.size = this.rockets.length;
    }
}
