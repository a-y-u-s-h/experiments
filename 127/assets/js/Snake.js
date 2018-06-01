class Snake {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.limitX = (Math.floor(width / data.snake.size) - 1) * data.snake.size;
    this.limitY = (Math.floor(height / data.snake.size) - 1) * data.snake.size;
    this.vx = data.snake.size;
    this.vy = 0;
    this.size = data.snake.size;
    this.cx = Math.floor(this.x + this.size * 0.5);
    this.cy = Math.floor(this.y + this.size * 0.5);
    this.body = [];
    this.positions = [];
    this.score = 0;
  }

  update() {
    this.size = data.snake.size;
    this.limitX = (Math.floor(width / data.snake.size) - 1) * data.snake.size;
    this.limitY = (Math.floor(height / data.snake.size) - 1) * data.snake.size;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x > this.limitX && this.vx > 0) {
      this.x = 0;
    }
    if (this.x < 0 && this.vx < 0) {
      this.x = this.limitX;
    }
    if (this.y > this.limitY && this.vy > 0) {
      this.y = 0;
    }
    if (this.y < 0 && this.vy < 0) {
      this.y = this.limitY;
    }
    // Required after showing.
    this.cx = Math.floor(this.x + this.size * 0.5);
    this.cy = Math.floor(this.y + this.size * 0.5);

      this.positions.push(new p5.Vector(this.x, this.y));
    if ( this.positions.length > this.body.length ) {
    this.positions.splice(1, 0);
    }
    this.trail();
  }

  show() {
    push();
    fill(data.snake.fill);
    stroke(data.snake.stroke.color);
    strokeWeight(data.snake.stroke.weight);
    rectMode(CENTER);
    this.show_score();
    rect(this.cx, this.cy, this.size, this.size);
    pop();

  }

  show_score()  {
    push();
    fill(0);
    rect(width - 100, height - 100, 150, 150);
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(50);
    text(`${this.score}`, width - 100, height - 100);
    pop();
  }

  trail() {
    if (this.body.length > 0) {
      for (var i = 0; i < this.body.length; i += 1) {
        let x = this.positions[this.positions.length - i - 1].x;
        let y = this.positions[this.positions.length - i - 1].y;
        this.body[i].i = i;
        this.body[i].follow(new p5.Vector(x, y));
        this.body[i].show();
      }
    }
  }

  dir(x, y) {
    this.vx = x * data.snake.size;
    this.vy = y * data.snake.size;
  }

  eats(food) {
    if (food !== null) {
      this.score++;
      if (this.body.length == 0) {
        this.body.push(new Block(this.cx, this.cy));
      } else {
        this.body.push(
          new Block(
            this.body[this.body.length - 1].x,
            this.body[this.body.length - 1].y
          )
        );
      }
    }
  }
}

class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.i = 0;
  }

  show() {
    push();
    fill(data.snake.fill);
    stroke(data.snake.stroke.color);
    rect(this.x, this.y, data.snake.size, data.snake.size);
    pop();
  }

  follow(leader) {
    this.x = leader.x;
    this.y = leader.y;
  }
}
