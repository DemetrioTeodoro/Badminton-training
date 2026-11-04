/* Bipes gerados com Web Audio (sem arquivos de áudio). */
import { settings } from './settings.js';

export const Sound = {
  ctx: null,

  /** Precisa ser chamado a partir de um toque do usuário. */
  unlock() {
    if (!this.ctx) { const AC = window.AudioContext || window.webkitAudioContext; if (AC) this.ctx = new AC(); }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  },

  beep(freq = 880, dur = 0.12, vol = 0.28) {
    if (!settings.beep || !this.ctx) return;
    const t = this.ctx.currentTime, o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = 'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g).connect(this.ctx.destination); o.start(t); o.stop(t + dur + 0.02);
  },
};
