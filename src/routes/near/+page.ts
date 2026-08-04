import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';

// "Near You" became My Trees. Keep the old path working for anyone whose
// installed app or shared link still points at it.
export const prerender = false;
export const ssr = false;

export function load() {
	redirect(308, `${base}/trees/`);
}
