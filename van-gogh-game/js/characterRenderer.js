'use strict';

class CharacterRenderer {
    constructor() {
        this.W = 640;
    }

    drawCharacter(character, isHovered) {
        const x = character.position.x;
        const y = character.position.y;
        const cw = 48;
        const chh = 64;

        if (isHovered) {
            Renderer.drawHoverEffect(x - 3, y - 3, cw + 6, chh + 6);
        }

        const hx = x + 16;
        const hy = y;
        const bodyX = x + 12;
        const bodyY = y + 16;
        const legY = y + 50;

        this._drawHead(character.id, hx, hy);
        this._drawBody(character.id, bodyX, bodyY);
        this._drawLegsAndShoes(x, legY);
        this._drawNameLabel(character.name, x, y, cw);
    }

    _drawHead(id, hx, hy) {
        if (id === 'father') {
            Renderer.drawPixelRect(hx, hy, 16, 14, '#d4a574');
            Renderer.drawPixelRect(hx + 1, hy - 1, 14, 3, '#3a3a3a');
            Renderer.drawPixelRect(hx + 4, hy - 3, 8, 3, '#c9a06c');
            Renderer.drawPixelRect(hx + 3, hy + 3, 10, 2, '#222');
            Renderer.drawPixelRect(hx + 4, hy + 5, 2, 2, '#000');
            Renderer.drawPixelRect(hx + 10, hy + 5, 2, 2, '#000');
            Renderer.drawPixelRect(hx + 4, hy + 5, 1, 1, '#fff');
            Renderer.drawPixelRect(hx + 10, hy + 5, 1, 1, '#fff');
            Renderer.drawPixelRect(hx + 2, hy + 9, 12, 2, '#b87333');
            Renderer.drawPixelRect(hx + 6, hy + 11, 4, 1, '#555');
            Renderer.drawPixelRect(hx, hy + 6, 2, 8, '#c9a06c');
            Renderer.drawPixelRect(hx + 14, hy + 6, 2, 8, '#c9a06c');
        } else if (id === 'mother') {
            Renderer.drawPixelRect(hx, hy, 16, 14, '#e8c9a0');
            Renderer.drawPixelRect(hx - 1, hy - 4, 18, 6, '#9a9a9a');
            Renderer.drawPixelRect(hx + 3, hy - 7, 10, 5, '#b0b0b0');
            Renderer.drawPixelRect(hx + 2, hy - 4, 3, 2, '#d0d0d0');
            Renderer.drawPixelRect(hx, hy + 4, 2, 8, '#c9a06c');
            Renderer.drawPixelRect(hx + 14, hy + 4, 2, 8, '#c9a06c');
            Renderer.drawPixelRect(hx + 4, hy + 3, 2, 1, '#3a3a3a');
            Renderer.drawPixelRect(hx + 10, hy + 3, 2, 1, '#3a3a3a');
            Renderer.drawPixelRect(hx + 5, hy + 5, 2, 2, '#2a2a2a');
            Renderer.drawPixelRect(hx + 10, hy + 5, 2, 2, '#2a2a2a');
            Renderer.drawPixelRect(hx + 5, hy + 5, 1, 1, '#fff');
            Renderer.drawPixelRect(hx + 10, hy + 5, 1, 1, '#fff');
            Renderer.drawPixelRect(hx + 6, hy + 9, 4, 2, '#c46464');
            Renderer.drawPixelRect(hx + 5, hy + 11, 6, 2, '#e8c9c0');
        } else {
            Renderer.drawPixelRect(hx, hy, 16, 14, '#d4a57a');
            Renderer.drawPixelRect(hx + 1, hy - 2, 14, 4, '#8B4513');
            Renderer.drawPixelRect(hx + 2, hy - 3, 12, 2, '#a05518');
            Renderer.drawPixelRect(hx + 4, hy - 1, 8, 1, '#c07030');
            Renderer.drawPixelRect(hx + 1, hy + 6, 2, 3, '#c09060');
            Renderer.drawPixelRect(hx + 13, hy + 6, 2, 3, '#c09060');
            Renderer.drawPixelRect(hx + 1, hy + 9, 14, 3, '#b22222');
            Renderer.drawPixelRect(hx + 3, hy + 11, 10, 2, '#c83030');
            Renderer.drawPixelRect(hx + 2, hy + 8, 12, 1, '#901818');
            Renderer.drawPixelRect(hx + 4, hy + 4, 2, 2, '#2a5530');
            Renderer.drawPixelRect(hx + 10, hy + 4, 2, 2, '#2a5530');
            Renderer.drawPixelRect(hx + 4, hy + 4, 1, 1, '#fff');
            Renderer.drawPixelRect(hx + 10, hy + 4, 1, 1, '#fff');
            Renderer.drawPixelRect(hx + 3, hy + 3, 4, 1, '#222');
            Renderer.drawPixelRect(hx + 9, hy + 3, 4, 1, '#222');
        }
    }

    _drawBody(id, bodyX, bodyY) {
        Renderer.drawPixelRect(bodyX + 3, bodyY + 3, 20, 30, '#221a10');

        if (id === 'father') {
            Renderer.drawPixelRect(bodyX, bodyY, 24, 34, '#1a1a1a');
            Renderer.drawPixelRect(bodyX + 2, bodyY + 4, 20, 26, '#222');
            Renderer.drawPixelRect(bodyX + 7, bodyY, 10, 5, '#eee');
            Renderer.drawPixelRect(bodyX + 9, bodyY + 1, 6, 3, '#fff');
            Renderer.drawPixelRect(bodyX + 11, bodyY + 12, 2, 2, '#2a2a2a');
            Renderer.drawPixelRect(bodyX + 11, bodyY + 20, 2, 2, '#2a2a2a');
            Renderer.drawPixelRect(bodyX + 11, bodyY + 28, 2, 2, '#2a2a2a');
        } else if (id === 'mother') {
            Renderer.drawPixelRect(bodyX, bodyY, 24, 34, '#3e2723');
            Renderer.drawPixelRect(bodyX + 3, bodyY + 6, 18, 22, '#4a3028');
            Renderer.drawPixelRect(bodyX + 2, bodyY + 16, 20, 1, '#523830');
            Renderer.drawPixelRect(bodyX + 2, bodyY + 24, 20, 1, '#523830');
            Renderer.drawPixelRect(bodyX + 7, bodyY, 10, 4, '#d4c5b0');
            Renderer.drawPixelRect(bodyX + 8, bodyY + 1, 8, 2, '#c0b098');
        } else {
            Renderer.drawPixelRect(bodyX, bodyY, 24, 34, '#1e2b3b');
            Renderer.drawPixelRect(bodyX + 3, bodyY + 4, 18, 26, '#263547');
            Renderer.drawPixelRect(bodyX + 5, bodyY + 12, 14, 1, '#2a3d52');
            Renderer.drawPixelRect(bodyX + 4, bodyY + 20, 16, 1, '#2a3d52');
            Renderer.drawPixelRect(bodyX + 7, bodyY + 1, 10, 3, '#ddd');
            Renderer.drawPixelRect(bodyX + 9, bodyY + 2, 6, 1, '#fff');
            Renderer.drawPixelRect(bodyX + 11, bodyY + 10, 2, 2, '#4a3a20');
            Renderer.drawPixelRect(bodyX + 11, bodyY + 18, 2, 2, '#4a3a20');
        }
    }

    _drawLegsAndShoes(x, legY) {
        Renderer.drawPixelRect(x + 14, legY, 8, 14, '#1a1a1a');
        Renderer.drawPixelRect(x + 26, legY, 8, 14, '#1a1a1a');
        Renderer.drawPixelRect(x + 15, legY + 1, 6, 12, '#222');
        Renderer.drawPixelRect(x + 27, legY + 1, 6, 12, '#222');
        Renderer.drawPixelRect(x + 13, legY + 13, 10, 2, '#2a1a0a');
        Renderer.drawPixelRect(x + 25, legY + 13, 10, 2, '#2a1a0a');
    }

    _drawNameLabel(name, x, y, cw) {
        Renderer.drawSemiTransparentRect(x - 4, y - 18, cw + 8, 16, 0.75);
        Renderer.drawPixelRectOutline(x - 4, y - 18, cw + 8, 16, 'rgba(180,140,80,0.5)', 1);

        Renderer.drawText(name, x + cw / 2, y - 5, {
            font: '10px "Press Start 2P", monospace',
            color: '#ffe0a0',
            align: 'center'
        });
    }

    isHoverCharacter(mouseX, mouseY, character) {
        if (!character.visible) return false;
        const p = character.position;
        return mouseX >= p.x && mouseX <= p.x + p.w + 4 &&
               mouseY >= p.y && mouseY <= p.y + p.h + 4;
    }
}

window.CharacterRenderer = CharacterRenderer;
