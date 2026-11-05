/*
 * Player: tela cheia durante o treino.
 * Executa as fases (prep / work / rest), controla timer, voz, bipes e o shadow.
 * Ao fechar, dispara o evento 'player:exit' na window.
 */
import { $, $$, esc } from '../core/dom.js';
import { fmtClock, fmtDur, fmtSec } from '../core/format.js';
import { I } from '../core/icons.js';
import { ALL_POS, BASE, POSITIONS } from '../data/court.js';
import { logSession } from '../services/history.js';
import { settings } from '../services/settings.js';
import { Sound } from '../services/sound.js';
import { vibrate } from '../services/vibration.js';
import { Voice } from '../services/voice.js';
import { Wake } from '../services/wake-lock.js';
import { ShadowEngine } from '../training/shadow-engine.js';
import { courtSVG } from './court.js';

const PHASE_LABEL = { prep: 'Prepare-se', work: 'Valendo', rest: 'Descanso' };

export const Player = {
  active: false,
  el: null,

  /** kind: 'shadow' | 'treino' | 'exercicio' */
  open({ title, kind, phases }) {
    Sound.unlock();
    Object.assign(this, {
      title, kind, phases, i: 0, paused: false, confirming: false, done: false,
      startedAt: Date.now(), pausedMs: 0, pauseAt: 0, moves: 0, counts: {}, engine: null, active: true,
    });
    this.el = $('#player');
    this.el.hidden = false;
    document.body.classList.add('no-scroll');
    Wake.on();
    clearInterval(this.iv);
    this.iv = setInterval(() => this.tick(), 100);
    this.goto(0);
  },

  get phase() { return this.phases[this.i]; },
  nextWork() { return this.phases.slice(this.i + 1).find(p => p.type === 'work'); },
  elapsed() { return Math.round((Date.now() - this.startedAt - this.pausedMs - (this.paused ? Date.now() - this.pauseAt : 0)) / 1000); },

  goto(i) {
    this.engine?.stop(); this.engine = null;
    if (i >= this.phases.length) return this.finish();
    this.i = Math.max(0, i);
    const p = this.phase;
    this.remaining = p.duration ? p.duration * 1000 : null;
    this.endAt = p.duration && !this.paused ? Date.now() + this.remaining : null;
    this.lastBeep = null;
    this.render();
    this.announce();
    if (p.type === 'work' && p.shadow) {
      this.engine = new ShadowEngine(p.shadow, { onCall: pos => this.onCall(pos), onReturn: () => this.onReturn() });
      if (!this.paused) this.engine.start(1300);
    }
  },

  announce() {
    const p = this.phase, nw = this.nextWork();
    if (p.type === 'prep') Voice.speak(`Prepare-se. ${nw ? nw.exercise?.name || 'Shadow' : ''}`);
    else if (p.type === 'rest') Voice.speak(nw ? `Descanso. A seguir, ${nw.exercise?.name || nw.title}` : 'Descanso');
    else if (p.shadow) Voice.speak('Vai!');
    else Voice.speak(p.reps ? `${p.title}. ${p.reps}` : p.title);
    vibrate(p.type === 'work' ? [80, 60, 80] : 120);
  },

  tick() {
    if (!this.active || this.paused || !this.endAt) return;
    this.remaining = Math.max(0, this.endAt - Date.now());
    const t = $('#plTimer', this.el); if (t) t.textContent = fmtClock(this.remaining);
    const s = Math.ceil(this.remaining / 1000);
    if (s <= 3 && s >= 1 && s !== this.lastBeep) { this.lastBeep = s; Sound.beep(660, 0.1); }
    if (this.remaining <= 0) { Sound.beep(1046, 0.35); this.goto(this.i + 1); }
  },

  onCall(pos) {
    if (this.paused || (this.endAt && this.endAt - Date.now() < 1200)) return;
    const P = POSITIONS[pos];
    this.moves++; this.counts[pos] = (this.counts[pos] || 0) + 1;
    const svg = $('.pl-court svg', this.el);
    if (svg) {
      $$('.pos', svg).forEach(g => g.classList.toggle('hit', g.dataset.pos === pos));
      $('.runner', svg).style.transform = `translate(${P.x - BASE.x}px, ${P.y - BASE.y}px)`;
      const l = $('.path', svg); l.setAttribute('x2', P.x); l.setAttribute('y2', P.y); l.classList.add('show');
    }
    const call = $('#plCall', this.el);
    if (call) {
      call.innerHTML = `<span class="num">${P.n}</span>${esc(P.name)}`;
      call.classList.remove('flash'); void call.offsetWidth; call.classList.add('flash');
    }
    const mc = $('#plMoves', this.el); if (mc) mc.textContent = this.moves;
    const mode = this.phase.shadow.calls;
    if (mode === 'bipe' || !settings.voice) Sound.beep(1250, 0.09, 0.35);
    else Voice.speak(mode === 'numero' ? String(P.n) : P.name);
    vibrate(35);
  },

  onReturn() {
    const svg = $('.pl-court svg', this.el);
    if (svg) {
      $$('.pos', svg).forEach(g => g.classList.remove('hit'));
      $('.runner', svg).style.transform = '';
      $('.path', svg).classList.remove('show');
    }
    const call = $('#plCall', this.el);
    if (call) { call.classList.remove('flash'); call.innerHTML = '<span class="muted">Base</span>'; }
  },

  togglePause(force) {
    const want = force ?? !this.paused;
    if (want === this.paused) return;
    this.paused = want;
    if (want) {
      this.pauseAt = Date.now();
      if (this.endAt) this.remaining = Math.max(0, this.endAt - Date.now());
      this.endAt = null;
      this.engine?.stop(); this.onReturn(); Voice.stop();
    } else {
      this.pausedMs += Date.now() - this.pauseAt;
      if (this.phase.duration) this.endAt = Date.now() + this.remaining;
      this.engine?.start(800);
    }
    this.el.classList.toggle('paused', this.paused);
    const b = $('[data-act="pause"]', this.el);
    if (b) { b.innerHTML = this.paused ? I.play : I.pause; b.setAttribute('aria-label', this.paused ? 'Continuar' : 'Pausar'); }
  },

  render() {
    const p = this.phase, n = this.phases.length, next = this.phases[this.i + 1];
    const nw = p.type === 'work' ? p : this.nextWork();
    const isShadow = !!nw?.shadow;
    let stage = '';
    if (isShadow) {
      stage = `<div class="pl-court">${courtSVG({ active: nw.shadow.positions })}</div>
        ${p.type === 'work'
          ? `<div class="pl-callrow"><div class="pl-call" id="plCall"><span class="muted">Base</span></div><div class="pl-moves">Movimentos <b id="plMoves">${this.moves}</b></div></div>`
          : `<div class="pl-call small">Volte sempre para a base</div>`}`;
    } else if (nw?.exercise) {
      const ex = nw.exercise;
      stage = `<div class="pl-ex">
        ${p.type !== 'work' ? `<div class="pl-ex-next">Próximo: <b>${esc(ex.name)}</b>${nw.reps ? ` · ${esc(nw.reps)}` : ''}</div>` : ''}
        <ol>${ex.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>
        ${ex.tips?.[0] ? `<p class="tip">${esc(ex.tips[0])}</p>` : ''}</div>`;
    }
    const nextLabel = !next ? 'Última etapa'
      : next.type === 'rest' ? `A seguir: <b>Descanso ${fmtSec(next.duration)}</b>`
        : `A seguir: <b>${esc(next.exercise?.name || next.title)}</b> · ${next.duration ? fmtSec(next.duration) : esc(next.reps)}`;

    this.el.className = `player ph-${p.type}${this.paused ? ' paused' : ''}${isShadow ? ' is-shadow' : ''}`;
    this.el.innerHTML = `
      <header class="pl-top">
        <button class="icon-btn" data-act="close" aria-label="Encerrar">${I.close}</button>
        <div class="pl-title">${esc(this.title)}</div>
        <div class="pl-count">${this.i + 1}/${n}</div>
      </header>
      <div class="pl-progress"><span style="width:${(this.i / n) * 100}%"></span></div>
      <div class="pl-body">
        <div class="pl-phase">${this.paused ? 'Pausado' : PHASE_LABEL[p.type]}</div>
        <h2 class="pl-name">${esc(p.title)}</h2>
        ${p.subtitle ? `<div class="pl-sub">${esc(p.subtitle)}</div>` : ''}
        <div class="pl-timer${p.duration ? '' : ' reps'}" id="plTimer">${p.duration ? fmtClock(this.remaining) : esc(p.reps)}</div>
        <div class="pl-stage">${stage}</div>
      </div>
      <div class="pl-next">${nextLabel}</div>
      <footer class="pl-controls">
        <button class="ctl" data-act="prev" aria-label="Etapa anterior" ${this.i === 0 ? 'disabled' : ''}>${I.prev}</button>
        ${p.duration
          ? `<button class="ctl main" data-act="pause" aria-label="${this.paused ? 'Continuar' : 'Pausar'}">${this.paused ? I.play : I.pause}</button>`
          : `<button class="ctl main" data-act="next" aria-label="Concluí">${I.check}</button>`}
        <button class="ctl" data-act="next" aria-label="Pular etapa">${I.next}</button>
      </footer>
      <div class="pl-confirm" ${this.confirming ? '' : 'hidden'}>
        <div class="pl-confirm-box">
          <h3>Encerrar o treino?</h3>
          <p>${this.elapsed() >= 60 ? 'O tempo feito até aqui será salvo no histórico.' : 'Menos de 1 minuto: nada será salvo.'}</p>
          <button class="btn-primary block" data-act="resume">Continuar treinando</button>
          <button class="btn-ghost block" data-act="quit">Encerrar</button>
        </div>
      </div>`;
  },

  askClose() {
    this.wasPaused = this.paused;
    this.togglePause(true);
    this.confirming = true;
    this.render();
  },

  finish() {
    this.engine?.stop(); clearInterval(this.iv); this.done = true;
    const secs = this.elapsed();
    logSession({ title: this.title, kind: this.kind, seconds: secs, moves: this.moves, done: true });
    Voice.speak('Treino concluído. Muito bem!');
    Sound.beep(880, 0.15); setTimeout(() => Sound.beep(1318, 0.3), 180);
    vibrate([100, 80, 100, 80, 200]);
    const max = Math.max(1, ...Object.values(this.counts));
    const corners = this.moves ? `<div class="sum-corners"><h3>Movimentos por canto</h3>
      ${ALL_POS.filter(k => this.counts[k]).map(k => `<div class="bar-row"><span>${POSITIONS[k].n} · ${POSITIONS[k].name}</span>
        <div class="bar"><i style="width:${(this.counts[k] / max) * 100}%"></i></div><b>${this.counts[k]}</b></div>`).join('')}</div>` : '';
    this.el.className = 'player ph-done';
    this.el.innerHTML = `
      <div class="pl-done">
        <div class="done-badge">${I.check}</div>
        <h2>Treino concluído!</h2>
        <p class="muted">${esc(this.title)}</p>
        <div class="stats">
          <div class="stat"><b>${fmtDur(secs)}</b><small>Duração</small></div>
          <div class="stat"><b>${this.phases.filter(p => p.type === 'work').length}</b><small>Blocos</small></div>
          ${this.moves ? `<div class="stat"><b>${this.moves}</b><small>Movimentos</small></div>` : ''}
        </div>
        ${corners}
        <button class="btn-primary block" data-act="exit">Fechar</button>
      </div>`;
  },

  quit() {
    const secs = this.elapsed();
    if (secs >= 60) logSession({ title: this.title, kind: this.kind, seconds: secs, moves: this.moves, done: false });
    this.exit();
  },

  exit() {
    this.active = false; this.engine?.stop(); clearInterval(this.iv);
    Voice.stop(); Wake.off();
    this.el.hidden = true; this.el.innerHTML = '';
    document.body.classList.remove('no-scroll');
    window.dispatchEvent(new Event('player:exit'));
  },
};

$('#player').addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b || b.disabled) return;
  const P = Player;
  switch (b.dataset.act) {
    case 'pause': P.togglePause(); break;
    case 'next': P.goto(P.i + 1); break;
    case 'prev': P.goto(P.i - 1); break;
    case 'close': P.askClose(); break;
    case 'resume': P.confirming = false; P.render(); if (!P.wasPaused) P.togglePause(false); break;
    case 'quit': P.quit(); break;
    case 'exit': P.exit(); break;
  }
});

document.addEventListener('keydown', e => {
  if (!Player.active || Player.confirming || Player.done) return;
  if (e.code === 'Space') { e.preventDefault(); Player.phase.duration ? Player.togglePause() : Player.goto(Player.i + 1); }
  if (e.code === 'ArrowRight') Player.goto(Player.i + 1);
  if (e.code === 'Escape') Player.askClose();
});
