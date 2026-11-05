/* Painel de configurações (voz, bipes, vibração). */
import { $, esc } from '../core/dom.js';
import { saveSettings, settings } from '../services/settings.js';
import { Sound } from '../services/sound.js';
import { Voice } from '../services/voice.js';
import { Sheet } from '../ui/sheet.js';

const toggle = (key, title, sub) => `<div class="setting"><div><b>${title}</b><small>${sub}</small></div>
  <label class="switch"><input type="checkbox" data-set="${key}" ${settings[key] ? 'checked' : ''}><span></span></label></div>`;

export function openSettings() {
  const cur = Voice.current;
  Sheet.open(`
    <div class="sheet-head"><h2>Configurações</h2></div>
    ${toggle('voice', 'Voz', Voice.supported ? 'Anuncia exercícios e os cantos do shadow' : 'Seu navegador não suporta voz')}
    ${toggle('beep', 'Bipes', 'Contagem regressiva 3-2-1 e fim de cada etapa')}
    ${toggle('vibrate', 'Vibração', 'Vibra ao trocar de etapa (Android)')}
    <label class="field"><span>Voz em português</span>
      <select id="selVoice">${Voice.voices.length
        ? Voice.voices.map(v => `<option value="${esc(v.voiceURI)}" ${cur && v.voiceURI === cur.voiceURI ? 'selected' : ''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('')
        : '<option>Padrão do sistema</option>'}</select></label>
    <label class="range"><span class="range-top"><span>Velocidade da fala</span><b id="rateVal">${settings.rate.toFixed(2)}×</b></span>
      <input type="range" min="0.8" max="1.6" step="0.05" value="${settings.rate}" id="rate"></label>
    <button type="button" class="btn-ghost block" id="testVoice">Testar som e voz</button>
    <p class="hint">Dica: no iPhone, desative o modo silencioso para ouvir os bipes. Use fone Bluetooth para ouvir melhor na quadra.</p>`,
  s => {
    s.oninput = e => {
      if (e.target.dataset.set) settings[e.target.dataset.set] = e.target.checked;
      if (e.target.id === 'rate') { settings.rate = Number(e.target.value); $('#rateVal').textContent = `${settings.rate.toFixed(2)}×`; }
      if (e.target.id === 'selVoice') settings.voiceURI = e.target.value;
      saveSettings();
    };
    s.onchange = s.oninput;
    $('#testVoice', s).onclick = () => { Sound.unlock(); Sound.beep(); Voice.speak('Frente esquerda. Fundo direita.'); };
  });
}
