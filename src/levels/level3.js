import * as THREE from 'three';

export class Level3DarkChocolatePeak {
    constructor(scene) {
        this.scene = scene;
        this.group = new THREE.Group();
        this.scene.add(this.group);

        this.platforms = [];
        this.coins = [];
        this.sparks = [];
        this.crumblingPlatforms = [];
        this.boss = null;
        this.bossProjectiles = [];
        this.goal = null;

        this.buildLevel();
    }

    buildLevel() {
        const chocolateMat = new THREE.MeshStandardMaterial({ color: 0x3d2314, roughness: 0.4 });
        const waferMat = new THREE.MeshStandardMaterial({ color: 0xd2b48c, roughness: 0.7 });
        const saltMat = new THREE.MeshStandardMaterial({ color: 0xd0d0d0, roughness: 0.9 });
        const sparkMat = new THREE.MeshStandardMaterial({ color: 0x00ffff, roughness: 0.1, emissive: 0x008888 });

        this.createFloatingIsland(0, 0, 0, 6, 1, 6, chocolateMat, 0x221208);

        const wafer1 = this.createFloatingIsland(0, 0, 8, 4, 0.4, 4, waferMat, 0x5c3a21);
        wafer1.isCrumbling = true;
        wafer1.timer = 1.5;
        this.crumblingPlatforms.push(wafer1);

        const wafer2 = this.createFloatingIsland(0, 1, 15, 4, 0.4, 4, waferMat, 0x5c3a21);
        wafer2.isCrumbling = true;
        wafer2.timer = 1.5;
        this.crumblingPlatforms.push(wafer2);

        this.createFloatingIsland(0, 2, 28, 14, 1, 14, chocolateMat, 0x221208);

        this.buildClouds();

        const bossGroup = new THREE.Group();
        const bossBodyGeo = new THREE.DodecahedronGeometry(1.2);
        const bossBodyMesh = new THREE.Mesh(bossBodyGeo, saltMat);
        bossBodyMesh.castShadow = true;
        bossGroup.add(bossBodyMesh);

        const staffGeo = new THREE.CylinderGeometry(0.1, 0.1, 3.0);
        const staffMesh = new THREE.Mesh(staffGeo, waferMat);
        staffMesh.position.set(1.2, 0, 0);
        bossGroup.add(staffMesh);

        bossGroup.position.set(0, 4.0, 32);
        this.group.add(bossGroup);

        this.boss = {
            group: bossGroup,
            health: 3,
            maxHealth: 3,
            attackTimer: 2.0,
            isDefeated: false
        };

        const sparkPositions = [
            [0, 1.5, 8],
            [0, 2.5, 15],
            [4, 3.5, 28]
        ];
        const sparkGeo = new THREE.OctahedronGeometry(0.4);
        for (const pos of sparkPositions) {
            const spark = new THREE.Mesh(sparkGeo, sparkMat);
            spark.position.set(...pos);
            this.group.add(spark);
            this.sparks.push(spark);
        }

        const shardGeo = new THREE.ConeGeometry(1.0, 2.5, 6);
        const shardMat = new THREE.MeshPhysicalMaterial({
            color: 0xffd700,
            transmission: 0.8,
            roughness: 0.1,
            clearcoat: 1.0
        });
        this.goal = new THREE.Mesh(shardGeo, shardMat);
        this.goal.position.set(0, 5.0, 32);
        this.goal.visible = false;
        this.group.add(this.goal);
    }

    createFloatingIsland(x, y, z, w, h, d, topMaterial, rockColor = 0x221208) {
        const islandGroup = new THREE.Group();
        islandGroup.position.set(x, y, z);

        const topGeo = new THREE.BoxGeometry(w, h, d);
        const topMesh = new THREE.Mesh(topGeo, topMaterial);
        topMesh.receiveShadow = true;
        topMesh.castShadow = true;
        islandGroup.add(topMesh);

        const rockGeo = new THREE.ConeGeometry(Math.min(w, d) * 0.65, 3.8, 5);
        const rockMat = new THREE.MeshStandardMaterial({
            color: rockColor,
            roughness: 0.95,
            flatShading: true
        });
        const rockMesh = new THREE.Mesh(rockGeo, rockMat);
        rockMesh.rotation.x = Math.PI;
        rockMesh.position.set(0, -2.1, 0);
        rockMesh.castShadow = true;
        islandGroup.add(rockMesh);

        this.group.add(islandGroup);

        const box = new THREE.Box3().setFromObject(topMesh);
        const platform = { mesh: islandGroup, topMesh, box, isBouncy: false };
        this.platforms.push(platform);
        return platform;
    }

    buildClouds() {
        this.clouds = [];
        const cloudMat = new THREE.MeshStandardMaterial({
            color: 0xefdcd5,
            roughness: 0.3,
            metalness: 0.05,
            transparent: true,
            opacity: 0.75
        });

        const cloudPuffs = [
            [-18, -3, 6], [18, -1, 14], [-20, 1, 24], [20, 2, 34], [-15, 3, 40]
        ];

        for (const [cx, cy, cz] of cloudPuffs) {
            const cloudGroup = new THREE.Group();
            cloudGroup.position.set(cx, cy, cz);

            for (let i = 0; i < 3; i++) {
                const r = 2.2 + Math.random() * 1.5;
                const puff = new THREE.Mesh(new THREE.SphereGeometry(r, 10, 10), cloudMat);
                puff.position.set((Math.random() - 0.5) * 3, 0, (Math.random() - 0.5) * 3);
                cloudGroup.add(puff);
            }

            this.group.add(cloudGroup);
            this.clouds.push(cloudGroup);
        }
    }

    update(dt, player) {
        if (this.clouds) {
            for (let i = 0; i < this.clouds.length; i++) {
                this.clouds[i].position.x += Math.sin(Date.now() * 0.001 + i) * dt * 0.3;
            }
        }
        if (this.boss && !this.boss.isDefeated) {
            this.boss.group.rotation.y += 1.0 * dt;

            this.boss.attackTimer -= dt;
            if (this.boss.attackTimer <= 0) {
                this.boss.attackTimer = 2.5;
                this.shootBrineBlast(player);
            }

            if (player) {
                const distToBoss = player.position.distanceTo(this.boss.group.position);
                if ((player.isWhipping || player.isSlamming) && distToBoss < 3.5) {
                    this.boss.health--;
                    this.boss.group.scale.multiplyScalar(0.8);
                    player.jump(14);

                    if (this.boss.health <= 0) {
                        this.boss.isDefeated = true;
                        this.boss.group.visible = false;
                        if (this.goal) this.goal.visible = true;
                    }
                }
            }
        }

        for (let i = this.bossProjectiles.length - 1; i >= 0; i--) {
            const proj = this.bossProjectiles[i];
            proj.mesh.position.addScaledVector(proj.dir, dt * 10);
            proj.life -= dt;

            if (player && proj.mesh.position.distanceTo(player.position) < 1.0) {
                player.takeDamage();
                this.group.remove(proj.mesh);
                this.bossProjectiles.splice(i, 1);
                continue;
            }

            if (proj.life <= 0) {
                this.group.remove(proj.mesh);
                this.bossProjectiles.splice(i, 1);
            }
        }

        for (const spark of this.sparks) spark.rotation.y += 3.0 * dt;
        if (this.goal && this.goal.visible) {
            this.goal.rotation.y += 1.5 * dt;
            this.goal.position.y = 4.0 + Math.sin(Date.now() * 0.003) * 0.3;
        }
    }

    shootBrineBlast(player) {
        if (!player) return;
        const projGeo = new THREE.IcosahedronGeometry(0.3);
        const projMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 });
        const mesh = new THREE.Mesh(projGeo, projMat);
        mesh.position.copy(this.boss.group.position);

        const dir = new THREE.Vector3().subVectors(player.position, this.boss.group.position).normalize();
        this.group.add(mesh);
        this.bossProjectiles.push({ mesh, dir, life: 3.0 });
    }

    cleanup() {
        this.scene.remove(this.group);
    }
}
