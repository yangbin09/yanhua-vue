export class Particle {
    constructor() {
        this.active = false;
        this.coords = [];
    }
    init(x, y, color, type) {
        this.x = x; this.y = y;
        this.color = color;
        this.type = type;
        this.active = true;
        
        this.coords = [[x,y], [x,y], [x,y], [x,y], [x,y]]; // Longer trail buffer
        this.vx = 0; this.vy = 0;
        this.alpha = 1;
        
        // Balanced decay for realistic duration (not too long, not too short)
        this.decay = Math.random() * 0.01 + 0.005; 
        
        this.gravity = 0.9; // Stronger gravity for realistic fall
        this.friction = 0.96; 
        this.brightness = Math.random() * 20 + 60; 
        
        // Type Specifics
        if (type === 'willow') {
            this.gravity = 0.45;
            this.friction = 0.95;
            this.decay = 0.006; // Slow fade but not eternal
            this.coords = new Array(10).fill([x,y]); 
        } else if (type === 'heavy') {
            this.gravity = 1.0;
            this.friction = 0.95;
            this.decay = 0.01;
        } else if (type === 'crossette') {
            this.decay = 0.012;
            this.hasSplit = false;
        } else if (type === 'strobe') {
            this.decay = 0.008;
            this.friction = 0.97;
        } else if (type === 'crackle') {
            this.decay = 0.015;
            this.friction = 0.95;
        }
    }
    
    update() {
        this.coords.pop();
        this.coords.unshift([this.x, this.y]);
        
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity * 0.05; // Adjusted gravity scaling
        
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
        
        if (this.type === 'crossette' && !this.hasSplit && this.alpha < 0.6) {
            this.hasSplit = true;
            // Return split info to app
            return 'split';
        }
        
        if (this.alpha <= 0) this.active = false;
        return null;
    }
    
    draw(ctx) {
        ctx.beginPath();
        // Trail
        ctx.moveTo(this.coords[this.coords.length-1][0], this.coords[this.coords.length-1][1]);
        ctx.lineTo(this.x, this.y);
        
        let a = this.alpha;
        if (this.type === 'strobe') {
            a = (Date.now() % 200 < 100) ? this.alpha : 0.1;
        } else if (this.type === 'crackle') {
             // Random flicker
             a = (Math.random() > 0.5) ? this.alpha : 0.2;
        }
        
        // Use higher saturation/lightness for "dazzling" look
        // And use white for the core if very bright
        ctx.strokeStyle = `hsla(${this.color}, 100%, ${this.brightness}%, ${a})`;
        ctx.lineWidth = (this.type === 'heavy') ? 2.5 : 1.5;
        
        // Add a glow effect for bright particles
        // Optimize: Disable shadowBlur on mobile (screen width < 768)
        if (this.brightness > 60 && window.innerWidth > 768) {
             ctx.shadowBlur = 4;
             ctx.shadowColor = `hsla(${this.color}, 100%, 50%, ${a})`;
        } else {
             ctx.shadowBlur = 0;
        }
        
        ctx.stroke();
        ctx.shadowBlur = 0; // Reset
    }
}

export class Firework {
    constructor() {
        this.active = false;
        this.coords = [];
    }
    init(sx, sy, tx, ty, color) {
        this.x = sx; this.y = sy;
        this.sx = sx; this.sy = sy;
        this.tx = tx; this.ty = ty;
        this.color = color;
        this.active = true;
        this.coords = [[sx,sy],[sx,sy],[sx,sy]];
        
        const angle = Math.atan2(ty - sy, tx - sx);
        this.speed = 4; // Increased initial speed for faster launch
        this.acceleration = 1.05;
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
        
        this.distTotal = Math.hypot(tx-sx, ty-sy);
        this.distTraveled = 0;
    }
    
    update() {
        this.coords.pop();
        this.coords.unshift([this.x, this.y]);
        
        this.speed *= this.acceleration;
        const angle = Math.atan2(this.ty - this.sy, this.tx - this.sx);
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
        
        this.x += this.vx;
        this.y += this.vy;
        
        this.distTraveled = Math.hypot(this.x - this.sx, this.y - this.sy);
        
        if (this.distTraveled >= this.distTotal) {
            this.active = false;
            return true; // Explode
        }
        return false;
    }
    
    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.coords[this.coords.length-1][0], this.coords[this.coords.length-1][1]);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = `hsl(${this.color}, 100%, 70%)`;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}
