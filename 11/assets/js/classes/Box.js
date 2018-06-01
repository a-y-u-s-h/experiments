/* 
  Class: Box
  Arguments : (none)
  Fields : size, rotation_angle, shape, cover, light, mesh
  Methods: 
    1. Show : adds light and mesh to the scene
    2. Update : sets rotation of mesh, light's color and intensity and increases rotation angle according to speed.
*/ 
class Box {
  constructor() {
    this.size = 200;
    this.rotation_angle = 0;
    this.shape = new THREE.BoxGeometry(
      data.cube.size,
      data.cube.size,
      data.cube.size
    );
    this.cover = new THREE.MeshNormalMaterial();
    this.light = new THREE.AmbientLight(data.light.color, data.light.intensity);
    this.mesh = new THREE.Mesh(this.shape, this.cover);
  }

  show() {
    scene.add(this.light);
    scene.add(this.mesh);
  }

  update() {
    // this.mesh.size.set(data.cube.size, data.cube.size, data.cube.size);
    this.mesh.rotation.set(
      this.rotation_angle,
      this.rotation_angle,
      this.rotation_angle
    );
    this.light.color.set(data.light.color);
    this.light.intensity = data.light.intensity;
    this.rotation_angle += data.cube.rotation_speed;
  }
}
