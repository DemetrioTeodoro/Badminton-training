// Service worker: deixa o app funcionando offline (stale-while-revalidate).
const CACHE = 'badminton-training-v2';

// Ao adicionar ou renomear arquivos, atualize esta lista e o número da versão acima.
const ASSETS = [
  './',
  './assets/icon.svg',
  './css/base.css',
  './css/controls.css',
  './css/court.css',
  './css/layout.css',
  './css/lists.css',
  './css/player.css',
  './css/sheet.css',
  './css/toast.css',
  './index.html',
  './js/core/dom.js',
  './js/core/format.js',
  './js/core/icons.js',
  './js/core/storage.js',
  './js/data/categories.js',
  './js/data/court.js',
  './js/data/exercises.js',
  './js/data/workouts.js',
  './js/main.js',
  './js/services/history.js',
  './js/services/native.js',
  './js/services/settings.js',
  './js/services/sound.js',
  './js/services/vibration.js',
  './js/services/voice.js',
  './js/services/wake-lock.js',
  './js/training/phases.js',
  './js/training/shadow-config.js',
  './js/training/shadow-engine.js',
  './js/ui/court.js',
  './js/ui/player.js',
  './js/ui/sheet.js',
  './js/ui/toast.js',
  './js/views/exercises-view.js',
  './js/views/history-view.js',
  './js/views/settings-sheet.js',
  './js/views/shadow-view.js',
  './js/views/workouts-view.js',
  './manifest.webmanifest',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(req, { ignoreSearch: true });
      const network = fetch(req)
        .then(res => { if (res.ok) cache.put(req, res.clone()); return res; })
        .catch(() => cached || (req.mode === 'navigate' ? cache.match('./index.html') : undefined));
      return cached || network;
    }),
  );
});
