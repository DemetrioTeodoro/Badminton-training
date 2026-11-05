/* Aba Histórico: sequência de dias, minutos da semana e sessões. */
import { esc } from '../core/dom.js';
import { dayKey, fmtDur } from '../core/format.js';
import { clearHistory, getHistory } from '../services/history.js';
import { toast } from '../ui/toast.js';

const KIND = { shadow: 'Shadow', treino: 'Treino', exercicio: 'Exercício' };

/** Dias seguidos com treino, contando até hoje (ou ontem, se hoje ainda não treinou). */
function streakOf(h) {
  const days = new Set(h.map(e => dayKey(new Date(e.date))));
  let streak = 0; const d = new Date();
  if (!days.has(dayKey(d))) d.setDate(d.getDate() - 1);
  while (days.has(dayKey(d))) { streak++; d.setDate(d.getDate() - 1); }
  return streak;
}

/** Minutos treinados em cada um dos últimos 7 dias. */
function lastWeek(h) {
  const now = new Date(), week = [];
  for (let i = 6; i >= 0; i--) {
    const day = new Date(now); day.setDate(now.getDate() - i);
    const k = dayKey(day);
    const secs = h.filter(e => dayKey(new Date(e.date)) === k).reduce((a, e) => a + e.seconds, 0);
    week.push({ label: day.toLocaleDateString('pt-BR', { weekday: 'narrow' }), min: Math.round(secs / 60), today: i === 0 });
  }
  return week;
}

export function renderHistory(view) {
  const h = getHistory();
  const streak = streakOf(h);
  const week = lastWeek(h);
  const maxMin = Math.max(10, ...week.map(w => w.min));
  const weekMin = week.reduce((a, w) => a + w.min, 0);
  const totalMoves = h.reduce((a, e) => a + (e.moves || 0), 0);

  view.innerHTML = `
    <section class="hero"><h1>Histórico</h1><p>Constância vence intensidade.</p></section>
    <div class="stats grid">
      <div class="stat"><b>${streak}</b><small>${streak === 1 ? 'dia seguido' : 'dias seguidos'}</small></div>
      <div class="stat"><b>${weekMin}</b><small>min nos últimos 7 dias</small></div>
      <div class="stat"><b>${h.length}</b><small>sessões no total</small></div>
      <div class="stat"><b>${totalMoves}</b><small>movimentos de shadow</small></div>
    </div>
    <section class="card">
      <h3>Últimos 7 dias (minutos)</h3>
      <div class="week">${week.map(w => `<div class="wk${w.today ? ' today' : ''}">
        <span class="wk-val">${w.min || ''}</span>
        <span class="wk-bar"><i style="height:${(w.min / maxMin) * 100}%"></i></span>
        <span class="wk-lbl">${w.label}</span></div>`).join('')}</div>
    </section>
    <section>
      <h3 class="section-title">Sessões</h3>
      ${h.length ? `<div class="list">${h.slice(0, 60).map(e => {
        const dt = new Date(e.date);
        return `<div class="item static"><span class="item-main"><b>${esc(e.title)}</b>
          <small>${dt.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' })} · ${dt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} · ${KIND[e.kind] || ''}${e.done ? '' : ' · incompleto'}</small></span>
          <span class="item-side"><b>${fmtDur(e.seconds)}</b>${e.moves ? `<small>${e.moves} mov.</small>` : ''}</span></div>`;
      }).join('')}</div>
      <button type="button" class="btn-ghost block danger" id="clearHist">Apagar histórico</button>`
      : '<p class="empty">Nenhuma sessão ainda. Que tal começar com um shadow?</p>'}
    </section>`;

  view.onclick = e => {
    const b = e.target.closest('#clearHist'); if (!b) return;
    if (b.dataset.armed) { clearHistory(); renderHistory(view); toast('Histórico apagado'); }
    else { b.dataset.armed = '1'; b.textContent = 'Toque de novo para confirmar'; setTimeout(() => { if (b.isConnected) { delete b.dataset.armed; b.textContent = 'Apagar histórico'; } }, 4000); }
  };
  view.oninput = view.onkeydown = null;
}
