import { SoundEngine } from './SoundEngine';
import { Skyline, StarField, CloudLayer } from './Visuals';
import { Particle, Firework } from './Physics';
import { Config } from '../composables/useGameSettings';

export class Engine {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d', { alpha: false });
        
        this.particles = [];
        this.fireworks = [];
        this.pool = {
            particles: [],
            fireworks: []
        };
        
        // Pre-fill pool
        for(let i=0; i<1000; i++) this.pool.particles.push(new Particle());
        for(let i=0; i<50; i++) this.pool.fireworks.push(new Firework());
        
        this.sound = new SoundEngine();
        this.skyline = new Skyline(window.innerWidth, window.innerHeight);
        this.stars = new StarField(window.innerWidth, window.innerHeight);
        this.clouds = new CloudLayer(window.innerWidth, window.innerHeight);
        
        this.resize();
        this.running = true;
        this.loop();
        
        this.resizeHandler = () => {
            this.resize();
            this.skyline.resize(this.width, this.height);
        };
        window.addEventListener('resize', this.resizeHandler);
    }

    destroy() {
        this.running = false;
        window.removeEventListener('resize', this.resizeHandler);
    }
    
    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }
    
    getParticle() { return this.pool.particles.pop() || new Particle(); }
    releaseParticle(p) { this.pool.particles.push(p); }
    
    getFirework() { return this.pool.fireworks.pop() || new Firework(); }
    releaseFirework(f) { this.pool.fireworks.push(f); }
    
    launch(tx, ty) {
        // Sound init is handled in App.vue on user interaction
        
        const sx = this.width / 2 + (Math.random() - 0.5) * 200;
        const sy = this.height;
        const fw = this.getFirework();
        const color = Math.floor(Math.random() * 360);
        fw.init(sx, sy, tx, ty, color);
        this.fireworks.push(fw);
        this.sound.playLaunch(sx);
    }
    
    explode(x, y, color) {
        // 10 Distinct Types
        const types = [
            'peony', 'chrysanthemum', 'willow', 'strobe', 'ring',
            'heart', 'crossette', 'pistil', 'star', 'heavy', 'crackle'
        ];
        // Weighted selection
        let type = types[Math.floor(Math.random() * types.length)];
        if (Math.random() < 0.3) type = 'peony'; // Most common
        
        this.sound.playExplosion(type === 'heavy' ? 'heavy' : (type === 'crackle' ? 'crackle' : 'normal'), x);
        
        // Increase particle counts for density
        let count = 120;
        if (type === 'willow') count = 180;
        if (type === 'ring') count = 100;
        if (type === 'heavy') count = 300;
        if (type === 'star') count = 80;
        if (type === 'crackle') count = 150;
        
        // Secondary color for interest
        const secondaryColor = (color + Math.random() * 60 + 30) % 360;

        for(let i=0; i<count; i++) {
            const p = this.getParticle();
            // Mix colors
            const pColor = (Math.random() < 0.8) ? color : secondaryColor;
            
            p.init(x, y, pColor, type);
            
            const angle = (Math.PI * 2 * i) / count;
            // Higher velocity variation for more "explosive" feel
            let speed = Math.random() * 6 + 3; 
            let vx = Math.cos(angle) * speed;
            let vy = Math.sin(angle) * speed;
            
            // Shape Modifiers
            if (type === 'heart') {
                const t = (Math.PI * 2 * i) / count;
                const fx = 16 * Math.pow(Math.sin(t), 3);
                const fy = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
                vx = fx * 0.25; vy = fy * 0.25; // Slightly larger
            } else if (type === 'star') {
                const r = 4 + 2 * Math.sin(angle * 5); // 5 points
                vx = Math.cos(angle) * r;
                vy = Math.sin(angle) * r;
            } else if (type === 'ring') {
                speed = 7;
                vx = Math.cos(angle) * speed;
                vy = Math.sin(angle) * speed;
            } else if (type === 'pistil') {
                // Core + Outer
                if (i < count / 2) {
                    speed = Math.random() * 3; // Inner
                    p.color = (color + 180) % 360; // Complementary color
                } else {
                    speed = Math.random() * 5 + 5; // Outer
                }
                vx = Math.cos(angle) * speed;
                vy = Math.sin(angle) * speed;
            } else if (type === 'heavy') {
                 speed = Math.random() * 15;
                 vx = Math.cos(angle) * speed;
                 vy = Math.sin(angle) * speed;
            }
            
            p.vx = vx;
            p.vy = vy;
            this.particles.push(p);
        }
    }
    
    loop() {
        if (!this.running) return;
        requestAnimationFrame(() => this.loop());
        
        // Background - Use slight opacity for trails? 
        // For now, full clear to keep background clean, but we can experiment
        // To make it "dazzling", we rely on 'lighter' composite for particles
        const grad = this.ctx.createLinearGradient(0, 0, 0, this.height);
        grad.addColorStop(0, '#0f172a');
        grad.addColorStop(1, '#020617');
        this.ctx.fillStyle = grad;
        
        // Use source-over for background elements
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        this.stars.draw(this.ctx, this.width, this.height);
        this.clouds.update(this.width);
        this.clouds.draw(this.ctx);
        this.skyline.draw(this.ctx);
        
        // Switch to lighter for fireworks to make them pop/glow
        this.ctx.globalCompositeOperation = 'lighter';
        
        // Auto Fire
        if (Config.autoFire && Math.random() < 0.01 * Config.density) {
             this.launch(
                 this.width * 0.2 + Math.random() * this.width * 0.6,
                 this.height * 0.1 + Math.random() * this.height * 0.4
             );
        }
        
        // Update Fireworks
        for (let i = this.fireworks.length - 1; i >= 0; i--) {
            const fw = this.fireworks[i];
            if (fw.update()) {
                this.explode(fw.x, fw.y, fw.color);
                this.releaseFirework(fw);
                this.fireworks.splice(i, 1);
            } else {
                fw.draw(this.ctx);
            }
        }
        
        // Update Particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            const result = p.update();
            
            if (result === 'split') {
                 // Crossette effect: split into 4
                 for(let k=0; k<4; k++) {
                     const sub = this.getParticle();
                     sub.init(p.x, p.y, p.color, 'spark');
                     sub.vx = (k===0?1:k===1?-1:0) * 2;
                     sub.vy = (k===2?1:k===3?-1:0) * 2;
                     sub.gravity = 0.6;
                     this.particles.push(sub);
                 }
            }
            
            if (!p.active) {
                this.releaseParticle(p);
                this.particles.splice(i, 1);
            } else {
                p.draw(this.ctx);
            }
        }
        
        // Reset
        this.ctx.globalCompositeOperation = 'source-over';
    }
}
