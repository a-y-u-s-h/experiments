class Tree {
  constructor(rx = 0, ry = 0) {
    this.root = null;
    this.rx = rx;
    this.ry = ry;
  }

  put(value) {
    let node = new Node(value);
    if (this.root == null) {
      this.root = node;
      this.root.x = this.rx;
      this.root.y = this.ry;
    } else {
      this.root.addNode(node);
    }
  }

  traverse() {
    if (this.root !== null) {
      this.root.visit();
    }
  }

  search(value) {
    if (this.root !== null) {
      return this.root.search(value);
    }
  }

  display() {
    if (this.root !== null) {
      this.root.display(1);
    }
  }

  displaySequence() {
    if ( this.root !== null ) {
    this.root.displaySequence(1);
    }
  }

  connect() {
    if (this.root !== null) {
      this.root.connect(1);
    }
  }
}
