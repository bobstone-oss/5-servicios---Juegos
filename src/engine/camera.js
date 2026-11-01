import * as THREE from 'three';

export function createIsometricCamera() {
    const aspect = window.innerWidth / window.innerHeight;
    const d = 14;
    const camera = new THREE.OrthographicCamera(
        -d * aspect, d * aspect, d, -d, 1, 1000
    );

    camera.position.set(20, 20, 20);
    camera.lookAt(0, 0, 0);

    window.addEventListener('resize', () => {
        const newAspect = window.innerWidth / window.innerHeight;
        camera.left = -d * newAspect;
        camera.right = d * newAspect;
        camera.top = d;
        camera.bottom = -d;
        camera.updateProjectionMatrix();
    });

    return camera;
}
