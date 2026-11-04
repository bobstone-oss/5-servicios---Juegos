export class HUDManager {
    constructor() {
        this.levelTitleEl = document.getElementById('level-title');
        this.heartsContainer = document.getElementById('hearts-container');
        this.coinsCountEl = document.getElementById('coins-count');
        this.sparksCountEl = document.getElementById('sparks-count');
        this.overlayEl = document.getElementById('overlay');
        this.modalTitleEl = document.getElementById('modal-title');
        this.modalTextEl = document.getElementById('modal-text');
        this.modalBtnEl = document.getElementById('modal-btn');

        // Main Menu elements
        this.mainMenuEl = document.getElementById('main-menu');
        this.btnMenuPlay = document.getElementById('btn-menu-play');
        this.btnMenuShop = document.getElementById('btn-menu-shop');
        this.btnMenuOptions = document.getElementById('btn-menu-options');
        this.btnHudMenu = document.getElementById('btn-hud-menu');

        // Shop modal elements
        this.shopModalEl = document.getElementById('shop-modal');
        this.btnOpenShop = document.getElementById('btn-open-shop');
        this.btnCloseShop = document.getElementById('btn-close-shop');
        this.shopWalletCoinsEl = document.getElementById('shop-wallet-coins');

        // Island map modal elements
        this.mapModalEl = document.getElementById('island-map-modal');
        this.btnOpenMap = document.getElementById('btn-open-map');
        this.btnCloseMap = document.getElementById('btn-close-map');
        this.mapWalletCoinsEl = document.getElementById('map-wallet-coins');

        // Settings modal elements
        this.settingsModalEl = document.getElementById('settings-modal');
        this.btnOpenSettings = document.getElementById('btn-open-settings');
        this.btnCloseSettings = document.getElementById('btn-close-settings');
        this.volumeSlider = document.getElementById('volume-slider');
        this.volumeDisplay = document.getElementById('volume-display');
        this.muteCheckbox = document.getElementById('mute-checkbox');
        this.btnTestSound = document.getElementById('btn-test-sound');

        // Story modal elements
        this.storyModalEl = document.getElementById('story-modal');
        this.storyChapterTag = document.getElementById('story-chapter-tag');
        this.storyTitle = document.getElementById('story-title');
        this.storyText = document.getElementById('story-text');
        this.btnStartStory = document.getElementById('btn-start-story');

        // Victory Epilogue elements
        this.epilogueModalEl = document.getElementById('victory-epilogue');
        this.btnEpilogueReplay = document.getElementById('btn-epilogue-replay');
        this.btnEpilogueMenu = document.getElementById('btn-epilogue-menu');
    }

    setupMainMenu(callbacks = {}) {
        if (this.btnMenuPlay) {
            this.btnMenuPlay.onclick = () => {
                this.hideMainMenu();
                if (callbacks.onPlay) callbacks.onPlay();
            };
        }

        if (this.btnMenuShop) {
            this.btnMenuShop.onclick = () => {
                if (callbacks.onShop) callbacks.onShop();
            };
        }

        if (this.btnMenuOptions) {
            this.btnMenuOptions.onclick = () => {
                this.showSettings();
            };
        }

        if (this.btnHudMenu) {
            this.btnHudMenu.onclick = () => {
                this.showMainMenu();
            };
        }
    }

    showMainMenu() {
        if (this.mainMenuEl) {
            this.mainMenuEl.classList.remove('hidden');
        }
    }

    hideMainMenu() {
        if (this.mainMenuEl) {
            this.mainMenuEl.classList.add('hidden');
        }
    }

    setupShopControls(callbacks = {}) {
        if (this.btnOpenShop) {
            this.btnOpenShop.onclick = () => {
                if (callbacks.onOpenShop) callbacks.onOpenShop();
            };
        }

        if (this.btnCloseShop) {
            this.btnCloseShop.onclick = () => this.hideShop();
        }

        this.shopCallbacks = callbacks;
    }

    showShop(state, onEquipSkin, onBuySkin) {
        if (!this.shopModalEl) return;
        if (this.shopWalletCoinsEl) {
            this.shopWalletCoinsEl.textContent = `${state.coins} 🍬`;
        }

        const skinItems = document.querySelectorAll('.skin-item');
        skinItems.forEach(item => {
            const skinId = item.getAttribute('data-skin-id');
            const isOwned = (state.ownedSkins || ['fresa']).includes(skinId);
            const isEquipped = state.currentSkin === skinId;

            let actionContainer = item.querySelector('.skin-btn, .skin-status');
            const priceEl = item.querySelector('.skin-price');

            if (isEquipped) {
                item.classList.add('active');
                if (priceEl) priceEl.style.display = 'none';
                if (actionContainer) {
                    actionContainer.outerHTML = '<span class="skin-status equipped">EQUIPADO</span>';
                }
            } else if (isOwned) {
                item.classList.remove('active');
                if (priceEl) priceEl.style.display = 'none';
                if (actionContainer) {
                    actionContainer.outerHTML = `<button class="skin-btn equip-btn" data-skin="${skinId}">Equipar</button>`;
                }
            } else {
                item.classList.remove('active');
                if (priceEl) priceEl.style.display = 'block';
            }
        });

        // Rebind equip and buy click listeners
        this.shopModalEl.querySelectorAll('.equip-btn').forEach(btn => {
            btn.onclick = () => {
                const sId = btn.getAttribute('data-skin');
                if (onEquipSkin) onEquipSkin(sId);
            };
        });

        this.shopModalEl.querySelectorAll('.buy-btn').forEach(btn => {
            btn.onclick = () => {
                const sId = btn.getAttribute('data-skin');
                const cost = parseInt(btn.getAttribute('data-cost'), 10);
                if (onBuySkin) onBuySkin(sId, cost);
            };
        });

        this.shopModalEl.classList.remove('hidden');
    }

    hideShop() {
        if (this.shopModalEl) this.shopModalEl.classList.add('hidden');
    }

    setupSettingsControls(soundManager) {
        if (!soundManager) return;

        if (this.volumeSlider) {
            this.volumeSlider.value = Math.round(soundManager.volume * 100);
            if (this.volumeDisplay) this.volumeDisplay.textContent = `${this.volumeSlider.value}%`;

            this.volumeSlider.oninput = (e) => {
                const valInt = e.target.value;
                const val = parseInt(valInt) / 100;
                soundManager.setVolume(val);
                if (this.volumeDisplay) this.volumeDisplay.textContent = `${valInt}%`;
            };
            this.volumeSlider.onchange = this.volumeSlider.oninput;
        }

        if (this.muteCheckbox) {
            this.muteCheckbox.checked = soundManager.isMuted;
            this.muteCheckbox.onchange = (e) => {
                soundManager.isMuted = e.target.checked;
                soundManager.setVolume(soundManager.volume);
            };
        }

        if (this.btnTestSound) {
            this.btnTestSound.onclick = () => {
                soundManager.play('coin');
            };
        }

        if (this.btnOpenSettings) {
            this.btnOpenSettings.onclick = () => this.showSettings();
        }

        if (this.btnCloseSettings) {
            this.btnCloseSettings.onclick = () => this.hideSettings();
        }
    }

    showSettings() {
        if (this.settingsModalEl) this.settingsModalEl.classList.remove('hidden');
    }

    hideSettings() {
        if (this.settingsModalEl) this.settingsModalEl.classList.add('hidden');
    }

    showStoryCutscene(chapterTag, title, text, onStart) {
        if (!this.storyModalEl) return;
        if (this.storyChapterTag) this.storyChapterTag.textContent = chapterTag;
        if (this.storyTitle) this.storyTitle.textContent = title;
        if (this.storyText) this.storyText.textContent = text;

        if (this.btnStartStory) {
            this.btnStartStory.onclick = () => {
                this.hideStoryCutscene();
                if (onStart) onStart();
            };
        }

        this.storyModalEl.classList.remove('hidden');
    }

    hideStoryCutscene() {
        if (this.storyModalEl) this.storyModalEl.classList.add('hidden');
    }

    setupMapControls(callbacks = {}) {
        if (this.btnOpenMap && callbacks.onOpenMap) {
            this.btnOpenMap.onclick = callbacks.onOpenMap;
        }

        if (this.btnCloseMap) {
            this.btnCloseMap.onclick = () => this.hideIslandMap();
        }

        this.mapCallbacks = callbacks;
    }

    showIslandMap(state, onAction) {
        if (!this.mapModalEl) return;
        if (this.mapWalletCoinsEl) {
            this.mapWalletCoinsEl.textContent = `${state.coins} 🍬`;
        }

        const islands = [
            { id: 1, name: "Isla 1: Bosque de Algodón", price: 0 },
            { id: 2, name: "Isla 2: Río de Gominola", price: state.islandPrices[2] },
            { id: 3, name: "Isla 3: Cumbre Chocolate", price: state.islandPrices[3] }
        ];

        for (const island of islands) {
            const slot = document.getElementById(`slot-island-${island.id}`);
            if (!slot) continue;

            const isUnlocked = state.unlockedIslands.includes(island.id);
            const actionBtn = slot.querySelector('.island-action-btn');

            if (isUnlocked) {
                slot.classList.remove('locked');
                actionBtn.className = 'island-action-btn select-btn';
                actionBtn.textContent = 'VIAJAR 🚀';
                actionBtn.onclick = () => {
                    this.hideIslandMap();
                    if (onAction) onAction(island.id);
                };

                const priceEl = slot.querySelector('.island-price');
                if (priceEl) {
                    priceEl.outerHTML = '<span class="island-tag unlocked">¡DESBLOQUEADA!</span>';
                }
            } else {
                slot.classList.add('locked');
                actionBtn.className = 'island-action-btn unlock-btn';
                actionBtn.textContent = `DESBLOQUEAR (${island.price} 🍬)`;
                actionBtn.onclick = () => {
                    if (onAction) onAction(island.id);
                };
            }
        }

        this.mapModalEl.classList.remove('hidden');
    }

    hideIslandMap() {
        if (this.mapModalEl) this.mapModalEl.classList.add('hidden');
    }

    // ========================================================
    // GRAND VICTORY EPILOGUE & SEQUEL TEASER CONTROLS
    // ========================================================
    showVictoryEpilogue(onReplay, onMainMenu) {
        if (!this.epilogueModalEl) return;

        if (this.btnEpilogueReplay) {
            this.btnEpilogueReplay.onclick = () => {
                this.hideVictoryEpilogue();
                if (onReplay) onReplay();
            };
        }

        if (this.btnEpilogueMenu) {
            this.btnEpilogueMenu.onclick = () => {
                this.hideVictoryEpilogue();
                if (onMainMenu) onMainMenu();
            };
        }

        this.epilogueModalEl.classList.remove('hidden');
    }

    hideVictoryEpilogue() {
        if (this.epilogueModalEl) {
            this.epilogueModalEl.classList.add('hidden');
        }
    }

    setLevelTitle(title) {
        if (this.levelTitleEl) this.levelTitleEl.textContent = title;
    }

    updateHealth(health, maxHealth = 3) {
        if (!this.heartsContainer) return;
        this.heartsContainer.innerHTML = '';
        for (let i = 0; i < maxHealth; i++) {
            const heart = document.createElement('span');
            heart.className = `heart ${i < health ? 'active' : 'inactive'}`;
            heart.textContent = '❤️';
            this.heartsContainer.appendChild(heart);
        }
    }

    updateStats(coins, sparks, maxSparks = 3) {
        if (this.coinsCountEl) this.coinsCountEl.textContent = coins;
        if (this.sparksCountEl) this.sparksCountEl.textContent = `${sparks} / ${maxSparks}`;
    }

    showOverlay(title, text, buttonLabel, onButtonClick) {
        if (!this.overlayEl) return;
        this.modalTitleEl.textContent = title;
        this.modalTextEl.textContent = text;
        this.modalBtnEl.textContent = buttonLabel;

        this.modalBtnEl.onclick = () => {
            this.hideOverlay();
            if (onButtonClick) onButtonClick();
        };

        this.overlayEl.classList.remove('hidden');
    }

    hideOverlay() {
        if (this.overlayEl) this.overlayEl.classList.add('hidden');
    }
}
