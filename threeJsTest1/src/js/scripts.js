import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

import nebula from '../img/nebula.jpg';
import stars from '../img/stars.jpg';
import stars2 from '../img/stars2.jpg';
import stars3 from '../img/stars3.jpg';
import stars4 from '../img/stars4.jpg';
import stars5 from '../img/stars5.jpg';

const earthURL = new URL('../assets/earth.glb',import.meta.url);
const cesURL = new URL('../assets/ces.gltf',import.meta.url);

const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(-10, 30, 30);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xb2368c });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
//box.position.set(0,5,0);
//box.receiveShadow = true;
//box.castShadow = true;
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(60, 60);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 'GREEN',
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -.5 * Math.PI;
plane.receiveShadow = true;

const gridHelper = new THREE.GridHelper(30, 10);
scene.add(gridHelper);

const sphereGeometry = new THREE.SphereGeometry(4);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000FF,
    wireframe: false
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.castShadow = true;

sphere.position.set(-10, 10, 0);

const ambientLight = new THREE.AmbientLight(0xff0000);
scene.add(ambientLight);

/*
const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
scene.add(directionalLight);
directionalLight.position.set(-30, 50, 0);
directionalLight.castShadow = true;
//directionalLight.shadow.camera.top = 1;
directionalLight.shadow.camera.bottom = -12;

const dLightHelper = new THREE.DirectionalLightHelper(directionalLight,5);
scene.add(dLightHelper);

const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(dLightShadowHelper);
*/

/**/
const spotLight = new THREE.SpotLight("0XFFFFFF");
scene.add(spotLight);
spotLight.position.set(-100, 100, 0);
spotLight.intensity = 50000;
spotLight.angle = 0.15;
spotLight.castShadow = true;

const sLightHelper = new THREE.SpotLightHelper(spotLight);
//scene.add(sLightHelper);

//fogs
//scene.fog = new THREE.Fog(0xFFFFFF, 0,200);
scene.fog = new THREE.FogExp2(0xFFFFFF, 0.01);

//renderer.setClearColor(0XFFffff);

const textureLoader = new THREE.TextureLoader();
//scene.background = textureLoader.load(stars);
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    stars5,
    stars5,
    stars5,
    stars5,
    stars5,
    stars5
]);

const box2Geometry = new THREE.BoxGeometry(5, 5, 5);
const box2Material = new THREE.MeshBasicMaterial({
    //color: 0x00FF00,
    //map: textureLoader.load(nebula)
});
const box2MultiMaterial = [
    new THREE.MeshBasicMaterial({ map: textureLoader.load(stars5) }),
    new THREE.MeshBasicMaterial({ map: textureLoader.load(stars5) }),
    new THREE.MeshBasicMaterial({ map: textureLoader.load(stars4) }),
    new THREE.MeshBasicMaterial({ map: textureLoader.load(stars5) }),
    new THREE.MeshBasicMaterial({ map: textureLoader.load(stars4) }),
    new THREE.MeshBasicMaterial({ map: textureLoader.load(stars5) })
];
const box2 = new THREE.Mesh(box2Geometry, box2MultiMaterial);
scene.add(box2);
box2.position.set(0, 15, 10);
//box2.material.map = textureLoader.load(nebula);

const plane2Geometry = new THREE.PlaneGeometry(20, 20, 10, 10);
const plane2Material = new THREE.MeshStandardMaterial({
    color: 0x8ce236,
    wireframe: false,
    side: THREE.DoubleSide
});
const plane2 = new THREE.Mesh(plane2Geometry, plane2Material);
scene.add(plane2);
plane2.castShadow = true;
plane2.receiveShadow = true;
plane2.position.set(7, 5, 0);
plane2.rotation.x = -.5 * Math.PI;
const lastPointZ = plane2.geometry.attributes.position.array.length - 1;

const sphere2Geometry = new THREE.SphereGeometry(4);

/*
const vShader = `
void main(){
gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fShader = `
void main(){
gl_FragColor = vec4(0.5, 0.5, 1.0, 1.0);
}
`;
*/


const sphere2Material = new THREE.ShaderMaterial({
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
});
const sphere2 = new THREE.Mesh(sphere2Geometry, sphere2Material);
scene.add(sphere2);
sphere2.position.set(-7, 10, 10);

const assetLoader = new GLTFLoader();
assetLoader.load(earthURL.href, function(gltf){
    const model = gltf.scene;
    scene.add(model);
    model.position.set(-12, 4 , 10);
    model.scale.set(15,15,15);
}, undefined, function(error){console.error(error)});

const assetLoader2 = new GLTFLoader();
assetLoader2.load(cesURL.href, function(gltf){
    const model2 = gltf.scene;
    scene.add(model2);
    model2.position.set(-12, 0 , -10);
    model2.rotation.set(0,90,0);
    model2.scale.set(15,15,15);
    model2.castShadow = true;
    model2.receiveShadow = true;
}, undefined, function(error){console.error(error)});

const gui = new dat.GUI();

const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01,
    angle: 0.13,
    penumbra: 1,
    intensity: 20000
};

gui.addColor(options, 'sphereColor').onChange(function (e) {
    sphere.material.color.set(e);
});

gui.add(options, 'wireframe').onChange(function (e) {
    sphere.material.wireframe = e;
});

gui.add(options, 'speed', 0.01, 0.05);

//gui for the spotLight
gui.add(options, 'angle', 0, 1);
gui.add(options, 'penumbra', 0, 1);
gui.add(options, 'intensity', 1, 50000);

let step = 0;

const mousePosition = new THREE.Vector2();

window.addEventListener('mousemove', function (e) {
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

const rayCaster = new THREE.Raycaster();

const sphereId = sphere.id;
box2.name = 'theBox2';


function animate(time) {
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;

    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));

    //for our spotLight
    spotLight.angle = options.angle;
    spotLight.penumbra = options.penumbra;
    spotLight.intensity = options.intensity;
    sLightHelper.update();

    rayCaster.setFromCamera(mousePosition, camera);
    const intersects = rayCaster.intersectObjects(scene.children);
    console.log(intersects);

    let sphereFound = false;

    for (let i = 0; i < intersects.length; i++) {
        //if the mouse hovers over the sphere, it will change color
        if (intersects[i].object.id === sphereId) {
            intersects[i].object.material.color.set('yellow');
            sphereFound = true;
        }
        if (!sphereFound) {
            sphere.material.color.set(0xFFC0CB);
        }


        //if the mouse hovers over the box, it will rotate
        if (intersects[i].object.name === 'theBox2') {
            intersects[i].object.rotation.x = time / 1000;
            intersects[i].object.rotation.y = time / 1000;
        }
    }

    //animate plane2... points are rising randomly
    //plane2.geometry.attributes.position.array[0] = 10 * Math.random();//x value of hte first point in plane 2
    //plane2.geometry.attributes.position.array[1] = 10 * Math.random();//y value of hte first point in plane 2
    plane2.geometry.attributes.position.array[2] = 2 * Math.random();//z value of hte first point in plane 2
    plane2.geometry.attributes.position.array[86] = 3 * Math.random();
    plane2.geometry.attributes.position.array[137] = 4 * Math.random();
    plane2.geometry.attributes.position.array[lastPointZ] = 2 * Math.random();
    plane2.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize',function(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
