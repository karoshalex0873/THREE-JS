import * as THREE from 'three'



// 1.Creating a Scene
const scene=new THREE.Scene()


// 2. obejct which has matrial and geometry
const material=new THREE.MeshBasicMaterial({color:"#00ff83"})
const geometry=new THREE.SphereGeometry(3,64,64)

const mesh=new THREE.Mesh(geometry,material)
scene.add(mesh)

//light
const light= new THREE.PointLight(0xffffff,1,100)
light.position.set(0,10,10)
scene.add(light)

// Camera
const camera=new THREE.PerspectiveCamera(45,800/600)
camera.position.z=20
scene.add(camera)


// Renderer
const canvas=document.querySelector('.webgl') as  HTMLCanvasElement 
const renderer=new THREE.WebGLRenderer({canvas})
renderer.setSize(800,600)

renderer.render(scene,camera)
