import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; // ✅ correct import
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // ✅ correct import

// Scene
const scene = new THREE.Scene();

// Loaders
const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();

// Textures for the cube
const brickTexture = textureLoader.load('https://img.pikbest.com/wp/202346/fabric-texture-gold-in-3d-form_9617663.jpg!w700wp'); // Replace with actual texture URL
brickTexture.repeat.set(1, 1);
brickTexture.wrapS = THREE.RepeatWrapping;
brickTexture.wrapT = THREE.RepeatWrapping;

// Material for the cube
const material = new THREE.MeshStandardMaterial({
  map: brickTexture,
  bumpMap: brickTexture,
  bumpScale: 0.2,
});

// Objects (Cube)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Load a GLB model (TV)
gltfLoader.load(
  '/desk.glb',   // <-- can load .gltf the same way!
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    // Resize model (optional)
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 1 / maxDim;
    model.scale.setScalar(scale);
    model.position.set(2, 0, 0);

    // Apply custom texture manually
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mesh = child;
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.map = brickTexture;    // apply your loaded texture
          mesh.material.needsUpdate = true;    // must call this
        }
      }
    });
  },
  (progress) => {
    console.log('Loading model...', (progress.loaded / progress.total) * 100, '%');
  },
  (error) => {
    console.error('Error loading GLTF model:', error);
  }
);


// Sizes
const sizes = { width: window.innerWidth, height: window.innerHeight };

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 3;3.
// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Direct light
directionalLight.position.set(2, 2, 2);
scene.add(directionalLight);

// Renderer
const canvas = document.getElementById('webgl') as HTMLCanvasElement | null;
const renderer = new THREE.WebGLRenderer({ canvas: canvas! });
renderer.setSize(sizes.width, sizes.height);

// Controls
const controls = new OrbitControls(camera, canvas!);
controls.enableDamping = true;

// Handle window resizing
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const deltaTime = clock.getDelta(); // Get time difference for smooth animation

  mesh.rotation.y += 0.3 * deltaTime; // Rotate the cube

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
