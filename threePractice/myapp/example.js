import * as THREE from "https://unpkg.com/three@<VERSION>/build/three.module.js";

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 4;

var renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setClearColor("#000000");

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// Create a Cube Mesh with basic material
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: "#433F81" });
var cube = new THREE.Mesh(geometry, material);

// Add cube to Scene
scene.add(cube);

// Render Loop
var render = function () {
  requestAnimationFrame(render);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Render the scene
  renderer.render(scene, camera);
};

render();
