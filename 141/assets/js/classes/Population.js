class Population {
  constructor(cx = width * 0.5, cy = height * 0.98) {
    this.center = new p5.Vector(cx, cy);
    this.rockets = [];
    this.size = 0;
    this.init();
    this.mating_pool = [];
    this.generation = 1;
    this.reached = 0;
    this.count = 0;
    this.max_reach = 0;
  }

  stat() {
    push();
    noStroke();
    fill(0);
    // Generations
    push();
    translate(width * 0.85, height * 0.1);
    textSize(width * 0.010);
    textAlign(CENTER, CENTER);
    text(`Generation : ${this.generation}`, 0, 0);
    pop();
    // Reached
    push();
    translate(width * 0.15, height * 0.1);
    textSize(width * 0.010);
    textAlign(CENTER, CENTER);
    text(`Current Best : ${this.max_reach} out of 800`, 0, 0);
    pop();
    pop();
  }

  init() {
    for (var i = 0; i < data.population.rockets; i += 1) {
      this.rockets.push(new Rocket(this.center.x, this.center.y));
    }
    this.size = this.rockets.length;
  }

  evaluate(destination) {
    let maxfit = 0;

    this.rockets.forEach(rocket => {
      rocket.calcFitness(destination);
      if (rocket.fitness > maxfit) {
        maxfit = rocket.fitness;
      }
    });

    this.rockets.forEach(rocket => {
      rocket.fitness /= maxfit;
    });

    this.mating_pool = [];
    this.rockets.forEach(rocket => {
      let n = rocket.fitness * 100;
      rocket.fitness /= maxfit;
      for (var i = 0; i < n; i += 1) {
        this.mating_pool[i] = rocket;
      }
    });
  }

  selection() {
    let new_rockets = [];

    for (var i = 0; i < this.rockets.length; i += 1) {
      let parent_A = random(this.mating_pool).dna;
      let parent_B = random(this.mating_pool).dna;
      let kid = parent_A.crossover(parent_B);
      kid.mutation();
      new_rockets[i] = new Rocket(this.center.x, this.center.y, kid);
    }

    this.rockets = new_rockets;
  }

  calcMaxReach() {
    let count = 0;
    if (count < 1) {
      this.rockets.forEach(rocket => {
        if (rocket.completed) {
          this.reached++;
        }
      });
    count++;
    }
    if (this.max_reach < this.reached) {
      this.max_reach = this.reached;
    }
  }

  run(destination, barrier) {
    this.stat();

    if (frameCount % data.rocket.lifespan == 0) {
      this.evaluate(destination.position);
      this.selection();
      this.generation++;
      this.reached = 0;
    }

    this.calcMaxReach();
    this.rockets.forEach(rocket => {
      rocket.run(destination.position, barrier);
    });

    this.size = this.rockets.length;
  }
}
