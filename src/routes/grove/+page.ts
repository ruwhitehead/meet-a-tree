import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';

// The grove became a view inside My Trees — two tabs for one idea confused
// everybody, including me. Old links and share cards still work.
export const prerender = false;
export const ssr = false;

export function load() {
	redirect(308, `${base}/trees/`);
}
