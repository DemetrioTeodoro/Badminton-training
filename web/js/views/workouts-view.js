/* Aba Treinos: rotinas guiadas prontas. */
import { $, esc } from '../core/dom.js';
import { fmtDur, fmtSec } from '../core/format.js';
import { CATEGORIES } from '../data/categories.js';
import { EX } from '../data/exercises.js';
import { WORKOUTS } from '../data/workouts.js';
import { describe, estimate, phasesFromSteps } from '../training/phases.js';
import { Player } from '../ui/player.js';
import { Sheet } from '../ui/sheet.js';

export function renderWorkouts(view) {
  view.innerHTML = `
    <section class="hero"><h1>Treinos</h1><p>Sessões guiadas com timer, voz e descanso automático.</p></section>
    <div class="cards">${WORKOUTS.map(w => {
      const ph = phasesFromSteps(w.steps);
      const hasShadow = w.steps.some(s => EX[s.ex].shadow);
      return `<button type="button" class="wcard" data-w="${w.id}">
        <span class="wcard-top"><span class="badge">${esc(w.level)}</span>${hasShadow ? '<span class="badge accent">Shadow</span>' : ''}</span>
        <b>${esc(w.name)}</b><small>${esc(w.desc)}</small>
        <span class="wcard-meta">~${fmtDur(estimate(ph))} · ${w.steps.length} exercícios</span></button>`;
    }).join('')}</div>`;
  view.onclick = e => { const c = e.target.closest('[data-w]'); if (c) openWorkout(c.dataset.w); };
  view.oninput = view.onkeydown = null;
}

function openWorkout(id) {
  const w = WORKOUTS.find(x => x.id === id), ph = phasesFromSteps(w.steps);
  Sheet.open(`
    <div class="sheet-head">
      <span class="badge">${esc(w.level)}</span>
      <h2>${esc(w.name)}</h2><p>${esc(w.desc)}</p>
    </div>
    <div class="presc">
      <div><small>Duração</small><b>~${fmtDur(estimate(ph))}</b></div>
      <div><small>Exercícios</small><b>${w.steps.length}</b></div>
    </div>
    <h3>Roteiro</h3>
    <div class="list compact">${w.steps.map(st => {
      const ex = EX[st.ex];
      return `<div class="item static"><span class="item-icon">${CATEGORIES[ex.cat].icon}</span>
        <span class="item-main"><b>${esc(ex.name)}</b><small>${esc(describe(st))}${st.sets > 1 ? ` · descanso ${fmtSec(st.rest ?? 20)}` : ''}${ex.shadow ? ' · shadow guiado' : ''}</small></span></div>`;
    }).join('')}</div>
    <button type="button" class="btn-primary block" data-start>Começar treino</button>`,
  s => { $('[data-start]', s).onclick = () => { Sheet.close(); Player.open({ title: w.name, kind: 'treino', phases: ph }); }; });
}
