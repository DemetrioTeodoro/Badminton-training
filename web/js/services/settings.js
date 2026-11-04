/* Preferências do usuário (voz, bipes, vibração). */
import { store } from '../core/storage.js';

export const settings = Object.assign(
  { voice: true, beep: true, vibrate: true, voiceURI: null, rate: 1.1 },
  store.get('settings', {}),
);

export const saveSettings = () => store.set('settings', settings);
