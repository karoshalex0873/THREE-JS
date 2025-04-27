import * as THREE from 'three'

const title = "3js course"


// 1 scene 
const scene = new THREE.Scene()

// object (geometry(shape) and material)
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: '#ffffff' })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// sizes
const sizes = {
  width: 800,
  height: 600
}
// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

const titleElement = document.getElementById('title');
const canvas = document.getElementById('webgl') as HTMLCanvasElement | null;


if (titleElement) {
  titleElement.innerHTML = title;
}

if (canvas instanceof HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas
  });
  renderer.setSize(sizes.width, sizes.height)
  renderer.render(scene, camera)
} else {
  console.error('Canvas element not found or is not a valid HTMLCanvasElement.');
}
