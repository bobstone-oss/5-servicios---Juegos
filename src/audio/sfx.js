export class SoundManager {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.volume = 0.7;
        this.isMuted = false;

        try {
            const savedVol = localStorage.getItem('sugarsprint_volume');
            if (savedVol !== null) {
                this.volume = parseFloat(savedVol);
            }
        } catch (e) {
            this.volume = 0.7;
        }
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
                this.masterGain = this.ctx.createGain();
                this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
                this.masterGain.connect(this.ctx.destination);
            }
        }
    }

    setVolume(value) {
        this.volume = Math.max(0, Math.min(1, parseFloat(value)));
        try {
            localStorage.setItem('sugarsprint_volume', this.volume.toString());
        } catch (e) {}

        if (this.masterGain && this.ctx) {
            this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.masterGain && this.ctx) {
            this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
        }
        return this.isMuted;
    }

    play(soundName) {
        if (!this.ctx) this.init();
        if (!this.ctx || this.isMuted) return;

        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        const now = this.ctx.currentTime;

        switch (soundName) {
            case 'jump': {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(160, now);
                osc.frequency.exponentialRampToValueAtTime(580, now + 0.15);
                gain.gain.setValueAtTime(0.3, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
                osc.connect(gain);
                gain.connect(this.masterGain || this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.15);
                break;
            }
            case 'slam': {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.exponentialRampToValueAtTime(80, now + 0.2);
                gain.gain.setValueAtTime(0.4, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
                osc.connect(gain);
                gain.connect(this.masterGain || this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.2);
                break;
            }
            case 'whip': {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.linearRampToValueAtTime(1200, now + 0.1);
                gain.gain.setValueAtTime(0.25, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
                osc.connect(gain);
                gain.connect(this.masterGain || this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.1);
                break;
            }
            case 'coin': {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(987.77, now);
                osc.frequency.setValueAtTime(1318.51, now + 0.08);
                gain.gain.setValueAtTime(0.3, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
                osc.connect(gain);
                gain.connect(this.masterGain || this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.2);
                break;
            }
            case 'spark': {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1046.50, now);
                osc.frequency.setValueAtTime(1567.98, now + 0.1);
                gain.gain.setValueAtTime(0.35, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
                osc.connect(gain);
                gain.connect(this.masterGain || this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.25);
                break;
            }
            case 'damage': {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'square';
                osc.frequency.setValueAtTime(220, now);
                osc.frequency.exponentialRampToValueAtTime(60, now + 0.25);
                gain.gain.setValueAtTime(0.3, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
                osc.connect(gain);
                gain.connect(this.masterGain || this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.25);
                break;
            }
            case 'victory': {
                const notes = [523.25, 659.25, 783.99, 1046.50];
                notes.forEach((freq, idx) => {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(freq, now + idx * 0.12);
                    gain.gain.setValueAtTime(0.3, now + idx * 0.12);
                    gain.gain.linearRampToValueAtTime(0.01, now + idx * 0.12 + 0.3);
                    osc.connect(gain);
                    gain.connect(this.masterGain || this.ctx.destination);
                    osc.start(now + idx * 0.12);
                    osc.stop(now + idx * 0.12 + 0.3);
                });
                break;
            }
        }
    }
}
