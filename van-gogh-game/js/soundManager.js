'use strict';

class SoundManager {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
        this.volume = 0.3;
        this.initialized = false;
    }

    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
            Logger.info('SoundManager initialized');
        } catch (error) {
            Logger.warn('Web Audio API not supported', error);
            this.enabled = false;
        }
    }

    resume() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    _playTone(frequency, duration, type = 'sine', attack = 0.01, decay = 0.1) {
        if (!this.enabled || !this.initialized) return;

        try {
            this.resume();

            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.type = type;
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(this.volume, this.audioContext.currentTime + attack);
            gainNode.gain.linearRampToValueAtTime(this.volume * 0.7, this.audioContext.currentTime + attack + decay);
            gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration);

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);

            Logger.debug(`Playing tone: ${frequency}Hz, ${duration}s`);
        } catch (error) {
            Logger.error('Error playing tone', error);
        }
    }

    playClick() {
        this._playTone(800, 0.05, 'square', 0.005, 0.02);
    }

    playSelect() {
        this._playTone(600, 0.08, 'sine', 0.01, 0.03);
    }

    playPickup() {
        this._playTone(523, 0.1, 'sine', 0.01, 0.05);
        setTimeout(() => this._playTone(659, 0.15, 'sine', 0.01, 0.08), 50);
    }

    playDialogue() {
        this._playTone(440, 0.06, 'triangle', 0.005, 0.03);
    }

    playPainting() {
        this._playTone(330, 0.15, 'sine', 0.02, 0.1);
        setTimeout(() => this._playTone(392, 0.12, 'sine', 0.01, 0.08), 80);
    }

    playSuccess() {
        this._playTone(523, 0.1, 'sine', 0.01, 0.05);
        setTimeout(() => this._playTone(659, 0.1, 'sine', 0.01, 0.05), 100);
        setTimeout(() => this._playTone(784, 0.2, 'sine', 0.01, 0.1), 200);
    }

    playError() {
        this._playTone(200, 0.15, 'sawtooth', 0.01, 0.1);
    }

    playAmbient() {
        if (!this.enabled || !this.initialized) return;

        try {
            this.resume();

            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(60, this.audioContext.currentTime);

            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(this.volume * 0.1, this.audioContext.currentTime + 0.5);
            gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 2);

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 2);
        } catch (error) {
            Logger.error('Error playing ambient', error);
        }
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }

    toggle() {
        this.enabled = !this.enabled;
        Logger.info(`Sound ${this.enabled ? 'enabled' : 'disabled'}`);
    }
}

window.SoundManager = SoundManager;
