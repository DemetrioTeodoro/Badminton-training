/* Vibração: plugin Haptics no Android, navigator.vibrate no navegador. */
import { Native } from './native.js';
import { settings } from './settings.js';

/** p: duração em ms ou padrão [vibra, pausa, vibra, ...]. */
export function vibrate(p) {
  if (!settings.vibrate) return;
  if (Native?.Haptics) {
    let t = 0;
    (Array.isArray(p) ? p : [p]).forEach((ms, i) => {
      if (i % 2 === 0) setTimeout(() => Native.Haptics.vibrate({ duration: ms }).catch(() => {}), t);
      t += ms;
    });
  } else if (navigator.vibrate) navigator.vibrate(p);
}
