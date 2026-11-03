/*
 * Cantos da quadra para o shadow (coordenadas no SVG da meia-quadra).
 * Esquerda/direita do ponto de vista do jogador, de frente para a rede.
 */
export const BASE = { x: 150, y: 172 };
export const POSITIONS = {
  FL: { n: 1, name: 'Frente esquerda', x: 58, y: 62 },
  FR: { n: 2, name: 'Frente direita', x: 242, y: 62 },
  ML: { n: 3, name: 'Meio esquerda', x: 40, y: 188 },
  MR: { n: 4, name: 'Meio direita', x: 260, y: 188 },
  BL: { n: 5, name: 'Fundo esquerda', x: 58, y: 298 },
  BR: { n: 6, name: 'Fundo direita', x: 242, y: 298 },
};
export const ALL_POS = Object.keys(POSITIONS);

export const POS_GROUPS = {
  todos: { label: 'Todos', pos: ALL_POS },
  frenteFundo: { label: 'Frente + fundo', pos: ['FL', 'FR', 'BL', 'BR'] },
  rede: { label: 'Só rede', pos: ['FL', 'FR'] },
  fundo: { label: 'Só fundo', pos: ['BL', 'BR'] },
  laterais: { label: 'Defesa (laterais)', pos: ['ML', 'MR'] },
};

export const SHADOW_PRESETS = {
  iniciante: { label: 'Iniciante', interval: 3.5, work: 40, sets: 3, rest: 45 },
  intermediario: { label: 'Intermediário', interval: 2.6, work: 60, sets: 4, rest: 40 },
  avancado: { label: 'Avançado', interval: 1.9, work: 75, sets: 6, rest: 30 },
};
