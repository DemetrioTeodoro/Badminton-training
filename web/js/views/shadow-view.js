/* Aba Shadow: configura e inicia o shadow footwork. */
import { $, $$ } from '../core/dom.js';
import { fmtDur, fmtSec } from '../core/format.js';
import { POS_GROUPS, SHADOW_PRESETS } from '../data/court.js';
import { buildShadowPhases } from '../training/phases.js';
import { saveShadow, SH_RANGES, shadowCfg } from '../training/shadow-config.js';
import { courtSVG } from '../ui/court.js';
import { Player } from '../ui/player.js';
import { toast } from '../ui/toast.js';

/** Grupo de botões de escolha única. */
const seg = (key, opts, cur) => `<div class="seg" data-key="${key}">${opts.map(([v, l]) =>
  `<button type="button" data-val="${v}" class="${String(cur) === v ? 'on' : ''}">${l}</button>`).join('')}</div>`;

export function renderShadow(view) {
  const c = shadowCfg;
  view.innerHTML = `
    <section class="hero">
      <h1>Shadow footwork</h1>
      <p>O app chama um canto da quadra. Vá até ele, faça o golpe de sombra e volte para a base.</p>
    </section>
    <section class="card">
      <div class="court-wrap" id="shCourt">${courtSVG({ active: c.positions, interactive: true })}</div>
      <p class="hint">Toque nos círculos para ligar ou desligar cantos. Esquerda e direita como você vê, de frente para a rede.</p>
      <div class="chips wrap">${Object.entries(POS_GROUPS).map(([k, g]) => `<button type="button" class="chip" data-group="${k}">${g.label}</button>`).join('')}</div>
    </section>
    <section class="card">
      <h3>Nível</h3>
      ${seg('preset', [...Object.entries(SHADOW_PRESETS).map(([k, p]) => [k, p.label]), ['custom', 'Personalizado']], c.preset)}
      ${SH_RANGES.map(r => `<label class="range">
        <span class="range-top"><span>${r.label}</span><b id="v-${r.key}">${r.fmt(c[r.key])}</b></span>
        <input type="range" min="${r.min}" max="${r.max}" step="${r.step}" value="${c[r.key]}" data-key="${r.key}"></label>`).join('')}
    </section>
    <section class="card">
      <h3>Chamadas</h3>
      ${seg('calls', [['nome', 'Nome do canto'], ['numero', 'Número'], ['bipe', 'Só bipe']], c.calls)}
      <h3>Ordem</h3>
      ${seg('mode', [['random', 'Aleatória'], ['seq', 'Sequência 1→6']], c.mode)}
      <div class="setting">
        <div><b>Ritmo imprevisível</b><small>Varia o tempo entre chamadas (±25%) para treinar reação</small></div>
        <label class="switch"><input type="checkbox" data-key="random" ${c.random ? 'checked' : ''}><span></span></label>
      </div>
    </section>
    <div class="start-bar">
      <div class="start-info" id="shSummary"></div>
      <button type="button" class="btn-primary" id="shStart">Iniciar</button>
    </div>`;

  const syncCourt = () => $$('#shCourt .pos').forEach(g => {
    const on = c.positions.includes(g.dataset.pos);
    g.classList.toggle('on', on); g.setAttribute('aria-pressed', on);
  });
  const syncSegs = () => $$('.seg', view).forEach(s => $$('button', s).forEach(b => b.classList.toggle('on', String(c[s.dataset.key]) === b.dataset.val)));
  const syncRanges = () => SH_RANGES.forEach(r => { $(`input[data-key="${r.key}"]`, view).value = c[r.key]; $(`#v-${r.key}`).textContent = r.fmt(c[r.key]); });
  const summary = () => {
    const total = 5 + c.sets * c.work + (c.sets - 1) * c.rest;
    const moves = Math.floor(c.work / c.interval) * c.sets;
    $('#shSummary').innerHTML = `<b>${fmtDur(total)}</b> · ~${moves} movimentos<br><small>${c.positions.length} canto${c.positions.length > 1 ? 's' : ''} · ${c.sets} × ${fmtSec(c.work)}</small>`;
  };
  const togglePos = k => {
    const has = c.positions.includes(k);
    if (has && c.positions.length === 1) { toast('Deixe pelo menos um canto ativo'); return; }
    c.positions = has ? c.positions.filter(p => p !== k) : [...c.positions, k];
    syncCourt(); summary(); saveShadow();
  };

  view.onclick = e => {
    const pos = e.target.closest('.pos'); if (pos) return togglePos(pos.dataset.pos);
    const g = e.target.closest('[data-group]');
    if (g) { c.positions = [...POS_GROUPS[g.dataset.group].pos]; syncCourt(); summary(); saveShadow(); return; }
    const sb = e.target.closest('.seg button');
    if (sb) {
      const key = sb.parentElement.dataset.key, val = sb.dataset.val;
      if (key === 'preset') { c.preset = val; if (SHADOW_PRESETS[val]) { const { label, ...vals } = SHADOW_PRESETS[val]; Object.assign(c, vals); syncRanges(); } }
      else c[key] = val;
      syncSegs(); summary(); saveShadow(); return;
    }
    if (e.target.closest('#shStart')) Player.open({ title: 'Shadow footwork', kind: 'shadow', phases: buildShadowPhases(c) });
  };
  view.onkeydown = e => {
    const pos = e.target.closest?.('.pos');
    if (pos && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); togglePos(pos.dataset.pos); }
  };
  view.oninput = e => {
    const k = e.target.dataset.key; if (!k) return;
    if (e.target.type === 'checkbox') c[k] = e.target.checked;
    else {
      c[k] = Number(e.target.value); c.preset = 'custom';
      $(`#v-${k}`).textContent = SH_RANGES.find(r => r.key === k).fmt(c[k]);
      syncSegs();
    }
    summary(); saveShadow();
  };
  summary();
}
