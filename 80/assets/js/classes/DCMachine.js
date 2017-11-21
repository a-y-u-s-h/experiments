class DCMachine {
  constructor(cx, cy, size)  {
    this.position = new p5.Vector(cx, cy);
    this.cover = new Cover(cx, cy);
    this.armature = new Armature(cx, cy);
    this.commutator = new Commutator(cx, cy);
    this.poles = new Poles(cx, cy);
    this.shaft = new Shaft(cx, cy);
  }

  show()  {
    this.cover.show();
    this.poles.show();
    this.armature.show();
    this.commutator.show();
    this.shaft.show();
  }
}
