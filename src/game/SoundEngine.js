import { Config } from '../composables/useGameSettings';

export class SoundEngine {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.buffers = {};
        this.enabled = false;
    }

    init() {
        if (this.enabled) return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
        this.masterGain = this.ctx.createGain();
        this.masterGain.connect(this.ctx.destination);
        this.masterGain.gain.value = Config.volume;
        this.enabled = true;
        if (this.ctx.state === 'suspended') this.ctx.resume();
        
        // Pre-generate noise buffers for efficiency
        this.generateNoiseBuffer('white', 2); 
        this.generateNoiseBuffer('pink', 2);
    }

    setVolume(val) {
        if (this.masterGain) this.masterGain.gain.value = val;
    }

    generateNoiseBuffer(type, duration) {
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        if (type === 'white') {
            for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        } else if (type === 'pink') {
            let b0, b1, b2, b3, b4, b5, b6;
            b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1;
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.0750759;
                b2 = 0.96900 * b2 + white * 0.1538520;
                b3 = 0.86650 * b3 + white * 0.3104856;
                b4 = 0.55000 * b4 + white * 0.5329522;
                b5 = -0.7616 * b5 - white * 0.0168980;
                data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
                data[i] *= 0.11; // Normalize
                b6 = white * 0.115926;
            }
        }
        this.buffers[type] = buffer;
    }

    playTone(freq, type, duration, time, panX) {
        if (!this.enabled) return { osc: null, gain: null };
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const panner = this.ctx.createStereoPanner();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, time);
        
        panner.pan.value = panX;
        
        osc.connect(gain);
        gain.connect(panner);
        panner.connect(this.masterGain);

        osc.start(time);
        osc.stop(time + duration);
        return { osc, gain };
    }

    playLaunch(x) {
        if (!this.enabled) return;
        const t = this.ctx.currentTime;
        const pan = (x / window.innerWidth) * 2 - 1;
        
        // Whistle effect
        const { osc, gain } = this.playTone(400, 'sine', 0.5, t, pan);
        if (osc && gain) {
            osc.frequency.exponentialRampToValueAtTime(800, t + 0.4);
            gain.gain.setValueAtTime(0.1, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);
        }

        // Slight noise for thrust
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.buffers['pink'];
        const nGain = this.ctx.createGain();
        const nPanner = this.ctx.createStereoPanner();
        
        nPanner.pan.value = pan;
        noise.connect(nGain);
        nGain.connect(nPanner);
        nPanner.connect(this.masterGain);
        
        nGain.gain.setValueAtTime(0.05, t);
        nGain.gain.linearRampToValueAtTime(0, t + 0.3);
        noise.start(t);
        noise.stop(t + 0.3);
    }

    playExplosion(type, x) {
        if (!this.enabled) return;
        const t = this.ctx.currentTime;
        const rawPan = (x / window.innerWidth) * 2 - 1;
        const pan = Math.max(-1, Math.min(1, rawPan));

        if (type === 'crackle') {
            this.playCrackleSequence(t, pan);
            return; 
        }
        
        const src = this.ctx.createBufferSource();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();
        const panner = this.ctx.createStereoPanner();

        let duration = 0.8;

        // Select noise based on type
        if (type === 'soft' || type === 'willow') {
            src.buffer = this.buffers['pink'];
            filter.type = 'lowpass';
            filter.frequency.value = 300;
            gain.gain.setValueAtTime(0.3, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 1.5);
            duration = 1.5;
        } else if (type === 'heavy') {
            src.buffer = this.buffers['pink'];
            filter.type = 'lowpass';
            filter.frequency.value = 150;
            gain.gain.setValueAtTime(0.8, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 2.0);
            duration = 2.0;
        } else {
            // Standard
            src.buffer = this.buffers['white'];
            filter.type = 'lowpass';
            filter.frequency.value = 800;
            gain.gain.setValueAtTime(0.4, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
            duration = 0.8;
        }

        panner.pan.value = pan;
        src.connect(filter);
        filter.connect(gain);
        gain.connect(panner);
        panner.connect(this.masterGain);
        
        src.start(t);
        src.stop(t + duration);
    }

    playCrackleSequence(startTime, pan) {
        const count = 5;
        for(let i=0; i<count; i++) {
            const t = startTime + Math.random() * 0.5;
            const src = this.ctx.createBufferSource();
            src.buffer = this.buffers['white'];
            const gain = this.ctx.createGain();
            const panner = this.ctx.createStereoPanner();
            
            // Clamp pan value to [-1, 1] range
            const rawPan = pan + (Math.random()*0.2 - 0.1);
            panner.pan.value = Math.max(-1, Math.min(1, rawPan));
            
            gain.gain.setValueAtTime(0.05, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
            
            src.connect(gain);
            gain.connect(panner);
            panner.connect(this.masterGain);
            src.start(t);
            src.stop(t + 0.1);
        }
    }
}
