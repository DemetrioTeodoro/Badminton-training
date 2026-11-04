/* Motor do shadow: escolhe e agenda as chamadas dos cantos. */
import { POSITIONS } from '../data/court.js';

export class ShadowEngine {
  /**
   * cfg: { positions, interval (s), mode: 'random' | 'seq', random (ritmo variável) }
   * hooks: { onCall(pos), onReturn() }
   */
  constructor(cfg, hooks) {
    this.cfg = cfg; this.hooks = hooks;
    this.order = [...cfg.positions].sort((a, b) => POSITIONS[a].n - POSITIONS[b].n);
    this.last = null; this.idx = -1; this.t = null; this.t2 = null;
  }

  start(delay = 1000) { this.stop(); this.t = setTimeout(() => this.call(), delay); }
  stop() { clearTimeout(this.t); clearTimeout(this.t2); this.t = this.t2 = null; }

  pick() {
    const ps = this.order;
    if (this.cfg.mode === 'seq') { this.idx = (this.idx + 1) % ps.length; return ps[this.idx]; }
    if (ps.length === 1) return ps[0];
    let p; do { p = ps[Math.floor(Math.random() * ps.length)]; } while (p === this.last);
    return p;
  }

  call() {
    const pos = this.pick(); this.last = pos;
    let ms = this.cfg.interval * 1000;
    if (this.cfg.random) ms *= 0.75 + Math.random() * 0.5;
    this.hooks.onCall(pos);
    this.t2 = setTimeout(() => this.hooks.onReturn(), ms * 0.5);
    this.t = setTimeout(() => this.call(), ms);
  }
}
