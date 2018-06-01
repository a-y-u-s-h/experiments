let data = {
  sketch: {
    background: 0x111112
  }
};

let mouseX = 0,
  mouseY = 0;
let windowHalfX = window.innerWidth * 0.5;
let windowHalfY = window.innerHeight * 0.5;

class Sketch {
  constructor() {
    this.container = document.getElementById("container");
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.background;
    this.group;
  }

  include(thing) {
    this.group = thing;
    this.scene.add(thing);
  }

  init() {
    // Initializing Camera
    this.camera.position.z = 500;

    // Initializing Renderer
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    // Initializing Scene
    this.background = new THREE.CubeTextureLoader()
      .setPath("assets/media/img/background/")
      .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);
    this.background.format = THREE.RGBFormat;

    this.scene.background = this.background;
    let light = new THREE.AmbientLight(0xa3a3a3); // soft white light
    this.scene.add(light);

    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    this.camera.position.x += (mouseX - this.camera.position.x) * 0.1;
    this.camera.position.y += (-mouseY - this.camera.position.y) * 0.1;
    this.camera.lookAt(this.scene.position);

    if (this.group !== null) {
      this.group.rotation.y -= 0.005;
    }

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.animate());
  }
}

class Earth {
  constructor(cx, cy, cz) {
    this.origin = { x: cx, y: cy, z: cz };
    this.image = "assets/media/img/84.jpg";
    this.sketch;
    this.body = new THREE.Group();
    this.init();
  }

  init() {
    let shape = new THREE.SphereGeometry(220, 32, 32);
    let texture = new THREE.TextureLoader().load(this.image);
    let cover = new THREE.MeshPhongMaterial({
      map: texture,
      reflectivity: 1,
      shininess: 0.4
    });
    let body = new THREE.Mesh(shape, cover);
    this.body.add(body);
  }
}

let earth = new Earth(0, 0, 0);
let sketch = new Sketch();

sketch.init();
sketch.include(earth.body);
sketch.animate();

document.addEventListener("mousemove", onDocumentMouseMove, false);
document.addEventListener("resize", onWindowResize, false);

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  sketch.camera.aspect = window.innerWidth / window.innerHeight;
  sketch.camera.updateProjectionMatrix();
  sketch.renderer.setSize(window.innerWidth, window.innerHeight);
}
