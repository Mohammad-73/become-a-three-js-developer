import "../../style.css";
import Experience from "./Experience/Experience";

const experience = new Experience(document.querySelector("canvas.webgl"));

// // --------------------------------------------------------------------------

// import "../../style.css";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/Addons.js";
// import * as dat from "dat.gui";
// import { GLTFLoader } from "three/examples/jsm/Addons.js";

// /**
//  * Loader
//  */
// const gltfLoader = new GLTFLoader();
// const textureLoader = new THREE.TextureLoader();
// const cubeTextureLoader = new THREE.CubeTextureLoader();

// /**
//  * Debug
//  */
// const gui = new dat.GUI();
// const debugObject = {};

// /**
//  * Base
//  */
// // Canvas
// const canvas = document.querySelector("canvas.webgl");

// // Scene
// const scene = new THREE.Scene();

// /**
//  * Update all materials
//  */
// const updateAllMaterials = () => {
//   scene.traverse((child) => {
//     if (
//       child instanceof THREE.Mesh &&
//       child.material instanceof THREE.MeshStandardMaterial
//     ) {
//       // Child.material.envMap = environmentMap;
//       child.material.envMap = debugObject.envMapIntensity;
//       child.material.needsUpdate = true;
//       child.castShadow = true;
//       child.receiveShadow = true;
//     }
//   });
// };

// /**
//  * Environments map
//  */
// const environmentMap = cubeTextureLoader.load([
//   "./static/textures/environmentMap/px.jpg",
//   "./static/textures/environmentMap/nx.jpg",
//   "./static/textures/environmentMap/py.jpg",
//   "./static/textures/environmentMap/ny.jpg",
//   "./static/textures/environmentMap/pz.jpg",
//   "./static/textures/environmentMap/nz.jpg",
// ]);

// environmentMap.colorSpace = THREE.SRGBColorSpace;

// // scene.background = environmentMap
// scene.environment = environmentMap;

// debugObject.envMapIntensity = 0.4;
// gui
//   .add(debugObject, "envMapIntensity")
//   .min(0)
//   .max(4)
//   .step(0.001)
//   .onChange(updateAllMaterials);

// /**
//  * Models
//  */
// let foxMixer = null;

// gltfLoader.load("./static/models/Fox/glTF/Fox.gltf", (gltf) => {
//   // Model
//   gltf.scene.scale.set(0.02, 0.02, 0.02);
//   scene.add(gltf.scene);

//   // Animation
//   foxMixer = new THREE.AnimationMixer(gltf.scene);
//   const foxAction = foxMixer.clipAction(gltf.animations[0]);
//   foxAction.play();

//   // Update materials
//   updateAllMaterials();
// });

// /**
//  * Floor
//  */
// const floorColorTexture = textureLoader.load(
//   "./static/textures/dirt/color.jpg"
// );
// floorColorTexture.colorSpace = THREE.SRGBColorSpace;
// floorColorTexture.repeat.set(1.5, 1.5);
// floorColorTexture.wrapS = THREE.RepeatWrapping;
// floorColorTexture.wrapT = THREE.RepeatWrapping;

// const floorNormalTexture = textureLoader.load(
//   "./static/textures/dirt/normal.jpg"
// );
// floorNormalTexture.repeat.set(1.5, 1.5);
// floorNormalTexture.wrapS = THREE.RepeatWrapping;
// floorNormalTexture.wrapT = THREE.RepeatWrapping;

// const floorGeometry = new THREE.CircleGeometry(5, 64);
// const floorMaterial = new THREE.MeshStandardMaterial({
//   map: floorColorTexture,
//   normalMap: floorNormalTexture,
// });
// const floor = new THREE.Mesh(floorGeometry, floorMaterial);
// floor.rotation.x = -Math.PI * 0.5;
// scene.add(floor);

// /**
//  * Lights
//  */
// const directionalLight = new THREE.DirectionalLight("#ffffff", 4);
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.far = 15;
// directionalLight.shadow.mapSize.set(1024, 1024);
// directionalLight.shadow.normalBias = 0.05;
// directionalLight.position.set(3.5, 2, -1.25);
// scene.add(directionalLight);

// gui
//   .add(directionalLight, "intensity")
//   .min(0)
//   .max(10)
//   .step(0.001)
//   .name("lightIntensity");
// gui
//   .add(directionalLight.position, "x")
//   .min(-5)
//   .max(5)
//   .step(0.001)
//   .name("lightX");
// gui
//   .add(directionalLight.position, "y")
//   .min(-5)
//   .max(5)
//   .step(0.001)
//   .name("lightY");
// gui
//   .add(directionalLight.position, "z")
//   .min(-5)
//   .max(5)
//   .step(0.001)
//   .name("lightZ");

// /**
//  * Sizes
//  */
// const sizes = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };

// window.addEventListener("resize", () => {
//   // Update sizes
//   sizes.width = window.innerWidth;
//   sizes.height = window.innerHeight;

//   // Update camera
//   camera.aspect = sizes.width / sizes.height;
//   camera, updateProjectionMatrix();

//   // Update renderer
//   renderer.setSize(sizes.width, sizes.height);
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// });

// /**
//  * Camera
//  */
// // Base Camera
// const camera = new THREE.PerspectiveCamera(
//   75,
//   sizes.width / sizes.height,
//   0.1,
//   100
// );
// camera.position.set(6, 4, 8);
// scene.add(camera);

// // Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
//   antialias: true,
// });
// renderer.toneMapping = THREE.CineonToneMapping;
// renderer.toneMappingExposure = 1.75;
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// renderer.setClearColor("#211d20");
// renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// /**
//  * Animate
//  */
// const clock = new THREE.Clock();
// let previousTime = 0;

// const tick = () => {
//   const elapsedTime = clock.getElapsedTime();
//   const deltaTime = elapsedTime - previousTime;
//   previousTime = elapsedTime;

//   // Update controls
//   controls.update();

//   // Fox animation
//   if (foxMixer) {
//     foxMixer.update(deltaTime);
//   }

//   // Render
//   renderer.render(scene, camera);

//   // Call tick again on the next frame
//   window.requestAnimationFrame(tick);
// };

// tick();
