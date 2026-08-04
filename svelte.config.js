import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		// '' locally and on Vercel; '/meet-a-tree' when building for GitHub project pages
		paths: { base: process.env.BASE_PATH || '' }
	}
};

export default config;
