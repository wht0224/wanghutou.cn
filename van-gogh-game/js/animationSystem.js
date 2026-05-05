'use strict';

class AnimationSystem {
    constructor() {
        this.animations = [];
        this.lastTimestamp = 0;
    }

    add(animation) {
        animation.startTime = performance.now();
        animation.isComplete = false;
        this.animations.push(animation);
        Logger.debug(`Animation added: ${animation.type}`);
        return animation;
    }

    fadeIn(target, duration = 300, startAlpha = 0) {
        return this.add({
            type: 'fadeIn',
            target,
            duration,
            startAlpha,
            currentAlpha: startAlpha,
            update(deltaTime) {
                const elapsed = performance.now() - this.startTime;
                this.currentAlpha = this.startAlpha + (1 - this.startAlpha) * Math.min(elapsed / this.duration, 1);
                if (this.currentAlpha >= 1) this.isComplete = true;
            }
        });
    }

    fadeOut(target, duration = 300, endAlpha = 0) {
        return this.add({
            type: 'fadeOut',
            target,
            duration,
            endAlpha,
            currentAlpha: 1,
            update(deltaTime) {
                const elapsed = performance.now() - this.startTime;
                this.currentAlpha = 1 - (1 - this.endAlpha) * Math.min(elapsed / this.duration, 1);
                if (this.currentAlpha <= this.endAlpha) this.isComplete = true;
            }
        });
    }

    moveTo(target, endX, endY, duration = 500) {
        return this.add({
            type: 'moveTo',
            target,
            startX: target.x,
            startY: target.y,
            endX,
            endY,
            duration,
            update(deltaTime) {
                const elapsed = performance.now() - this.startTime;
                const progress = Math.min(elapsed / this.duration, 1);
                const eased = this._easeOutQuad(progress);
                this.target.x = this.startX + (this.endX - this.startX) * eased;
                this.target.y = this.startY + (this.endY - this.startY) * eased;
                if (progress >= 1) this.isComplete = true;
            }
        });
    }

    scale(target, endScale, duration = 300) {
        return this.add({
            type: 'scale',
            target,
            startScale: target.scale || 1,
            endScale,
            duration,
            update(deltaTime) {
                const elapsed = performance.now() - this.startTime;
                const progress = Math.min(elapsed / this.duration, 1);
                const eased = this._easeOutBack(progress);
                this.target.scale = this.startScale + (this.endScale - this.startScale) * eased;
                if (progress >= 1) this.isComplete = true;
            }
        });
    }

    shake(target, intensity = 5, duration = 300) {
        return this.add({
            type: 'shake',
            target,
            intensity,
            duration,
            startX: target.x,
            startY: target.y,
            update(deltaTime) {
                const elapsed = performance.now() - this.startTime;
                if (elapsed >= this.duration) {
                    this.target.x = this.startX;
                    this.target.y = this.startY;
                    this.isComplete = true;
                    return;
                }
                const progress = elapsed / this.duration;
                const dampedIntensity = this.intensity * (1 - progress);
                this.target.x = this.startX + (Math.random() - 0.5) * 2 * dampedIntensity;
                this.target.y = this.startY + (Math.random() - 0.5) * 2 * dampedIntensity;
            }
        });
    }

    pulse(target, minScale = 0.9, maxScale = 1.1, duration = 1000) {
        return this.add({
            type: 'pulse',
            target,
            minScale,
            maxScale,
            duration,
            update(deltaTime) {
                const elapsed = (performance.now() - this.startTime) % this.duration;
                const progress = elapsed / this.duration;
                const oscillation = Math.sin(progress * Math.PI * 2);
                this.target.scale = this.minScale + (this.maxScale - this.minScale) * (oscillation + 1) / 2;
            }
        });
    }

    _easeOutQuad(t) {
        return t * (2 - t);
    }

    _easeOutBack(t) {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    }

    _easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    update(deltaTime) {
        for (let i = this.animations.length - 1; i >= 0; i--) {
            const anim = this.animations[i];
            anim.update(deltaTime);

            if (anim.isComplete) {
                this.animations.splice(i, 1);
                if (anim.onComplete) anim.onComplete();
                Logger.debug(`Animation completed: ${anim.type}`);
            }
        }
    }

    clear() {
        this.animations = [];
    }

    hasAnimations() {
        return this.animations.length > 0;
    }
}

window.AnimationSystem = AnimationSystem;
