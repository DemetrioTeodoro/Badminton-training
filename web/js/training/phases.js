/* Monta a sequência de fases (prep / work / rest) que o player executa. */
import { fmtSec } from '../core/format.js';
import { CATEGORIES } from '../data/categories.js';
import { EX } from '../data/exercises.js';
import { shadowCfg } from './shadow-config.js';

/** Texto da prescrição: "3 × 30s", "12 repetições"... */
export function describe(st) {
  const sets = st.sets || 1;
  const body = st.time ? fmtSec(st.time) : st.reps;
  return sets > 1 ? `${sets} × ${body}` : body;
}

/** Fases de um treino ou exercício a partir das etapas ({ ex, time | reps, sets, rest, after, interval }). */
export function phasesFromSteps(steps) {
  const ph = [{ type: 'prep', title: 'Prepare-se', duration: 8 }];
  steps.forEach((st, si) => {
    const ex = EX[st.ex];
    const sets = st.sets || 1;
    const shadow = ex.shadow ? {
      positions: ex.shadow.positions, interval: st.interval || ex.shadow.interval,
      mode: 'random', random: false, calls: shadowCfg.calls,
    } : null;
    for (let s = 1; s <= sets; s++) {
      ph.push({
        type: 'work', title: ex.name, subtitle: sets > 1 ? `Série ${s} de ${sets}` : CATEGORIES[ex.cat].label,
        duration: st.time || null, reps: st.reps || null, exercise: ex, shadow,
      });
      const isLast = si === steps.length - 1 && s === sets;
      const rest = s < sets ? (st.rest ?? 20) : (st.after ?? 15);
      if (!isLast && rest > 0) ph.push({ type: 'rest', title: 'Descanso', duration: rest });
    }
  });
  return ph;
}

/** Fases de uma sessão de shadow livre (configurada na aba Shadow). */
export function buildShadowPhases(c) {
  const shadow = { positions: c.positions, interval: c.interval, mode: c.mode, random: c.random, calls: c.calls };
  const ph = [{ type: 'prep', title: 'Prepare-se', subtitle: 'Fique na base, em posição de prontidão', duration: 5 }];
  for (let s = 1; s <= c.sets; s++) {
    ph.push({ type: 'work', title: `Série ${s} de ${c.sets}`, subtitle: 'Shadow footwork', duration: c.work, shadow });
    if (s < c.sets && c.rest > 0) ph.push({ type: 'rest', title: 'Descanso', duration: c.rest });
  }
  return ph;
}

/** Duração estimada em segundos (etapas por repetição contam ~45s). */
export const estimate = phases => phases.reduce((a, p) => a + (p.duration || 45), 0);
