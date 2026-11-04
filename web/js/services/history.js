/* Histórico de sessões salvo no aparelho. */
import { store } from '../core/storage.js';

export const getHistory = () => store.get('history', []);
export const clearHistory = () => store.set('history', []);

export function logSession(entry) {
  const h = getHistory();
  h.unshift({ ...entry, date: new Date().toISOString() });
  store.set('history', h.slice(0, 1000));
}
