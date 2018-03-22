let c_1 = s => {
  with (s) {
    s.setup = () => {
      noCanvas();
      rectMode(CENTER);
      angleMode(DEGREES);
      textAlign(CENTER, CENTER);
      noStroke();
      fill(0);
      textSize(13);
      ngram = new NGram(0, 0);
    };

    s.draw = () => {
      background(255);
      ngram.run();
    };

    class NGram {
      constructor(x, y) {
        this.position = new p5.Vector(x, y);
        this.grams = [];
        this.n = 2;
        this.inputs = {
          order: null,
          txt: null
        };
        width = window.innerWidth;
        height = window.innerHeight;
        this.gui();
      }

      gui() {
        this.inputs.order = createInput(2);
        this.inputs.order.position(width * 0.4, 30);
        this.inputs.txt = createInput("Write something");
        this.inputs.txt.position(width * 0.6, 30);
      }

      get_grams(data, n) {
        let result = [];
        for (let i = 0; i < data.length; i += 1) {
          if (i + n - 1 < data.length) {
            let segment = data.substring(i, i + n);
            segment = segment.replace(/\s/g, " ▌ ");
            result.push(segment);
          }
        }
        return result;
      }

      run() {
        width = window.innerWidth;
        height = window.innerHeight;
        if (Number(this.inputs.order.value()) > 0) {
          this.n = Number(this.inputs.order.value());
        }
        this.grams = this.get_grams(this.inputs.txt.value(), this.n);
        this.show();
      }

      show() {
        push();
        translate(this.position.x, this.position.y);

        for (let i = 0; i < this.grams.length; i += 1) {
          push();
          translate(width * 0.039 + i * 20 + this.n * 3 * 4 * i, height * 0.12);
          fill(0);
          rect(0, 0, 30 + Math.pow(this.n, 2), 30);
          fill(255);
          text(this.grams[i], 0, 0);
          pop();
        }
        pop();
      }
    }
  }
};

let canvas_1 = new p5(c_1);
