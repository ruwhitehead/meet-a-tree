/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />
import { build, files, prerendered, version } from '$service-worker';

const sw = self as unknown as ServiceWorkerGlobalScope;
const CACHE = `grove-${version}`;
// the entire app shell + every prerendered page (the whole field guide) works offline
const ASSETS = [...build, ...files, ...prerendered];

sw.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(CACHE)
			.then((cache) => cache.addAll(ASSETS))
			.then(() => sw.skipWaiting())
	);
});

sw.addEventListener('activate', (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
			.then(() => sw.clients.claim())
	);
});

sw.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;
	const url = new URL(event.request.url);
	if (url.origin !== sw.location.origin) return;

	event.respondWith(
		(async () => {
			const cache = await caches.open(CACHE);
			const cached = await cache.match(event.request, { ignoreSearch: true });
			if (cached) return cached;
			try {
				const res = await fetch(event.request);
				if (res.ok) cache.put(event.request, res.clone());
				return res;
			} catch (err) {
				// offline navigation to an uncached URL: fall back to the app root
				if (event.request.mode === 'navigate') {
					const root = await cache.match(new URL(sw.registration.scope).pathname);
					if (root) return root;
				}
				throw err;
			}
		})()
	);
});
