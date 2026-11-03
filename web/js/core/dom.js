/* Atalhos de DOM e texto. */

export const $ = (s, el = document) => el.querySelector(s);
export const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/** Escapa texto para inserir em HTML. */
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/** Normaliza para busca: sem acentos e em minúsculas. */
export const norm = s => String(s).normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
