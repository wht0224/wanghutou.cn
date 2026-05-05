'use strict';

class Game {
    constructor() {
        this.G = new GameState();
        this.G.characters = JSON.parse(JSON.stringify(CHARACTERS));
        this.soundManager = new SoundManager();
        this.animationSystem = new AnimationSystem();
        this.inputManager = new InputManager(this);
        this.uiManager = null;
        this.sceneRenderer = null;
        this.characterRenderer = null;
        this.itemRenderer = null;
        this.interactionManager = null;
        this.lastTimestamp = 0;
        this.running = false;
        this.errorHandler = new ErrorHandler();
    }

    init() {
        try {
            this.errorHandler.wrap(() => {
                Logger.info('Game initialization started');

                if (!Renderer.init('gc')) {
                    throw new Error('Failed to initialize renderer');
                }

                this.soundManager.init();
                this.inputManager.attachToCanvas('gc');

                this.uiManager = new UIManager(this.G, this.soundManager);
                this.sceneRenderer = new SceneRenderer();
                this.characterRenderer = new CharacterRenderer();
                this.itemRenderer = new ItemRenderer();
                this.interactionManager = new InteractionManager(this.G, this.soundManager);

                Logger.info('All game systems initialized');
            });

            this.running = true;
            requestAnimationFrame((timestamp) => this.gameLoop(timestamp));

        } catch (error) {
            this.errorHandler.handleError(error, 'Game initialization failed');
        }
    }

    onClick(pos) {
        try {
            this.interactionManager.handleClick(pos, INTERACTABLES, DIALOGUES, this.sceneRenderer);
        } catch (error) {
            this.errorHandler.handleError(error, 'Click handling failed');
        }
    }

    onMouseMove(pos) {
        // 可以在这里添加鼠标移动的逻辑
    }

    onKeyDown(e) {
        try {
            if (this.G.dialogueActive && this.G.dialogueChoices.length > 0) {
                if (e.code === 'ArrowUp' || e.code === 'KeyW') {
                    e.preventDefault();
                    this.G.selectedChoiceIndex = Math.max(0, this.G.selectedChoiceIndex - 1);
                    this.soundManager.playClick();
                } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
                    e.preventDefault();
                    this.G.selectedChoiceIndex = Math.min(
                        this.G.dialogueChoices.length - 1,
                        this.G.selectedChoiceIndex + 1
                    );
                    this.soundManager.playClick();
                } else if (e.code === 'Enter' || e.code === 'Space') {
                    e.preventDefault();
                    this.G.selectChoice(this.G.selectedChoiceIndex, DIALOGUES);
                    this.soundManager.playSelect();
                } else if (e.code === 'Escape') {
                    e.preventDefault();
                    this.G.endDialogue();
                    this.soundManager.playClick();
                }
            }

            if (e.code === 'KeyM') {
                this.soundManager.toggle();
            }
        } catch (error) {
            this.errorHandler.handleError(error, 'Key handling failed');
        }
    }

    onKeyUp(e) {
        // 可以在这里添加按键释放的逻辑
    }

    update(deltaTime) {
        try {
            this.interactionManager.update(this.G, DIALOGUES);

            if (this.G.animatingPainting) {
                this._updatePaintingAnimation();
            }

            this.animationSystem.update(deltaTime);

        } catch (error) {
            this.errorHandler.handleError(error, 'Update failed');
        }
    }

    _updatePaintingAnimation() {
        this.G.paintingAnimTimer++;
        if (this.G.paintingAnimTimer > 35) {
            this.G.paintingAnimTimer = 0;
            this.G.paintingPhase++;

            if (this.G.paintingPhase >= 5) {
                this.G.animatingPainting = false;
                this.G.setFlag('paintingDone', true);
                this.G.modEmotion(20);
                this.G.showFloatingText('你调和出泥土与阴影的颜色，画作完成了。', 260);
                this.soundManager.playSuccess();
                Logger.info('Chapter 1 completed');
            }
        }
    }

    render() {
        try {
            Renderer.clear();
            this.sceneRenderer.drawScene(this.G);

            this.itemRenderer.drawAllItems(this.G, INTERACTABLES);
            this.sceneRenderer.drawCandle(this.G);

            const mousePos = this.inputManager.getMousePosition();

            Object.values(this.G.characters).forEach(character => {
                if (character.visible) {
                    const isHovered = this.characterRenderer.isHoverCharacter(
                        mousePos.x,
                        mousePos.y,
                        character
                    );
                    this.characterRenderer.drawCharacter(character, isHovered);
                }
            });

            this.uiManager.drawAll(this.G.characters, mousePos.x, mousePos.y);

        } catch (error) {
            this.errorHandler.handleError(error, 'Render failed');
        }
    }

    gameLoop(timestamp) {
        if (!this.running) return;

        const deltaTime = timestamp - this.lastTimestamp;
        this.lastTimestamp = timestamp;

        this.update(deltaTime);
        this.render();

        requestAnimationFrame((ts) => this.gameLoop(ts));
    }

    reset() {
        this.G.reset();
        this.G.characters = JSON.parse(JSON.stringify(CHARACTERS));
        this.animationSystem.clear();
        Logger.info('Game reset');
    }

    destroy() {
        this.running = false;
        Logger.info('Game destroyed');
    }
}

class ErrorHandler {
    constructor() {
        this.errors = [];
        this.enabled = true;
    }

    wrap(fn) {
        if (this.enabled) {
            fn();
        }
    }

    handleError(error, context) {
        const errorInfo = {
            message: error.message,
            stack: error.stack,
            context: context,
            timestamp: new Date().toISOString()
        };

        this.errors.push(errorInfo);
        Logger.error(`${context}: ${error.message}`, error);

        if (this.enabled) {
            this._showErrorUI(errorInfo);
        }
    }

    _showErrorUI(errorInfo) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            background: rgba(200, 0, 0, 0.9);
            color: white;
            padding: 15px;
            border: 2px solid #ff4444;
            border-radius: 5px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            z-index: 10000;
            max-width: 400px;
        `;
        errorDiv.innerHTML = `
            <strong>Error:</strong> ${errorInfo.context}<br>
            <small>${errorInfo.message}</small>
        `;
        document.body.appendChild(errorDiv);

        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }

    getErrors() {
        return this.errors;
    }

    clearErrors() {
        this.errors = [];
    }
}

window.Game = Game;
window.ErrorHandler = ErrorHandler;
