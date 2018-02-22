class Population {
  constructor(cx = width * 0.5, cy = height * 0.98) {
    this.center = new p5.Vector(cx, cy);
    this.rockets = [];
    this.size = 0;
    this.init();
    this.mating_pool = [];
    this.generation = 1;
  }

  stat() {
    push();
    noStroke();
    fill(0);
    translate(width * 0.9, height * 0.1);
    textSize(18);
    textAlign(CENTER, CENTER);
    text(`Generation : ${this.generation}`, 0, 0);
    pop();
  }

  init() {
    for (var i = 0; i < data.population.rockets; i += 1) {
      this.rockets.push(new Rocket(this.center.x, this.center.y));
    }
    this.size = this.rockets.length;
  }

  evaluate() {
    let maxfit = 0;

    this.rockets.forEach(rocket => {
      rocket.calcFitness(target);
      if (rocket.fitness > maxfit) {
        maxfit = rocket.fitness;
      }
    });

    this.rockets.forEach(rocket => {
      rocket.fitness = map(rocket.fitness, 0, maxfit, 0, 1);
    });

    this.mating_pool = [];
    this.rockets.forEach(rocket => {
      let n = rocket.fitness * 100;
      rocket.fitness = map(rocket.fitness, 0, maxfit, 0, 1);
      for (var i = 0; i < n; i += 1) {
        this.mating_pool[i] = rocket;
      }
    });
  }

  selection() {
    let new_rockets = [];

    for (var i = 0; i < this.rockets; i += 1) {
      let parent_A = random(this.mating_pool).dna;
      let parent_B = random(this.mating_pool).dna;
      let kid = parent_A.crossover(parent_B);
      new_rockets[i] = new Rocket(this.center.x, this.center.y, kid);
    }

    this.rockets = new_rockets;
  }

  run() {
    this.stat();
    this.evaluate();
    if (frameCount % data.rocket.lifespan == 0) {
      this.generation++;
      this.selection();
    }
    if (this.rockets.length > 0) {
      if (this.rockets.length > data.population.rockets) {
        this.rockets.splice(0, 11);
      }
      this.rockets.forEach(rocket => {
        rocket.run();
      });
      this.size = this.rockets.length;
    }
  }
}
