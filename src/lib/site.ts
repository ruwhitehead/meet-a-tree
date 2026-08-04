/**
 * Canonical public origin.
 *
 * Open Graph tags must carry absolute URLs, and pages are prerendered at build
 * time when the deploy host is unknown — `page.url.origin` resolves to
 * SvelteKit's internal prerender host, which produced the nonsense
 * `http://sveltekit-prerender./images/og-card.jpg` in shipped meta tags.
 *
 * Update this when the app moves to meetatree.app.
 */
export const SITE_URL = 'https://meet-a-tree.vercel.app';

export const absoluteUrl = (path: string): string =>
	`${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
