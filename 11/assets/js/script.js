let camera, renderer, scene;

let data = {
  scene: {
    background: "#f0f0f0",
    follow_mouse: false
  },
  light: {
    color: "#C41616",
    intensity: 0.6
  },
  cube: {
    size: 200,
    rotation_speed: 0.01
  }
};

// To create ControlKit GUI
var controlKit;
var createControlKit = () => {
  controlKit = new ControlKit();
  controlKit
    .addPanel({
      fixed: false,
      label: "Parameter Controls"
    })
    .addColor(data["scene"], "background", {
      label: "Background"
    })
    .addCheckbox(data["scene"], "follow_mouse", {
      label: "Follow Mouse?"
    })
    // .addSubGroup({
    //   label: "Light Controls"
    // })
    // .addNumberInput(data["light"], "intensity", {
    //   label: "intensity",
    //   step: 0.01,
    //   dp: 2
    // })
    // .addColor(data["light"], "color", {
    //   label: "Color"
    // })
    .addSubGroup({
      label: "Cube Controls"
    })
    .addNumberInput(data["cube"], "rotation_speed", {
      label: "Rotation Speed",
      step: 0.001,
      dp: 3
    });
  // .addNumberInput(data, "a_spacing", {
  //   label: "Orbital Horizontal Spacing"
  // })
};

createControlKit();

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

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  let aspect_ratio = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, aspect_ratio, 100, 1000);
  camera.position.set(0, 0, 600);

  scene.add(camera);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.render(scene, camera);
}

let box = new Box();

var cursorX;
var cursorY;

function animate() {
  if (data.scene.follow_mouse) {
    document.onmousemove = function(e) {
      cursorX = e.pageX - window.innerWidth / 2;
      cursorY = -(e.pageY - window.innerHeight / 2);
    };
  } else {
    cursorX = 0;
    cursorY = 0;
  }
  box.show();
  box.update();
  scene.background = new THREE.Color(data.scene.background);

  box.mesh.position.x = cursorX;
  box.mesh.position.y = cursorY;

  scene.add(box.mesh);
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

init();
animate();
