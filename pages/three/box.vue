<template>
    <div ref="container" id="container">

    </div>
</template>

<script setup>
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const container = ref(null);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);



onMounted(() => {
    const controls = new OrbitControls(camera, container.value);

    controls.enableDamping = true;
    container.value.appendChild(renderer.domElement);

    const render = () => {
        renderer.render(scene, camera);
        controls.update();
        requestAnimationFrame(render);
    };
    render();
});
</script>

<style lang="scss" scoped>
#container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
</style>