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

        this.addPlatform(0, 0, 0, 8, 1, 8, grassMat);

        const bouncePlat = this.addPlatform(0, 0.5, 9, 4, 1, 4, marshmallowMat);
        bouncePlat.isBouncy = true;

        this.addPlatform(0, 4, 17, 8, 1, 8, grassMat);
        this.addPlatform(-6, 4, 25, 4, 0.8, 4, woodMat);
        this.addPlatform(0, 5, 32, 6, 1, 6, grassMat);
        this.addPlatform(0, 6, 42, 6, 1, 6, grassMat);

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

    addPlatform(x, y, z, w, h, d, material) {
        const geo = new THREE.BoxGeometry(w, h, d);
        const mesh = new THREE.Mesh(geo, material);
        mesh.position.set(x, y, z);
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        this.group.add(mesh);

        const box = new THREE.Box3().setFromObject(mesh);
        const platform = { mesh, box, isBouncy: false };
        this.platforms.push(platform);
        return platform;
    }

    update(dt) {
        for (const coin of this.coins) {
            coin.rotation.z += 2.0 * dt;
        }
        for (const spark of this.sparks) {
            spark.rotation.y += 3.0 * dt;
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
