/**
 * Experiment 11 : 3D Rotating Cube with Three.js
 *
 * Description : 
 *
 *    It's something that pretty much every beginner makes while learning Three.js - A rotating Cube. 
 *    I didn't even add extensive controls to it while making this one. I'll do that some other day.
 *
 * Remarks: 
 *
 *    I did make a similar one in September last year, but even after making it that day, 
 *    I didn't understand a thing that I typed, 
 *    because back then I was a beginner in programming itself and was trying to learn three.js without any knowledge of OOP whatsover. 
 *    Now it feels like a piece of cake.
 */

// Variables required to render a 3D scene
let camera, renderer, scene;

// Data for this experiment
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
    .addSubGroup({
      label: "Cube Controls"
    })
    .addNumberInput(data["cube"], "rotation_speed", {
      label: "Rotation Speed",
      step: 0.001,
      dp: 3
    });
};
createControlKit();

/*
  Setup function of this sketch.
*/
function init() {
  // Creating a scene and setting its default background color.
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  // Creating a camera and setting its position
  let aspect_ratio = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, aspect_ratio, 100, 1000);
  camera.position.set(0, 0, 600);

  // Adding scene to camera
  scene.add(camera);

  // Creating a renderer and setting its size
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Appending the renderer to body
  document.body.appendChild(renderer.domElement);

  // render will accept two arguments to render everything :  scene and camera
  renderer.render(scene, camera);
}

// Creating a box
let box = new Box();

/* 
  These variables will store mouse coordinates if data.scene.follow_mouse is true.
  Otherwise, these two will be zero, shifting the cube to center of screen.
*/
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
  // Adding box mesh and light to scene
  box.show();

  // Animating it
  box.update();

  // Updating scene background according to Control GUI
  scene.background = new THREE.Color(data.scene.background);

  // Making box follow the mouse, whenever GUI allows it.
  box.mesh.position.x = cursorX;
  box.mesh.position.y = cursorY;

  // Adding box's mesh to scene, animating it at 60FPS and then rendering the scene
  scene.add(box.mesh);
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

init();
animate();
