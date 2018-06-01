class Conductor {
  constructor(center, start) {
    this.origin = center;
    this.start = start;
    this.position = this.origin.add(this.start);
  }

  rotate() {
    rotate(frameCount * data.dc.rotation_speed);
  }
}
