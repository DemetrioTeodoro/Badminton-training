/* Aviso curto no rodapé. */
import { $ } from '../core/dom.js';

let timer;

export function toast(msg) {
  let t = $('#toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; t.setAttribute('role', 'status'); document.body.append(t); }
  t.textContent = msg; t.classList.add('show');
  clearTimeout(timer); timer = setTimeout(() => t.classList.remove('show'), 2200);
}
