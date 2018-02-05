class Universe {
  constructor() {
    this.cities = [];
    this.initialize();
    this.record_distance;
    this.current_best = [];
  }

  initialize() {
    /**
     * Filling up cities in this universe and measuring the total route that they cover
     * One city leads to another and another leads to next one.
     * At a time, except for starting city and ending city, all others are connected to two cities (front and back)
     * Measuring initial route distance and storing it in record_distance of this universe.
     */
    for (let i = 0; i < data.cities.n; i += 1) {
      this.cities.push(
        new City(
          random(width * 0.1, width * 0.6),
          random(height * 0.2, height * 0.8)
        )
      );
    }
    this.record_distance = this.length(this.cities);
  }

  show() {
    push();
    stroke(0);
    push();
    fill(255);
    for (let i = 0; i < this.cities.length; i += 1) {
      this.cities[i].show();
    }
    pop();
    this.connect();
    this.show_current_best();
    pop();
  }

  show_current_best() {
    push();
    fill("#1C842C43");
    for (var i = 0; i < this.current_best.length; i += 1) {
      this.current_best[i].show();
    }
    pop();

    push();
    stroke("#00FF0550");
    strokeWeight(5);
    noFill();
    beginShape();
    for (let i = 0; i < this.current_best.length; i += 1) {
      vertex(this.current_best[i].position.x, this.current_best[i].position.y);
    }
    endShape();
    pop();
  }

  stats() {
    push();
    textAlign(CENTER, CENTER);
    noStroke();
    push();
    stroke(255, 255);
    fill(255);
    rect(width * 0.85, height * 0.5, width * 0.3, height);
    pop();
    push();
    fill(0);
    rect(width * 0.85, height * 0.1, width * 0.25, height * 0.1);
    fill(255);
    textSize(15);
    text(`Travelling Salesman Problem`, width * 0.85, height * 0.1);
    pop();

    push();
    fill(0);
    rect(width * 0.85, height * 0.5, width * 0.25, height * 0.65);
    fill(255);
    textSize(15);
    text(
      `
          Given a set of cities
          and distance between
          every pair of cities, 
          the problem is to find the 
          shortest possible route 
          that visits every city 
          exactly once and returns to 
          the starting point.
        `,
      width * 0.83,
      height * 0.35
    );
    text(
      `

      
          This solutions is probably one of 
          the worst. This one demonstrates 
          how much time it'll take if we keep
          swapping two cities in the path at a time 
          and recalculate the distance.


          Best current estimate is shown 
          in the box below :
        `,
      width * 0.83,
      height * 0.6
    );
    pop();

    push();
    fill("#1C6F22");
    rect(width * 0.85, height * 0.9, width * 0.25, height * 0.1);
    fill(0);
    textSize(30);
    text(
      `${round(this.record_distance * 100) / 100}`,
      width * 0.85,
      height * 0.9
    );
    pop();
    pop();
  }

  update(type) {
    switch (type) {
      case "random-swapping":
        this.random_swapping();
        break;
    }
  }

  /**
   * This is what needs to be done after showing the universe (not optimum at all) : 
   *  - Swap any two cities in one frame of animation at random
   *  - Calculate length of the route once again.
   *  - If calculated length turns out to be less than previous one, that's great : set record to the one you just got.
   *  - Do this many times and you'll probably get the shortest route in next life.
   */
  random_swapping() {
    let i = floor(random(data.cities.n));
    let j = floor(random(data.cities.n));
    // frameRate(10);
    this.swap(i, j);

    let d = this.length(this.cities);
    if (d < this.record_distance) {
      this.record_distance = d;
      this.current_best = this.cities.slice();
    }

    this.stats();
  }

  connect() {
    push();
    stroke(255);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let i = 0; i < this.cities.length; i += 1) {
      vertex(this.cities[i].position.x, this.cities[i].position.y);
    }
    endShape();
    pop();
  }

  // Swap two cities at indices i and j
  swap(i, j) {
    let temporary = this.cities[i];
    this.cities[i] = this.cities[j];
    this.cities[j] = temporary;
  }

  /**
   * Will calculate length of route that these cities take   
   * Distance between first one and last one measured along the path in which they are connected
   * a[0] is connected to a[1] and a[1] to a[2] and so on..
   */
  length(points) {
    let sum = 0;
    for (var i = 0; i < points.length - 1; i += 1) {
      let d = dist(
        points[i].position.x,
        points[i].position.y,
        points[i + 1].position.x,
        points[i + 1].position.y
      );
      sum += d;
    }
    return sum;
  }
}
