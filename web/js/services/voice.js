/* Fala em português: plugin TextToSpeech no Android, speechSynthesis no navegador. */
import { Native } from './native.js';
import { settings } from './settings.js';

const isPt = v => (v.lang || '').toLowerCase().startsWith('pt');

export const Voice = {
  voices: [],
  supported: !!Native?.TextToSpeech || 'speechSynthesis' in window,

  async load() {
    if (Native?.TextToSpeech) {
      try {
        const { voices } = await Native.TextToSpeech.getSupportedVoices();
        // o plugin escolhe a voz pelo índice na lista completa
        this.voices = voices.map((v, idx) => ({ ...v, idx })).filter(isPt);
      } catch { this.voices = []; }
      return;
    }
    if (!this.supported) return;
    const pick = () => { this.voices = speechSynthesis.getVoices().filter(isPt); };
    pick(); speechSynthesis.addEventListener?.('voiceschanged', pick);
  },

  get current() {
    return this.voices.find(v => v.voiceURI === settings.voiceURI)
      || this.voices.find(v => v.lang.toLowerCase().replace('_', '-') === 'pt-br')
      || this.voices[0] || null;
  },

  speak(text) {
    if (!settings.voice || !this.supported) return;
    const v = this.current;
    if (Native?.TextToSpeech) {
      Native.TextToSpeech.stop().catch(() => {}).finally(() =>
        Native.TextToSpeech.speak({ text, lang: 'pt-BR', rate: settings.rate, ...(v ? { voice: v.idx } : {}) }).catch(() => {}));
      return;
    }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'pt-BR'; u.rate = settings.rate;
    if (v) u.voice = v;
    speechSynthesis.speak(u);
  },

  stop() {
    if (Native?.TextToSpeech) Native.TextToSpeech.stop().catch(() => {});
    else if (this.supported) speechSynthesis.cancel();
  },
};
