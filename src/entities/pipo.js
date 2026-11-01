import * as THREE from 'three';

export class PipoPlayer {
    constructor(scene, soundManager, particleSystem) {
        this.scene = scene;
        this.soundManager = soundManager;
        this.particles = particleSystem;

        this.mesh = new THREE.Group();

        // Strawberry Gummy Bear Material with High-End Translucency and Specular Reflection
        const gummyMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xff1e43,
            roughness: 0.1,
            metalness: 0.05,
            transmission: 0.65,
            thickness: 0.8,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            ior: 1.45
        });

        // Body
        const bodyGeo = new THREE.CapsuleGeometry(0.4, 0.5, 8, 16);
        this.bodyMesh = new THREE.Mesh(bodyGeo, gummyMaterial);
        this.bodyMesh.castShadow = true;
        this.bodyMesh.position.y = 0.5;
        this.mesh.add(this.bodyMesh);

        // Bear Ears
        const earGeo = new THREE.SphereGeometry(0.15, 12, 12);
        const earL = new THREE.Mesh(earGeo, gummyMaterial);
        earL.position.set(-0.25, 0.9, 0);
        const earR = new THREE.Mesh(earGeo, gummyMaterial);
        earR.position.set(0.25, 0.9, 0);
        this.mesh.add(earL);
        this.mesh.add(earR);

        // Shiny metallic candy wrapper cape
        const capeMat = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            roughness: 0.2,
            metalness: 0.8
        });
        const capeGeo = new THREE.PlaneGeometry(0.5, 0.7);
        this.capeMesh = new THREE.Mesh(capeGeo, capeMat);
        this.capeMesh.position.set(0, 0.5, -0.35);
        this.capeMesh.rotation.x = Math.PI * 0.1;
        this.mesh.add(this.capeMesh);

        // Whip Elastic Arm Mesh (Chicletazo)
        const whipGeo = new THREE.CylinderGeometry(0.08, 0.08, 3, 8);
        const whipMat = new THREE.MeshStandardMaterial({ color: 0xff1493, roughness: 0.2 });
        this.whipMesh = new THREE.Mesh(whipGeo, whipMat);
        this.whipMesh.rotation.x = Math.PI / 2;
        this.whipMesh.position.set(0, 0.5, 1.5);
        this.whipMesh.visible = false;
        this.mesh.add(this.whipMesh);

        this.scene.add(this.mesh);

        // Physics & Controls
        this.position = this.mesh.position;
        this.velocity = new THREE.Vector3();
        this.isGrounded = false;
        this.isSlamming = false;
        this.isWhipping = false;
        this.whipTimer = 0;
        this.speed = 8.5;
        this.jumpForce = 11.5;
        this.gravity = 28.0;

        // Stats
        this.health = 3;
        this.maxHealth = 3;
        this.coins = 0;
        this.sparks = 0;

        // Squash & Stretch
        this.scaleTarget = new THREE.Vector3(1, 1, 1);
        this.scaleCurrent = new THREE.Vector3(1, 1, 1);

        this.keys = {};
        this.setupInputs();
    }

    setupInputs() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;

            if (e.code === 'Space') {
                if (this.isGrounded) {
                    this.jump();
                } else if (!this.isSlamming) {
                    this.gelatinSlam();
                }
            }

            if (e.code === 'KeyE' && !this.isWhipping) {
                this.chicletazo();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }

    jump(force = this.jumpForce) {
        this.velocity.y = force;
        this.isGrounded = false;
        this.scaleCurrent.set(0.6, 1.5, 0.6);
        if (this.soundManager) this.soundManager.play('jump');
    }

    gelatinSlam() {
        this.isSlamming = true;
        this.velocity.y = -22.0;
        if (this.soundManager) this.soundManager.play('slam');
    }

    chicletazo() {
        this.isWhipping = true;
        this.whipTimer = 0.25;
        this.whipMesh.visible = true;
        if (this.soundManager) this.soundManager.play('whip');
    }

    takeDamage() {
        this.health--;
        this.scaleCurrent.set(1.4, 0.5, 1.4);
        if (this.soundManager) this.soundManager.play('damage');
        return this.health;
    }

    update(dt, platforms = []) {
        const moveDir = new THREE.Vector3();
        if (this.keys['KeyW'] || this.keys['ArrowUp']) moveDir.z -= 1;
        if (this.keys['KeyS'] || this.keys['ArrowDown']) moveDir.z += 1;
        if (this.keys['KeyA'] || this.keys['ArrowLeft']) moveDir.x -= 1;
        if (this.keys['KeyD'] || this.keys['ArrowRight']) moveDir.x += 1;

        if (moveDir.lengthSq() > 0) {
            moveDir.normalize();

            const isoX = (moveDir.x - moveDir.z) * 0.7071;
            const isoZ = (moveDir.x + moveDir.z) * 0.7071;

            this.velocity.x = isoX * this.speed;
            this.velocity.z = isoZ * this.speed;

            const targetAngle = Math.atan2(isoX, isoZ);
            this.mesh.rotation.y = targetAngle;
        } else {
            this.velocity.x *= 0.8;
            this.velocity.z *= 0.8;
        }

        this.velocity.y -= this.gravity * dt;

        this.position.x += this.velocity.x * dt;
        this.position.z += this.velocity.z * dt;
        this.position.y += this.velocity.y * dt;

        this.isGrounded = false;
        const playerRadius = 0.4;
        const playerHeight = 1.0;

        for (const plat of platforms) {
            const b = plat.box;
            if (!b) continue;

            if (this.position.x + playerRadius > b.min.x &&
                this.position.x - playerRadius < b.max.x &&
                this.position.z + playerRadius > b.min.z &&
                this.position.z - playerRadius < b.max.z) {

                if (this.position.y <= b.max.y && this.position.y + playerHeight >= b.min.y) {
                    if (this.velocity.y <= 0 && this.position.y >= b.max.y - 0.4) {
                        this.position.y = b.max.y;
                        this.velocity.y = 0;
                        this.isGrounded = true;

                        if (this.isSlamming) {
                            this.scaleCurrent.set(1.6, 0.4, 1.6);
                            if (this.particles) this.particles.createConfetti(this.position, 12);
                            this.isSlamming = false;

                            if (plat.isBouncy) {
                                this.jump(20.0);
                            }
                        } else if (plat.isBouncy) {
                            this.jump(16.0);
                        }
                    }
                }
            }
        }

        if (this.isWhipping) {
            this.whipTimer -= dt;
            if (this.whipTimer <= 0) {
                this.isWhipping = false;
                this.whipMesh.visible = false;
            }
        }

        if (this.capeMesh) {
            this.capeMesh.rotation.x = Math.PI * 0.1 + Math.sin(Date.now() * 0.01) * 0.1 + (this.velocity.length() * 0.02);
        }

        this.scaleCurrent.lerp(this.scaleTarget, dt * 10);
        this.bodyMesh.scale.copy(this.scaleCurrent);
    }
}
