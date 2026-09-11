// ==========================================================================
// SERVICE WORKER - Tiếng Anh Lớp 2 - Cô giáo Thỏ Ngọc
// NETWORK-FIRST cho file cùng domain.
// QUAN TRỌNG: mọi request cross-origin (đặc biệt Google TTS) để trình duyệt
// xử lý trực tiếp, Service Worker KHÔNG can thiệp.
// ==========================================================================

const CACHE_NAME = 'ta-lop2-tho-ngoc-v3';

const APP_SHELL = [
    './',
    './index.html',
    './manifest.json',
    './favicon.svg',
    './assets/js/app.js',
    './assets/images/icon-192.png',
    './assets/images/icon-512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) =>
                cache.addAll(
                    APP_SHELL.map((url) => new Request(url, { cache: 'reload' }))
                )
            )
            .catch(() => {})
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) =>
                Promise.all(
                    keys
                        .filter((key) => key !== CACHE_NAME)
                        .map((key) => caches.delete(key))
                )
            )
            .then(() => self.clients.claim())
    );
});

self.addEventListener('message', (event) => {
    if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
    const req = event.request;

    if (req.method !== 'GET') return;

    const url = new URL(req.url);

    // Không can thiệp dữ liệu động và MỌI request ngoài domain.
    // Google Translate TTS thuộc cross-origin, nên browser sẽ gọi trực tiếp.
    const isDynamicData = url.pathname.includes('/assets/data/');
    const isCrossOrigin = url.origin !== self.location.origin;

    if (isDynamicData || isCrossOrigin) return;

    event.respondWith(
        fetch(new Request(req.url, { cache: 'no-store' }))
            .then((res) => {
                const clone = res.clone();
                caches.open(CACHE_NAME)
                    .then((cache) => cache.put(req, clone))
                    .catch(() => {});
                return res;
            })
            .catch(() =>
                caches.match(req)
                    .then((cached) => cached || caches.match('./index.html'))
            )
    );
});
