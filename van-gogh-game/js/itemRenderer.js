'use strict';

class ItemRenderer {
    constructor() {
        this.W = 640;
    }

    drawPaintTube(x, y, color1, color2) {
        Renderer.drawPixelRect(x, y + 4, 20, 14, color1);
        Renderer.drawPixelRect(x + 3, y + 7, 14, 8, color2 || color1);
        Renderer.drawPixelRect(x + 18, y + 6, 4, 10, '#c8a840');
        Renderer.drawPixelRect(x + 2, y + 4, 12, 3, '#fff');
        Renderer.drawSemiTransparentRect(x + 3, y + 5, 6, 2, 0.25, '#fff');
        Renderer.drawSemiTransparentRect(x + 2, y + 16, 14, 2, 0.2, '#000');
    }

    drawTrashBasket() {
        const bx = 570, by = 400;

        Renderer.drawPixelRect(bx + 6, by + 6, 36, 36, '#6b4226');

        for (let i = 0; i < 4; i++) {
            Renderer.drawPixelRect(bx + 6, by + 6 + i * 9, 36, 3, '#7b5236');
        }
        for (let i = 0; i < 4; i++) {
            Renderer.drawPixelRect(bx + 6 + i * 9, by + 6, 3, 36, '#7b5236');
        }

        Renderer.drawPixelRect(bx + 3, by, 42, 8, '#8b6246');
        Renderer.drawPixelRect(bx + 4, by + 1, 40, 4, '#9b7256');
        Renderer.drawPixelRect(bx + 10, by + 10, 8, 6, '#e8dcc8');
        Renderer.drawPixelRect(bx + 20, by + 12, 7, 5, '#ddd');
        Renderer.drawPixelRect(bx + 14, by + 8, 10, 7, '#f0e8d8');
        Renderer.drawPixelRect(bx + 26, by + 8, 6, 4, '#d4c4a8');
    }

    drawLetter() {
        const lx = 510, ly = 280;

        Renderer.drawPixelRect(lx, ly, 32, 22, '#f5e6c8');
        Renderer.ctx.lineWidth = 1;
        Renderer.drawPixelRectOutline(lx + 1, ly + 1, 30, 20, '#c4b590', 1);

        Renderer.ctx.beginPath();
        Renderer.ctx.moveTo(lx, ly + 10);
        Renderer.ctx.lineTo(lx + 16, ly);
        Renderer.ctx.lineTo(lx + 32, ly + 10);
        Renderer.ctx.strokeStyle = '#c4b590';
        Renderer.ctx.stroke();

        Renderer.drawPixelRect(lx + 11, ly + 6, 10, 10, '#b22222');
        Renderer.drawPixelRect(lx + 13, ly + 8, 6, 6, '#d44444');
        Renderer.drawPixelRect(lx + 15, ly + 10, 2, 2, '#ff0');
    }

    drawBible() {
        const bx = 110, by = 40;

        Renderer.drawPixelRect(bx, by, 28, 22, '#2a1005');
        Renderer.drawPixelRect(bx, by, 4, 22, '#1a0800');
        Renderer.drawPixelRect(bx + 9, by + 2, 3, 14, '#c8a840');
        Renderer.drawPixelRect(bx + 7, by + 6, 7, 3, '#c8a840');
        Renderer.drawPixelRect(bx + 23, by + 2, 3, 18, '#e8dcc0');
        Renderer.drawSemiTransparentRect(bx + 3, by + 3, 4, 16, 0.1, '#fff');
    }

    drawEasel(gameState) {
        const ex = 380, ey = 200;

        Renderer.drawPixelRect(ex + 4, ey + 50, 5, 40, '#4a2a10');
        Renderer.drawPixelRect(ex + 58, ey + 50, 5, 40, '#4a2a10');
        Renderer.drawPixelRect(ex + 28, ey + 72, 12, 22, '#3a1a00');
        Renderer.drawPixelRect(ex - 2, ey + 80, 70, 6, '#5a3a1a');
        Renderer.drawPixelRect(ex + 2, ey - 2, 66, 82, '#d4c4a0');
        Renderer.ctx.lineWidth = 2;
        Renderer.drawPixelRectOutline(ex + 2, ey - 2, 66, 82, '#8b7355', 2);
        Renderer.drawPixelRect(ex + 6, ey + 2, 58, 74, '#f0e0c0');

        if (gameState.hasFlag('paintingDone')) {
            this._drawPaintingDetail(ex + 6, ey + 2);
        } else if (gameState.paintingPhase > 0) {
            this._drawPaintingPartial(ex + 6, ey + 2, gameState.paintingPhase);
        }
    }

    _drawPaintingDetail(px, py) {
        Renderer.drawPixelRect(px, py, 58, 74, '#1a1008');
        Renderer.drawPixelRect(px + 22, py + 2, 14, 4, '#ffaa20');
        Renderer.drawPixelRect(px + 24, py + 3, 10, 2, '#ffcc40');
        Renderer.drawSemiTransparentRect(px + 8, py + 6, 42, 18, 0.35, 'rgba(255,170,40,1)');
        Renderer.drawPixelRect(px + 4, py + 44, 50, 18, '#3a2010');
        Renderer.drawPixelRect(px + 5, py + 46, 48, 14, '#4a2a14');
        Renderer.drawPixelRect(px + 18, py + 36, 22, 12, '#8b6914');
        Renderer.drawPixelRect(px + 20, py + 38, 18, 8, '#c8a870');
        Renderer.drawPixelRect(px + 21, py + 39, 16, 6, '#d8b880');
        Renderer.drawSemiTransparentRect(px + 22, py + 39, 6, 3, 0.15, '#fff');
        Renderer.drawSemiTransparentRect(px + 22, py + 28, 14, 8, 0.3, 'rgba(200,180,160,1)');
        Renderer.drawSemiTransparentRect(px + 18, py + 24, 22, 6, 0.15, 'rgba(200,180,160,1)');
        Renderer.drawPixelRect(px + 4, py + 20, 10, 18, '#2a1a0a');
        Renderer.drawPixelRect(px + 5, py + 16, 8, 7, '#d4a574');
        Renderer.drawPixelRect(px + 6, py + 28, 6, 4, '#3a2a1a');
        Renderer.drawPixelRect(px + 44, py + 20, 10, 18, '#201008');
        Renderer.drawPixelRect(px + 45, py + 16, 8, 7, '#d4a574');
        Renderer.drawPixelRect(px + 10, py + 14, 8, 12, '#1a0a00');
        Renderer.drawPixelRect(px + 11, py + 12, 6, 5, '#c9a06c');
        Renderer.drawPixelRect(px + 38, py + 14, 8, 12, '#1a0a00');
        Renderer.drawPixelRect(px + 39, py + 12, 6, 5, '#c9a06c');
        Renderer.drawPixelRect(px + 24, py + 10, 8, 14, '#120800');
        Renderer.drawPixelRect(px + 25, py + 8, 6, 5, '#c9a06c');
    }

    _drawPaintingPartial(px, py, phase) {
        Renderer.drawPixelRect(px, py, 58, 74, '#1a1008');

        if (phase >= 1) {
            Renderer.drawPixelRect(px + 4, py + 44, 50, 18, '#3a2010');
        }
        if (phase >= 2) {
            Renderer.drawPixelRect(px + 18, py + 36, 22, 12, '#8b6914');
            Renderer.drawPixelRect(px + 20, py + 38, 18, 8, '#c8a870');
        }
        if (phase >= 3) {
            Renderer.drawPixelRect(px + 4, py + 20, 10, 18, '#2a1a0a');
            Renderer.drawPixelRect(px + 44, py + 20, 10, 18, '#201008');
        }
        if (phase >= 4) {
            Renderer.drawPixelRect(px + 10, py + 14, 8, 12, '#1a0a00');
            Renderer.drawPixelRect(px + 38, py + 14, 8, 12, '#1a0a00');
            Renderer.drawPixelRect(px + 24, py + 10, 8, 14, '#120800');
        }
        if (phase >= 5) {
            Renderer.drawPixelRect(px + 22, py + 2, 14, 4, '#ffaa20');
            Renderer.drawPixelRect(px + 5, py + 16, 8, 7, '#d4a574');
            Renderer.drawPixelRect(px + 45, py + 16, 8, 7, '#d4a574');
            Renderer.drawPixelRect(px + 11, py + 12, 6, 5, '#c9a06c');
            Renderer.drawPixelRect(px + 39, py + 12, 6, 5, '#c9a06c');
            Renderer.drawPixelRect(px + 25, py + 8, 6, 5, '#c9a06c');
        }
    }

    isHoverItem(mouseX, mouseY, item) {
        const p = item.position;
        return mouseX >= p.x && mouseX <= p.x + p.w &&
               mouseY >= p.y && mouseY <= p.y + p.h;
    }

    drawAllItems(gameState, interactables) {
        this.drawTrashBasket();
        this.drawLetter();
        this.drawBible();

        const scarlet = interactables.scarlet_tube;
        if (!gameState.hasItem('猩红') && (scarlet.hidden ? gameState.hasFlag(scarlet.visibleCondition) : true)) {
            this.drawPaintTube(scarlet.position.x, scarlet.position.y, '#b22222', '#d44444');
        }

        if (!gameState.hasItem('钴蓝')) {
            const cobalt = interactables.cobalt_tube;
            this.drawPaintTube(cobalt.position.x, cobalt.position.y, '#2244aa', '#4466cc');
        }

        const chrome = interactables.chrome_tube;
        if (!gameState.hasItem('铬黄') && (chrome.hidden ? gameState.hasFlag(chrome.visibleCondition) : true)) {
            this.drawPaintTube(chrome.position.x, chrome.position.y, '#c8a000', '#e8c020');
        }
    }
}

window.ItemRenderer = ItemRenderer;
