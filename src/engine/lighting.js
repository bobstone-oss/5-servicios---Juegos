import * as THREE from 'three';

export function setupLighting(scene) {
    const ambientLight = new THREE.AmbientLight(0xfff0f5, 0.95);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(15, 25, 15);
    dirLight.castShadow = true;

    // Performance optimized shadow map size
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 80;

    const d = 25;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;

    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xadd8e6, 0.45);
    fillLight.position.set(-15, 10, -15);
    scene.add(fillLight);

    return { dirLight, ambientLight };
}
