import * as THREE from 'three';

export class ParticleSystem {
    constructor(scene) {
        this.scene = scene;
        this.particles = [];
        this.sharedGeometry = new THREE.PlaneGeometry(0.12, 0.12);
        this.materials = [
            new THREE.MeshBasicMaterial({ color: 0xff69b4, side: THREE.DoubleSide }),
            new THREE.MeshBasicMaterial({ color: 0x00ffff, side: THREE.DoubleSide }),
            new THREE.MeshBasicMaterial({ color: 0xffd700, side: THREE.DoubleSide }),
            new THREE.MeshBasicMaterial({ color: 0x32cd32, side: THREE.DoubleSide }),
            new THREE.MeshBasicMaterial({ color: 0xff1493, side: THREE.DoubleSide })
        ];
    }

    createConfetti(position, count = 18) {
        for (let i = 0; i < count; i++) {
            const material = this.materials[Math.floor(Math.random() * this.materials.length)];
            const mesh = new THREE.Mesh(this.sharedGeometry, material);
            mesh.position.copy(position);
            mesh.position.x += (Math.random() - 0.5) * 0.4;
            mesh.position.z += (Math.random() - 0.5) * 0.4;

            const velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 6,
                Math.random() * 6 + 3,
                (Math.random() - 0.5) * 6
            );

            const rotSpeed = new THREE.Vector3(
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10
            );

            this.scene.add(mesh);
            this.particles.push({
                mesh,
                velocity,
                rotSpeed,
                life: 0.7,
                maxLife: 0.7
            });
        }
    }

    update(dt) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.life -= dt;

            if (p.life <= 0) {
                this.scene.remove(p.mesh);
                this.particles.splice(i, 1);
                continue;
            }

            p.velocity.y -= 15 * dt;
            p.mesh.position.addScaledVector(p.velocity, dt);

            p.mesh.rotation.x += p.rotSpeed.x * dt;
            p.mesh.rotation.y += p.rotSpeed.y * dt;
            p.mesh.rotation.z += p.rotSpeed.z * dt;

            p.mesh.scale.setScalar(p.life / p.maxLife);
        }
    }
}
