/* Formatação de tempo e datas. */

/** ms -> "m:ss" (relógio do player). */
export const fmtClock = ms => { const s = Math.max(0, Math.ceil(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };

/** segundos -> "45s", "1min30", "2 min". */
export const fmtSec = s => { if (s < 60) return `${s}s`; const m = Math.floor(s / 60), r = s % 60; return r ? `${m}min${String(r).padStart(2, '0')}` : `${m} min`; };

/** segundos -> "12 min", "1h05". */
export const fmtDur = s => { const m = Math.max(1, Math.round(s / 60)); return m < 60 ? `${m} min` : `${Math.floor(m / 60)}h${String(m % 60).padStart(2, '0')}`; };

/** Chave do dia local (para agrupar o histórico). */
export const dayKey = d => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
