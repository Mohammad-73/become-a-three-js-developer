import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GroundedSkybox } from "three/addons/objects/GroundedSkybox.js";
import * as dat from "dat.gui";
import {
  GLTFLoader,
  DRACOLoader,
  RGBELoader,
  EXRLoader,
} from "three/examples/jsm/Addons.js";

console.log(GroundedSkybox);

/**
 * Debug
 */
const gui = new dat.GUI();
const global = {};

/**
 * Loaders
 */
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("./static/draco/");
dracoLoader.setDecoderConfig({ type: "js" });

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

const cubeTextureLoader = new THREE.CubeTextureLoader();
const rgbeLoader = new RGBELoader();
const exrLoader = new RGBELoader();
const textureLoader = new THREE.TextureLoader();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Update all materials
 */
const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (child.isMesh && child.material.isMeshStandardMaterial) {
      child.material.envMapIntensity = global.envMapIntensity;
    }
  });
};

/**
 * Environment map
 */
scene.backgroundBlurriness = 0;
scene.backgroundIntensity = 5;

gui.add(scene, "backgroundBlurriness").min(0).max(1).step(0.001);
gui.add(scene, "backgroundIntensity").min(0).max(10).step(0.001);

// Global intensity
global.envMapIntensity = 1;
gui
  .add(global, "envMapIntensity")
  .min(0)
  .max(10)
  .step(0.001)
  .onChange(updateAllMaterials);

// // LDR cube texture
// const environmentMap = cubeTextureLoader.load([
//   "./static/textures/door-182069_1280.jpg",
//   "./static/textures/door-182069_1280.jpg",
//   "./static/textures/door-182069_1280.jpg",
//   "./static/textures/door-182069_1280.jpg",
//   "./static/textures/door-182069_1280.jpg",
//   "./static/textures/door-182069_1280.jpg",
// ]);

// scene.environment = environmentMap;
// scene.background = environmentMap;

// // HDR (RGBE) equirectangular
// rgbeLoader.load(
//   "./static/models/environment-maps/urban_alley_01_1k.hdr",
//   (environmentMap) => {
//     environmentMap.mapping = THREE.EquirectangularReflectionMapping;

//     scene.environment = environmentMap;
//     scene.background = environmentMap;
//   }
// );

// // HDR (EXR) equirectangular
// exrLoader.load(
//   "./static/models/environment-maps/nvidiaCanvas-4k.exr",
//   (environmentMap) => {
//     environmentMap.mapping = THREE.EquirectangularReflectionMapping;

//     scene.background = environmentMap;
//     scene.environment = environmentMap;
//   }
// );

// // LDR equirectangular
// const environmentMap = new textureLoader.load(
//   "./static/models/blockadesLabsSkybox/anime_art.jpg/"
// );
// environmentMap.mapping = THREE.EquirectangularReflectionMapping;
// environmentMap.colorSpace = THREE.SRGBColorSpace

// scene.background = environmentMap;
// scene.environment = environmentMap;

// // Ground project skybox
// rgbeLoader.load(
//   "./static/models/environment-maps/urban_alley_01_1k.hdr",
//   (environmentMap) => {
//     environmentMap.mapping = THREE.EquirectangularReflectionMapping;
//     scene.environment = environmentMap;

//     // skybox
//     const skybox = new GroundedSkybox(environmentMap, 11, 120);
//     skybox.position.y = 11 - 0.01;
//     scene.add(skybox);

//     gui.add(skybox, "radius", 1, 200, 0.1).name("skyboxRadius");
//     gui.add(skybox, "height", 1, 200, 0.1).name("skyboxHeight");
//     // const skybox = new GroundedSkybox();
//     // skybox.scale.setScalar(50);
//     // scene.add(skybox);
//   }
// );

/**
 * Real time environment map
 */
const environmentMap = textureLoader.load(
  "./static/models/environment-maps/blender-2k.png"
);
environmentMap.mapping = THREE.EquirectangularReflectionMapping;
environmentMap.colorSpace = THREE.SRGBColorSpace;

scene.background = environmentMap;

/**
 * Objects
 */
const holyDonut = new THREE.Mesh(
  new THREE.TorusGeometry(8, 0.5),
  new THREE.MeshBasicMaterial({ color: new THREE.Color(10, 4, 2) })
);
holyDonut.layers.enable(1);
holyDonut.position.y = 3.5;
scene.add(holyDonut);

// Cube render target
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
  type: THREE.HalfFloatType,
});

scene.environment = cubeRenderTarget.texture;

// Cube camera
const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget);
cubeCamera.layers.set(1);

const torusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
  new THREE.MeshStandardMaterial({
    roughness: 0,
    metalness: 1,
    color: 0xaaaaaa,
  })
);
// torusKnot.material.envMap = environmentMap;
torusKnot.position.x = -4;
torusKnot.position.y = 4;

scene.add(torusKnot);

/**
 * Models
 */
gltfLoader.load(
  "./static/models/FlightHelmet/glTF/FlightHelmet.gltf",
  (gltf) => {
    gltf.scene.scale.set(10, 10, 10);
    scene.add(gltf.scene);

    updateAllMaterials();
  }
);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(2, 2, -1);
scene.add(directionalLight);

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
camera.position.set(4, 5, 4);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.y = 3.5;
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
  const elapsedTime = clock.getElapsedTime();

  // Real time environment map
  if (holyDonut) {
    holyDonut.rotation.x = Math.sin(elapsedTime) * 2;

    cubeCamera.update(renderer, scene);
  }

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
