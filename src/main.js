import * as THREE from 'three';
import { createIsometricCamera } from './engine/camera.js';
import { createRenderer } from './engine/renderer.js';
import { setupLighting } from './engine/lighting.js';
import { ParticleSystem } from './engine/particles.js';
import { PipoPlayer } from './entities/pipo.js';
import { SoundManager } from './audio/sfx.js';
import { HUDManager } from './ui/hud.js';

import { Level1CottonCandyForest } from './levels/level1.js';
import { Level2GummyRiver } from './levels/level2.js';
import { Level3DarkChocolatePeak } from './levels/level3.js';

class SugarSprintGame {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffdae9);

        this.camera = createIsometricCamera();
        this.renderer = createRenderer('game-container');
        this.lighting = setupLighting(this.scene);
        this.soundManager = new SoundManager();
        this.particles = new ParticleSystem(this.scene);
        this.hud = new HUDManager();

        this.player = new PipoPlayer(this.scene, this.soundManager, this.particles);

        this.currentLevelIndex = 1;
        this.currentLevel = null;
        this.clock = new THREE.Clock();

        this.loadLevel(1);
        this.animate();
    }

    loadLevel(levelNum) {
        if (this.currentLevel) {
            this.currentLevel.cleanup();
        }

        this.currentLevelIndex = levelNum;
        this.player.position.set(0, 1, 0);
        this.player.velocity.set(0, 0, 0);

        switch (levelNum) {
            case 1:
                this.currentLevel = new Level1CottonCandyForest(this.scene);
                this.hud.setLevelTitle("MUNDO 1: BOSQUE DE ALGODÓN DE AZÚCAR");
                this.scene.background.setHex(0xffdae9);
                break;
            case 2:
                this.currentLevel = new Level2GummyRiver(this.scene);
                this.hud.setLevelTitle("MUNDO 2: RÍO DE GOMINOLA Y ROCAS CARAMELO");
                this.scene.background.setHex(0xe0f7fa);
                break;
            case 3:
                this.currentLevel = new Level3DarkChocolatePeak(this.scene);
                this.hud.setLevelTitle("MUNDO 3: CUMBRE DE CHOCOLATE NEGRO");
                this.scene.background.setHex(0x4a2e2b);
                break;
        }

        this.hud.updateHealth(this.player.health);
        this.hud.updateStats(this.player.coins, this.player.sparks);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const dt = Math.min(this.clock.getDelta(), 0.1);

        if (this.currentLevel) {
            this.currentLevel.update(dt, this.player);
        }

        this.player.update(dt, this.currentLevel ? this.currentLevel.platforms : []);
        this.particles.update(dt);

        const targetCamX = this.player.position.x + 20;
        const targetCamZ = this.player.position.z + 20;
        this.camera.position.x += (targetCamX - this.camera.position.x) * dt * 3.0;
        this.camera.position.z += (targetCamZ - this.camera.position.z) * dt * 3.0;

        if (this.currentLevel && this.currentLevel.coins) {
            for (let i = this.currentLevel.coins.length - 1; i >= 0; i--) {
                const coin = this.currentLevel.coins[i];
                if (this.player.position.distanceTo(coin.position) < 1.2) {
                    this.scene.remove(coin);
                    this.currentLevel.coins.splice(i, 1);
                    this.player.coins += 10;
                    this.soundManager.play('coin');
                    this.particles.createConfetti(coin.position, 10);
                    this.hud.updateStats(this.player.coins, this.player.sparks);
                }
            }
        }

        if (this.currentLevel && this.currentLevel.sparks) {
            for (let i = this.currentLevel.sparks.length - 1; i >= 0; i--) {
                const spark = this.currentLevel.sparks[i];
                if (this.player.position.distanceTo(spark.position) < 1.2) {
                    this.scene.remove(spark);
                    this.currentLevel.sparks.splice(i, 1);
                    this.player.sparks++;
                    this.soundManager.play('spark');
                    this.particles.createConfetti(spark.position, 16);
                    this.hud.updateStats(this.player.coins, this.player.sparks);
                }
            }
        }

        if (this.currentLevel && this.currentLevel.goal && this.currentLevel.goal.visible !== false) {
            if (this.player.position.distanceTo(this.currentLevel.goal.position) < 1.8) {
                this.onLevelComplete();
            }
        }

        if (this.player.position.y < -8) {
            this.player.takeDamage();
            this.hud.updateHealth(this.player.health);
            if (this.player.health > 0) {
                this.player.position.set(0, 3, 0);
                this.player.velocity.set(0, 0, 0);
            } else {
                this.onGameOver();
            }
        }

        this.renderer.render(this.scene, this.camera);
    }

    onLevelComplete() {
        this.soundManager.play('victory');
        if (this.currentLevelIndex < 3) {
            this.hud.showOverlay(
                "¡ESQUIRLA RECUPERADA!",
                `Has Purificado el Mundo ${this.currentLevelIndex}. ¡El equilibrio dulce se restaura!`,
                "SIGUIENTE NIVEL",
                () => this.loadLevel(this.currentLevelIndex + 1)
            );
        } else {
            this.hud.showOverlay(
                "¡DULCELANDIA SALVADA!",
                `¡Has derrotado a Lord Salitre y reconstruido el Corazón de Azúcar Glaseado! Puntuación Final: ${this.player.coins} Puntos.`,
                "JUGAR DE NUEVO",
                () => {
                    this.player.coins = 0;
                    this.player.sparks = 0;
                    this.player.health = 3;
                    this.loadLevel(1);
                }
            );
        }
    }

    onGameOver() {
        this.soundManager.play('damage');
        this.hud.showOverlay(
            "¡TE HAS DESHIDRATADO!",
            "La amargura ha invadido Dulcelandia. ¿Quieres reintentar?",
            "REINTENTAR",
            () => {
                this.player.health = 3;
                this.loadLevel(this.currentLevelIndex);
            }
        );
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new SugarSprintGame();
});
