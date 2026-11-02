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

        // Island map modal elements
        this.mapModalEl = document.getElementById('island-map-modal');
        this.btnOpenMap = document.getElementById('btn-open-map');
        this.btnCloseMap = document.getElementById('btn-close-map');
        this.mapWalletCoinsEl = document.getElementById('map-wallet-coins');
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

        // Render each island slot state
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
