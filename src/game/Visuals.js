import { Config } from '../composables/useGameSettings';

export class Skyline {
    constructor(w, h) {
        this.resize(w, h);
    }
    resize(w, h) {
        this.w = w;
        this.h = h;
        this.buildings = [];
        let x = 0;
        while(x < w) {
            const bw = Math.random() * 60 + 40;
            const bh = Math.random() * h * 0.15 + 20;
            this.buildings.push({x, w: bw, h: bh});
            x += bw - 5; // Overlap slightly
        }
    }
    draw(ctx) {
        if (!Config.showCity) return;
        ctx.fillStyle = '#020617';
        ctx.beginPath();
        this.buildings.forEach(b => {
            ctx.rect(b.x, this.h - b.h, b.w, b.h);
        });
        ctx.fill();
        
        // Windows
        ctx.fillStyle = 'rgba(255, 255, 200, 0.1)';
        this.buildings.forEach((b, i) => {
            if (i % 3 !== 0) return; // Not all buildings lit
            for(let wy = this.h - b.h + 10; wy < this.h - 10; wy += 15) {
                for(let wx = b.x + 5; wx < b.x + b.w - 5; wx += 10) {
                    if (Math.random() > 0.7) ctx.fillRect(wx, wy, 4, 8);
                }
            }
        });
    }
}

export class StarField {
    constructor(w, h) {
        this.stars = [];
        for(let i=0; i<150; i++) {
            this.stars.push({
                x: Math.random() * w,
                y: Math.random() * h * 0.7,
                size: Math.random() * 1.5,
                alpha: Math.random(),
                speed: Math.random() * 0.02
            });
        }
    }
    draw(ctx, w, h) {
        if (!Config.showStars) return;
        ctx.fillStyle = '#fff';
        this.stars.forEach(s => {
            s.alpha += s.speed;
            if (s.alpha > 1 || s.alpha < 0) s.speed *= -1;
            ctx.globalAlpha = Math.abs(s.alpha) * 0.7;
            ctx.fillRect(s.x, s.y, s.size, s.size);
        });
        ctx.globalAlpha = 1;
    }
}

export class CloudLayer {
    constructor(w, h) {
        this.clouds = [];
        for(let i=0; i<5; i++) {
            this.clouds.push({
                x: Math.random() * w,
                y: Math.random() * h * 0.3,
                speed: Math.random() * 0.1 + 0.05,
                size: Math.random() * 100 + 100,
                alpha: Math.random() * 0.03 + 0.01
            });
        }
    }
    update(w) {
        this.clouds.forEach(c => {
            c.x += c.speed;
            if (c.x > w + c.size) c.x = -c.size;
        });
    }
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = '#fff';
        this.clouds.forEach(c => {
            ctx.globalAlpha = c.alpha;
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
            ctx.arc(c.x + c.size * 0.6, c.y + 20, c.size * 0.7, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.restore();
    }
}
