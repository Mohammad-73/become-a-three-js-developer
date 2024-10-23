import * as THREE from "three";
import {
  OrbitControls,
  RectAreaLightHelper,
} from "three/examples/jsm/Addons.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const ambientLight = new THREE.AmbientLight();
ambientLight.color = new THREE.Color(0xffffff);
ambientLight.intensity = 0.5;
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
scene.add(hemisphereLight);

const pointLith = new THREE.PointLight(0xff9000, 0.5, 10, 2);
pointLith.position.set(1, -0.5, 1);
scene.add(pointLith);

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);

const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 6, Math.PI * 0.1, 0.25, 1);
spotLight.position.set(0, 2, 3);
scene.add(spotLight);

spotLight.target.position.x = -0.75;
scene.add(spotLight.target);

// Helpers
const hemisphereLightHelper = new THREE.HemisphereLightHelper(
  hemisphereLight,
  0.2
);
scene.add(hemisphereLightHelper);

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.2
);
scene.add(directionalLightHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLith, 0.2);
scene.add(pointLightHelper);

const SpotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(SpotLightHelper);

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);
/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera, updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);

// Clock
const clock = new THREE.Clock();

// Animation
const tick = () => {
  // Clock
  const elapsedTime = clock.getElapsedTime() / 2;

  // Update object
  sphere.rotation.y = elapsedTime;
  sphere.rotation.x = elapsedTime;
  cube.rotation.y = elapsedTime;
  cube.rotation.x = elapsedTime;
  torus.rotation.y = elapsedTime;
  torus.rotation.x = elapsedTime;

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
