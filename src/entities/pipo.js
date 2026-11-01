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

        // Body (Gummy Torso)
        const bodyGeo = new THREE.CapsuleGeometry(0.35, 0.45, 8, 16);
        this.bodyMesh = new THREE.Mesh(bodyGeo, gummyMaterial);
        this.bodyMesh.castShadow = true;
        this.bodyMesh.position.y = 0.45;
        this.mesh.add(this.bodyMesh);

        // Bald Head (Glossy, smooth sphere with shiny candy luster)
        const headGeo = new THREE.SphereGeometry(0.32, 16, 16);
        this.headMesh = new THREE.Mesh(headGeo, gummyMaterial);
        this.headMesh.position.set(0, 0.92, 0);
        this.headMesh.castShadow = true;
        this.mesh.add(this.headMesh);

        // Big Stylized Candy Beard (Fluffy sweet licorice / spun sugar beard)
        const beardMat = new THREE.MeshStandardMaterial({
            color: 0x5c2c16, // rich chocolate / gingerbread beard
            roughness: 0.4,
            metalness: 0.1
        });
        const beardGeo = new THREE.ConeGeometry(0.3, 0.42, 12);
        this.beardMesh = new THREE.Mesh(beardGeo, beardMat);
        this.beardMesh.rotation.x = Math.PI; // point downwards
        this.beardMesh.position.set(0, 0.72, 0.22);
        this.mesh.add(this.beardMesh);

        // Moustache
        const mustacheMat = new THREE.MeshStandardMaterial({ color: 0x3d1a0c, roughness: 0.3 });
        const stacheGeo = new THREE.TorusGeometry(0.12, 0.04, 8, 12, Math.PI);
        const stacheMesh = new THREE.Mesh(stacheGeo, mustacheMat);
        stacheMesh.rotation.z = Math.PI;
        stacheMesh.position.set(0, 0.88, 0.3);
        this.mesh.add(stacheMesh);

        // Cute Googly / Candy Eyes
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const pupilMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
        const eyeGeo = new THREE.SphereGeometry(0.06, 8, 8);
        const pupilGeo = new THREE.SphereGeometry(0.03, 8, 8);

        const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
        eyeL.position.set(-0.12, 0.98, 0.26);
        const pupL = new THREE.Mesh(pupilGeo, pupilMat);
        pupL.position.set(-0.12, 0.98, 0.31);

        const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
        eyeR.position.set(0.12, 0.98, 0.26);
        const pupR = new THREE.Mesh(pupilGeo, pupilMat);
        pupR.position.set(0.12, 0.98, 0.31);

        this.mesh.add(eyeL);
        this.mesh.add(pupL);
        this.mesh.add(eyeR);
        this.mesh.add(pupR);

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
        this.touchInputVector = new THREE.Vector2(0, 0);
        this.setupInputs();
        this.setupTouchControls();
    }

    setupInputs() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;

            if (e.code === 'Space') {
                this.triggerJumpAction();
            }

            if (e.code === 'KeyE') {
                this.triggerWhipAction();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }

    triggerJumpAction() {
        if (this.isGrounded) {
            this.jump();
        } else if (!this.isSlamming) {
            this.gelatinSlam();
        }
    }

    triggerWhipAction() {
        if (!this.isWhipping) {
            this.chicletazo();
        }
    }

    setupTouchControls() {
        const joystickZone = document.getElementById('joystick-zone');
        const stick = document.getElementById('joystick-stick');
        const btnJump = document.getElementById('btn-jump');
        const btnWhip = document.getElementById('btn-whip');

        if (btnJump) {
            const handleJump = (e) => {
                e.preventDefault();
                this.triggerJumpAction();
                btnJump.classList.add('pressed');
                setTimeout(() => btnJump.classList.remove('pressed'), 150);
            };
            btnJump.addEventListener('pointerdown', handleJump);
        }

        if (btnWhip) {
            const handleWhip = (e) => {
                e.preventDefault();
                this.triggerWhipAction();
                btnWhip.classList.add('pressed');
                setTimeout(() => btnWhip.classList.remove('pressed'), 150);
            };
            btnWhip.addEventListener('pointerdown', handleWhip);
        }

        if (joystickZone && stick) {
            let activePointerId = null;
            let startX = 0;
            let startY = 0;
            const maxRadius = 45;

            const onPointerDown = (e) => {
                activePointerId = e.pointerId;
                joystickZone.setPointerCapture(e.pointerId);
                const rect = joystickZone.getBoundingClientRect();
                startX = rect.left + rect.width / 2;
                startY = rect.top + rect.height / 2;
                onPointerMove(e);
            };

            const onPointerMove = (e) => {
                if (e.pointerId !== activePointerId) return;
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist > 0) {
                    const clampedDist = Math.min(dist, maxRadius);
                    const angle = Math.atan2(dy, dx);
                    const clampedX = Math.cos(angle) * clampedDist;
                    const clampedY = Math.sin(angle) * clampedDist;

                    stick.style.transform = `translate(${clampedX}px, ${clampedY}px)`;

                    // Normalized vector
                    this.touchInputVector.set(clampedX / maxRadius, clampedY / maxRadius);
                }
            };

            const onPointerUp = (e) => {
                if (e.pointerId !== activePointerId) return;
                activePointerId = null;
                stick.style.transform = `translate(0px, 0px)`;
                this.touchInputVector.set(0, 0);
            };

            joystickZone.addEventListener('pointerdown', onPointerDown);
            joystickZone.addEventListener('pointermove', onPointerMove);
            joystickZone.addEventListener('pointerup', onPointerUp);
            joystickZone.addEventListener('pointercancel', onPointerUp);
        }
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

        if (this.touchInputVector.lengthSq() > 0.04) {
            moveDir.x += this.touchInputVector.x;
            moveDir.z += this.touchInputVector.y;
        }

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
        if (this.headMesh) this.headMesh.scale.copy(this.scaleCurrent);
    }
}
