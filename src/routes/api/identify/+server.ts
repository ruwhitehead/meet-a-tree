import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { PLANTNET_PROJECT, isOrgan, mapResults } from '$lib/plantnet';
import type { RequestHandler } from './$types';

export const prerender = false;

const MAX_BYTES = 6 * 1024 * 1024;

/** Cheap abuse brake. The free Pl@ntNet tier is ~500 identifications a day and
 *  this endpoint is public, so one script could burn a day's quota in a minute.
 *  Per-instance and therefore imperfect — a shared store would be better if
 *  this ever matters — but it costs nothing and stops the obvious case. */
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 12;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
	const now = Date.now();
	const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
	recent.push(now);
	hits.set(key, recent);
	if (hits.size > 500) for (const [k, v] of hits) if (!v.some((t) => now - t < RATE_WINDOW_MS)) hits.delete(k);
	return recent.length > RATE_MAX;
}

/** Proxies one photo to Pl@ntNet. The API key stays on the server — that is the
 *  entire reason this endpoint exists rather than calling Pl@ntNet from the page. */
export const POST: RequestHandler = async ({ request, fetch, getClientAddress }) => {
	const key = env.PLANTNET_API_KEY;
	if (!key) return json({ ok: false, reason: 'not-configured' }, { status: 503 });

	try {
		if (rateLimited(getClientAddress())) return json({ ok: false, reason: 'slow-down' }, { status: 429 });
	} catch {
		/* no client address available — carry on */
	}

	const form = await request.formData();
	const image = form.get('image');
	const requested = String(form.get('organ') ?? 'auto');
	const organ = isOrgan(requested) ? requested : 'auto';

	if (!(image instanceof File)) error(400, 'No image supplied');
	if (image.size === 0) error(400, 'That image is empty');
	if (image.size > MAX_BYTES) error(413, 'That image is too large');
	if (!/^image\/(jpe?g|png|webp)$/.test(image.type)) error(415, 'Send a JPEG or PNG');

	// Pl@ntNet accepts JPG and PNG only; a WebP would be rejected upstream.
	const usable = /^image\/(jpe?g|png)$/.test(image.type);
	if (!usable) return json({ ok: false, reason: 'unsupported-format' }, { status: 415 });

	const upstream = new FormData();
	upstream.append('images', image, image.name || 'photo.jpg');
	upstream.append('organs', organ); // one organ per image, in order

	const url =
		`https://my-api.plantnet.org/v2/identify/${PLANTNET_PROJECT}` +
		`?api-key=${encodeURIComponent(key)}&include-related-images=false&no-reject=false&nb-results=5&lang=en`;

	let res: Response;
	try {
		res = await fetch(url, { method: 'POST', body: upstream });
	} catch {
		return json({ ok: false, reason: 'upstream-unreachable' }, { status: 502 });
	}

	// 404 is Pl@ntNet's "nothing matched / not a plant" answer, not a failure
	if (res.status === 404) return json({ ok: true, matches: [], remaining: null });
	if (res.status === 401 || res.status === 403)
		return json({ ok: false, reason: 'bad-key' }, { status: 502 });
	if (res.status === 429) return json({ ok: false, reason: 'quota' }, { status: 429 });
	if (!res.ok) return json({ ok: false, reason: 'upstream-error' }, { status: 502 });

	const { matches, remaining } = mapResults(await res.json());
	return json({ ok: true, matches, remaining });
};
