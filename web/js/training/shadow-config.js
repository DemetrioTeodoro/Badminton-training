/* Configuração do shadow escolhida pelo usuário (salva no aparelho). */
import { store } from '../core/storage.js';
import { fmtSec } from '../core/format.js';
import { ALL_POS, SHADOW_PRESETS } from '../data/court.js';

const SHADOW_DEFAULT = { preset: 'iniciante', positions: ALL_POS, mode: 'random', random: false, calls: 'nome', ...SHADOW_PRESETS.iniciante };

export const shadowCfg = { ...SHADOW_DEFAULT, ...store.get('shadow', {}) };
delete shadowCfg.label;

export const saveShadow = () => store.set('shadow', shadowCfg);

/** Controles deslizantes da aba Shadow. */
export const SH_RANGES = [
  { key: 'interval', label: 'Ritmo', min: 1.2, max: 5, step: 0.1, fmt: v => `${v.toFixed(1)}s por movimento` },
  { key: 'work', label: 'Duração da série', min: 15, max: 180, step: 5, fmt: v => fmtSec(v) },
  { key: 'sets', label: 'Séries', min: 1, max: 12, step: 1, fmt: v => String(v) },
  { key: 'rest', label: 'Descanso entre séries', min: 0, max: 120, step: 5, fmt: v => (v ? fmtSec(v) : 'Sem descanso') },
];
