import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { modelNormalMatrix } from "three/examples/jsm/nodes/Nodes.js";
const loader = new GLTFLoader();
// Canvas

const canvas = document.querySelector('canvas.webgl');
//Scene

const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight);


//Object 


const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "white"});
const mesh = new THREE.Mesh(geometry, material);
//second object
const geometry1 = new THREE.BoxGeometry(1, 1, 1);
const material1 = new THREE.MeshBasicMaterial({ color: "#FF69B4"});
const mesh1 = new THREE.Mesh(geometry1, material1);

//eyeball






//Sizes

const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
};


//Camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);
camera.position.y = 5;
camera.position.z = 25;
camera.position.x = 5.5;
scene.add(mesh);
mesh.position.y = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);

//animations

let eye;
loader.load('./assets/scene.gltf', function (gltf) {
  eye = gltf.scene;
  scene.add(eye);
  eye.scale.set (2, 2, 2);
  function animate() {
    requestAnimationFrame(animate);
    eye.lookAt(camera.position);
  }
  renderer.render(scene, camera);
  animate();
});


//clock

const clock = new THREE.Clock()

const tick = () =>
    {

        const elapsedTime = clock.getElapsedTime();

        //clock
        mesh.position.x = Math.cos(elapsedTime);

        mesh1.position.z = Math.sin(elapsedTime);
        mesh1.rotation.y = Math.sin(elapsedTime)
        ;

        renderer.render (scene, camera)
  
        
        window.requestAnimationFrame(tick)
    }
    tick()
    const controls = new OrbitControls(camera, renderer.domElement);


