'use strict';

class GameState {
    constructor() {
        this.chapter = 1;
        this.inventory = [];
        this.flags = new Map();
        this.emotion = 35;
        this.counters = {
            candlesLit: 0,
            trashSearch: 0
        };
        this.dialogueActive = false;
        this.currentDialogue = null;
        this.currentNode = null;
        this.dialogueText = '';
        this.dialogueChoices = [];
        this.dialogueSpeaker = '';
        this.showText = '';
        this.showTextTimer = 0;
        this.fatherTimer = 0;
        this.paintingPhase = 0;
        this.paintingAnimTimer = 0;
        this.candleFrame = 0;
        this.candleTimer = 0;
        this.selectedChoiceIndex = 0;
        this.characters = {};
        this.animatingPainting = false;
    }

    setFlag(key, value) {
        this.flags.set(key, value);
        Logger.debug(`Flag set: ${key} = ${value}`);
    }

    hasFlag(key) {
        return this.flags.has(key) && this.flags.get(key);
    }

    getFlag(key, defaultValue = null) {
        return this.flags.has(key) ? this.flags.get(key) : defaultValue;
    }

    addItem(item) {
        if (!this.inventory.includes(item)) {
            this.inventory.push(item);
            Logger.debug(`Item added: ${item}`);
            return true;
        }
        return false;
    }

    hasItem(item) {
        return this.inventory.includes(item);
    }

    removeItem(item) {
        const index = this.inventory.indexOf(item);
        if (index > -1) {
            this.inventory.splice(index, 1);
            Logger.debug(`Item removed: ${item}`);
            return true;
        }
        return false;
    }

    modEmotion(value) {
        const oldEmotion = this.emotion;
        this.emotion = Math.max(0, Math.min(100, this.emotion + value));
        Logger.debug(`Emotion changed: ${oldEmotion} -> ${this.emotion} (${value > 0 ? '+' : ''}${value})`);
        return this.emotion;
    }

    getEmotionState() {
        if (this.emotion < 30) return { label: '低落', color: '#888' };
        if (this.emotion < 50) return { label: '平和', color: '#aaa' };
        if (this.emotion < 70) return { label: '振作', color: '#55efc4' };
        return { label: '激昂', color: '#ffd700' };
    }

    startDialogue(treeId, dialogues) {
        this.dialogueActive = true;
        this.currentDialogue = treeId;
        this.selectedChoiceIndex = 0;
        this.advanceDialogue('node1', dialogues);
        Logger.info(`Dialogue started: ${treeId}`);
    }

    advanceDialogue(nodeId, dialogues) {
        const tree = dialogues[this.currentDialogue];
        if (!tree) {
            Logger.error(`Dialogue tree not found: ${this.currentDialogue}`);
            this.endDialogue();
            return;
        }

        const node = tree.find(n => n.id === nodeId);
        if (!node) {
            Logger.warn(`Dialogue node not found: ${nodeId}`);
            this.endDialogue();
            return;
        }

        this.currentNode = node;
        this.dialogueSpeaker = node.speaker || '';
        this.dialogueText = node.text || '';
        this.dialogueChoices = node.choices || [];
        this.selectedChoiceIndex = 0;

        if (this.dialogueChoices.length === 0 && node.next) {
            this.autoNext = setTimeout(() => {
                if (node.next === 'end') {
                    this.endDialogue();
                } else {
                    this.advanceDialogue(node.next, dialogues);
                }
            }, 2000);
        }
    }

    selectChoice(idx, dialogues) {
        if (this.autoNext) {
            clearTimeout(this.autoNext);
            this.autoNext = null;
        }

        if (idx < 0 || idx >= this.dialogueChoices.length) {
            Logger.warn(`Invalid choice index: ${idx}`);
            return;
        }

        const choice = this.dialogueChoices[idx];
        const allEffects = [];

        if (choice.effect) {
            allEffects.push(...[].concat(choice.effect));
        }
        if (choice.extraEffect) {
            allEffects.push(...[].concat(choice.extraEffect));
        }

        for (const effect of allEffects) {
            this._applyEffect(effect);
        }

        if (choice.nextNode === 'end') {
            this.endDialogue();
        } else {
            this.advanceDialogue(choice.nextNode, dialogues);
        }
    }

    _applyEffect(effect) {
        switch (effect.type) {
            case 'emotion':
                this.modEmotion(effect.value);
                break;
            case 'flag':
                this.setFlag(effect.key, effect.value);
                break;
            case 'item':
                this.addItem(effect.itemName);
                break;
            default:
                Logger.warn(`Unknown effect type: ${effect.type}`);
        }
    }

    endDialogue() {
        if (this.autoNext) {
            clearTimeout(this.autoNext);
            this.autoNext = null;
        }
        this.dialogueActive = false;
        this.currentDialogue = null;
        this.currentNode = null;
        this.dialogueText = '';
        this.dialogueChoices = [];
        this.dialogueSpeaker = '';
        Logger.info('Dialogue ended');
    }

    showFloatingText(text, dur = 200) {
        this.showText = text;
        this.showTextTimer = dur;
    }

    reset() {
        this.chapter = 1;
        this.inventory = [];
        this.flags.clear();
        this.emotion = 35;
        this.counters = { candlesLit: 0, trashSearch: 0 };
        this.dialogueActive = false;
        this.currentDialogue = null;
        this.currentNode = null;
        this.dialogueText = '';
        this.dialogueChoices = [];
        this.dialogueSpeaker = '';
        this.showText = '';
        this.showTextTimer = 0;
        this.fatherTimer = 0;
        this.paintingPhase = 0;
        this.paintingAnimTimer = 0;
        this.candleFrame = 0;
        this.candleTimer = 0;
        this.selectedChoiceIndex = 0;
        this.animatingPainting = false;
        Logger.info('Game state reset');
    }

    serialize() {
        return {
            chapter: this.chapter,
            inventory: this.inventory,
            flags: Array.from(this.flags.entries()),
            emotion: this.emotion,
            counters: this.counters
        };
    }

    deserialize(data) {
        if (data.chapter) this.chapter = data.chapter;
        if (data.inventory) this.inventory = data.inventory;
        if (data.flags) this.flags = new Map(data.flags);
        if (data.emotion) this.emotion = data.emotion;
        if (data.counters) this.counters = data.counters;
        Logger.info('Game state loaded');
    }
}

window.GameState = GameState;
