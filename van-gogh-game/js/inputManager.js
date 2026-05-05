'use strict';

class InputManager {
    constructor(game) {
        this.game = game;
        this.mouseX = 320;
        this.mouseY = 240;
        this.canvas = null;
        this.W = 640;
        this.H = 480;
        this.keyMap = {};
        this.init();
    }

    init() {
        Logger.info('InputManager initialized');
    }

    attachToCanvas(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            Logger.error('Canvas not found for InputManager', canvasId);
            return;
        }

        this.canvas.addEventListener('mousedown', (e) => this._handleMouseDown(e));
        this.canvas.addEventListener('touchstart', (e) => this._handleTouchStart(e), { passive: false });
        this.canvas.addEventListener('mousemove', (e) => this._handleMouseMove(e));
        this.canvas.addEventListener('touchmove', (e) => this._handleTouchMove(e), { passive: false });
        document.addEventListener('keydown', (e) => this._handleKeyDown(e));
        document.addEventListener('keyup', (e) => this._handleKeyUp(e));

        Logger.debug('InputManager attached to canvas');
    }

    _getCanvasCoordinates(clientX, clientY) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: (clientX - rect.left) * (this.W / rect.width),
            y: (clientY - rect.top) * (this.H / rect.height)
        };
    }

    _handleMouseDown(e) {
        e.preventDefault();
        const pos = this._getCanvasCoordinates(e.clientX, e.clientY);
        Logger.debug(`Mouse click at (${pos.x.toFixed(0)}, ${pos.y.toFixed(0)})`);
        if (this.game.onClick) {
            this.game.onClick(pos);
        }
    }

    _handleTouchStart(e) {
        e.preventDefault();
        if (e.touches.length > 0) {
            const pos = this._getCanvasCoordinates(e.touches[0].clientX, e.touches[0].clientY);
            Logger.debug(`Touch at (${pos.x.toFixed(0)}, ${pos.y.toFixed(0)})`);
            if (this.game.onClick) {
                this.game.onClick(pos);
            }
        }
    }

    _handleMouseMove(e) {
        const pos = this._getCanvasCoordinates(e.clientX, e.clientY);
        this.mouseX = pos.x;
        this.mouseY = pos.y;
        if (this.game.onMouseMove) {
            this.game.onMouseMove(pos);
        }
    }

    _handleTouchMove(e) {
        e.preventDefault();
        if (e.touches.length > 0) {
            const pos = this._getCanvasCoordinates(e.touches[0].clientX, e.touches[0].clientY);
            this.mouseX = pos.x;
            this.mouseY = pos.y;
            if (this.game.onMouseMove) {
                this.game.onMouseMove(pos);
            }
        }
    }

    _handleKeyDown(e) {
        this.keyMap[e.code] = true;
        Logger.debug(`Key down: ${e.code}`);

        if (this.game.onKeyDown) {
            this.game.onKeyDown(e);
        }
    }

    _handleKeyUp(e) {
        this.keyMap[e.code] = false;
        Logger.debug(`Key up: ${e.code}`);

        if (this.game.onKeyUp) {
            this.game.onKeyUp(e);
        }
    }

    isKeyPressed(code) {
        return !!this.keyMap[code];
    }

    isUpPressed() {
        return this.isKeyPressed('ArrowUp') || this.isKeyPressed('KeyW');
    }

    isDownPressed() {
        return this.isKeyPressed('ArrowDown') || this.isKeyPressed('KeyS');
    }

    isLeftPressed() {
        return this.isKeyPressed('ArrowLeft') || this.isKeyPressed('KeyA');
    }

    isRightPressed() {
        return this.isKeyPressed('ArrowRight') || this.isKeyPressed('KeyD');
    }

    isConfirmPressed() {
        return this.isKeyPressed('Enter') || this.isKeyPressed('Space');
    }

    isEscapePressed() {
        return this.isKeyPressed('Escape');
    }

    getMousePosition() {
        return { x: this.mouseX, y: this.mouseY };
    }
}

window.InputManager = InputManager;
