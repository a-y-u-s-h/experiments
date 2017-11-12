class Node {
  constructor(value, x = 0, y = 0) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.x = x;
    this.y = y;
    this.parent = null;
    this.counter = 1;
  }

  display(branch) {
    push();
    translate(this.x, this.y);
    scale(map(branch, 1, 10, 0.4, 0.1))
    if (data.tree.node.stroke.check) {
      stroke(data.tree.node.stroke.color);
    } else {
      noStroke();
    }
    if (data.tree.node.fill.check) {
      fill(data.tree.node.fill.color);
    } else {
      noFill();
    }
    rect(0, 0, data.tree.node.size, data.tree.node.size);

    push();
    noStroke();
    fill(data.tree.node.textColor);
    textSize(data.tree.node.textSize);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(this.value, 0, 0);
    pop();
    pop();
    push();
    if (this.left !== null) {
      this.left.display(branch + 1);
    }

    if (this.right !== null) {
      this.right.display(branch + 1);
    }
    pop();
  }

  connect(branch) {
    push();
    stroke(0);
    if (this.parent !== null) {
      line(this.parent.x, this.parent.y, this.x, this.y);
    }
    if (this.left !== null) {
      this.left.connect(branch + 1);
    }

    if (this.right !== null) {
      this.right.connect(branch + 1);
    }
    pop();
  }

  addNode(n, branch = 1) {
    if (n.value < this.value) {
      if (this.left == null) {
        let x = this.x - (data.tree.branch.r * (100 - branch * 10) * 0.01) * cos(data.tree.branch.angle.left - 90/branch);
        let y = this.y + (data.tree.branch.r * (100 - branch * 10) * 0.01) * sin(data.tree.branch.angle.left + 90/branch);
        this.left = n;
        this.left.x = x;
        this.left.y = y;
        this.left.parent = this;
      } else {
        this.left.addNode(n, branch + 1);
      }
    } else if (n.value > this.value) {
      if (this.right == null) {
        let x = this.x + (data.tree.branch.r * (100 - branch * 10) * 0.01) * cos(data.tree.branch.angle.right - 90/branch);
        let y = this.y + (data.tree.branch.r * (100 - branch * 10) * 0.01) * sin(data.tree.branch.angle.right + 90/branch);
        this.right = n;
        this.right.x = x;
        this.right.y = y;
        this.right.parent = this;
      } else {
        this.right.addNode(n, branch + 1);
      }
    }
  }

  visit() {
    if (this.left !== null) {
      this.left.visit();
    }
    this.display(1);
    // this.displaySequence(1);
    if (this.right !== null) {
      this.right.visit();
    }
  }

  displaySequence(number)  {
    push();
    translate(width * 0.2, height * 0.1 + number * 0.05 * height);
    if (data.tree.node.stroke.check) {
      stroke(data.tree.node.stroke.color);
    } else {
      noStroke();
    }
    if (data.tree.node.fill.check) {
      fill(data.tree.node.fill.color);
    } else {
      noFill();
    }
    rect(0, 0, data.tree.node.size, data.tree.node.size);

    push();
    noStroke();
    fill(data.tree.node.textColor);
    textSize(data.tree.node.textSize);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(this.value, 0, 0);
    pop();
    pop();
    push();

    
    if (this.left !== null) {
      this.left.displaySequence(number + 1);
    }

    if (this.right !== null) {
      this.right.displaySequence(number + 1);
    }
    pop();

    pop();
  }

  search(val) {
    if (this.value == val) {
      return this;
    } else {
      if (this.left !== null && val < this.value) {
        return this.left.search(val);
      } else if (this.right !== null && val > this.value) {
        return this.right.search(val);
      }
    }
  }
}
