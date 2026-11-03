/* Armazenamento local (localStorage) com prefixo do app. */

const PREFIX = 'bt:';
const OLD_PREFIX = 'peteca:'; // nome antigo do app

// Migra dados salvos com o nome antigo, uma única vez.
try {
  Object.keys(localStorage)
    .filter(k => k.startsWith(OLD_PREFIX))
    .forEach(k => {
      const nk = PREFIX + k.slice(OLD_PREFIX.length);
      if (localStorage.getItem(nk) == null) localStorage.setItem(nk, localStorage.getItem(k));
      localStorage.removeItem(k);
    });
} catch { /* sem storage */ }

export const store = {
  get(k, d) { try { const v = localStorage.getItem(PREFIX + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(PREFIX + k, JSON.stringify(v)); } catch { /* sem storage */ } },
};
