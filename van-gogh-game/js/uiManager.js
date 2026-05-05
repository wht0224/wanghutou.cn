'use strict';

class UIManager {
    constructor(gameState, soundManager) {
        this.G = gameState;
        this.soundManager = soundManager;
        this.W = 640;
        this.H = 480;
        this.flashTimer = 0;
        this.flashAlpha = 0;
    }

    triggerFlash() {
        this.flashTimer = 40;
        this.flashAlpha = 0.28;
    }

    updateFlash() {
        if (this.flashTimer > 0) {
            this.flashTimer--;
            this.flashAlpha *= 0.91;
            Renderer.drawSemiTransparentRect(0, 0, this.W, this.H, this.flashAlpha, 'rgba(255,190,90,1)');
        }
    }

    drawEmotionUI() {
        const hx = this.W - 90, hy = 8;

        Renderer.drawPixelRect(hx, hy + 3, 2, 3, '#e74c3c');
        Renderer.drawPixelRect(hx + 2, hy, 2, 3, '#e74c3c');
        Renderer.drawPixelRect(hx + 6, hy, 2, 3, '#e74c3c');
        Renderer.drawPixelRect(hx + 8, hy + 3, 2, 3, '#e74c3c');
        Renderer.drawPixelRect(hx - 2, hy + 5, 2, 3, '#e74c3c');
        Renderer.drawPixelRect(hx + 10, hy + 5, 2, 3, '#e74c3c');
        Renderer.drawPixelRect(hx, hy + 5, 10, 2, '#e74c3c');
        Renderer.drawPixelRect(hx + 2, hy + 8, 2, 3, '#e74c3c');
        Renderer.drawPixelRect(hx + 6, hy + 8, 2, 3, '#e74c3c');

        Renderer.drawText(this.G.emotion.toString(), hx + 18, hy + 11, {
            font: '14px "Press Start 2P", monospace',
            color: '#e74c3c',
            align: 'left'
        });

        const emotionState = this.G.getEmotionState();
        Renderer.drawText(emotionState.label, hx + 18, hy + 26, {
            font: '8px "Press Start 2P", monospace',
            color: emotionState.color,
            align: 'left'
        });
    }

    drawInventoryUI() {
        const iy = this.H - 44;

        Renderer.drawSemiTransparentRect(0, iy, this.W, 48, 0.78);
        Renderer.drawPixelRectOutline(0, iy, this.W, 48, '#5a4030', 2);
        Renderer.drawPixelRectOutline(1, iy + 1, this.W - 2, 46, '#3a2010', 1);

        Renderer.drawText('物 品', 10, iy + 18, {
            font: '10px "Press Start 2P", monospace',
            color: '#b09060',
            align: 'left'
        });

        const itemColors = {
            '猩红': '#b22222',
            '钴蓝': '#2244aa',
            '铬黄': '#c8a000',
            '炭笔': '#333'
        };

        for (let i = 0; i < this.G.inventory.length; i++) {
            const ix = 100 + i * 90;
            const item = this.G.inventory[i];
            const color = itemColors[item] || '#888';

            Renderer.drawPixelRect(ix, iy + 10, 22, 16, color);
            Renderer.drawPixelRect(ix + 20, iy + 11, 3, 14, '#c8a840');
            Renderer.drawSemiTransparentRect(ix + 2, iy + 11, 8, 3, 0.2, '#fff');
            Renderer.drawText(item, ix, iy + 42, {
                font: '8px "Press Start 2P", monospace',
                color: '#e0d0c0',
                align: 'left'
            });
        }
    }

    drawChapterComplete() {
        if (!this.G.hasFlag('paintingDone')) return;

        Renderer.drawSemiTransparentRect(this.W / 2 - 130, this.H / 2 - 35, 260, 80, 0.88);
        Renderer.drawPixelRectOutline(this.W / 2 - 130, this.H / 2 - 35, 260, 80, '#c8a840', 3);

        Renderer.drawText('第一章 完成', this.W / 2, this.H / 2 - 10, {
            font: '14px "Press Start 2P", monospace',
            color: '#c8a840',
            align: 'center'
        });

        Renderer.drawText('→ 前往巴黎 →', this.W / 2, this.H / 2 + 22, {
            font: '10px "Press Start 2P", monospace',
            color: '#ffe0a0',
            align: 'center'
        });
    }

    drawFloatingText() {
        if (!this.G.showText) return;

        this.G.showTextTimer--;
        const alpha = Math.min(1, this.G.showTextTimer / 30);

        Renderer.drawSemiTransparentRect(30, this.H / 2 - 36, this.W - 60, 50, 0.78 * alpha);
        Renderer.drawPixelRectOutline(30, this.H / 2 - 36, this.W - 60, 50, `rgba(200,160,60,${alpha})`, 2);

        const wrappedText = Renderer.wrapText(this.G.showText, this.W - 100);
        for (let i = 0; i < Math.min(wrappedText.length, 3); i++) {
            Renderer.drawText(wrappedText[i], this.W / 2, this.H / 2 - 22 + i * 14, {
                font: '10px "Press Start 2P", monospace',
                color: `rgba(255,255,255,${alpha})`,
                align: 'center'
            });
        }

        if (this.G.showTextTimer <= 0) {
            this.G.showText = '';
        }
    }

    drawDialogueUI(characters) {
        if (!this.G.dialogueActive) return;

        const dy = this.H - 150;

        Renderer.drawSemiTransparentRect(0, dy, this.W, 154, 0.9);
        Renderer.drawPixelRectOutline(0, dy, this.W, 154, '#5a4030', 3);
        Renderer.drawPixelRectOutline(2, dy + 2, this.W - 4, 150, '#c8a840', 1);

        const speakerName = characters[this.G.dialogueSpeaker] ? characters[this.G.dialogueSpeaker].name : this.G.dialogueSpeaker;
        Renderer.drawText(speakerName, 16, dy + 18, {
            font: '11px "Press Start 2P", monospace',
            color: '#c8a840',
            align: 'left'
        });

        if (this.G.dialogueText) {
            Renderer.drawWrappedText(this.G.dialogueText, 16, dy + 38, this.W - 36, {
                font: '9px "Press Start 2P", monospace',
                color: '#f0ead8',
                align: 'left',
                lineHeight: 14,
                maxLines: 3
            });
        }

        if (this.G.dialogueChoices.length > 0) {
            for (let i = 0; i < this.G.dialogueChoices.length; i++) {
                const bx = 14;
                const by = dy + 80 + i * 22;
                const choice = this.G.dialogueChoices[i];
                const isHovered = this._isChoiceHovered(bx, by);

                Renderer.drawPixelRect(bx, by, this.W - 28, 20, isHovered ? '#3a2a1a' : '#1a1008');
                Renderer.drawPixelRectOutline(bx, by, this.W - 28, 20, isHovered ? '#c8a840' : '#5a4030', 1.5);

                Renderer.drawText('▶ ' + choice.text, bx + 8, by + 14, {
                    font: '8px "Press Start 2P", monospace',
                    color: isHovered ? '#fff' : '#aaa',
                    align: 'left'
                });
            }
        }
    }

    _isChoiceHovered(bx, by) {
        return this._mouseX >= bx && this._mouseX <= bx + this.W - 28 &&
               this._mouseY >= by && this._mouseY <= by + 20;
    }

    setMousePosition(x, y) {
        this._mouseX = x;
        this._mouseY = y;
    }

    drawAll(characters, mouseX, mouseY) {
        this.setMousePosition(mouseX, mouseY);
        this.drawEmotionUI();
        this.drawInventoryUI();
        this.drawChapterComplete();
        this.drawDialogueUI(characters);
        this.drawFloatingText();
        this.updateFlash();
    }
}

window.UIManager = UIManager;
