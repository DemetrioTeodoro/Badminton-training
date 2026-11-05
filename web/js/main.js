/* Ponto de entrada: roteador das abas e inicialização. */
import { $, $$ } from './core/dom.js';
import { Native } from './services/native.js';
import { Voice } from './services/voice.js';
import { Sheet } from './ui/sheet.js';
import { renderExercises } from './views/exercises-view.js';
import { renderHistory } from './views/history-view.js';
import { openSettings } from './views/settings-sheet.js';
import { renderShadow } from './views/shadow-view.js';
import { renderWorkouts } from './views/workouts-view.js';

const VIEWS = { shadow: renderShadow, exercicios: renderExercises, treinos: renderWorkouts, historico: renderHistory };

function route() {
  const tab = VIEWS[location.hash.slice(1)] ? location.hash.slice(1) : 'shadow';
  $$('#tabbar a').forEach(a => a.classList.toggle('on', a.dataset.tab === tab));
  VIEWS[tab]($('#view'));
}

window.addEventListener('hashchange', () => { Sheet.close(); route(); window.scrollTo(0, 0); });
window.addEventListener('player:exit', route); // atualiza a aba (ex.: histórico) ao sair do treino
$('#btnSettings').addEventListener('click', openSettings);

Voice.load();
route();

// Modo offline só na versão web; no APK os arquivos já estão no aparelho.
if (!Native && 'serviceWorker' in navigator && (location.protocol === 'https:' || ['localhost', '127.0.0.1'].includes(location.hostname))) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
