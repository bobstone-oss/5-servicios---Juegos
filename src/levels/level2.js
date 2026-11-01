import * as THREE from 'three';

export class Level2GummyRiver {
    constructor(scene) {
        this.scene = scene;
        this.group = new THREE.Group();
        this.scene.add(this.group);

        this.platforms = [];
        this.coins = [];
        this.sparks = [];
        this.movingPlatforms = [];
        this.hazards = [];
        this.goal = null;

        this.buildLevel();
    }

    buildLevel() {
        const jellyMat = new THREE.MeshPhysicalMaterial({ color: 0x32cd32, roughness: 0.1, transmission: 0.7 });
        const amberMat = new THREE.MeshStandardMaterial({ color: 0xffbf00, roughness: 0.3 });
        const syrupRiverMat = new THREE.MeshStandardMaterial({ color: 0xff7f50, roughness: 0.2 });
        const coinMat = new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.2, metalness: 0.8 });
        const sparkMat = new THREE.MeshStandardMaterial({ color: 0x00ffff, roughness: 0.1, emissive: 0x008888 });
        const saltStalactiteMat = new THREE.MeshStandardMaterial({ color: 0xe0e0e0, roughness: 0.9 });

        const riverGeo = new THREE.BoxGeometry(30, 0.5, 60);
        const riverMesh = new THREE.Mesh(riverGeo, syrupRiverMat);
        riverMesh.position.set(0, -2, 20);
        this.group.add(riverMesh);

        this.createFloatingIsland(0, 0, 0, 7, 1, 7, amberMat, 0x4a2e10);

        const raft = this.createFloatingIsland(0, 0, 10, 4, 0.8, 4, jellyMat, 0x1b5e20);
        raft.isMoving = true;
        raft.startX = -5;
        raft.endX = 5;
        raft.speed = 2.5;
        this.movingPlatforms.push(raft);

        this.createFloatingIsland(0, 1, 20, 6, 1, 6, amberMat, 0x4a2e10);

        const stalGeo = new THREE.ConeGeometry(0.5, 2.0, 4);
        for (let i = -2; i <= 2; i += 2) {
            const stal = new THREE.Mesh(stalGeo, saltStalactiteMat);
            stal.rotation.x = Math.PI;
            stal.position.set(i * 2, 6, 20);
            this.group.add(stal);
            this.hazards.push({ mesh: stal, startY: 6, isFalling: false });
        }

        this.createFloatingIsland(0, 2, 30, 8, 1, 8, jellyMat, 0x1b5e20);
        this.createFloatingIsland(0, 3, 42, 6, 1, 6, amberMat, 0x4a2e10);

        this.buildClouds();

        const coinPositions = [
            [0, 1.2, 3], [0, 2.2, 20], [2, 2.2, 20], [-2, 2.2, 20],
            [0, 3.2, 30], [2, 3.2, 30]
        ];
        const coinGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 16);
        for (const pos of coinPositions) {
            const coin = new THREE.Mesh(coinGeo, coinMat);
            coin.position.set(...pos);
            coin.rotation.x = Math.PI / 2;
            this.group.add(coin);
            this.coins.push(coin);
        }

        const sparkPositions = [
            [0, 1.5, 10],
            [0, 3.5, 20],
            [0, 4.5, 30]
        ];
        const sparkGeo = new THREE.OctahedronGeometry(0.4);
        for (const pos of sparkPositions) {
            const spark = new THREE.Mesh(sparkGeo, sparkMat);
            spark.position.set(...pos);
            this.group.add(spark);
            this.sparks.push(spark);
        }

        const shardGeo = new THREE.ConeGeometry(0.8, 2.0, 6);
        const shardMat = new THREE.MeshPhysicalMaterial({
            color: 0x32cd32,
            transmission: 0.8,
            roughness: 0.1
        });
        this.goal = new THREE.Mesh(shardGeo, shardMat);
        this.goal.position.set(0, 5.0, 42);
        this.group.add(this.goal);
    }

    createFloatingIsland(x, y, z, w, h, d, topMaterial, rockColor = 0x4a2e10) {
        const islandGroup = new THREE.Group();
        islandGroup.position.set(x, y, z);

        const topGeo = new THREE.BoxGeometry(w, h, d);
        const topMesh = new THREE.Mesh(topGeo, topMaterial);
        topMesh.receiveShadow = true;
        topMesh.castShadow = true;
        islandGroup.add(topMesh);

        const rockGeo = new THREE.ConeGeometry(Math.min(w, d) * 0.65, 3.2, 5);
        const rockMat = new THREE.MeshStandardMaterial({
            color: rockColor,
            roughness: 0.9,
            flatShading: true
        });
        const rockMesh = new THREE.Mesh(rockGeo, rockMat);
        rockMesh.rotation.x = Math.PI;
        rockMesh.position.set(0, -1.8, 0);
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
            color: 0xffffff,
            roughness: 0.2,
            metalness: 0.05,
            transparent: true,
            opacity: 0.8
        });

        const cloudPuffs = [
            [-16, -2, 8], [17, 0, 16], [-19, 3, 26], [18, 2, 36], [-14, 4, 44]
        ];

        for (const [cx, cy, cz] of cloudPuffs) {
            const cloudGroup = new THREE.Group();
            cloudGroup.position.set(cx, cy, cz);

            for (let i = 0; i < 3; i++) {
                const r = 2.0 + Math.random() * 1.5;
                const puff = new THREE.Mesh(new THREE.SphereGeometry(r, 10, 10), cloudMat);
                puff.position.set((Math.random() - 0.5) * 3, 0, (Math.random() - 0.5) * 3);
                cloudGroup.add(puff);
            }

            this.group.add(cloudGroup);
            this.clouds.push(cloudGroup);
        }
    }

    update(dt) {
        for (const plat of this.movingPlatforms) {
            plat.mesh.position.x += (plat.speed || 2) * dt;
            if (plat.mesh.position.x > plat.endX || plat.mesh.position.x < plat.startX) {
                plat.speed = -plat.speed;
            }
            plat.box.setFromObject(plat.topMesh || plat.mesh);
        }

        if (this.clouds) {
            for (let i = 0; i < this.clouds.length; i++) {
                this.clouds[i].position.x += Math.sin(Date.now() * 0.001 + i) * dt * 0.3;
            }
        }

        for (const coin of this.coins) coin.rotation.z += 2.0 * dt;
        for (const spark of this.sparks) spark.rotation.y += 3.0 * dt;
        if (this.goal) {
            this.goal.rotation.y += 1.5 * dt;
            this.goal.position.y = 5.0 + Math.sin(Date.now() * 0.003) * 0.3;
        }
    }

    cleanup() {
        this.scene.remove(this.group);
    }
}
