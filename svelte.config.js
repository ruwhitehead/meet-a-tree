import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Vercel: every page is still prerendered (see routes/+layout.ts), but
		// /api/identify runs as a function so the Pl@ntNet key stays server-side.
		// Runtime is pinned so the build doesn't depend on the local Node version.
		adapter: adapter({ runtime: 'nodejs22.x' })
	}
};

export default config;
