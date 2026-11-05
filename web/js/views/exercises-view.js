/* Aba Exercícios: lista com busca/filtro e detalhe de cada exercício. */
import { $, $$, esc, norm } from '../core/dom.js';
import { fmtSec } from '../core/format.js';
import { CATEGORIES } from '../data/categories.js';
import { EX, EXERCISES } from '../data/exercises.js';
import { describe, phasesFromSteps } from '../training/phases.js';
import { courtSVG } from '../ui/court.js';
import { Player } from '../ui/player.js';
import { Sheet } from '../ui/sheet.js';

const exFilter = { q: '', cat: 'all' };

const exItem = ex => `<button type="button" class="item" data-ex="${ex.id}">
  <span class="item-icon">${CATEGORIES[ex.cat].icon}</span>
  <span class="item-main"><b>${esc(ex.name)}</b>
    <small>${CATEGORIES[ex.cat].label} · ${esc(describe(ex.default))}${ex.shadow ? ' · <em>shadow guiado</em>' : ''}${ex.partner ? ' · com parceiro' : ''}</small></span>
  <span class="chev" aria-hidden="true">›</span></button>`;

export function renderExercises(view) {
  view.innerHTML = `
    <section class="hero"><h1>Exercícios</h1><p>${EXERCISES.length} exercícios de footwork, físico e técnica.</p></section>
    <input class="search" type="search" placeholder="Buscar exercício" value="${esc(exFilter.q)}" id="exQ" aria-label="Buscar exercício">
    <div class="chips scroll">
      <button type="button" class="chip" data-cat="all">Todos</button>
      ${Object.entries(CATEGORIES).map(([k, c]) => `<button type="button" class="chip" data-cat="${k}">${c.icon} ${c.label}</button>`).join('')}
    </div>
    <div class="list" id="exList"></div>`;
  const draw = () => {
    const q = norm(exFilter.q.trim());
    const items = EXERCISES.filter(e => (exFilter.cat === 'all' || e.cat === exFilter.cat)
      && (!q || norm(`${e.name} ${e.desc} ${CATEGORIES[e.cat].label}`).includes(q)));
    $('#exList').innerHTML = items.map(exItem).join('') || '<p class="empty">Nenhum exercício encontrado.</p>';
    $$('[data-cat]', view).forEach(b => b.classList.toggle('on', b.dataset.cat === exFilter.cat));
  };
  view.oninput = e => { if (e.target.id === 'exQ') { exFilter.q = e.target.value; draw(); } };
  view.onclick = e => {
    const c = e.target.closest('[data-cat]'); if (c) { exFilter.cat = c.dataset.cat; draw(); return; }
    const it = e.target.closest('[data-ex]'); if (it) openExercise(it.dataset.ex);
  };
  view.onkeydown = null;
  draw();
}

function openExercise(id) {
  const ex = EX[id], d = ex.default;
  Sheet.open(`
    <div class="sheet-head">
      <span class="badge">${CATEGORIES[ex.cat].icon} ${CATEGORIES[ex.cat].label}</span>
      <h2>${esc(ex.name)}</h2>
      <p>${esc(ex.desc)}</p>
    </div>
    ${ex.shadow ? `<div class="court-mini">${courtSVG({ active: ex.shadow.positions })}</div>
      <p class="hint center">O app chama os cantos destacados a cada ${ex.shadow.interval.toFixed(1)}s.</p>` : ''}
    <div class="presc">
      <div><small>Prescrição</small><b>${esc(describe(d))}</b></div>
      ${d.sets > 1 ? `<div><small>Descanso</small><b>${fmtSec(d.rest || 20)}</b></div>` : ''}
      ${ex.partner ? '<div><small>Precisa de</small><b>Parceiro</b></div>' : ''}
    </div>
    <h3>Como fazer</h3>
    <ol class="steps">${ex.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>
    ${ex.tips.length ? `<h3>Dicas</h3><ul class="tips">${ex.tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
    <button type="button" class="btn-primary block" data-start>Iniciar exercício</button>`,
  s => {
    $('[data-start]', s).onclick = () => {
      Sheet.close();
      Player.open({ title: ex.name, kind: 'exercicio', phases: phasesFromSteps([{ ex: ex.id, ...d }]) });
    };
  });
}
