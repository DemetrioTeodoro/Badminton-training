/* Bottom sheet (painel modal que sobe de baixo). */
import { $ } from '../core/dom.js';
import { I } from '../core/icons.js';

export const Sheet = {
  open(html, onMount) {
    const s = $('#sheet');
    s.innerHTML = `<div class="sheet-backdrop" data-close></div>
      <div class="sheet-panel" role="dialog" aria-modal="true">
        <button class="icon-btn sheet-x" data-close aria-label="Fechar">${I.close}</button>${html}</div>`;
    s.hidden = false;
    document.body.classList.add('no-scroll');
    onMount?.(s);
  },

  close() {
    const s = $('#sheet'); s.hidden = true; s.innerHTML = '';
    if ($('#player').hidden) document.body.classList.remove('no-scroll');
  },
};

$('#sheet').addEventListener('click', e => { if (e.target.closest('[data-close]')) Sheet.close(); });
document.addEventListener('keydown', e => { if (e.code === 'Escape' && !$('#sheet').hidden) Sheet.close(); });
