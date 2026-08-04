import vercel from '@sveltejs/adapter-vercel';
import staticAdapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// Vercel is the live target (it can run the Pl@ntNet proxy). Set STATIC_BUILD=1
// to produce a pure static bundle instead — used by CI's Lighthouse pass and
// still deployable to GitHub Pages, minus the server routes.
const useStatic = !!process.env.STATIC_BUILD;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// runtime pinned so the build doesn't depend on the local Node version
		adapter: useStatic ? staticAdapter() : vercel({ runtime: 'nodejs22.x' }),
		paths: { base: process.env.BASE_PATH || '' }
	}
};

export default config;
