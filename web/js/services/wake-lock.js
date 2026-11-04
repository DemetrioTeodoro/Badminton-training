/* Mantém a tela ligada durante o treino: plugin KeepAwake no Android, Wake Lock API no navegador. */
import { Native } from './native.js';

export const Wake = {
  lock: null,
  wanted: false,

  async on() {
    this.wanted = true;
    if (Native?.KeepAwake) { Native.KeepAwake.keepAwake().catch(() => {}); return; }
    try { if ('wakeLock' in navigator) this.lock = await navigator.wakeLock.request('screen'); } catch { /* ignorado */ }
  },

  off() {
    this.wanted = false;
    if (Native?.KeepAwake) { Native.KeepAwake.allowSleep().catch(() => {}); return; }
    try { this.lock?.release(); } catch { /* ignorado */ }
    this.lock = null;
  },
};

// O navegador solta o wake lock quando a aba fica oculta; pede de novo ao voltar.
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && Wake.wanted) Wake.on();
});
