'use strict';

const Renderer = {
    ctx: null,
    canvas: null,
    W: 640,
    H: 480,

    init(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            Logger.error('Canvas not found', canvasId);
            return false;
        }
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        this.canvas.width = this.W;
        this.canvas.height = this.H;
        Logger.info('Renderer initialized');
        return true;
    },

    clear() {
        this.ctx.clearRect(0, 0, this.W, this.H);
    },

    drawPixelRect(x, y, w, h, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));
    },

    drawPixelLine(x1, y1, x2, y2, color, lineWidth = 1) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(Math.floor(x1), Math.floor(y1));
        this.ctx.lineTo(Math.floor(x2), Math.floor(y2));
        this.ctx.stroke();
    },

    drawPixelCircle(cx, cy, r, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(Math.floor(cx), Math.floor(cy), Math.floor(r), 0, Math.PI * 2);
        this.ctx.fill();
    },

    drawPixelRectOutline(x, y, w, h, color, lineWidth = 1) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeRect(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));
    },

    drawText(text, x, y, options = {}) {
        const {
            font = '10px "Press Start 2P", monospace',
            color = '#fff',
            align = 'left',
            baseline = 'top'
        } = options;

        this.ctx.font = font;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = align;
        this.ctx.textBaseline = baseline;
        this.ctx.fillText(text, Math.floor(x), Math.floor(y));
    },

    drawWrappedText(text, x, y, maxWidth, options = {}) {
        const {
            font = '9px "Press Start 2P", monospace',
            color = '#fff',
            align = 'left',
            lineHeight = 14,
            maxLines = 3
        } = options;

        const lines = this.wrapText(text, maxWidth);
        const displayLines = lines.slice(0, maxLines);

        this.drawText(displayLines[0] || '', x, y, { font, color, align });

        for (let i = 1; i < displayLines.length; i++) {
            this.drawText(displayLines[i], x, y + i * lineHeight, { font, color, align });
        }

        return displayLines.length;
    },

    wrapText(text, maxWidth) {
        const chars = text.split('');
        const lines = [];
        const charWidth = 9;
        let currentLine = '';

        for (let i = 0; i < chars.length; i++) {
            const testLine = currentLine + chars[i];
            if (testLine.length * charWidth > maxWidth) {
                lines.push(currentLine);
                currentLine = chars[i];
            } else {
                currentLine = testLine;
            }
        }

        if (currentLine) {
            lines.push(currentLine);
        }

        return lines;
    },

    drawSemiTransparentRect(x, y, w, h, alpha, color = '#000') {
        this.ctx.fillStyle = color;
        this.ctx.globalAlpha = alpha;
        this.ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));
        this.ctx.globalAlpha = 1;
    },

    drawHoverEffect(x, y, w, h, borderColor = 'rgba(200,160,60,0.4)', bgAlpha = 0.12) {
        this.drawSemiTransparentRect(x - 3, y - 3, w + 6, h + 6, bgAlpha, 'rgba(255,255,200,1)');
        this.drawPixelRectOutline(x - 3, y - 3, w + 6, h + 6, borderColor, 2);
    },

    getTextWidth(text, font = '10px "Press Start 2P", monospace') {
        this.ctx.font = font;
        return this.ctx.measureText(text).width;
    }
};

window.Renderer = Renderer;
