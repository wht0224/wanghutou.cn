'use strict';

class SceneRenderer {
    constructor() {
        this.W = 640;
        this.H = 480;
    }

    drawScene(gameState) {
        this._drawWalls();
        this._drawCeiling();
        this._drawFloor();
        this._drawWindows();
        this._drawDoor();
        this._drawPaintStains();
        this._drawWallDecorations();
        this._drawCandleLight(gameState);
    }

    _drawWalls() {
        Renderer.drawPixelRect(0, 0, this.W, 360, '#3d2817');

        Renderer.drawPixelRect(16, 16, 20, 18, '#422e1b');
        for (let y = 16; y < 344; y += 40) {
            for (let x = 16; x < this.W; x += 60) {
                Renderer.drawPixelRect(x, y, 20, 18, '#3a2414');
                Renderer.drawPixelRect(x + 2, y + 2, 16, 14, '#422e1b');
            }
        }
    }

    _drawCeiling() {
        Renderer.drawPixelRect(0, 0, this.W, 8, '#2a1808');
        Renderer.drawPixelRect(0, 6, this.W, 3, '#1a0a00');
        Renderer.drawPixelRect(100, 0, 6, 10, '#3a2810');
        Renderer.drawPixelRect(300, 0, 6, 10, '#3a2810');
        Renderer.drawPixelRect(500, 0, 6, 10, '#3a2810');
    }

    _drawFloor() {
        Renderer.drawPixelRect(0, 360, this.W, 120, '#2a1808');

        const vp = this.W / 2 + 40;
        for (let i = 0; i < 20; i++) {
            const t = i / 20;
            const y0 = 360 + t * 120;
            Renderer.drawPixelRect(vp - this.W * (1 - t * 0.6) / 2, y0, this.W * (1 - t * 0.6), 2, '#301c0a');
        }

        for (let i = 0; i < 12; i++) {
            const t = i / 12;
            const y = 360 + t * 120;
            const x0 = vp - this.W * 0.6 * (1 - t);
            const x1 = vp + this.W * 0.6 * (1 - t);
            Renderer.drawPixelRect(x0, y, 3, 480 - y, '#2c1a09');
            Renderer.drawPixelRect(x1, y, 3, 480 - y, '#2c1a09');
        }
    }

    _drawWindows() {
        const wx = 150, wy = 50, ww = 70, wh = 90;

        Renderer.drawPixelRect(wx - 5, wy - 5, ww + 10, wh + 10, '#4a3020');
        Renderer.ctx.lineWidth = 5;
        Renderer.drawPixelRectOutline(wx - 5, wy - 5, ww + 10, wh + 10, '#5a4030', 5);
        Renderer.drawPixelRect(wx, wy, ww, wh, '#0a0d1a');

        Renderer.drawPixelRect(wx + 40, wy + 12, 16, 16, '#e8d890');
        Renderer.drawPixelRect(wx + 42, wy + 14, 12, 12, '#f0e8b0');
        Renderer.drawPixelRect(wx + 34, wy + 10, 8, 8, '#0a0d1a');

        Renderer.drawPixelRect(wx + 10, wy + 8, 2, 2, '#fff');
        Renderer.drawPixelRect(wx + 55, wy + 22, 2, 2, '#fff');
        Renderer.drawPixelRect(wx + 18, wy + 48, 2, 2, '#fff');
        Renderer.drawPixelRect(wx + 52, wy + 58, 2, 2, '#fff');
        Renderer.drawPixelRect(wx + 30, wy + 15, 1, 1, '#fff');
        Renderer.drawPixelRect(wx + 6, wy + 65, 2, 2, '#fff');

        Renderer.drawPixelRect(wx + 33, wy, 4, wh, '#4a3020');
        Renderer.drawPixelRect(wx, wy + 42, ww, 4, '#4a3020');

        Renderer.drawPixelRect(wx - 5, wy + wh - 4, ww + 10, 8, '#5a3a20');
        Renderer.drawPixelRect(wx - 4, wy + wh - 3, ww + 8, 4, '#6a4a2a');
    }

    _drawDoor() {
        const dx = 530, dy = 110, dw = 80, dh = 250;

        Renderer.drawPixelRect(dx - 8, dy - 8, dw + 16, dh + 16, '#3a2210');
        Renderer.ctx.lineWidth = 6;
        Renderer.drawPixelRectOutline(dx - 8, dy - 8, dw + 16, dh + 16, '#5a3820', 6);
        Renderer.drawPixelRect(dx, dy, dw, dh, '#2a1508');
        Renderer.drawPixelRect(dx + 18, dy, 4, dh, '#301c0a');
        Renderer.drawPixelRect(dx + 38, dy, 4, dh, '#301c0a');
        Renderer.drawPixelRect(dx + 58, dy, 4, dh, '#301c0a');
        Renderer.drawPixelRect(dx + 56, dy + 125, 10, 14, '#c8a040');
        Renderer.drawPixelRect(dx + 57, dy + 127, 8, 4, '#e0c060');
        Renderer.drawPixelRect(dx + 56, dy + 135, 10, 2, '#a08020');
    }

    _drawPaintStains() {
        Renderer.drawSemiTransparentRect(360, 430, 80, 3, 0.4, 'rgba(30,43,59,1)');
        Renderer.drawPixelRect(375, 435, 5, 2, '#8b1a1a');
        Renderer.drawPixelRect(405, 437, 5, 2, '#1a3a8b');
        Renderer.drawPixelRect(425, 433, 3, 2, '#c8a000');
        Renderer.drawPixelRect(390, 432, 3, 1, '#8b1a1a');
    }

    _drawWallDecorations() {
        Renderer.drawPixelRect(430, 50, 40, 30, '#3a2010');
        Renderer.ctx.lineWidth = 3;
        Renderer.drawPixelRectOutline(430, 50, 40, 30, '#5a3020', 3);
        Renderer.drawPixelRect(433, 53, 34, 24, '#4a3018');
        Renderer.drawPixelRect(436, 56, 8, 10, '#5a4020');
        Renderer.drawPixelRect(448, 56, 8, 10, '#3a2010');
        Renderer.drawPixelRect(436, 70, 5, 4, '#6a5030');
    }

    _drawCandleLight(gameState) {
        const f = 0.03 + Math.sin(Date.now() / 180) * 0.015;
        Renderer.drawSemiTransparentRect(120, 90, 130, 150, f, 'rgba(255,180,80,1)');
        Renderer.drawSemiTransparentRect(60, 70, 250, 190, f * 0.8, 'rgba(255,180,80,1)');
    }

    drawCandle(gameState) {
        const cx = 260, cy = 90;

        Renderer.drawPixelRect(cx, cy + 38, 24, 6, '#4a2810');
        Renderer.drawPixelRect(cx + 2, cy + 40, 20, 3, '#5a3818');
        Renderer.drawPixelRect(cx + 3, cy + 43, 18, 2, '#3a1800');
        Renderer.drawPixelRect(cx + 6, cy + 14, 12, 24, '#f5e6c8');
        Renderer.drawPixelRect(cx + 8, cy + 16, 8, 20, '#e0cfa0');
        Renderer.drawPixelRect(cx + 9, cy + 16, 3, 6, '#faf0dd');

        gameState.candleTimer++;
        const flick = Math.sin(gameState.candleTimer * 0.35) * 3 + Math.sin(gameState.candleTimer * 0.7) * 1;

        Renderer.drawPixelRect(cx + 7 + flick, cy + 2, 8, 12, '#ff8800');
        Renderer.drawPixelRect(cx + 9 + flick, cy + 4, 4, 8, '#ffcc00');
        Renderer.drawPixelRect(cx + 10, cy + 6, 2, 4, '#fff8e0');
        Renderer.drawSemiTransparentRect(cx - 6, cy - 8, 32, 32, 0.08, 'rgba(255,180,40,1)');
    }
}

window.SceneRenderer = SceneRenderer;
