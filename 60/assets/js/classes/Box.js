class Box {
  constructor(x, y, z, size) {
    this.pos = new p5.Vector(x, y, z);
    this.size = size;
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    box(this.size);
    pop();
  }

  generate() {
    let boxes = [];
    for (var x = -1, upperLimit_x = 2; x < upperLimit_x; x += 1) {
      for (var y = -1, upperLimit_y = 2; y < upperLimit_y; y += 1) {
        for (var z = -1, upperLimit_z = 2; z < upperLimit_z; z += 1) {
          let size = this.size / 3;
          let sum = abs(x) + abs(y) + abs(z);

          if (sum <= 1) {
            boxes.push(
              new Box(
                this.pos.x + x * size,
                this.pos.y + y * size,
                this.pos.z + z * size,
                size
              )
            );
          }
        }
      }
    }
    return boxes;
  }
}
