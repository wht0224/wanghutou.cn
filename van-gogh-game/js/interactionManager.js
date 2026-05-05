'use strict';

class InteractionManager {
    constructor(gameState, soundManager) {
        this.G = gameState;
        this.soundManager = soundManager;
        this.W = 640;
        this.H = 480;
    }

    isInside(pos, rect) {
        return pos.x >= rect.x && pos.x <= rect.x + rect.w &&
               pos.y >= rect.y && pos.y <= rect.y + rect.h;
    }

    handleClick(pos, interactables, dialogues, sceneRenderer) {
        if (this.G.dialogueActive) {
            this._handleDialogueClick(pos);
            return;
        }

        if (this.G.characters.father.visible && this.isInside(pos, { ...this.G.characters.father.position, w: 48, h: 64 })) {
            this.G.startDialogue('dialogue_father_confront', dialogues);
            this.soundManager.playDialogue();
            return;
        }

        if (this.isInside(pos, { ...this.G.characters.mother.position, w: 48, h: 64 })) {
            const dialogueKey = this.G.emotion < 40 ? 'dialogue_mother_comfort' : 'dialogue_mother_art';
            this.G.startDialogue(dialogueKey, dialogues);
            this.soundManager.playDialogue();
            return;
        }

        if (this.isInside(pos, interactables.candle.position)) {
            this._handleCandleClick();
            return;
        }

        if (this._handleScarletTube(pos, interactables)) return;
        if (this._handleCobaltTube(pos, interactables)) return;
        if (this._handleTrashBasket(pos, interactables)) return;
        if (this._handleChromeTube(pos, interactables)) return;
        if (this._handleLetter(pos, interactables)) return;
        if (this._handleEasel(pos, interactables)) return;
        if (this._handleBible(pos, interactables)) return;
    }

    _handleCandleClick() {
        this.G.counters.candlesLit++;
        this.G.candleFrame = (this.G.candleFrame + 1) % 2;
        this.soundManager.playClick();

        if (this.G.counters.candlesLit >= 3) {
            this.G.setFlag('candleClicked3', true);
            this.G.showFloatingText('烛光摇曳，你注意到柜子下有什么东西……', 240);
            this.soundManager.playAmbient();
        }
    }

    _handleScarletTube(pos, interactables) {
        const st = interactables.scarlet_tube;
        if (!this.G.hasItem('猩红') && (st.hidden ? this.G.hasFlag(st.visibleCondition) : true) &&
            this.isInside(pos, st.position)) {
            this.G.addItem('猩红');
            this.G.showFloatingText(st.pickupText);
            this.soundManager.playPickup();
            return true;
        }
        return false;
    }

    _handleCobaltTube(pos, interactables) {
        const ct = interactables.cobalt_tube;
        if (!this.G.hasItem('钴蓝') && this.isInside(pos, ct.position)) {
            this.G.addItem('钴蓝');
            this.G.showFloatingText(ct.pickupText);
            this.soundManager.playPickup();
            return true;
        }
        return false;
    }

    _handleTrashBasket(pos, interactables) {
        if (this.isInside(pos, interactables.trash_basket.position)) {
            this.G.counters.trashSearch++;
            this.soundManager.playClick();

            if (this.G.counters.trashSearch >= 3 && !this.G.hasFlag('chromeFound')) {
                this.G.setFlag('chromeFound', true);
                this.G.showFloatingText('你找到了铬黄颜料管！', 200);
                this.soundManager.playSuccess();
            } else if (this.G.counters.trashSearch < 3) {
                this.G.showFloatingText('你在废纸篓中翻找……', 120);
            } else {
                this.G.showFloatingText('废纸篓里已经没有东西了。', 120);
            }
            return true;
        }
        return false;
    }

    _handleChromeTube(pos, interactables) {
        const cht = interactables.chrome_tube;
        if (!this.G.hasItem('铬黄') && (cht.hidden ? this.G.hasFlag(cht.visibleCondition) : true) &&
            this.isInside(pos, cht.position)) {
            this.G.addItem('铬黄');
            this.G.showFloatingText(cht.pickupText);
            this.soundManager.playPickup();
            return true;
        }
        return false;
    }

    _handleLetter(pos, interactables) {
        if (this.isInside(pos, interactables.letter.position)) {
            if (!this.G.hasFlag('letterRead')) {
                this.G.setFlag('letterRead', true);
                this.G.showFloatingText('"亲爱的提奥……我渴望用深色调描绘那些在灯光下吃土豆的人……"', 340);
                this.G.fatherTimer = 300;
                this.soundManager.playDialogue();
            } else {
                this.G.showFloatingText('"亲爱的提奥……我渴望用深色调描绘那些在灯光下吃土豆的人……"');
            }
            return true;
        }
        return false;
    }

    _handleEasel(pos, interactables) {
        if (this.isInside(pos, interactables.easel.position)) {
            const required = interactables.easel.requiredItems;
            if (required.every(i => this.G.hasItem(i)) && !this.G.hasFlag('paintingDone')) {
                this._startPainting();
            } else if (this.G.hasFlag('paintingDone')) {
                this.G.showFloatingText('《吃土豆的人》——完成。');
            } else {
                this.G.showFloatingText('还需要更多颜料才能开始创作。');
                this.soundManager.playError();
            }
            return true;
        }
        return false;
    }

    _startPainting() {
        this.G.paintingPhase = 0;
        this.G.paintingAnimTimer = 0;
        this.G.animatingPainting = true;
        this.soundManager.playPainting();
        Logger.info('Painting started');
    }

    _handleBible(pos, interactables) {
        if (this.isInside(pos, interactables.bible.position)) {
            this.G.showFloatingText('"父亲希望我成为牧师，但我的讲坛在田野与矿坑。"');
            this.soundManager.playClick();
            return true;
        }
        return false;
    }

    _handleDialogueClick(pos) {
        if (this.G.dialogueChoices.length === 0) return;

        const py = this.H - 145;
        for (let i = 0; i < this.G.dialogueChoices.length; i++) {
            const bx = 30;
            const by = py + 26 + i * 38;
            if (pos.x >= bx && pos.x <= bx + this.W - 60 &&
                pos.y >= by && pos.y <= by + 32) {
                this.G.selectChoice(i, DIALOGUES);
                this.soundManager.playSelect();
                return;
            }
        }
    }

    update(gameState, dialogues) {
        if (gameState.hasFlag('letterRead') && !gameState.characters.father.visible && gameState.fatherTimer > 0) {
            gameState.fatherTimer--;
            if (gameState.fatherTimer <= 0) {
                gameState.characters.father.visible = true;
                gameState.showFloatingText('父亲推门而入……');
                this.soundManager.playAmbient();
            }
        }
    }
}

window.InteractionManager = InteractionManager;
