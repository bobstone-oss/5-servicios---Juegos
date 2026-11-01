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
