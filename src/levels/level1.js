import * as THREE from 'three';

export class Level1CottonCandyForest {
    constructor(scene) {
        this.scene = scene;
        this.group = new THREE.Group();
        this.scene.add(this.group);

        this.platforms = [];
        this.coins = [];
        this.sparks = [];
        this.goal = null;

        this.buildLevel();
    }

    buildLevel() {
        const grassMat = new THREE.MeshStandardMaterial({ color: 0xffb6c1, roughness: 0.6 });
        const woodMat = new THREE.MeshStandardMaterial({ color: 0xa0522d, roughness: 0.8 });
        const marshmallowMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
        const coinMat = new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.2, metalness: 0.8 });
        const sparkMat = new THREE.MeshStandardMaterial({ color: 0x00ffff, roughness: 0.1, metalness: 0.9, emissive: 0x008888 });

        this.createFloatingIsland(0, 0, 0, 8, 1, 8, grassMat, 0x8b4513);

        const bouncePlat = this.createFloatingIsland(0, 0.5, 9, 4, 1, 4, marshmallowMat, 0xd8bfd8);
        bouncePlat.isBouncy = true;

        this.createFloatingIsland(0, 4, 17, 8, 1, 8, grassMat, 0x8b4513);
        this.createFloatingIsland(-6, 4, 25, 4, 0.8, 4, woodMat, 0x5c2c16);
        this.createFloatingIsland(0, 5, 32, 6, 1, 6, grassMat, 0x8b4513);
        this.createFloatingIsland(0, 6, 42, 6, 1, 6, grassMat, 0x8b4513);

        this.buildClouds();

        const coinPositions = [
            [0, 1.2, 3], [1.5, 1.2, 3], [-1.5, 1.2, 3],
            [0, 5.2, 17], [2, 5.2, 17], [-2, 5.2, 17],
            [-6, 5.2, 25], [0, 6.2, 32]
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
            [0, 3.5, 9],
            [-6, 6.5, 25],
            [0, 7.5, 32]
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
            color: 0xff1493,
            transmission: 0.8,
            roughness: 0.1,
            clearcoat: 1.0
        });
        this.goal = new THREE.Mesh(shardGeo, shardMat);
        this.goal.position.set(0, 8.0, 42);
        this.group.add(this.goal);
    }

    createFloatingIsland(x, y, z, w, h, d, topMaterial, rockColor = 0x8b4513) {
        const islandGroup = new THREE.Group();
        islandGroup.position.set(x, y, z);

        // Top Crust
        const topGeo = new THREE.BoxGeometry(w, h, d);
        const topMesh = new THREE.Mesh(topGeo, topMaterial);
        topMesh.receiveShadow = true;
        topMesh.castShadow = true;
        islandGroup.add(topMesh);

        // Tapered Rock Undercarriage (floating cone/pyramid underneath)
        const rockGeo = new THREE.ConeGeometry(Math.min(w, d) * 0.65, 3.5, 5);
        const rockMat = new THREE.MeshStandardMaterial({
            color: rockColor,
            roughness: 0.85,
            flatShading: true
        });
        const rockMesh = new THREE.Mesh(rockGeo, rockMat);
        rockMesh.rotation.x = Math.PI; // point downwards
        rockMesh.position.set(0, -2.0, 0);
        rockMesh.castShadow = true;
        islandGroup.add(rockMesh);

        this.group.add(islandGroup);

        const box = new THREE.Box3().setFromObject(topMesh);
        const platform = { mesh: topMesh, box, isBouncy: false };
        this.platforms.push(platform);
        return platform;
    }

    buildClouds() {
        this.clouds = [];
        const cloudMat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.1,
            metalness: 0.05,
            transparent: true,
            opacity: 0.85
        });

        const cloudPuffs = [
            [-15, -4, 5], [18, -2, 12], [-18, 2, 22], [16, 1, 30], [-12, 3, 40], [14, 4, 48]
        ];

        for (const [cx, cy, cz] of cloudPuffs) {
            const cloudGroup = new THREE.Group();
            cloudGroup.position.set(cx, cy, cz);

            for (let i = 0; i < 4; i++) {
                const r = 1.8 + Math.random() * 1.4;
                const puff = new THREE.Mesh(new THREE.SphereGeometry(r, 10, 10), cloudMat);
                puff.position.set(
                    (Math.random() - 0.5) * 3,
                    (Math.random() - 0.5) * 1.5,
                    (Math.random() - 0.5) * 3
                );
                cloudGroup.add(puff);
            }

            this.group.add(cloudGroup);
            this.clouds.push(cloudGroup);
        }
    }

    update(dt) {
        for (const coin of this.coins) {
            coin.rotation.z += 2.0 * dt;
        }
        for (const spark of this.sparks) {
            spark.rotation.y += 3.0 * dt;
        }
        if (this.clouds) {
            for (let i = 0; i < this.clouds.length; i++) {
                this.clouds[i].position.x += Math.sin(Date.now() * 0.001 + i) * dt * 0.3;
            }
        }
        if (this.goal) {
            this.goal.rotation.y += 1.5 * dt;
            this.goal.position.y = 8.0 + Math.sin(Date.now() * 0.003) * 0.3;
        }
    }

    cleanup() {
        this.scene.remove(this.group);
    }
}
